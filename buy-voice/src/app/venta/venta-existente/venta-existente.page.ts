/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

  constructor() { }

  ngOnInit() {
  }

  buscarVenta(fecha){
  }
  eventClick(evento){
  }
}
