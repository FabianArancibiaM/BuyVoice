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

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  public listCard: IInfoCardMenu[] = [
    {
      title: 'Mis Compras', children: [
        { title: 'Nueva Compra', url: '/nueva-compra' },
        { title: 'Compras Realizadas', url: '/compra-existente' },
        { title: 'Anular Compra', url: '/anular-compra' }
      ]
    },
    {
      title: 'Ventas', children: [
        { title: 'Nueva Venta', url: '/nueva-venta' },
        { title: 'Venta Existente', url: '/venta-existente' },
        { title: 'Anular Venta', url: '/anular-venta' },
      ]
    },
    {
      title: 'Inventario', children: [
        { title: 'Ver Stock', url: '/ver-stock' },
        { title: 'Ajustar Inventario', url: '/ajustar-inventario' },
      ]
    },
    {
      title: 'Reporte', children: [
        { title: '', url: '/reporte' }
      ]
    }
  ];

  constructor(
    private navCtrl: NavController, private infoMenu: InfoMenu, private _comercio: ComercioService, private _infoNegocio: NegocioModel
  ) { }

  ngOnInit() {
    this._comercio.getInfoNegocio('fabian', 'Admin').subscribe(data =>
      this._comercio.getInventario().subscribe(dta => console.log('getInventario')));
  }

  redirectTo(card: IInfoCardMenu) {
    this.infoMenu.title = card.title;
    const listSubCard = new Array<InfoSubMenu>();
    card.children.forEach(data => {
      const obj = new InfoSubMenu();
      obj.title = data.title;
      obj.url = data.url;
      listSubCard.push(obj);
    });
    this.infoMenu.children = listSubCard;
    this.navCtrl.navigateForward([listSubCard.length > 1 ? 'menu-secundario' : listSubCard[0].url]);
  }

}
