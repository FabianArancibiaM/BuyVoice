import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VozService {

  constructor() { }

  funcionBase(){
    const texto = [
      'Son 50 kilos de manzana a 1200 pesos el kilo',
      '3 cajas de limones a 9000 pesos la caja',
      '3 cajas de limones a 9000 pesos la caja',
      'Son 50 kilos de manzana a 1200 pesos el kilo',
      'Anota 20 cajas de frutilla a 5000 pesos cada una'
    ];
    const listaFrutasVerduras = ['pera', 'manzana', 'frutilla', 'tomate', 'lechuga'];
    const listaCategoriaPesos = ['kilo','kilos', 'unidades', 'unidad', 'cajas'];

    const validarCantidad = (voz: string) => {
      const listaPalabras = voz.split(' ');
      const indexPalabraClave: number[] = [];
      listaCategoriaPesos.forEach( clv => {
        const palabraEnVoz = listaPalabras.find( lst => lst.toLowerCase() === clv.toLowerCase());
        indexPalabraClave.push(listaPalabras.indexOf(palabraEnVoz));
      });
      let valorEncontrado = '';
      indexPalabraClave.forEach( indx => {
        if (!isNaN(Number(listaPalabras[indx - 1]))) {
          valorEncontrado = listaPalabras[indx - 1];
        }
      });
      return {
        textInit: listaPalabras,
        numberKilos: valorEncontrado
      };
    };

    texto.forEach(element => {
      of(element).pipe(
        map(t => validarCantidad(t)),
      ).subscribe( data => console.log(data));
    });
  }
}
