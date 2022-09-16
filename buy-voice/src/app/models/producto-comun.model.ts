/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { InventarioModel } from './inventario.model';

@Injectable({
    providedIn: 'root',
})
export class ProductoComunModel {
    private _id: number;
    private _inventario: InventarioModel;
    private _precioVentaCompra: number;
    private _cantidad: number;
    private _unidadMedidaVenta: string;

    constructor(){}

    public get id() {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }
    public get inventario() {
        return this._inventario;
    }
    public set inventario(v: InventarioModel) {
        this._inventario = v;
    }
    public get precioVentaCompra() {
        return this._precioVentaCompra;
    }
    public set precioVentaCompra(v: number) {
        this._precioVentaCompra = v;
    }
    public get cantidad() {
        return this._cantidad;
    }
    public set cantidad(v: number) {
        this._cantidad = v;
    }

    public get unidadMedidaVenta() {
        return this._unidadMedidaVenta;
    }
    public set unidadMedidaVenta(v: string) {
        this._unidadMedidaVenta = v;
    }
}
