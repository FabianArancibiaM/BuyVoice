/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ComercioService } from 'src/app/service/comercio.service';

@Component({
  selector: 'app-nueva-compra',
  templateUrl: './nueva-compra.page.html',
  styleUrls: ['./nueva-compra.page.scss'],
})
export class NuevaCompraPage implements OnInit, OnDestroy {

  public montoTotal = 0;
  public titleTable = [
    'Nombre Producto',
    'Medición',
    'Cantidad',
    'Precio'
  ];
  public dataTable: any[] = [];
  private _promesa = new Subject();

  constructor(private _compraService: ComercioService) { }

  ngOnDestroy(): void {
  }

  ngOnInit() {
  }

  nuevaCompra(){

  }

}
