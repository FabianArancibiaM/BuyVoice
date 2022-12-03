import { NegocioModel } from 'src/app/models/negocio.model';
import { take } from 'rxjs/operators';
import { OnDestroy, ChangeDetectorRef } from '@angular/core';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ComercioService } from 'src/app/service/comercio.service';
import { ProductoComunModel } from 'src/app/models/producto-comun.model';
import { CompraVentaModel } from 'src/app/models/compra-venta.model';
import { RecognitionToText } from 'src/app/service/recognition-to-text.service';
import { Speech } from 'src/app/service/speech.service';
import { InfoSubMenu } from 'src/app/models/info-sub-menu.model';
import { ManagerModal } from 'src/app/service/manager-modal.service';
import { ModalGenericoComponent } from 'src/app/ui/modal-generico/modal-generico.component';
import { InventarioModel } from 'src/app/models/inventario.model';
import { validateArgCount } from '@firebase/util';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.page.html',
  styleUrls: ['./nueva-venta.page.scss'],
})
export class NuevaVentaPage implements OnInit, OnDestroy {

  public montoTotal = 0;
  public titleTable = [
    'Nombre Producto',
    'Medición',
    'Cantidad',
    'Precio'
  ];
  public dataTable: any[] = [];
  public showSpinner = false;
  public textError = '';
  public textRecognition: any;
  private _promesa: Subscription[];
  private _listaProdCmpra = new Array<ProductoComunModel>();
  private _listaInventario: Array<InventarioModel> = new Array<InventarioModel>();

  constructor(private _comercio: ComercioService,
    private _infoNegocio: NegocioModel, private _recognitionToText: RecognitionToText, private _speech: Speech,
    private _cd: ChangeDetectorRef,
    private _managerModal: ManagerModal,
    public infoSubMenu: InfoSubMenu) { }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    this._promesa = [];
    this._promesa.push(this._comercio.getInventario().subscribe(data => this._listaInventario = data.message, err => console.log(err) ));
    this._listaProdCmpra = [];
    this.dataTable = [];
  }

  nuevaVenta() {
    let isOpen = false;
    const errorListening = (txt, code) => {
      isOpen = true;
      this._managerModal.configMessage(code);
      this._managerModal.configMessageDEBUG(txt);
      this._managerModal.initConfigModal(ModalGenericoComponent, 'my-modal-generic-class');
    };
    const validateCount = (nameProd, account) => {
      const result =
        this._listaInventario.find(x => x.nombre.toUpperCase() === nameProd.toUpperCase()).cantidadDisponible - parseInt(account, 10) ;
      if(result === 0){
        return {valid: true, msg: 'Vas a vender las ultimas unidades...', code: 'CUSTOM-001'};
      }
      if(result > 0){
        return {valid: true, msg: undefined, code: undefined };
      }
      return {valid: false, msg: 'No tienes la cantidad necesaria para vender...', code: 'CUSTOM-002' };
    };
    const frase = [
      //   '1 kg de manzana verde a $12000 y dos de piña a $5000 y otra piña a $5000 y 3 kilos de palta hass chilena $7000',
      // '1 kg de manzana verde y dos de piña y otra piña y 3 kilos de palta hass chilena'
      // "5 kg de palta chilena a $12000"
      // "5 unidades de piña a $7000"
      "1 piña"
    ];
    const listObject = this._recognitionToText.recognition(frase,'VENTA');
    const antes = this.dataTable.length;
    listObject.forEach(obj => {
      if([1,2,3].includes(obj.rule)){
        const isValid = validateCount(obj.nombre, obj.cantidad);
        if(isValid.valid){
          if(isValid.msg)  {errorListening(isValid.msg, isValid.code);}
          this.dataTable.push([obj.nombre, obj.unidad, obj.cantidad, parseInt(obj.precio, 10)]);
          this.montoTotal = this.montoTotal + (obj.cantidad * parseInt(obj.precio, 10));
        } else {
          errorListening(isValid.msg, isValid.code);
        }
      }
    });
    if(this.dataTable.length === antes && !isOpen){
      errorListening(`${frase} - ${JSON.stringify(listObject)}`, 'MICRO-500');
    }
    // this._speech.initServiceSpeech().subscribe(matches => {
    //   this.textRecognition = matches;
    //   const listObject = this._recognitionToText.recognition(matches,'VENTA');
    //   const antes = this.dataTable.length;
    //   listObject.forEach(obj => {
    //     if([1,2,3].includes(obj.rule)){
    //       this.dataTable.push([obj.nombre, obj.unidad, obj.cantidad, parseInt(obj.precio, 10)]);
    //       this.montoTotal = this.montoTotal + (obj.cantidad * parseInt(obj.precio, 10));
    //     }
    //   });
    //   this._cd.detectChanges();
    //   if(this.dataTable.length === antes){
    //     errorListening(`${matches} - ${JSON.stringify(listObject)}`, 'MICRO-500');
    //   }
    //   this._cd.detectChanges();
    // });
  }

  registrar() {
    try {
      this.showSpinner = true;
      const comp = new CompraVentaModel();
      comp.comerciante = this._infoNegocio.usuarios.find(usu => usu.activo === true);
      comp.totalVentaCompra = this.montoTotal;
      const listPro: Array<ProductoComunModel> = [];
      this.dataTable.forEach( data => {
        const inv = this._listaInventario.find(x => x.nombre.toUpperCase() === data[0].toUpperCase());
        const model = new ProductoComunModel();
        model.cantidad = data[2];
        model.precioVentaCompra = data[3];
        model.unidadMedidaVenta = data[1];
        const invent = new InventarioModel();
        invent.id = inv.id;
        model.inventario = invent;
        listPro.push(model);
      });
      comp.detalleProductos = listPro;

      const sus = this._comercio.generarVenta(comp).subscribe(data2 => {
        const result = data2.status === 'OK' ? 'G-200': 'G-500';
      const method = data2.status === 'OK' ? () => {
        this.dataTable= [];
        this.montoTotal = 0;
        this.textRecognition = '';
      } : () =>{};
      this._managerModal.configMessage(result);
      this._managerModal.initConfigModal(ModalGenericoComponent, 'my-modal-generic-class', method);
      this.showSpinner = false;
      this._promesa.push(this._comercio.getInventario().subscribe(data => this._listaInventario = data.message, err => console.log(err) ));
      });
      this._promesa.push(sus);
    } catch (error) {
      this.textError = error;
    }
  }

}
