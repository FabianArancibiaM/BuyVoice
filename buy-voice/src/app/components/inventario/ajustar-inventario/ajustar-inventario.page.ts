/* eslint-disable no-underscore-dangle */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription, from } from 'rxjs';
import { ICompra } from 'src/app/interfaces/ICompra.interface.interface';
import { InventarioModel } from 'src/app/models/inventario.model';
import { ComercioService } from 'src/app/service/comercio.service';
import { DataManagementService } from 'src/app/service/data-management.service';
import { FlowType } from 'src/app/types/FlowType.types';
import { UnitType } from 'src/app/types/UnitType.types';
import { ModalEditInventoryComponent } from 'src/app/ui/modal-edit-inventory/modal-edit-inventory.component';

interface IInventary {
  name: string;
  salePrice: string;
  currentKilos: string;
  unit: string;
  decrease: string;
}

@Component({
  selector: 'app-ajustar-inventario',
  templateUrl: './ajustar-inventario.page.html',
  styleUrls: ['./ajustar-inventario.page.scss'],
})
export class AjustarInventarioPage implements OnInit, OnDestroy {

  public listaInventario: Array<InventarioModel> = [];
  public selectedProd: InventarioModel = undefined;
  public details: IInventary = undefined;
  private promesa: Subscription[] = [];

  constructor(
    private comercio: ComercioService,
    private _modalControl: ModalController,
    private _management: DataManagementService
  ) { }

  ngOnInit() {
    this.promesa.push(this.comercio.getInventario().subscribe(data => {
      this.listaInventario = data.message;
    }));
  }

  ngOnDestroy(): void {
    if (this.promesa && this.promesa.length > 0) {
      this.promesa.forEach(p => p.unsubscribe());
    }
  }

  buscarProducto(evento) {
    this.selectedProd = this.listaInventario.find(x => x.id === evento.detail.value);
  }

  async selectedProperty(event: FlowType){
    this._management.flow = event;
    this._management.selectedInventory = this.selectedProd;
    const modal = await this._modalControl.create({
      component: ModalEditInventoryComponent,
      cssClass: 'my-custom-class',
    });
    this.promesa.push(from(modal.onDidDismiss()).subscribe());
    await modal.present();
  }

}
