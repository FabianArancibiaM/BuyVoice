import { Subscription } from 'rxjs';
/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComercioService } from 'src/app/service/comercio.service';
import { DataManagementService } from 'src/app/service/data-management.service';
import { Utils } from 'src/app/shared/utils';
import { InventarioModel } from 'src/app/models/inventario.model';

interface ISelectorProducto {
  codigo: string;
  nombre: string;
}

@Component({
  selector: 'app-ver-stock',
  templateUrl: './ver-stock.page.html',
  styleUrls: ['./ver-stock.page.scss'],
})
export class VerStockPage implements OnInit, OnDestroy {

  public listaProductos: ISelectorProducto[];
  public fecha: string;
  public detalleUnidad: string;
  public mostrar = false;
  public titleTable: string[];
  public dataTable: any[] = [];


  public listaInventario: Array<InventarioModel> = [];
  public selectedProd: InventarioModel = undefined;
  private promesa: Subscription[] = [];

  constructor(
    private comercio: ComercioService,
    private management: DataManagementService
  ) { }

  ngOnDestroy(): void {
    if(this.promesa && this.promesa.length>0){
      this.promesa.forEach(p=> p.unsubscribe());
    }
  }

  ngOnInit() {
    this.promesa.push(this.comercio.getInventario().subscribe( data => {
      this.listaInventario = data.message;
      console.log(JSON.stringify(this.listaInventario))
    } ));
  }

  buscarProducto(evento){
    this.selectedProd = this.listaInventario.find(x => x.id === evento.detail.value)
    console.log(this.selectedProd)
  }

}
