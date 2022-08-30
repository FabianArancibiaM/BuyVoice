/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { INombreCategoria } from '../interfaces/Igeneral.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductoModel {

    private _nombre: string;
    private _tipoPago: string;
    private _precioVenta: number;
    private _subTotalPago: number;
    private _tipoUnidadVenta: string;
    private _tipoUnidadCompra: string;
    private _categoriaUnidad: INombreCategoria;

    constructor(){}

    get nombre(){
        return this._nombre;
    }
    get tipoPago(){
        return this._tipoPago;
    }
    get tipoUnidadVenta(){
        return this._tipoUnidadVenta;
    }
    get tipoUnidadCompra(){
        return this._tipoUnidadCompra;
    }
    get precioVenta(){
        return this._precioVenta;
    }
    get categoriaUnidad(){
        return this._categoriaUnidad;
    }
    get subTotalPago(){
        return this._subTotalPago;
    }

    set nombre(v: string){
        this._nombre = v;
    }
    set tipoPago(v: string){
        this._tipoPago = v;
    }
    set tipoUnidadVenta(v: string){
        this._tipoUnidadVenta = v;
    }
    set tipoUnidadCompra(v: string){
        this._tipoUnidadCompra = v;
    }
    set categoriaUnidad(v: INombreCategoria){
        this._categoriaUnidad = v;
    }
    set precioVenta(v: number){
        this._precioVenta = v;
    }
    set subTotalPago(v: number){
        this._subTotalPago = v;
    }


}
