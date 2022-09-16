import { ProductoComunModel } from './../../models/producto-comun.model';
import { CompraVentaModel } from './../../models/compra-venta.model';
import { take } from 'rxjs/operators';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComercioService } from 'src/app/service/comercio.service';
import { NegocioModel } from 'src/app/models/negocio.model';

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
  public dataTable: any[];
  private _promesa: Subscription[];
  private _listaProdCmpra = new Array<ProductoComunModel>();

  constructor(private _comercio: ComercioService, private _infoNegocio: NegocioModel) { }

  ngOnDestroy(): void {
    if(this._promesa && this._promesa.length>0){
      this._promesa.forEach(p=> p.unsubscribe());
    }
  }

  ngOnInit() {
    this._promesa = [];
    this._promesa.push(this._comercio.getInventario().subscribe());
    this._listaProdCmpra = [];
    this.dataTable = [];
  }

  nuevaCompra(){
    const sus = this._comercio.getCompras().pipe(take(1)).subscribe( data => {
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
    const sus = this._comercio.generarCompra(comp).subscribe(data2 => console.log('aqui',data2));
    this._promesa.push(sus);
  }

}
