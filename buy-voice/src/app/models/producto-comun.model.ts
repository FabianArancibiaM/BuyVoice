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
    private _precioVenta: number;
    private _cantidad: number;
    private _unidadMedidaVenta: string;

    constructor(){}

    public get id() {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }
    public get idInventario() {
        return this._inventario;
    }
    public set idInventario(v: InventarioModel) {
        this._inventario = v;
    }
    public get precioVenta() {
        return this._precioVenta;
    }
    public set precioVenta(v: number) {
        this._precioVenta = v;
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
