import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonNav, NavController } from '@ionic/angular';
import { IInfoCardMenu } from '../../interfaces/IMenu.interface';

@Component({
  selector: 'app-card-main',
  templateUrl: './card-main.component.html',
  styleUrls: ['./card-main.component.scss'],
})
export class CardMainComponent implements OnInit {

  @Input() defaultData: IInfoCardMenu;
  @Output() callBack = new EventEmitter<string>();

  constructor(
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  onClick(url){
    this.navCtrl.navigateForward([url]);
  }

}
