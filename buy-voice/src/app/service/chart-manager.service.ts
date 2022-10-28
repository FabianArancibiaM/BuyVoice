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
            title: 'Compra V/s Ganancias',
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
        // data.filter(result => {
        //     const mes = result.fecha.split('/')[1];
        //     if(!listaMes.find(l => l.mes.toString() === mes)){
        //         listaMes.push(mes);
        //     }
        //     if (mes !== mesActual.toString()) { return; }
        // });
        return {
            title: 'Ventas del Año (mil.)',
            data: {
                labels: [65, 59, 80, 81, 56, 55, 40],
                datasets: [{
                    label: fechaActual.getFullYear(),
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        };
    }

    mappingBarChar(data: Array<CompraVentaModel>) {
        return {
            title: 'Compra V/s Ganancias',
            data: {
                labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
                    '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
                datasets: [
                    {
                        label: 'Sales',
                        data: ['467', '576', '572', '79', '92',
                            '574', '573', '576'],
                        backgroundColor: 'blue'
                    },
                    {
                        label: 'Profit',
                        data: ['542', '542', '536', '327', '17',
                            '0.00', '538', '541'],
                        backgroundColor: 'limegreen'
                    }
                ]
            }
        };
    }
}
