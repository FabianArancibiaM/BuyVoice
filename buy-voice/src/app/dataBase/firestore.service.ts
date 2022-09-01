/* eslint-disable @typescript-eslint/naming-convention */
import { Observable } from 'rxjs';
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
    private _collection: CollectionReference<DocumentData>;

    constructor(private firestore: Firestore ) {
        this._collection = collection(this.firestore, 'comercio');
    }

    getAll() {
        return collectionData(this._collection, { idField: 'id' }) as Observable<any[]>;
    }

    get() {
        const pokemonDocumentReference = doc(this._collection, `tDlP4Yx4Ur9wMbUedqXf`);
        return docData(pokemonDocumentReference, { idField: 'id' });
    }

    async create(pokemon) {
        // return await addDoc(collection(this.firestore, 'comercio/tDlP4Yx4Ur9wMbUedqXf/lista_productos'), {title: 'hola'});
        debugger
        return updateDoc(doc(
            this.firestore,
            `comercio/tDlP4Yx4Ur9wMbUedqXf`
        ), {lista_productos:[...pokemon.lista_productos,{title: 'hola'}]});
    }

    update(pokemon) {
        const pokemonDocumentReference = doc(
            this.firestore,
            `pokemon/${pokemon.id}`
        );
        return updateDoc(pokemonDocumentReference, { ...pokemon });
    }

    delete(id: string) {
        const pokemonDocumentReference = doc(this.firestore, `pokemon/${id}`);
        return deleteDoc(pokemonDocumentReference);
    }
}
