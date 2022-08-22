import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  public listCard = [
    { title: "1", desc: "2" },
    { title: "3", desc: "4" }
  ];

  constructor() { }


  ngOnInit() {
  }

}
