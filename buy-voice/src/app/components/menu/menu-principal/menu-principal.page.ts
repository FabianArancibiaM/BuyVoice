import { concat, Observable } from 'rxjs';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { InfoMenu } from 'src/app/models/info-menu.model';
import { InfoSubMenu } from 'src/app/models/info-sub-menu.model';
import { first, take } from 'rxjs/operators';
import { combineLatest, forkJoin } from 'rxjs';
import { ComercioService } from 'src/app/service/comercio.service';
import { NegocioModel } from 'src/app/models/negocio.model';
import { IInfoCardMenu } from 'src/app/interfaces/IMenu.interface';
import { Speech } from 'src/app/service/speech.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  public listCard: IInfoCardMenu[] = [
    {
      title: 'Mis Compras', children: [
        { title: 'Nueva compra', url: '/nueva-compra', icon:'../../../../assets/add-to-cart.png' },
        { title: 'Ver historial', url: '/compra-existente', icon:'../../../../assets/historial-de-compras.png' },
      ], icon: '../../../../assets/carro_compras.png'
    },
    {
      title: 'Mis Ventas', children: [
        { title: 'Nueva venta', url: '/nueva-venta', icon:'../../../../assets/seller.png' },
        { title: 'Ver historial', url: '/venta-existente', icon:'../../../../assets/ventas_realizadas.png' },
      ], icon: '../../../../assets/bolsa_ventas.png'
    },
    {
      title: 'Mi Inventario', children: [
        { title: 'Ver Stock', url: '/ver-stock', icon:'../../../../assets/stock.png' },
        { title: 'Ajustar Inventario', url: '/ajustar-inventario', icon:'../../../../assets/ajustar.png' },
      ], icon: '../../../../assets/inventory.png'
    },
    {
      title: 'Mis Reportes', children: [
        { title: '', url: '/reporte', icon:'' }
      ], icon: '../../../../assets/analysis.png'
    }
  ];

  constructor(
    private navCtrl: NavController,
    private infoMenu: InfoMenu,
    private _speech: Speech,
    private _infoSubMenu: InfoSubMenu
  ) { }

  ngOnInit() {
    this._speech.getPermission();
  }

  redirectTo(card: IInfoCardMenu) {
    this.infoMenu.title = card.title;
    const listSubCard = new Array<InfoSubMenu>();
    card.children.forEach(data => {
      const obj = new InfoSubMenu();
      obj.title = data.title;
      obj.url = data.url;
      obj.icon = data.icon;
      listSubCard.push(obj);
    });
    this.infoMenu.children = listSubCard;
    this._infoSubMenu.title = card.title;
    this._infoSubMenu.icon = card.icon;
    this.navCtrl.navigateForward([listSubCard.length > 1 ? 'menu-secundario' : listSubCard[0].url]);
  }

}
