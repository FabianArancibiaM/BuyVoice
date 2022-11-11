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

  constructor(private _comercio: ComercioService, private _infoNegocio: NegocioModel, private _speech: Speech,
    private _cd: ChangeDetectorRef,private _recognitionToText: RecognitionToText) { }

  ngOnDestroy(): void {
    if(this._promesa && this._promesa.length>0){
      this._promesa.forEach(p=> p.unsubscribe());
    }
    this._speech.stopServiceSpeech();
  }

  ngOnInit() {
    this._promesa = [];
    this._promesa.push(this._comercio.getInventario().subscribe());
    this._listaProdCmpra = [];
    this.dataTable = [];
  }

  startListening(){
    // const frase = ['2','kg','manzana'];
    // const listObject = this._recognitionToText.recognition(frase);
    //   listObject.forEach(obj => {
    //     this.dataTable.push([obj.nombre, obj.unidad, obj.cantidad, 0]);
    //   });
    this._speech.initServiceSpeech().subscribe( matches => {
      this.textRecognition = matches;
      console.log('matches', matches)
      const listObject = this._recognitionToText.recognition(matches);
      console.log('listObject', JSON.stringify(listObject));
      listObject.forEach(obj => {
        this.dataTable.push([obj.nombre, obj.unidad, obj.cantidad, 0]);
      });
      this._cd.detectChanges();
    });
  }

  nuevaCompra(){
    const sus = this._comercio.getCompras().pipe(take(1)).subscribe( data => {
      data.message[0].detalleProductos.forEach(dt => {
        this.dataTable.push([dt.inventario.nombre, dt.inventario.unidadMedida, dt.cantidad, dt.precioVentaCompra]);
        this.montoTotal = this.montoTotal + (dt.precioVentaCompra * dt.cantidad);
        this._listaProdCmpra.push(dt);
      });
    });
    this._promesa.push(sus);
  }

  registrar(){
    // this.showSpinner = true;
    // const comp = new CompraVentaModel();
    // comp.comerciante = this._infoNegocio.usuarios.find(usu => usu.activo === true);
    // comp.totalVentaCompra = this.montoTotal;
    // comp.detalleProductos = this._listaProdCmpra;
    // const sus = this._comercio.generarCompra(comp).subscribe(data2 => {
    //   this.showSpinner = false;
    // });
    // this._promesa.push(sus);
  }

}
