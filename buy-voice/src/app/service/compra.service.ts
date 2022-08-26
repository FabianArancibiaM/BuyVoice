import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductoModel } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private _listaCompra: Array<ProductoModel>;
  private _historialCompra: Array<ProductoModel[]>;
  private listaCompra$ = new Subject<Array<ProductoModel>>();

  constructor(){
    this._listaCompra = new Array<ProductoModel>();
    this._historialCompra = new Array<ProductoModel[]>();
  }

  finalizarCompra(){
    this._historialCompra.push(this._listaCompra);
    this._listaCompra = [];
    this.listaCompra$.next([]);
  }

  listaCompra(){
    return this.listaCompra$.asObservable();
  }

  agregarHistorial(v: Array<ProductoModel>){
    this._historialCompra.push(v);
  }

  agregarCompra(v: ProductoModel){
    this._listaCompra.push(v);
    this.listaCompra$.next(this._listaCompra);
  }
}
