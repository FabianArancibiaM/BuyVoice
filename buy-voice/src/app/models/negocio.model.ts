/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { UsuarioModel } from './usuario.model';

@Injectable({
    providedIn: 'root',
})
export class NegocioModel {
    private _id: string;
    private _nombre: string;
    private _usuarios: Array<UsuarioModel> = new Array<UsuarioModel>();

    constructor(){}

    public get id() {
        return this._id;
    }
    public set id(v: string) {
        this._id = v;
    }
    public get usuarios() {
        return this._usuarios;
    }
    public set usuarios(v: Array<UsuarioModel>) {
        this._usuarios = v;
    }
    public get nombre() {
        return this._nombre;
    }
    public set nombre(v: string) {
        this._nombre = v;
    }
}
