/* eslint-disable no-underscore-dangle */
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComercioService } from 'src/app/service/comercio.service';
import { InventarioModel } from 'src/app/models/inventario.model';
import { ICompra } from 'src/app/interfaces/ICompra.interface.interface';
import { ISelectorProducto } from 'src/app/interfaces/ISelectorProducto.interface';
import { InfoSubMenu } from 'src/app/models/info-sub-menu.model';
import { ManagerModal } from 'src/app/service/manager-modal.service';
import { ModalGenericoComponent } from 'src/app/ui/modal-generico/modal-generico.component';

@Component({
  selector: 'app-ver-stock',
  templateUrl: './ver-stock.page.html',
  styleUrls: ['./ver-stock.page.scss'],
})
export class VerStockPage implements OnInit, OnDestroy {

  public listaProductos: ISelectorProducto[];
  public fecha: string;
  public detalleUnidad: string;
  public mostrar = false;
  public titleTable: string[];
  public dataTable: any[] = [];


  public listaInventario: Array<InventarioModel> = [];
  public boletaCompra: Array<ICompra> = [];
  public selectedProd: InventarioModel = undefined;
  private promesa: Subscription[] = [];

  constructor(
    private comercio: ComercioService,
    public infoSubMenu: InfoSubMenu,
    private _managerModal: ManagerModal
  ) { }

  ngOnDestroy(): void {
    if(this.promesa && this.promesa.length>0){
      this.promesa.forEach(p=> p.unsubscribe());
    }
  }

  ngOnInit() {
    this.promesa.push(this.comercio.getInventario().subscribe( data => {
      this.listaInventario = data.message;
    } ));
  }

  errorPrincipal(){
    this._managerModal.configMessage('ERR-GENERIC');
    this._managerModal.initConfigModal(ModalGenericoComponent, 'my-modal-generic-class', () => {});
  }

  buscarProducto(evento){
    this.promesa.push(this.comercio.getCompras().subscribe( data => {
      this.selectedProd = this.listaInventario.find(x => x.id.toString() === evento.detail.value.toString());
      this.boletaCompra = [];
      data.message.forEach(p => {
        const pro = p.detalleProductos.find(x => x.inventario.id.toString() === this.selectedProd.id.toString());
        if( pro !== undefined ){
          this.boletaCompra.push({
            cantidad: `${pro.cantidad} ${pro.inventario.unidadMedida}`,
            fecha: p.fecha,
            total: `${pro.cantidad*pro.precioVentaCompra}`
          });
        }
      });
    }, err => {
      console.log(err)
      this.errorPrincipal()
    } ));
  }

}
