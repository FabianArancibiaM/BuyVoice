/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { InfoCompra } from './info-compra.model';
import { ProductoModel } from './producto.model';

@Injectable({
    providedIn: 'root',
})
export class CompraModel {
    private _listaCompra: Array<ProductoModel>;
    private _historialCompra: Array<InfoCompra>;

    constructor(){
        this._listaCompra = new Array<ProductoModel>();
        this._historialCompra = new Array<InfoCompra>();
    }

    agregarNuevoHistorial(){
        this._historialCompra.push(new InfoCompra(this._listaCompra, new Date()));
        this._listaCompra = [];
    }

    agregarCompra(v: ProductoModel){
        this._listaCompra.push(v);
        return this._listaCompra;
    }
}
