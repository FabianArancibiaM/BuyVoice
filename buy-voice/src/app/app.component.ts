/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NegocioModel } from './models/negocio.model';
import { ComercioService } from './service/comercio.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private _negocio: NegocioModel, private _router: Router) {}

  ngOnInit(): void {
    if( this._negocio.nombre === undefined){
      this._router.navigate(['login']);
    }
  }

}
