/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductoModel } from 'src/app/models/producto.model';
import { CompraService } from 'src/app/service/compra.service';

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
  private comprasTt$: Observable<Array<ProductoModel>>;
  private _promesa = new Subject();
  public dataTable: any[] = [];

  constructor(private _compraService: CompraService) { }

  ngOnDestroy(): void {
    this._compraService.finalizarCompra();
    this._promesa.next();
    this._promesa.complete();
  }

  ngOnInit() {
    this.comprasTt$ = this._compraService.listaCompra();
    this.comprasTt$.pipe(takeUntil(this._promesa)).subscribe(data => {
      if(data.length === 0){
        this.montoTotal = 0;
      }else {
        data.forEach(dta => {
          this.dataTable.push([dta.nombre, dta.medicion, dta.cantidad.toString(), `$${dta.precioCompra.toString()}`]);
          this.montoTotal = this.montoTotal + dta.precioCompra;
        });
      }
    });
  }

  nuevaCompra(){
    const p = new ProductoModel();
    p.nombre = 'Pera';
    p.precioCompra = 54000;
    p.medicion = 'kilos';
    p.cantidad = 54;
    this._compraService.agregarCompra(p);

  }

}
