import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-main',
  templateUrl: './card-main.component.html',
  styleUrls: ['./card-main.component.scss'],
})
export class CardMainComponent implements OnInit {

  @Input() defaultData: { title: string; desc: string; url: string };
  @Output() callBack = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  onClick(){
    this.callBack.emit(this.defaultData.url);
  }

}
