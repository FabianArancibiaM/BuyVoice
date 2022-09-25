import { take } from 'rxjs/operators';
import { ComercioService } from './../../service/comercio.service';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProductoComunModel } from 'src/app/models/producto-comun.model';
import { DataManagementService } from 'src/app/service/data-management.service';

@Component({
  selector: 'app-modal-edit-products',
  templateUrl: './modal-edit-products.component.html',
  styleUrls: ['./modal-edit-products.component.scss'],
})
export class ModalEditProductsComponent implements OnInit {

  public model: ProductoComunModel;

  constructor(
    private controller: ModalController,
    private _management: DataManagementService,
    private _service: ComercioService
  ) { }

  ngOnInit() {
    this.model = this._management.selectedProduct;
  }

  onSubmit() {
    this._service.updateCompra(this._management)
        .subscribe(data => {
          this.close();
        }, err => console.log(err));
  }

  close(){
    this.controller.dismiss();
  }

}
