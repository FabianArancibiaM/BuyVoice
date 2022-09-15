/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anular-compra',
  templateUrl: './anular-compra.page.html',
  styleUrls: ['./anular-compra.page.scss'],
})
export class AnularCompraPage implements OnInit {

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

  eventClick(evento){
    console.log(evento);
  }

}
