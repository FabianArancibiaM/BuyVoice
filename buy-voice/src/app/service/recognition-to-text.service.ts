/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { InventarioModel } from '../models/inventario.model';
import { CANT_LIST, CONECTOR_LIST, DEFINITION_PRODUCTS, PATTERN_LIST } from '../shared/dictionary';
import { ComercioService } from './comercio.service';

interface IProduct{
  cantidad: number;
  unidad: string;
  nombre: string;
  precio: string;
  rule: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecognitionToText {

  private _listInventory: InventarioModel[] = [];
  private _prodList: string[] = [];
  private _unidList: string[] = [];
  private _posi = 0;

  constructor(private _comercio: ComercioService) {
    this._comercio.getInventario().subscribe( data =>{
      this._listInventory = data.message;
    });
    this._prodList = DEFINITION_PRODUCTS.porMayor.productos.concat(DEFINITION_PRODUCTS.porMenor.productos);
    this._unidList = DEFINITION_PRODUCTS.porMayor.unidad.concat(DEFINITION_PRODUCTS.porMenor.unidad);
  }
  recognition(frase: string[], flow) {
    try {
      console.log('frase', JSON.stringify(frase));

    const conetoresList = CONECTOR_LIST;
    const patrones = PATTERN_LIST;

    // cantidad + uni. medida + nombre prod
    // cantidad + nombre prod
    // nombre prod
    // const frase = 'dos kilos manzana dos unidades piñas y tres tiras de vit. C aparte un kilo mas de manzana y una piña mas';
    // const frase = ['1 kg de manzana y dos de piña y otra piña'];
    let txt = '';
    frase.forEach(world => (txt = txt + ' ' + world));
    const arrFrase = txt
      .slice(1, txt.length)
      .split(' ')
      .filter(world => !conetoresList.includes(world));

    const prod: IProduct[] = [];
    this._posi = 0;

    while (this._posi < arrFrase.length) {
      let resp = null;
      patrones.find(rule => {
        rule.regla = rule.regla.filter(r => r!=='monto');
        const regla = flow === 'COMPRA' ? rule.regla.push('monto') : rule;
        resp = this.validatePatron(arrFrase, this._posi, rule);
        return resp !== undefined;
      });
      if (resp !== undefined) {
        prod.push(resp.result);
        this._posi = this._posi + resp.add;
      } else {
        this._posi = this._posi + 1;
      }
    }

    prod.forEach( item => {
      this.defineValue(item);
      this.unitMeasurement(item);
    });

    return prod;
    } catch (err){
      console.log(err)
      return [];
    }
  }

  unitMeasurement(item: IProduct){
    if(item.unidad.length > 0){
      return;
    }
    const prodMayor = DEFINITION_PRODUCTS.porMayor.productos.find(unidad => unidad.toUpperCase() === item.nombre.toUpperCase());
    const prodMEnor = DEFINITION_PRODUCTS.porMenor.productos.find(unidad => unidad.toUpperCase() === item.nombre.toUpperCase());
    if(prodMayor){
      item.unidad = 'kg';
    }
    if(prodMEnor){
      item.unidad = 'unidad';
    }

  }

  defineValue(item: IProduct) {
    item.precio = item.precio.replace('$','');
    if( parseInt(item.precio) > 0){
      return;
    }
    const inventario = this._listInventory.find(inv => inv.nombre.toUpperCase() === item.nombre.toUpperCase());
    if (inventario) {
      item.precio = inventario.precioVentaActual.toString();
    }
  }

  esCantidad = palabra => !isNaN(palabra) || CANT_LIST.includes(palabra);
  unidadMed = palabra => this._unidList.find(unidad => unidad.includes(palabra) || palabra.includes(unidad)) !== undefined;
  nombre = palabra => this._prodList.find(unidad => unidad.includes(palabra) || ( palabra && palabra.includes(unidad)) ) !== undefined;
  precio = palabra => palabra !== undefined && palabra.includes('$');

  validNum(num){
    const dic = [
      {
        value: 1,
        keys: ['un','uno', 'una', 'otra']
      },
      {
        value: 2,
        keys: ['do', 'dos']
      },
      {
        value: 3,
        keys: ['tre', 'tres']
      }
    ];

    const result = dic.find(key => key.keys.includes(num));
    if(result !== undefined) {return result.value;}
    return num;
  }

  validName(palabra: string, posiArray, array){
    const filter = this._prodList.filter(unidad => unidad.toUpperCase().includes(palabra.toUpperCase()));
    if(array[posiArray+1] === undefined){
      return palabra;
    }
    const exist = filter.find(p =>
      p.toUpperCase() === `${palabra} ${array[posiArray+1]}`.toUpperCase() ||
      p.toUpperCase() === `${palabra} ${array[posiArray+1]} ${array[posiArray+2]}`.toUpperCase()
    );
    if(!exist){
      return palabra;
    }
    this._posi = this._posi + (exist.split(' ').length <= 2 ? 1 : 2);
    return exist;
  }

  validatePatron(arrFrase, posi, patron) {
    let posiAmount = 0;
    const result = { cantidad: false, medida: false, nomProd: false, precio: false };
    for (let x = 0; x < patron.regla.length; x++) {
      switch (patron.regla[x]) {
        case 'cantidad':
          result.cantidad = this.esCantidad(arrFrase[posi + x]);
          break;
        case 'medida':
          result.medida = this.unidadMed(arrFrase[posi + x]);
          break;
        case 'nombre':
          result.nomProd = this.nombre(arrFrase[posi + x]);
          break;
        case 'monto':
          const op1 = this.nombre(arrFrase[posi + x]);
          const op2 = this.nombre(arrFrase[posi + x + 1]);
          posiAmount = (op1 ? 1 : 0) + (op2 ? 1 : 0) + x;
          result.precio = this.precio(arrFrase[posi + posiAmount]);
          break;
      }
    }
    if (result.cantidad && result.medida && result.nomProd) {
      return {
        add: result.precio ? 4 : 3,
        result: {
          cantidad: this.validNum(arrFrase[posi]),
          unidad: arrFrase[posi + 1],
          nombre: this.validName(arrFrase[posi + 2], posi + 2, arrFrase),
          precio: result.precio ? arrFrase[posi + posiAmount] : '0',
          rule: 1
        }
      };
    }
    if (result.cantidad && result.nomProd) {
      return {
        add: result.precio ? 3 : 2,
        result: {
          cantidad: this.validNum(arrFrase[posi]),
          unidad: '',
          nombre: this.validName(arrFrase[posi + 1], posi + 1, arrFrase),
          precio: result.precio ? arrFrase[posi + posiAmount] : '0',
          rule: 2
        }
      };
    }
    if (result.nomProd) {
      return {
        add: result.precio ? 2 : 1,
        result: {
          cantidad: '',
          unidad: '',
          nombre: this.validName(arrFrase[posi], posi, arrFrase),
          precio: result.precio ? arrFrase[posi + posiAmount] : '0',
          rule: 3
        }
      };
    }
    return undefined;
  };
}
