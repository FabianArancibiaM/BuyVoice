import { Injectable } from '@angular/core';
import { CANT_LIST, CONECTOR_LIST, PATTERN_LIST, PRODUCT_LIST, UNITI_LIST } from '../shared/dictionary';

@Injectable({
  providedIn: 'root'
})
export class RecognitionToText {

  constructor() { }

  recognition(frase: string[]) {
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

    const prod = [];
    let posi = 0;

    while (posi < arrFrase.length) {
      let resp = null;
      patrones.find(rule => {
        resp = this.validatePatron(arrFrase, posi, rule);
        return resp !== undefined;
      });
      if (resp !== undefined) {
        prod.push(resp);
        posi = posi + 3;
      } else {
        posi = posi + 1;
      }
    }

    return prod;
  }

  esCantidad = palabra => !isNaN(palabra) || CANT_LIST.includes(palabra);
  unidadMed = palabra => UNITI_LIST.includes(palabra);
  nombre = palabra => PRODUCT_LIST.includes(palabra);

  validNum(num){
    const dic = [
      {
        value: 1,
        keys: ['un','uno', 'una', 'otra']
      },
      {
        value: 2,
        keys: ['do', 'dos']
      }
    ];

    const result = dic.find(key => key.keys.includes(num));
    if(result !== undefined) {return result.value;}
    return num;
  }

  validatePatron(arrFrase, posi, patron) {
    const result = { cantidad: false, medida: false, nomProd: false };
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
      }
    }
    if (result.cantidad && result.medida && result.nomProd) {
      return {
        cantidad: this.validNum(arrFrase[posi]),
        unidad: arrFrase[posi + 1],
        nombre: arrFrase[posi + 2],
      };
    }
    if (result.cantidad && result.nomProd) {
      return {
        cantidad: this.validNum(arrFrase[posi]),
        unidad: '',
        nombre: arrFrase[posi + 1],
      };
    }
    if (result.nomProd) {
      return {
        cantidad: '',
        unidad: '',
        nombre: arrFrase[posi],
      };
    }
    return undefined;
  };
}
