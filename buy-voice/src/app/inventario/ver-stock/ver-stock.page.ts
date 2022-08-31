/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ComercioService } from 'src/app/service/comercio.service';
import { Utils } from 'src/app/shared/utils';

interface ISelectorProducto {
  codigo: string;
  nombre: string;
}

@Component({
  selector: 'app-ver-stock',
  templateUrl: './ver-stock.page.html',
  styleUrls: ['./ver-stock.page.scss'],
})
export class VerStockPage implements OnInit {

  public listaProductos: ISelectorProducto[];
  public fecha: string;
  public detalleUnidad: string;
  public mostrar = false;
  public titleTable: string[];
  public dataTable: any[] = [];

  constructor(private _comercio: ComercioService, private _util: Utils) { }

  ngOnInit() {
    this.listaProductos = [];
    this._comercio.listaInventario().forEach(prod => {
      const nuevo = {codigo: prod.codigoProducto, nombre: prod.nombreProducto};
      if (!this.listaProductos.includes(nuevo)){
        this.listaProductos.push(nuevo);
      }
    });
  }

  buscarProducto(evento){
    const producto = this._comercio.listaInventario().find( data => data.codigoProducto === evento.detail.value);
    this.fecha = this._util.obtenerFecha(producto.fechaUltimaCompra);
    this.detalleUnidad = `${producto.cantidadTotal} ${producto.tipoUnidades}`;
    this.mostrar = true;
    const historicoCompra = this._comercio.listaHistorico().filter( data => data.tipoComercio === 'COMPRA' );

    this.titleTable = [
      'Fecha',
      'Categoria',
      'Cantidad Comprada',
      'Precio Venta',
      'Total Comprado'
    ];
    historicoCompra.forEach( data => {
      data.listaProductos.forEach( prod => {
        if( prod.nombre === producto.nombreProducto ){
          this.dataTable.push([
            this._util.obtenerFecha(data.fecha),
            prod.categoriaUnidad,
            prod.tipoUnidadCompra,
            prod.precioVenta,
            this._util.obtenerPrecio(prod.precioVenta, prod.tipoUnidadVenta, prod.tipoUnidadCompra)
          ]);
        }
      });
    });
  }

}
