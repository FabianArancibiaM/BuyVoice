/* eslint-disable no-underscore-dangle */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductoModel } from 'src/app/models/producto.model';
import { CompraService } from 'src/app/service/compra.service';

@Component({
  selector: 'app-tabla-generica',
  templateUrl: './tabla-generica.component.html',
  styleUrls: ['./tabla-generica.component.scss'],
})
export class TablaGenericaComponent implements OnInit, OnDestroy {

  @Input() typeTable: string;
  public dataTable: any[] = [];
  public titleTable = {
    compra: [
      'Nombre Producto',
      'Medición',
      'Cantidad',
      'Precio'
    ]
  };

  public comprasTt$: Observable<Array<ProductoModel>>;
  public ventasTt$: Observable<Array<ProductoModel>>;

  private _promesa = new Subject();

  constructor(private _compraService: CompraService) { }

  ngOnDestroy(): void {
    this._promesa.next();
    this._promesa.complete();
  }

  ngOnInit() {
    if (this.typeTable === 'compra'){
      this.comprasTt$ = this._compraService.listaCompra();
      this.comprasTt$.pipe(takeUntil(this._promesa)).subscribe(comp => {
        this.dataTable = [];
        comp.forEach(info => {
          this.dataTable.push([info.nombre, info.medicion, info.cantidad.toString(), info.precioCompra.toString()]);
        });
      });
    } else {}

  }

}
