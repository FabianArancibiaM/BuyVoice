import { ProductoGeneralModel } from './../models/producto-general.model';
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { INombreComercio } from '../interfaces/Igeneral.interface';
import { ComercioModel } from '../models/comercio.model';
import { ProductoModel } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ComercioService {

  private listaComercio$ = new Subject<Array<ProductoModel>>();

  constructor(private _comercio: ComercioModel){}

  finalizarComercio(tipoComercio: INombreComercio){
    this._comercio.agregarNuevoHistorial(tipoComercio);
    this.listaComercio$.next([]);
  }

  listaHistorico() {
    return this._comercio.historialComercio;
  }

  listaInventario(): Array<ProductoGeneralModel>{
    return this._comercio.listaInventario;
  }

  listaProductos(){
    return this.listaComercio$.asObservable();
  }

  agregarProducto(v: ProductoModel){
    this.listaComercio$.next(this._comercio.agregarProductoComercio(v));
  }

  llenadoPrevio(){
    const nuevo = new ProductoModel();
    nuevo.nombre = 'Palta';
    nuevo.precioVenta = 8000;
    nuevo.subTotalPago = 12000;
    nuevo.tipoPago = 'Efectivo';
    nuevo.tipoUnidadCompra = 1333;
    nuevo.tipoUnidadVenta = 4444;
    this.agregarProducto(nuevo);
    this.agregarProducto(nuevo);
    this.agregarProducto(nuevo);
    this.finalizarComercio('COMPRA');
    this.agregarProducto(nuevo);
    this.agregarProducto(nuevo);
    this.agregarProducto(nuevo);
    this.finalizarComercio('VENTA');
    const p = new ProductoGeneralModel();
    p.codigoProducto = 'CE-9';
    p.nombreProducto = 'Palta';
    p.cantidadTotal = 50;
    p.tipoUnidades = 'KILOS';
    p.fechaUltimaCompra = new Date();
    this._comercio.agregarInventario(p);
  }
}
