import { NegocioModel } from './negocio.model';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { UsuarioModel } from './usuario.model';
import { ProductoComunModel } from './producto-comun.model';

@Injectable({
    providedIn: 'root',
})
export class CompraVentaModel {
    private _id: number;
    private _negocio: NegocioModel;
    private _fecha: Date;
    private _totalVenta: number;
    private _usuario: UsuarioModel;
    private _detalleProductos: Array<ProductoComunModel>;

    constructor(){}

    public get id() {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }
    public get negocio() {
        return this._negocio;
    }
    public set negocio(v: NegocioModel) {
        this._negocio = v;
    }
    public get fecha() {
        return this._fecha;
    }
    public set fecha(v: Date) {
        this._fecha = v;
    }
    public get totalVenta() {
        return this._totalVenta;
    }
    public set totalVenta(v: number) {
        this._totalVenta = v;
    }
    public get comerciante() {
        return this._usuario;
    }
    public set comerciante(v: UsuarioModel) {
        this._usuario = v;
    }
    public get detalleProductos() {
        return this._detalleProductos;
    }
    public set detalleProductos(v: Array<ProductoComunModel>) {
        this._detalleProductos = v;
    }
}
