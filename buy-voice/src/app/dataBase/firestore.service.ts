/* eslint-disable @typescript-eslint/naming-convention */
import { Observable, of } from 'rxjs';
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
        console.log('getAllCompra')
        const pokemonDocumentReference = doc(this._collectionCompra, idNegocio);
        return docData(pokemonDocumentReference, { idField: 'id' });
    }

    getAllInventario(idNegocio: string) {
        console.log('getAllInventario')
        // const pokemonDocumentReference = doc(this._collectionInventario, idNegocio);
        // return docData(pokemonDocumentReference, { idField: 'id' });
        return of({"productos":[{"id":1,"cantidad_perdida":5,"unidad_medida_venta":"medio","nombre":"Pera","cantidad_disponible":15,"precio_venta_actual":500,"unidad_medida":"kilos"}],"id":"LOX5W6HwtbgPfQZVRsmZ"});
    }
    getAllNegocio() {
        console.log('getAllNegocio')
        // return collectionData(this._collectionNegocio, { idField: 'id' }) as Observable<any[]>;
        return of([{"nombre":"Don Ramon","usuarios":[{"nombre":"Fabian","perfil":"Admin","clave":"Admin", "id": 1}],"id":"LOX5W6HwtbgPfQZVRsmZ"}])
    }
    getAllVenta(idNegocio: string) {
        console.log('getAllVenta')
        // const pokemonDocumentReference = doc(this._collectionVenta, idNegocio);
        // return docData(pokemonDocumentReference, { idField: 'id' });
        return of({"22-01-2020":[{"fecha":"2020/02/02","total_venta":500,"detalle_productos":[{"precio_venta":500,"id_inventario":"1","unidad_medida_venta":"kilo","cantidad":"1"}],"id_usuario":1}],"id":"LOX5W6HwtbgPfQZVRsmZ"})
    }

    get() {
        const pokemonDocumentReference = doc(this._collectionCompra, `tDlP4Yx4Ur9wMbUedqXf`);
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
