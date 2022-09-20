import { NegocioModel } from 'src/app/models/negocio.model';
import { CompraVentaModel } from './../../models/compra-venta.model';
import { take } from 'rxjs/operators';
import { ProductoComunModel } from './../../models/producto-comun.model';
import { OnDestroy } from '@angular/core';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
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
  private _promesa: Subscription[];
  private _listaProdCmpra = new Array<ProductoComunModel>();

  constructor(private _comercio: ComercioService, private _infoNegocio: NegocioModel) { }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    this._promesa = [];
    this._promesa.push(this._comercio.getInventario().subscribe());
    this._listaProdCmpra = [];
    this.dataTable = [];
  }

  nuevaVenta(){
    const sus = this._comercio.getVentas().pipe(take(1)).subscribe( data => {
      data.message[0].detalleProductos.forEach(dt => {
        this.dataTable.push([dt.inventario.nombre, dt.inventario.unidadMedida, dt.cantidad, dt.precioVentaCompra]);
        this.montoTotal = this.montoTotal + (dt.precioVentaCompra * dt.cantidad);
        this._listaProdCmpra.push(dt);
      });
    });
    this._promesa.push(sus);
  }

  registrar(){
    const comp = new CompraVentaModel();
    comp.comerciante = this._infoNegocio.usuarios.find(usu => usu.activo === true);
    comp.totalVentaCompra = this.montoTotal;
    comp.detalleProductos = this._listaProdCmpra;
    const sus = this._comercio.generarVenta(comp).subscribe(data2 => console.log('aqui',data2));
    this._promesa.push(sus);
  }

}
