/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CompraModel } from '../models/compra.model';
import { ProductoModel } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private listaCompra$ = new Subject<Array<ProductoModel>>();

  constructor(private _compra: CompraModel){}

  finalizarCompra(){
    this._compra.agregarNuevoHistorial();
    this.listaCompra$.next([]);
  }

  listaCompra(){
    return this.listaCompra$.asObservable();
  }

  agregarCompra(v: ProductoModel){
    this.listaCompra$.next(this._compra.agregarCompra(v));
  }
}
