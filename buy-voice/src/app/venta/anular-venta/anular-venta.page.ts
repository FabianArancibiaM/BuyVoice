/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ComercioModel } from 'src/app/models/comercio.model';
import { InfoComercio } from 'src/app/models/info-comercio.model';

@Component({
  selector: 'app-anular-venta',
  templateUrl: './anular-venta.page.html',
  styleUrls: ['./anular-venta.page.scss'],
})
export class AnularVentaPage implements OnInit {

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

  constructor(private _venta: ComercioModel) { }

  ngOnInit() {
    this.todaInfo = this._venta.historialComercio.filter(data => data.tipoComercio === 'VENTA');
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
          // this.dataTable.push([data.nombre, data.medicion, data.cantidad.toString(), `$${data.precioCompra.toString()}`, 'Anular']);
          // this.montoTotal = this.montoTotal + data.precioCompra;
        });
      }
    });
  }
  eventClick(evento){}

}
