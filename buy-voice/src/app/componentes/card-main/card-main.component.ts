import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-main',
  templateUrl: './card-main.component.html',
  styleUrls: ['./card-main.component.scss'],
})
export class CardMainComponent implements OnInit {

  @Input() defaultData: { title: string; desc: string };

  constructor() { }

  ngOnInit() { }

}
