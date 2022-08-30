/* eslint-disable no-underscore-dangle */
import { INombreComercio } from '../interfaces/Igeneral.interface';
import { ProductoModel } from './producto.model';

export class InfoComercio {
    private _listaProductos: ProductoModel[];
    private _fecha: Date;
    private _tipoComercio: INombreComercio;

    constructor(list: ProductoModel[], fecha: Date, tipo: INombreComercio) {
        this._listaProductos = list;
        this._fecha = fecha;
        this._tipoComercio = tipo;
    }

    public get tipoComercio() {
        return this._tipoComercio;
    }
    public get fecha() {
        return this._fecha;
    }
    public get listaProductos() {
        return this._listaProductos;
    }

}
