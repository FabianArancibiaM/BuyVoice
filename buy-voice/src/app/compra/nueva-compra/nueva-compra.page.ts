/* eslint-disable no-underscore-dangle */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { CompraService } from 'src/app/service/compra.service';

@Component({
  selector: 'app-nueva-compra',
  templateUrl: './nueva-compra.page.html',
  styleUrls: ['./nueva-compra.page.scss'],
})
export class NuevaCompraPage implements OnInit, OnDestroy {

  constructor(private _compraService: CompraService) { }

  ngOnDestroy(): void {
    this._compraService.finalizarCompra();

  }

  ngOnInit() {
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
