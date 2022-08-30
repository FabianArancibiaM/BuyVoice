/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ComercioModel } from 'src/app/models/comercio.model';
import { InfoComercio } from 'src/app/models/info-comercio.model';

@Component({
  selector: 'app-compra-existente',
  templateUrl: './compra-existente.page.html',
  styleUrls: ['./compra-existente.page.scss'],
})
export class CompraExistentePage implements OnInit {

  public listaFecha: string[] = [];
  public dataTable: any[] = [];
  public titleTable = [
    'Nombre Producto',
    'Medición',
    'Cantidad',
    'Precio',
    'Opción'
  ];
  public montoTotal = 0;
  private todaInfo: InfoComercio[] = [];

  constructor(private _compra: ComercioModel) { }

  ngOnInit() {
    this.todaInfo = this._compra.historialComercio.filter(data => data.tipoComercio === 'COMPRA');
    this.todaInfo.forEach( info => {
      if(!this.listaFecha.includes(info.fecha.toLocaleDateString('en-US'))){
        this.listaFecha.push(info.fecha.toLocaleDateString('en-US'));
      }
    });
  }

  buscarCompra(fecha){
    this.todaInfo.forEach( dta => {
      if( dta.fecha.toLocaleDateString('en-US') === fecha.detail.value){
        dta.listaProductos.forEach( data => {
          // this.dataTable.push([data.nombre, data.medicion, data.cantidad.toString(), `$${data.precioCompra.toString()}`, 'editar']);
          // this.montoTotal = this.montoTotal + data.precioCompra;
        });
      }
    });
  }

  eventClick(evento){
    console.log(evento);
  }

}
