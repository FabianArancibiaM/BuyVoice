import { Injectable } from '@angular/core';
import { InfoSubMenu } from './info-sub-menu.model';
/* eslint-disable no-underscore-dangle */
@Injectable({
    providedIn: 'root',
})
export class InfoMenu {
    private _title: string;
    private _children: Array<InfoSubMenu>;
    constructor() { }

    set title(v: string) {
        this._title = v;
    }

    set children(v: Array<InfoSubMenu>) {
        this._children = v;
    }

    get title(): string {
        return this._title;
    }

    get children(): Array<InfoSubMenu> {
        return this._children;
    }
}
