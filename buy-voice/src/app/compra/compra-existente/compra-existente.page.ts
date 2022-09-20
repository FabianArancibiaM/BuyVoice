import { CompraVentaModel } from './../../models/compra-venta.model';
import { Subscription } from 'rxjs';
import { ComercioService } from 'src/app/service/comercio.service';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-compra-existente',
  templateUrl: './compra-existente.page.html',
  styleUrls: ['./compra-existente.page.scss'],
})
export class CompraExistentePage implements OnInit, OnDestroy {

  public listaFecha: string[] = [];
  public dataTable: any[] = [];
  public titleTable = [
    'Total compra',
    'Cantidad de productos',
    'Estado',
    ''
  ];
  public montoTotal = 0;
  private _promesa: Subscription[];
  private _nuevaVnt: Array<CompraVentaModel>;

  constructor(private _comercio: ComercioService) { }
  ngOnDestroy(): void {
    if(this._promesa && this._promesa.length>0){
      this._promesa.forEach(p=> p.unsubscribe());
    }
  }

  ngOnInit() {
    this._promesa = [];
    this._promesa.push(this._comercio.getInventario().subscribe());
    this._promesa.push(this._comercio.getCompras().subscribe( (datos) => {
      datos.message.forEach(dts => {
        if(!this.listaFecha.includes(dts.fecha)) {this.listaFecha.push(dts.fecha);}
      });
      this._nuevaVnt = datos.message;
    }));
  }

  buscarCompra(fecha){
    this.montoTotal = 0;
    this.dataTable = [];
    this._nuevaVnt.forEach( comp => {
      if(comp.fecha === fecha.detail.value){
        // comp.detalleProductos.forEach( prod => {});
        this.dataTable.push(
          [
            comp.totalVentaCompra,
            comp.detalleProductos.length,
            comp.estado,
            comp.estado === 'Anulado' ? '' : 'Editar'
          ]
        );
      }
    });
  }

  eventClick(evento){
    console.log(evento);
  }

}
