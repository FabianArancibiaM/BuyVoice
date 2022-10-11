/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { ProductoComunModel } from 'src/app/models/producto-comun.model';
import { CompraVentaModel } from 'src/app/models/compra-venta.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  private _selectedTransaction: CompraVentaModel;
  private _selectedProduct: ProductoComunModel;
  private _indexProductSelected: number;
  private _indexTransactionSelected: number;
  private _flow: 'VENTA' | 'COMPRA' | 'INICIO';

  constructor() { }

  set selectedTransaction(data: CompraVentaModel){
    this._selectedTransaction = data;
  }
  get selectedTransaction(){
    return this._selectedTransaction;
  }

  set selectedProduct(data: ProductoComunModel){
    this._selectedProduct = data;
  }
  get selectedProduct(){
    return this._selectedProduct;
  }

  set indexProductSelected(data: number){
    this._indexProductSelected = data;
  }
  get indexProductSelected(){
    return this._indexProductSelected;
  }

  set indexTransactionSelected(data: number){
    this._indexTransactionSelected = data;
  }
  get indexTransactionSelected(){
    return this._indexTransactionSelected;
  }

  set flow(data: 'VENTA' | 'COMPRA' | 'INICIO'){
    this._flow = data;
  }
  get flow(){
    return this._flow;
  }
}
