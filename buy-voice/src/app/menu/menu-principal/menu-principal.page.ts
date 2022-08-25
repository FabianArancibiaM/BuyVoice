import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { InfoMenu } from 'src/app/models/info-menu.model';
import { IInfoCardMenu } from '../../interfaces/IMenu.interface';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  public listCard: IInfoCardMenu[] = [
    { title: 'Compra', children: [
      {title: 'Nueva Compra', url: '/nueva-compra'},
      {title: 'Compra Existente', url: '/compra-existente'},
      {title: 'Anular Compra', url: '/anular-compra'}
    ] },
    { title: 'Ventas', children: [
      {title: 'Nueva Venta', url: '/nueva-venta'},
      {title: 'Venta Existente', url: '/venta-existente'},
      {title: 'Anular Venta', url: '/anular-venta'},
    ] },
    { title: 'Inventario', children: [
      {title: 'Ver Stock', url: '/ver-stock'},
      {title: 'Ajustar Inventario', url: '/ajustar-inventario'},
    ]},
    { title: 'Reporte', children: [
      {title: '', url: '/reporte'}
    ] }
  ];

  constructor(private navCtrl: NavController, private infoMenu: InfoMenu) { }


  ngOnInit() {}

  redirectTo(card: IInfoCardMenu ){
    this.infoMenu.title = card.title;
    this.infoMenu.children = card.children;
    this.navCtrl.navigateForward(['menu-secundario', card]);
  }

}
