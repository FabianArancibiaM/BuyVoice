/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ComercioModel } from 'src/app/models/comercio.model';
import { InfoComercio } from 'src/app/models/info-comercio.model';
import { ProductoModel } from 'src/app/models/producto.model';

@Component({
  selector: 'app-venta-existente',
  templateUrl: './venta-existente.page.html',
  styleUrls: ['./venta-existente.page.scss'],
})
export class VentaExistentePage implements OnInit {

  public listaFecha: string[] = [];
  public dataTable: any[] = [];
  public titleTable = [
    'N° Venta',
    'Kilos',
    'Precio Total',
    'Opción'
  ];
  public montoTotal = 0;
  private todaInfo: InfoComercio[] = [];

  constructor(private _venta: ComercioModel) { }

  ngOnInit() {
    this.todaInfo = this._venta.historialComercio.filter(data => data.tipoComercio === 'VENTA');
    this.todaInfo.forEach( info => {
      if(!this.listaFecha.includes(info.fecha.toLocaleDateString('en-US'))){
        this.listaFecha.push(info.fecha.toLocaleDateString('en-US'));
      }
    });
  }

  buscarVenta(fecha){
    this.todaInfo.forEach( (dta, index) => {
      if( dta.fecha.toLocaleDateString('en-US') === fecha.detail.value){
        // let kilos = 0;
        // let total = 0;
        // dta.listaProductos.forEach( data => {
        //   kilos = kilos + data.cantidad;
        //   total = data.precioVenta * data.cantidad;
        // });
        // this.dataTable.push([index, data.medicion, data.cantidad.toString(), `$${data.precioCompra.toString()}`, 'editar']);
      }
    });
  }
  eventClick(evento){
    console.log(evento);
  }
}
