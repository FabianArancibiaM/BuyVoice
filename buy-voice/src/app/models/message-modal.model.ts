/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class MessageModal {
    private _title: string;
    private _description: string;
    private _code: string;
    constructor() { }

    set title(v: string) {
        this._title = v;
    }

    set description(v: string) {
        this._description = v;
    }
    set code(v: string) {
        this._code = v;
    }

    get code() {
        return this._code;
    }

    get title() {
        return this._title;
    }

    get description(): string {
        return this._description;
    }
}
