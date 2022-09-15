/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  buscarCompra(fecha){
  }

  eventClick(evento){
    console.log(evento);
  }

}
