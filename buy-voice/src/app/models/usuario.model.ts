/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UsuarioModel {
    private _nombre: string;
    private _perfil: string;
    private _clave: string;
    private _id: number;

    constructor(){}

    public get id() {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }
    public get nombre() {
        return this._nombre;
    }
    public set nombre(v: string) {
        this._nombre = v;
    }
    public get perfil() {
        return this._perfil;
    }
    public set perfil(v: string) {
        this._perfil = v;
    }
    public get clave() {
        return this._clave;
    }
    public set clave(v: string) {
        this._clave = v;
    }
}
