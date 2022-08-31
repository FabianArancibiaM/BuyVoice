import { ProductoGeneralModel } from './producto-general.model';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { INombreComercio } from '../interfaces/Igeneral.interface';
import { InfoComercio } from './info-comercio.model';
import { ProductoModel } from './producto.model';

@Injectable({
    providedIn: 'root',
})
export class ComercioModel {
    private _listaComercio: Array<ProductoModel>;
    private _listaInventario: Array<ProductoGeneralModel>;
    private _historialComercio: Array<InfoComercio>;

    constructor(){
        this._listaComercio = new Array<ProductoModel>();
        this._historialComercio = new Array<InfoComercio>();
        this._listaInventario = new Array<ProductoGeneralModel>();
    }

    public get historialComercio() {
        return this._historialComercio;
    }

    public get listaInventario() {
        return this._listaInventario;
    }

    agregarNuevoHistorial(tipoCompercio: INombreComercio){
        this._historialComercio.push(new InfoComercio(this._listaComercio, new Date(), tipoCompercio));
        this._listaComercio = [];
    }

    agregarProductoComercio(v: ProductoModel){
        this._listaComercio.push(v);
        return this._listaComercio;
    }

    agregarInventario(v: ProductoGeneralModel){
        this._listaInventario.push(v);
        return this._listaInventario;
    }
}
