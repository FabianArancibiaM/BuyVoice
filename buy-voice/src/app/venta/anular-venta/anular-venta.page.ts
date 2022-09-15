/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  buscarCompra(fecha){
  }
  eventClick(evento){}

}
