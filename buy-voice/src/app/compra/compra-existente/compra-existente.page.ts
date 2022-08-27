/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { CompraModel } from 'src/app/models/compra.model';
import { InfoCompra } from 'src/app/models/info-compra.model';

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
  private todaInfo: InfoCompra[] = [];

  constructor(private _compra: CompraModel) { }

  ngOnInit() {
    this.todaInfo = this._compra.historialCompra;
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
          this.dataTable.push([data.nombre, data.medicion, data.cantidad.toString(), `$${data.precioCompra.toString()}`, 'editar']);
          this.montoTotal = this.montoTotal + data.precioCompra;
        });
      }
    });
  }

  eventClick(evento){
    console.log(evento);
  }

}
