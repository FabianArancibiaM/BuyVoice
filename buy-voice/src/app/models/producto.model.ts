import { Injectable } from "@angular/core";

/* eslint-disable no-underscore-dangle */
@Injectable({
    providedIn: 'root',
})
export class Producto {
    private _nombre: string;
	private _medicion: string;
	private _cantidad: Number;
	private _precioCompra: Number;
	private _precioVenta: Number;
	private _merma: Number;

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
    set cantidad(v: Number){
        this._cantidad = v;
    }
    set precioCompra(v: Number){
        this._precioCompra = v;
    }
    set precioVenta(v: Number){
        this._precioVenta = v;
    }
    set merma(v: Number){
        this._merma = v;
    }


}