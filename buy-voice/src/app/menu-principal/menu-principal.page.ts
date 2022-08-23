import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  public listCard = [
    { title: "1", desc: "2", url: '/reporte'},
    { title: "3", desc: "4", url: '/ver-stock' },
    { title: "5", desc: "6", url: '/ajustar-inventario'}
  ];

  constructor(private router: Router) { }


  ngOnInit() {
  }

  redirectTo(url:string ){
    this.router.navigateByUrl(url);
  }

}
