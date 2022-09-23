import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ICompraVenta } from 'src/app/interfaces/ICardCompraVenta.interface';
import { CompraVentaModel } from 'src/app/models/compra-venta.model';
import { ProductoComunModel } from 'src/app/models/producto-comun.model';

@Component({
  selector: 'app-card-compra-venta',
  templateUrl: './card-compra-venta.component.html',
  styleUrls: ['./card-compra-venta.component.scss'],
})
export class CardCompraVentaComponent implements OnInit {

  @Input() data: ICompraVenta;
  @Output() eventClick= new EventEmitter<CompraVentaModel>();
  @Output() eventClickInfoProd= new EventEmitter<ICompraVenta>();

  constructor() { }

  ngOnInit() {}

  viewDetails(){
    this.eventClick.emit(this.data.allData);
  }

  viewModify(){
    this.eventClickInfoProd.emit(this.data);
  }

}
