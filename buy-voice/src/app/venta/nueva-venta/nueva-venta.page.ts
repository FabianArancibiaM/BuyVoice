import { OnDestroy } from '@angular/core';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductoModel } from 'src/app/models/producto.model';
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
  private comprasTt$: Observable<Array<ProductoModel>>;
  private _promesa = new Subject();

  constructor(private _ventaService: ComercioService) { }

  ngOnDestroy(): void {
    this._ventaService.finalizarComercio('VENTA');
    this._promesa.next();
    this._promesa.complete();
  }

  ngOnInit() {
    this.comprasTt$ = this._ventaService.listaProductos();
    this.comprasTt$.pipe(takeUntil(this._promesa)).subscribe(data => {
      if(data.length === 0){
        this.montoTotal = 0;
      } else {
        data.forEach(dta => {
          // this.dataTable.push([dta.nombre, dta.medicion, dta.cantidad.toString(), `$${dta.precioCompra.toString()}`]);
          // this.montoTotal = this.montoTotal + dta.precioCompra;
        });
      }
    });
  }

  nuevaVenta(){
    const p = new ProductoModel();
    p.nombre = 'Pera';
    // p.precioCompra = 54000;
    // p.medicion = 'kilos';
    // p.cantidad = 54;
    this._ventaService.agregarProducto(p);
  }

}
