import { ComercioService } from 'src/app/service/comercio.service';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { CompraVentaModel } from 'src/app/models/compra-venta.model';

@Component({
  selector: 'app-venta-existente',
  templateUrl: './venta-existente.page.html',
  styleUrls: ['./venta-existente.page.scss'],
})
export class VentaExistentePage implements OnInit {

  public listaFecha: string[] = [];
  public dataTable: any[] = [];
  public titleTable = [
    'N° Venta',
    'Kilos',
    'Precio Total',
    'Opción'
  ];
  public montoTotal = 0;
  private _promesa: Subscription[];
  private _nuevaVnt: Array<CompraVentaModel>;

  constructor(private _comercio: ComercioService) { }

  ngOnInit() {
    this._promesa = [];
    this._promesa.push(this._comercio.getInventario().subscribe());
    this._promesa.push(this._comercio.getVentas().subscribe( (datos) => {
      datos.message.forEach(dts => {
        if(!this.listaFecha.includes(dts.fecha)) {this.listaFecha.push(dts.fecha);}
      });
      this._nuevaVnt = datos.message;
    }));
  }

  buscarVenta(fecha){
    this.montoTotal = 0;
    this.dataTable = [];
    this._nuevaVnt.forEach( comp => {
      if(comp.fecha === fecha.detail.value){
        comp.detalleProductos.forEach( prod => {
          this.dataTable.push(
            [
              prod.inventario.nombre,
              prod.inventario.unidadMedida,
              prod.cantidad,
              prod.precioVentaCompra,
              'Editar'
            ]
          );
          this.montoTotal = this.montoTotal + (prod.precioVentaCompra * prod.cantidad);
        });
      }
    });
  }
  eventClick(evento){
  }
}
