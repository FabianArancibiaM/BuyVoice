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

  constructor(private _comercio: ComercioService,
    private _infoNegocio: NegocioModel, private _recognitionToText: RecognitionToText, private _speech: Speech,
    private _cd: ChangeDetectorRef) { }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    this._promesa = [];
    this._promesa.push(this._comercio.getInventario().subscribe());
    this._listaProdCmpra = [];
    this.dataTable = [];
  }

  nuevaVenta() {
    // const sus = this._comercio.getVentas().pipe(take(1)).subscribe( data => {
    //   data.message[0].detalleProductos.forEach(dt => {
    //     this.dataTable.push([dt.inventario.nombre, dt.inventario.unidadMedida, dt.cantidad, dt.precioVentaCompra]);
    //     this.montoTotal = this.montoTotal + (dt.precioVentaCompra * dt.cantidad);
    //     this._listaProdCmpra.push(dt);
    //   });
    // });
    // this._promesa.push(sus);
    //   const frase = ['1 kg de manzana verde a $12000 y dos de piña a $5000 y otra piña a $5000 y 3 kilos de palta hass chilena $7000',
    //   '1 kg de manzana verde y dos de piña y otra piña y 3 kilos de palta hass chilena'
    // ];
    //   const listObject = this._recognitionToText.recognition(frase, 'COMPRA');
    //     listObject.forEach(obj => {
    //       this.dataTable.push([obj.nombre, obj.unidad, obj.cantidad, obj.precio]);
    //       this.montoTotal = this.montoTotal + (obj.cantidad*parseInt(obj.precio)); 
    //     });
    this._speech.initServiceSpeech().subscribe(matches => {
      this.textRecognition = matches;
      console.log('matches', matches)
      const listObject = this._recognitionToText.recognition(matches,'VENTA');
      console.log('listObject', JSON.stringify(listObject));
      listObject.forEach(obj => {
        this.dataTable.push([obj.nombre, obj.unidad, obj.cantidad, 0]);
        this.montoTotal = this.montoTotal + (obj.cantidad * parseInt(obj.precio));
      });
      this._cd.detectChanges();
    });
  }

  registrar() {
    try {
      this.showSpinner = true;
      const comp = new CompraVentaModel();
      comp.comerciante = this._infoNegocio.usuarios.find(usu => usu.activo === true);
      comp.totalVentaCompra = this.montoTotal;
      comp.detalleProductos = this._listaProdCmpra;
      const sus = this._comercio.generarVenta(comp).subscribe(data2 => {
        this.showSpinner = false;
        this.textError = JSON.stringify(data2);
      });
      this._promesa.push(sus);
    } catch (error) {
      this.textError = error;
    }
  }

}
