import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoMenu } from 'src/app/models/info-menu.model';

@Component({
  selector: 'app-menu-secundario',
  templateUrl: './menu-secundario.page.html',
  styleUrls: ['./menu-secundario.page.scss'],
})
export class MenuSecundarioPage implements OnInit {

  constructor(private route: ActivatedRoute, private infoMenu: InfoMenu) { }

  ngOnInit() {
    console.log(this.infoMenu.title);
    console.log(this.route.snapshot.params.children[0]);
  }

}
