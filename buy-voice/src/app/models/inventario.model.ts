/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class InventarioModel {
    private _id: number;
    private _cantidadDisponible: number;
    private _cantidadPerdida: number;
    private _precioVentaActual: number;
    private _nombre: string;
    private _unidadMedida: string;
    private _unidadMedidaVenta: string;
    private _fechaCompra: string[];

    constructor(){}

    public get id() {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }
    public get fechaCompra() {
        return this._fechaCompra;
    }
    public set fechaCompra(v: string[]) {
        this._fechaCompra = v;
    }
    public get cantidadDisponible() {
        return this._cantidadDisponible;
    }
    public set cantidadDisponible(v: number) {
        this._cantidadDisponible = v;
    }
    public get cantidadPerdida() {
        return this._cantidadPerdida;
    }
    public set cantidadPerdida(v: number) {
        this._cantidadPerdida = v;
    }
    public get precioVentaActual() {
        return this._precioVentaActual;
    }
    public set precioVentaActual(v: number) {
        this._precioVentaActual = v;
    }
    public get nombre() {
        return this._nombre && this._nombre.charAt(0).toUpperCase() + this._nombre.slice(1);
    }
    public set nombre(v: string) {
        this._nombre = v;
    }
    public get unidadMedida() {
        return this._unidadMedida && this._unidadMedida.charAt(0).toUpperCase() + this._unidadMedida.slice(1);
    }
    public set unidadMedida(v: string) {
        this._unidadMedida = v;
    }
    public get unidadMedidaVenta() {
        return this._unidadMedidaVenta;
    }
    public set unidadMedidaVenta(v: string) {
        this._unidadMedidaVenta = v;
    }
}
