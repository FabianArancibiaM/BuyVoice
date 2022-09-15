/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ComercioService } from 'src/app/service/comercio.service';
import { Utils } from 'src/app/shared/utils';

interface ISelectorProducto {
  codigo: string;
  nombre: string;
}

@Component({
  selector: 'app-ver-stock',
  templateUrl: './ver-stock.page.html',
  styleUrls: ['./ver-stock.page.scss'],
})
export class VerStockPage implements OnInit {

  public listaProductos: ISelectorProducto[];
  public fecha: string;
  public detalleUnidad: string;
  public mostrar = false;
  public titleTable: string[];
  public dataTable: any[] = [];

  constructor(private _comercio: ComercioService, private _util: Utils) { }

  ngOnInit() {
  }

  buscarProducto(evento){
  }

}
