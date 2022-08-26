/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { InfoSubMenu } from './info-sub-menu.model';
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

    get title() {
        return this._title;
    }

    get children(): Array<InfoSubMenu> {
        return this._children;
    }
}
