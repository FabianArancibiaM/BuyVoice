import { NegocioModel } from './negocio.model';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { UsuarioModel } from './usuario.model';
import { ProductoComunModel } from './producto-comun.model';
import { OperationType } from '../types/UnitType.types';

@Injectable({
    providedIn: 'root',
})
export class CompraVentaModel {
    private _id: number;
    private _negocio: NegocioModel;
    private _fecha: string;
    private _operation: OperationType;
    private _totalVentaCompra: number;
    private _usuario: UsuarioModel;
    private _estado: string;
    private _detalleProductos: Array<ProductoComunModel> = new Array<ProductoComunModel>();

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
    public set fecha(v: string) {
        this._fecha = v;
    }
    public get operation() {
        return this._operation;
    }
    public set operation(v: OperationType) {
        this._operation = v;
    }
    public get estado() {
        return this._estado;
    }
    public set estado(v: string) {
        this._estado = v;
    }
    public get totalVentaCompra() {
        return this._totalVentaCompra;
    }
    public set totalVentaCompra(v: number) {
        this._totalVentaCompra = v;
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
