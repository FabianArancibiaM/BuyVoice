import { Subscription } from 'rxjs';
import { ComercioService } from 'src/app/service/comercio.service';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { CompraVentaModel } from 'src/app/models/compra-venta.model';

@Component({
  selector: 'app-anular-venta',
  templateUrl: './anular-venta.page.html',
  styleUrls: ['./anular-venta.page.scss'],
})
export class AnularVentaPage implements OnInit {

  public listaFecha: string[] = [];
  public dataTable: any[] = [];
  public titleTable = [
    'Nombre Producto',
    'Medición',
    'Cantidad',
    'Precio',
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

  buscarCompra(fecha){
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
              comp.estado !== 'anulado' ?'Anular' : 'Anulada'
            ]
          );
          this.montoTotal = this.montoTotal + (prod.precioVentaCompra * prod.cantidad);
        });
      }
    });
  }
  eventClick(evento){}

}
