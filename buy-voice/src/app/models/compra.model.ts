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
        const p = new ProductoModel();
        p.nombre = 'Pera';
        p.precioCompra = 54000;
        p.medicion = 'kilos';
        p.cantidad = 54;
        this._listaCompra.push(p);
        this._listaCompra.push(p);
        this._listaCompra.push(p);
        this._historialCompra.push(new InfoCompra(this._listaCompra, new Date()));
        this._historialCompra.push(new InfoCompra(this._listaCompra, new Date()));
        this._historialCompra.push(new InfoCompra(this._listaCompra, new Date()));
    }

    public get historialCompra() {
        return this._historialCompra;
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
