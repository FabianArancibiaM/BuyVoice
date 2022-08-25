import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { InfoMenu } from 'src/app/models/info-menu.model';
import { InfoSubMenu } from 'src/app/models/info-sub-menu.model';

@Component({
  selector: 'app-menu-secundario',
  templateUrl: './menu-secundario.page.html',
  styleUrls: ['./menu-secundario.page.scss'],
})
export class MenuSecundarioPage implements OnInit {

  public dataChildren: Array<InfoSubMenu> = new Array<InfoSubMenu>;
  public title: string;

  constructor(private infoMenu: InfoMenu, private navCtrl: NavController) { }

  ngOnInit() {
    this.dataChildren = this.infoMenu.children;
    this.title = this.infoMenu.title;
  }

  redirectTo(card: InfoSubMenu ){
    this.navCtrl.navigateForward([card.url]);
  }

}
