/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { ProductoComunModel } from 'src/app/models/producto-comun.model';
import { CompraVentaModel } from 'src/app/models/compra-venta.model';
import { Injectable } from '@angular/core';
import { InventarioModel } from '../models/inventario.model';
import { FlowType } from '../types/FlowType.types';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  private _selectedTransaction: CompraVentaModel;
  private _selectedProduct: ProductoComunModel;
  private _selectedInventory: InventarioModel;
  private _indexProductSelected: number;
  private _indexTransactionSelected: number;
  private _flow: 'VENTA' | 'COMPRA' | 'INICIO' | FlowType ;

  constructor() { }

  set selectedTransaction(data: CompraVentaModel){
    this._selectedTransaction = data;
  }
  get selectedTransaction(){
    return this._selectedTransaction;
  }
  set selectedInventory(data: InventarioModel){
    this._selectedInventory = data;
  }
  get selectedInventory(){
    return this._selectedInventory;
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

  set flow(data: 'VENTA' | 'COMPRA' | 'INICIO' | FlowType){
    this._flow = data;
  }
  get flow(){
    return this._flow;
  }
}
