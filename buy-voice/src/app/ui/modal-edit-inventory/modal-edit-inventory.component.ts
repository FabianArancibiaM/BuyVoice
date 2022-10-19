/* eslint-disable no-underscore-dangle */
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InventarioModel } from 'src/app/models/inventario.model';
import { ComercioService } from 'src/app/service/comercio.service';
import { DataManagementService } from 'src/app/service/data-management.service';
import { FlowType } from 'src/app/types/FlowType.types';
import { UnitType } from 'src/app/types/UnitType.types';

@Component({
  selector: 'app-modal-edit-inventory',
  templateUrl: './modal-edit-inventory.component.html',
  styleUrls: ['./modal-edit-inventory.component.scss'],
})
export class ModalEditInventoryComponent implements OnInit {

  public model: InventarioModel;
  public flow: string;

  public unitType: UnitType;
  constructor(
    private controller: ModalController,
    private _management: DataManagementService,
    private _service: ComercioService
  ) { }

  ngOnInit() {
    this.model = this._management.selectedInventory;
    this.flow = this._management.flow;
  }

  close(){
    this.controller.dismiss();
  }

}
