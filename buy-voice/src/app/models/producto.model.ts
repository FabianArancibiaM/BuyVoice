/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable } from '@angular/core';

/* eslint-disable no-underscore-dangle */
@Injectable({
    providedIn: 'root',
})
export class ProductoModel {
    private _nombre: string;
	private _medicion: string;
	private _cantidad: number;
	private _precioCompra: number;
	private _precioVenta: number;
	private _merma: number;

    constructor(){}

    get nombre(){
        return this._nombre;
    }
    get medicion(){
        return this._medicion;
    }
    get cantidad(){
        return this._cantidad;
    }
    get precioCompra(){
        return this._precioCompra;
    }
    get precioVenta(){
        return this._precioVenta;
    }
    get merma(){
        return this._merma;
    }

    set nombre(v: string){
        this._nombre = v;
    }
    set medicion(v: string){
        this._medicion = v;
    }
    set cantidad(v: number){
        this._cantidad = v;
    }
    set precioCompra(v: number){
        this._precioCompra = v;
    }
    set precioVenta(v: number){
        this._precioVenta = v;
    }
    set merma(v: number){
        this._merma = v;
    }


}
