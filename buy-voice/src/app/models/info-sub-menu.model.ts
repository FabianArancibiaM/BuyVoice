import { Injectable } from '@angular/core';

/* eslint-disable no-underscore-dangle */
@Injectable({
    providedIn: 'root',
})
export class InfoSubMenu {
    private _title: string;
    private _url: string;

    constructor() { }


    set title(v: string) {
        this._title = v;
    }

    set url(v: string) {
        this._url = v;
    }

    get title(): string {
        return this._title;
    }

    get url(): string {
        return this._url;
    }


}
