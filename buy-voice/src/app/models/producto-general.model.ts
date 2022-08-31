/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { INombreCategoria } from '../interfaces/Igeneral.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductoGeneralModel {

    private _codigoProducto: string;
    private _nombreProducto: string;
    private _tipoUnidades: INombreCategoria;
	private _cantidadTotal: number;
	private _precioVentaActual: number;
	private _mermaPerdida: number;
    private _fechaUltimaCompra: Date;

    constructor(){}

    public get nombreProducto() {
        return this._nombreProducto;
    }
    public get tipoUnidades() {
        return this._tipoUnidades;
    }
    public get cantidadTotal() {
        return this._cantidadTotal;
    }
    public get precioVentaActual() {
        return this._precioVentaActual;
    }
    public get mermaPerdida() {
        return this._mermaPerdida;
    }
    public get codigoProducto() {
        return this._codigoProducto;
    }
    public get fechaUltimaCompra() {
        return this._fechaUltimaCompra;
    }
    public set fechaUltimaCompra(v: Date) {
        this._fechaUltimaCompra = v;
    }
    public set codigoProducto(v: string) {
        this._codigoProducto = v;
    }
    public set nombreProducto(v: string) {
        this._nombreProducto = v;
    }
    public set tipoUnidades(v: INombreCategoria) {
        this._tipoUnidades = v;
    }
    public set cantidadTotal(v: number) {
        this._cantidadTotal = v;
    }
    public set precioVentaActual(v: number) {
        this._precioVentaActual = v;
    }
    public set mermaPerdida(v: number) {
        this._mermaPerdida = v;
    }

}
