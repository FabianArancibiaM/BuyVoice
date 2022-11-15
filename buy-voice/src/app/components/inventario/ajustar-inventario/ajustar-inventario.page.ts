/* eslint-disable no-underscore-dangle */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription, from } from 'rxjs';
import { ICompra } from 'src/app/interfaces/ICompra.interface.interface';
import { InfoSubMenu } from 'src/app/models/info-sub-menu.model';
import { InventarioModel } from 'src/app/models/inventario.model';
import { ComercioService } from 'src/app/service/comercio.service';
import { DataManagementService } from 'src/app/service/data-management.service';
import { FlowType } from 'src/app/types/FlowType.types';
import { listaCategoria, listMedida, UnitType } from 'src/app/types/UnitType.types';
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
  public listaMedidas = [];
  public listadoCategoria = [];
  public selectedProd: InventarioModel = undefined;
  public details: IInventary = undefined;
  public medidaDefault = '';
  private promesa: Subscription[] = [];

  constructor(
    private comercio: ComercioService,
    public infoSubMenu: InfoSubMenu
  ) { }

  ngOnInit() {
    this.promesa.push(this.comercio.getInventario().subscribe(data => {
      this.listaInventario = data.message;
      this.listaMedidas = listMedida;
      this.listadoCategoria = listaCategoria;
    }));
  }

  ngOnDestroy(): void {
    if (this.promesa && this.promesa.length > 0) {
      this.promesa.forEach(p => p.unsubscribe());
    }
  }

  buscarProducto(evento) {
    this.selectedProd = this.listaInventario.find(x => x.id === evento.detail.value);
    this.medidaDefault = this.selectedProd.unidadMedidaVenta;
  }

  categoriaSelected(evento){
    this.selectedProd.unidadMedida = evento.detail.value;
  }

  medidaSelected(evento){
    this.selectedProd.unidadMedidaVenta = evento.detail.value;
  }

  async selectedProperty(){
    this.promesa.push(this.comercio.updateInventario(this.selectedProd).subscribe(data => { console.log(data);}));
  }

}
