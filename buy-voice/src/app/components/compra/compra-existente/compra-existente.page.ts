import { take } from 'rxjs/operators';

import { from, Subscription } from 'rxjs';
import { ComercioService } from 'src/app/service/comercio.service';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICompraVenta } from 'src/app/interfaces/ICardCompraVenta.interface';
import { ModalController } from '@ionic/angular';
import { CompraVentaModel } from 'src/app/models/compra-venta.model';
import { ModalEditProductsComponent } from 'src/app/ui/modal-edit-products/modal-edit-products.component';
import { DataManagementService } from 'src/app/service/data-management.service';
import { InfoMenu } from 'src/app/models/info-menu.model';
import { InfoSubMenu } from 'src/app/models/info-sub-menu.model';

@Component({
  selector: 'app-compra-existente',
  templateUrl: './compra-existente.page.html',
  styleUrls: ['./compra-existente.page.scss'],
})
export class CompraExistentePage implements OnInit, OnDestroy {

  public listaFecha: string[] = [];
  public dataCardGeneral: ICompraVenta[] = [];
  public dataCardDetails: ICompraVenta[] = [];
  public titleTable = [
    'Total compra',
    'Cantidad de productos',
    'Estado',
    ''
  ];
  public montoTotal = 0;
  public showDetails = false;
  public showModal = false;
  public showcardGeneral = true;
  public showSpinner = false;

  public default = {
    title: 'Compra',
    detalle: 'Cantidad de productos: 1 <br> hola',
    monto: '$25.000.-',
    allData: new CompraVentaModel()
  };

  private _dateSelec;
  private _promesa: Subscription[];
  private _nuevaVnt: Array<CompraVentaModel>;



  constructor(
    public infoSubMenu: InfoSubMenu,
    private _comercio: ComercioService,
    private _modalControl: ModalController,
    private _management: DataManagementService
  ) { }
  ngOnDestroy(): void {
    if(this._promesa && this._promesa.length>0){
      this._promesa.forEach(p=> p.unsubscribe());
    }
    this._management.flow = 'INICIO';
  }

  async ngOnInit() {
    this._management.flow = 'COMPRA';
    this.showSpinner = true;
    this._promesa = [];
    this._promesa.push(this._comercio.getInventario().subscribe());
    this._promesa.push(this._comercio.getCompras().pipe(take(1)).subscribe( (datos) => {
      datos.message.forEach(dts => {
        if(!this.listaFecha.includes(dts.fecha)) {this.listaFecha.push(dts.fecha);}
      });
      this._nuevaVnt = [];
      this._nuevaVnt = datos.message;
      this.showSpinner = false;
    }));
  }

  eventClick(evento){
    console.log(evento);
  }

  returnClick() {
    this.buscarCompra({
      detail:{
        value: this._management.selectedTransaction.fecha
      }
    });
    this.showDetails = false;
    this.showcardGeneral = true;
    this.showModal = false;
  }

  cancelTransferClick() {
    this.showSpinner = true;
    this._promesa.push(this._comercio.totalCancellationPurchaseCompra(this._management).subscribe( data => {
      this._promesa.push(this._comercio.getCompras().pipe(take(1)).subscribe( (datos) => {
        datos.message.forEach(dts => {
          if(!this.listaFecha.includes(dts.fecha)) {this.listaFecha.push(dts.fecha);}
        });
        this._nuevaVnt = [];
        this._nuevaVnt = datos.message;
        this.dataCardGeneral = [];
        this._nuevaVnt.forEach( (comp, index) => {
          if(comp.fecha === this._dateSelec){
            const object: ICompraVenta = {
              title: 'Compra',
              monto: `${comp.totalVentaCompra}`,
              detalle: `Cantidad de productos: ${comp.detalleProductos.length}`,
              flow: 'DEATAIL',
              index
            };
            this.dataCardGeneral.push(
              object
            );
          }
        });
        this.showcardGeneral = true;
        this.showDetails = false;
        this.showSpinner = false;
      }));
    }));
  }

  buscarCompra(fecha){
    this._dateSelec = fecha.detail.value;
    this.montoTotal = 0;
    this.dataCardGeneral = [];
    this._nuevaVnt.forEach( (comp, index) => {
      if(comp.fecha === fecha.detail.value){
        const object: ICompraVenta = {
          title: 'Compra',
          monto: `${comp.totalVentaCompra}`,
          detalle: `Cantidad de productos: ${comp.detalleProductos.length}`,
          flow: 'DEATAIL',
          index
        };
        this.dataCardGeneral.push(
          object
        );
      }
    });
  }
  viewDetails(event: number){
    this.showDetails = true;
    this.showcardGeneral = false;
    this.dataCardDetails = [];
    this.montoTotal = 0;
    this._management.selectedTransaction = this._nuevaVnt[event];
    this._management.indexTransactionSelected = event;
    this._management.selectedTransaction.detalleProductos.forEach( (data, index) => {
      const object: ICompraVenta = {
        title: ``,
        monto: ``,
        detalle: `
        Producto: ${data.inventario.nombre}<br>
        Cantidad: ${data.cantidad} ${data.inventario.unidadMedida}<br>
        Precio de compra: $${data.precioVentaCompra}.-
        `,
        flow: 'EDIT',
        index
      };
      this.montoTotal = this.montoTotal + ( data.precioVentaCompra * data.cantidad);
      this.dataCardDetails.push(object);
    });
    this.montoTotal = Number(this.montoTotal);
  }

  async openModalModify(event: number){
    this.showModal = true;
    this._management.indexProductSelected = event;
    this._management.selectedProduct = this._management.selectedTransaction.detalleProductos[event];
    const modal = await this._modalControl.create({
      component: ModalEditProductsComponent,
      cssClass: 'my-custom-class',
    });

    this._promesa.push(from(modal.onDidDismiss()).subscribe(() => {
      this.showSpinner = true;
      this._promesa.push(this._comercio.getInventario().subscribe());
      this._promesa.push(this._comercio.getCompras().pipe(take(1)).subscribe( (datos) => {
        this._nuevaVnt = [];
        this._nuevaVnt = datos.message;
        this._management.selectedTransaction = datos.message.find(compVent =>
          compVent.fecha === this._management.selectedTransaction.fecha
          && compVent.id === this._management.selectedTransaction.id
        );
        this.dataCardDetails = [];
        this.montoTotal = 0;
        this._management.selectedTransaction.detalleProductos.forEach( (data, index) => {
          const object: ICompraVenta = {
            title: ``,
            monto: ``,
            detalle: `
            Producto: ${data.inventario.nombre}<br>
            Cantidad: ${data.cantidad} ${data.inventario.unidadMedida}<br>
            Precio de compra: $${data.precioVentaCompra}.-
            `,
            flow: 'EDIT',
            index
          };
          this.montoTotal = this.montoTotal + ( data.precioVentaCompra * data.cantidad);
          this.dataCardDetails.push(object);
        });
        this.montoTotal = Number(this.montoTotal);
        this.showSpinner = false;
      }));
    }));
    await modal.present();
  }

}
