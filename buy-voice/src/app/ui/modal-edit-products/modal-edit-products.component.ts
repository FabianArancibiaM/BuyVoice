import { take } from 'rxjs/operators';
import { ComercioService } from './../../service/comercio.service';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProductoComunModel } from 'src/app/models/producto-comun.model';
import { DataManagementService } from 'src/app/service/data-management.service';
import { ManagerModal } from 'src/app/service/manager-modal.service';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';

@Component({
  selector: 'app-modal-edit-products',
  templateUrl: './modal-edit-products.component.html',
  styleUrls: ['./modal-edit-products.component.scss'],
})
export class ModalEditProductsComponent implements OnInit {

  public model: ProductoComunModel;
  public removeView = false;
  public flowView = false;

  constructor(
    private controller: ModalController,
    private _management: DataManagementService,
    private _service: ComercioService,
    private _managerModal: ManagerModal
  ) { }

  errorPrincipal(txt){
    this._managerModal.configMessage('A-500');
    if(txt.length>0)this._managerModal.configMessageDEBUG(txt);
    this._managerModal.initConfigModal(ModalGenericoComponent, 'my-modal-generic-class', () => {});
  }

  ngOnInit() {
    this.model = this._management.selectedProduct;
    if(this._management.selectedTransaction.detalleProductos.length <= 1) {
      this.removeView = true;
    }
    this.flowView =  this._management.flow === 'COMPRA' ? false : true;
  }

  onSubmit() {
    if (this._management.flow === 'COMPRA') {
      this._service.updateCompra(this._management)
          .subscribe(data => {
            this.close();
          }, err => {
            console.log(err)
            this.errorPrincipal('')
          });
    }
    if (this._management.flow === 'VENTA'){
      this._service.updateVenta(this._management)
          .subscribe(data => {
            this.close();
          }, err => {
            console.log(err)
            this.errorPrincipal('')
          });
    }
  }

  removeProduct() {
    if (this._management.flow === 'COMPRA') {
      this._service.partialCancellationPurchaseCompra(this._management).subscribe(
        data => {
          this.close();
        },
        err => {
          console.log(err)
          this.errorPrincipal('Error al intentar quitar el producto')
        }
      );
    }
    if (this._management.flow === 'VENTA'){
      this._service.partialCancellationPurchaseVenta(this._management)
          .subscribe(data => {
            this.close();
          }, err =>{
            console.log(err)
            this.errorPrincipal('Error al intentar quitar el producto')
          });
    }
  }

  close(){
    this.controller.dismiss();
  }

}
