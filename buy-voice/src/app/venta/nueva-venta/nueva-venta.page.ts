import { OnDestroy } from '@angular/core';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ComercioService } from 'src/app/service/comercio.service';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.page.html',
  styleUrls: ['./nueva-venta.page.scss'],
})
export class NuevaVentaPage implements OnInit, OnDestroy {

  public montoTotal = 0;
  public titleTable = [
    'Nombre Producto',
    'Medición',
    'Cantidad',
    'Precio'
  ];
  public dataTable: any[] = [];

  constructor(private _ventaService: ComercioService) { }

  ngOnDestroy(): void {
  }

  ngOnInit() {
  }

  nuevaVenta(){
  }

}
