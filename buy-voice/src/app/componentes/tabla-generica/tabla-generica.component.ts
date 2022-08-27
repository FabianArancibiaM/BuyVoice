/* eslint-disable no-underscore-dangle */
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductoModel } from 'src/app/models/producto.model';
import { CompraService } from 'src/app/service/compra.service';

@Component({
  selector: 'app-tabla-generica',
  templateUrl: './tabla-generica.component.html',
  styleUrls: ['./tabla-generica.component.scss'],
})
export class TablaGenericaComponent implements OnInit, OnDestroy {

  @Input() titleTable: string[];
  @Input() dataTable: any[] = [];
  @Output() eventClick = new EventEmitter<string>();

  constructor() { }

  ngOnDestroy(): void {
  }

  ngOnInit() {
  }

  eventoBoton(evento: string){
    this.eventClick.emit(evento);
  }
}
