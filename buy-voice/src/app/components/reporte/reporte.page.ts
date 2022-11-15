import { Component, OnInit } from '@angular/core';
import { InfoSubMenu } from 'src/app/models/info-sub-menu.model';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {

  constructor(
    public infoSubMenu: InfoSubMenu) { }

  ngOnInit() {
  }

}
