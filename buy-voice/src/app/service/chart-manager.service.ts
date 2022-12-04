import { Injectable } from '@angular/core';
import { combineLatest, concat, merge, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CompraVentaModel } from '../models/compra-venta.model';
import { ComercioService } from './comercio.service';

@Injectable({
    providedIn: 'root'
})
export class ChartManagerService {

    private dictionary = {
        red: { name: 'COMPRA', rgb: 'rgb(255, 99, 132)' },
        blue: { name: 'VENTA', rgb: 'rgb(54, 162, 235)' },
        yellow: { name: 'Yellow', rgb: 'rgb(255, 205, 86)' },
    };

    constructor(private comercio: ComercioService) { }

    getPurchasesVsEarnings() {
        const metod = (observer) => {
            const mergeData = combineLatest([this.comercio.getCompras(), this.comercio.getVentas()]);
            mergeData.subscribe(data => {
                observer.next({ status: 'OK', message: [...data[0].message, ...data[1].message] });
            }, err => {
                console.log(err);
                observer.next({ status: 'NOK', message: 'Se produjo un error', err });
            });
        };
        return new Observable<{ status: string; message: any; err: any }>(metod);
    }

    mappingPieChar(data: CompraVentaModel[]) {
        const mesActual = new Date().getMonth() + 1;
        let ttCompra = 0;
        let ttVenta = 0;
        data.forEach(result => {
            const mes = result.fecha.split('/')[1];
            if (mes !== mesActual.toString()) { return; }

            if (result.operation === 'VENTA') {
                ttVenta = ttVenta + result.totalVentaCompra;
            } else {
                ttCompra = ttCompra + result.totalVentaCompra;
            }
        });
        return {
            title: 'Compra V/s Ventas',
            data: {
                labels: [
                    this.dictionary.red.name,
                    this.dictionary.blue.name
                ],
                datasets: [{
                    label: 'Dataset',
                    data: [ttCompra, ttVenta],
                    backgroundColor: [
                        this.dictionary.red.rgb,
                        this.dictionary.blue.rgb
                    ],
                    hoverOffset: 2
                }]
            }
        };
    }

    mappingLineChar(data: Array<CompraVentaModel>) {
        const fechaActual = new Date();
        const mesObject = {
            1: 'Enero', 2: 'Febrero', 3: 'Marzo',
            4: 'Abril', 5: 'Mayo', 6: 'Junio',
            7: 'Julio', 8: 'Agosto', 9: 'Septiembre',
            10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'
        };
        const listaMes: Array<{ mes: number; total: number }> = [];
        data.filter(result => {
            const dateVenta = result.fecha.split('/');
            if(parseInt(dateVenta[2], 10)===fechaActual.getFullYear()){
                const mes = dateVenta[1];
                const select = listaMes.find(l => l.mes.toString() === mes);
                if(!select){
                    listaMes.push({mes:parseInt(mes, 10),total:result.totalVentaCompra});
                }else{
                    select.total = select.total + result.totalVentaCompra;
                }
            }
        });
        const meses = [];
        const valores = [];
        listaMes.forEach( x => {
            meses.push(mesObject[x.mes]);
            valores.push(x.total);
        });
        return {
            title: 'Ventas del Año (mil.)',
            data: {
                labels: meses,
                datasets: [{
                    label: fechaActual.getFullYear(),
                    data: valores,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        };
    }

    mappingBarChar(data: Array<CompraVentaModel>) {
        console.log(data)
        const asigName = (name:string, unid:string) => {
            return `${name} (${unid.toLowerCase().includes('k') ? 'kg': 'unid.'})`
        }
        const fechaActual = new Date();
        const listResult: Array<{ id: number; name: string; total: number }> = [];
        data.filter(result => {
            const dateVenta = result.fecha.split('/');
            if (parseInt(dateVenta[1], 10) === (fechaActual.getMonth() + 1)) {
                result.detalleProductos.forEach(prod => {
                    const select = listResult.find(l => l.id.toString() === prod.inventario.id.toString());
                    if (!select) {
                        listResult.push(
                            {
                                id: prod.inventario.id,
                                name: asigName(prod.inventario.nombre, prod.inventario.unidadMedida),
                                total: prod.cantidad
                            }
                        );
                    } else {
                        select.total = select.total + prod.cantidad;
                    }

                });
            }

        });
        console.log(listResult)
        const listName = [];
        const listCount = [];
        listResult.forEach(ls => {
            listName.push(ls.name);
            listCount.push(ls.total);
        });

        return {
            title: 'Compra V/s Ganancias',
            data: {
                labels: listName,
                datasets: [
                    {
                        label: 'Productos',
                        data: listCount,
                        backgroundColor: 'blue'
                    }
                ]
            }
        };
    }
}
