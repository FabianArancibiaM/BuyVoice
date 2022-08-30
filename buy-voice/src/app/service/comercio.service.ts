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

  listaProductos(){
    return this.listaComercio$.asObservable();
  }

  agregarProducto(v: ProductoModel){
    this.listaComercio$.next(this._comercio.agregarProductoComercio(v));
  }
}
