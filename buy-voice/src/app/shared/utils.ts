import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class Utils {

    obtenerFecha(fecha: Date) {
        const asignarFecha = (dato) => {
            if(dato<10){
              return `0${dato}`;
            }
            return dato;
          };
        return `${
          asignarFecha(fecha.getDay())
        }/${
          asignarFecha(fecha.getMonth())
        }/${
          asignarFecha(fecha.getFullYear())
        }`;
    }

    obtenerPrecio(precioVenta: number, unidadVenta: number, unidadCompra: number){
        return (unidadCompra/unidadVenta)*precioVenta;
    }
}
