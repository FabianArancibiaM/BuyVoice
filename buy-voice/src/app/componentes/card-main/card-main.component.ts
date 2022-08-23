import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IInfoCardMenu } from '../interfaces/IMenu.interface';

@Component({
  selector: 'app-card-main',
  templateUrl: './card-main.component.html',
  styleUrls: ['./card-main.component.scss'],
})
export class CardMainComponent implements OnInit {

  @Input() defaultData: IInfoCardMenu;
  @Output() callBack = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  onClick(url: string){
    console.log(url)
    this.callBack.emit(url);
  }

}
