import { ModalEditProductsComponent } from './../../componentes/modal-edit-products/modal-edit-products.component';
import { CompraVentaModel } from './../../models/compra-venta.model';
import { Subscription } from 'rxjs';
import { ComercioService } from 'src/app/service/comercio.service';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICompraVenta } from 'src/app/interfaces/ICardCompraVenta.interface';
import { ModalController } from '@ionic/angular';

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

  public default = {
    title: 'Compra',
    detalle: 'Cantidad de productos: 1 <br> hola',
    monto: '$25.000.-',
    allData: new CompraVentaModel()
  };

  private _promesa: Subscription[];
  private _nuevaVnt: Array<CompraVentaModel>;



  constructor(private _comercio: ComercioService, private _modalControl: ModalController) { }
  ngOnDestroy(): void {
    if(this._promesa && this._promesa.length>0){
      this._promesa.forEach(p=> p.unsubscribe());
    }
  }

  async ngOnInit() {
    const modal = await this._modalControl.create({
      component: ModalEditProductsComponent,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss().then(data => console.log(data))
    await modal.present();
    this._promesa = [];
    this._promesa.push(this._comercio.getInventario().subscribe());
    this._promesa.push(this._comercio.getCompras().subscribe( (datos) => {
      datos.message.forEach(dts => {
        if(!this.listaFecha.includes(dts.fecha)) {this.listaFecha.push(dts.fecha);}
      });
      this._nuevaVnt = datos.message;
    }));
  }

  buscarCompra(fecha){
    this.montoTotal = 0;
    this.dataCardGeneral = [];
    this._nuevaVnt.forEach( comp => {
      if(comp.fecha === fecha.detail.value){
        console.log(comp);
        const object: ICompraVenta = {
          title: 'Compra',
          monto: `${comp.totalVentaCompra}`,
          detalle: `Cantidad de productos: ${comp.detalleProductos.length}`,
          allData: comp,
          infoProd: undefined,
          flow: 'DEATAIL'
        };
        this.dataCardGeneral.push(
          object
        );
      }
    });
  }

  eventClick(evento){
    console.log(evento);
  }

  returnClick() {
    this.showDetails = false;
    this.showcardGeneral = true;
    this.showModal = false;
  }

  cancelTransferClick() {

  }

  viewDetails(event: CompraVentaModel){
    this.showDetails = true;
    this.showcardGeneral = false;
    this.dataCardDetails = [];
    event.detalleProductos.forEach( data => {
      const object: ICompraVenta = {
        title: ``,
        monto: ``,
        detalle: `
        Producto: ${data.inventario.nombre}<br>
        Cantidad: ${data.cantidad} ${data.inventario.unidadMedida}<br>
        Precio de compra: $${data.precioVentaCompra}.-
        `,
        allData: event,
        infoProd: data,
        flow: 'EDIT'
      };
      this.dataCardDetails.push(object);
    });
  }

  async openModalModify(event: ICompraVenta){
    this.showModal = true;
    const modal = await this._modalControl.create({
      component: ModalEditProductsComponent,
      cssClass: 'my-custom-class'
    });
    await modal.present();
  }

}
