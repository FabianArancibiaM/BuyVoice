/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class InfoSubMenu {
    private _title: string;
    private _url: string;
    private _icon: string;

    constructor() { }

    set title(v: string) {
        this._title = v;
    }

    set url(v: string) {
        this._url = v;
    }

    get title() {
        return this._title;
    }

    set icon(v: string) {
        this._icon = v;
    }

    get icon() {
        return this._icon;
    }

    get url() {
        return this._url;
    }


}
