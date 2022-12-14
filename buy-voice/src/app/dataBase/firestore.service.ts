/* eslint-disable @typescript-eslint/naming-convention */
import { from, Observable, of } from 'rxjs';
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { collectionData, Firestore, docData, getDoc, query } from '@angular/fire/firestore';
import {
    CollectionReference,
    DocumentData,
    addDoc,
    collection,
    deleteDoc,
    doc,
    updateDoc,
    where,
} from '@firebase/firestore';

@Injectable({
    providedIn: 'root',
})
export class FirestoreService {
    private _collectionCompra: CollectionReference<DocumentData>;
    private _collectionInventario: CollectionReference<DocumentData>;
    private _collectionNegocio: CollectionReference<DocumentData>;
    private _collectionVenta: CollectionReference<DocumentData>;

    constructor(private firestore: Firestore ) {
        this._collectionCompra = collection(this.firestore, 'COMPRA');
        this._collectionInventario = collection(this.firestore, 'INVENTARIO');
        this._collectionNegocio = collection(this.firestore, 'NEGOCIO');
        this._collectionVenta = collection(this.firestore, 'VENTA');
    }

    getAllCompra(idNegocio: string) {
        const pokemonDocumentReference = doc(this._collectionCompra, idNegocio);
        return docData(pokemonDocumentReference, { idField: 'id' });
    }

    getAllInventario(idNegocio: string) {
        const pokemonDocumentReference = doc(this._collectionInventario, idNegocio);
        return docData(pokemonDocumentReference, { idField: 'id' });
    }
    getAllNegocio() {
        return collectionData(this._collectionNegocio, { idField: 'id' }) as Observable<any[]>;
    }
    getAllVenta(idNegocio: string) {
        const pokemonDocumentReference = doc(this._collectionVenta, idNegocio);
        return docData(pokemonDocumentReference, { idField: 'id' });
    }

    get() {
        const pokemonDocumentReference = doc(this._collectionCompra, `tDlP4Yx4Ur9wMbUedqXf`);
        return docData(pokemonDocumentReference, { idField: 'id' });
    }

    newPurchase(compra, idNegocio) {
        return from(updateDoc(
            doc(this._collectionCompra, idNegocio)
            , compra
        ));
    }

    newSale(ventaInicial, idNegocio){
        return from(updateDoc(
            doc(this._collectionVenta, idNegocio)
            , ventaInicial
        ));
    }

    updateCompra(compra, idNegocio) {
        return from(updateDoc(
            doc(this._collectionCompra, idNegocio)
            , compra
        ));
    }
    updateVentas(compra, idNegocio) {
        return from(updateDoc(
            doc(this._collectionVenta, idNegocio)
            , compra
        ));
    }
    updateInventario(inventario, idNegocio) {
        return from(updateDoc(
            doc(this._collectionInventario, idNegocio)
            , inventario
        ));
    }

    delete(id: string) {
        const pokemonDocumentReference = doc(this.firestore, `pokemon/${id}`);
        return deleteDoc(pokemonDocumentReference);
    }
}
