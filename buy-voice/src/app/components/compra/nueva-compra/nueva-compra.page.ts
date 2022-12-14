import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';
import { take } from 'rxjs/operators';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComercioService } from 'src/app/service/comercio.service';
import { NegocioModel } from 'src/app/models/negocio.model';
import { ProductoComunModel } from 'src/app/models/producto-comun.model';
import { CompraVentaModel } from 'src/app/models/compra-venta.model';
import { Speech } from 'src/app/service/speech.service';
import { RecognitionToText } from 'src/app/service/recognition-to-text.service';
import { InfoSubMenu } from 'src/app/models/info-sub-menu.model';
import { ManagerModal } from 'src/app/service/manager-modal.service';
import { ModalGenericoComponent } from 'src/app/ui/modal-generico/modal-generico.component';
import { InventarioModel } from 'src/app/models/inventario.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nueva-compra',
  templateUrl: './nueva-compra.page.html',
  styleUrls: ['./nueva-compra.page.scss'],
})
export class NuevaCompraPage implements OnInit, OnDestroy {

  public montoTotal = 0;
  public titleTable = [
    'Nombre Producto',
    'Medición',
    'Cantidad',
    'Precio'
  ];
  public dataTable: any[];
  public showSpinner = false;
  public textRecognition: any;
  public openMic = false;

  private _promesa: Subscription[];
  private _listaProdCmpra = new Array<ProductoComunModel>();

  constructor(private _comercio: ComercioService, private _speech: Speech, private _infoNegocio: NegocioModel,
    private _cd: ChangeDetectorRef, private _recognitionToText: RecognitionToText, public infoSubMenu: InfoSubMenu,
    private _managerModal: ManagerModal,
    private _navCtrl: NavController) { }

  ngOnDestroy(): void {
    if (this._promesa && this._promesa.length > 0) {
      this._promesa.forEach(p => p.unsubscribe());
    }
    this._speech.stopServiceSpeech();
  }

  errorPrincipal(){
    this._managerModal.configMessage('ERR-GENERIC');
    this._managerModal.initConfigModal(ModalGenericoComponent, 'my-modal-generic-class', () => {
      this._navCtrl.navigateForward(['menu-secundario']);
    });
  }

  ngOnInit() {
    this._promesa = [];
    this._promesa.push(this._comercio.getInventario().subscribe(data => {
      if(data.status == 'NOK'){
        this.errorPrincipal()
      }
    }, err => {
      console.log(err)
      this.errorPrincipal()
    }));
    this._listaProdCmpra = [];
    this.dataTable = [];
  }

  private openShowModal = false;
  private errorListening = (txt:string) => {
    if(this.openShowModal) return;
    this.openShowModal = true
    this._managerModal.configMessage('MICRO-500');
    if(txt.length>0) this._managerModal.configMessageDEBUG(txt);
    this._managerModal.initConfigModal(ModalGenericoComponent, 'my-modal-generic-class', () => {
      this.openShowModal = false
    });
  };

  startListening() {
    //   const frase = [
    //   //   '1 kg de manzana verde a $12000 y dos de piña a $5000 y otra piña a $5000 y 3 kilos de palta hass chilena $7000',
    //   // '1 kg de manzana verde y dos de piña y otra piña y 3 kilos de palta hass chilena'
    //   // "5 kg de palta chilena a $12000"
    //   // "5 unidades de piña a $7000"
    //   // "tres lechugas por $1000"
    //   "5 kilo de tomates a 3000"
    // ];
    // const listObject = this._recognitionToText.recognition(frase,'COMPRA');
    // const antes = this.dataTable.length;
    // listObject.forEach(obj => {
    //   if([1,2,3].includes(obj.rule)){
    //     this.dataTable.push([obj.nombre, obj.unidad, obj.cantidad, parseInt(obj.precio, 10)]);
    //     this.montoTotal = this.montoTotal + (obj.cantidad * parseInt(obj.precio, 10));
    //   }
    // });
    //   if(this.dataTable.length === antes){
    //     this.errorListening(`${frase} - ${JSON.stringify(listObject)}`);
    //   }

    this._speech.initServiceSpeech().subscribe(matches => {
      this.textRecognition = matches;
      const listObject = this._recognitionToText.recognition(matches,'COMPRA');
      const antes = this.dataTable.length;
      let error = false;
      listObject.forEach(obj => {
        if(error){
          console.log('')
        } else if([1,2,3].includes(obj.rule)){
          if(obj.precio && parseInt(obj.precio)>0){
            this.dataTable.push([obj.nombre, obj.unidad, obj.cantidad, parseInt(obj.precio, 10)]);
            this.montoTotal = this.montoTotal + (obj.cantidad * parseInt(obj.precio, 10));
          } else {
            error = true
            this.errorListening(`Falto indicar el Precio`);
          }
        } else {
          error = true
          this.errorListening(`No se pudo reconocer la solicitud`);
        }
      });
      this._cd.detectChanges();
      if(listObject.length == 0 ||  this.dataTable.length === antes){
        // this.errorListening(`${matches} - ${JSON.stringify(listObject)}`);
        this.errorListening(`No se pudo reconocer la solicitud`);
      }
    }, err => {
      console.log(err)
      this.errorListening('');
    });
  }

  registrar() {
    this.showSpinner = true;
    const comp = new CompraVentaModel();
    comp.comerciante = this._infoNegocio.usuarios.find(usu => usu.activo === true);
    comp.totalVentaCompra = this.montoTotal;
    const listPro: Array<ProductoComunModel> = [];
    this.dataTable.forEach( data => {
      const model = new ProductoComunModel();
      model.cantidad = data[2];
      model.precioVentaCompra = data[3];
      model.unidadMedidaVenta = data[1];
      const invent = new InventarioModel();
      invent.nombre = data[0];
      model.inventario = invent;
      listPro.push(model);
    });
    comp.detalleProductos = listPro;
    const sus = this._comercio.generarCompra(comp).subscribe(data2 => {
      const result = data2.status === 'OK' ? 'G-200': 'G-500';
      const method = data2.status === 'OK' ? () => {
        this.dataTable= [];
        this.montoTotal = 0;
        this.textRecognition = '';
      } : () =>{};
      this._managerModal.configMessage(result);
      this._managerModal.initConfigModal(ModalGenericoComponent, 'my-modal-generic-class', method);
      this.showSpinner = false;
    }, err => {
      console.log(err)
      this._managerModal.configMessage('G-500');
      this._managerModal.initConfigModal(ModalGenericoComponent, 'my-modal-generic-class');
    });
    this._promesa.push(sus);
  }

}
