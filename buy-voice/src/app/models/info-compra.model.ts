/* eslint-disable no-underscore-dangle */
import { ProductoModel } from './producto.model';

export class InfoCompra {
    private _listaProductos: ProductoModel[];
    private _fecha: Date;

    constructor(list: ProductoModel[], fecha: Date) {
        this._listaProductos = list;
        this._fecha = fecha;
    }

    public get fecha() {
        return this._fecha;
    }
    public get listaProductos() {
        return this._listaProductos;
    }

}
