import { ModalGenericoModule } from 'src/app/componentes/modal-generico/modal-generico.module';
import { DetalleCardCompraVentaModule } from './../../componentes/detalle-card-compra-venta/detalle-card-compra-venta.module';
import { CardCompraVentaModule } from './../../componentes/card-compra-venta/card-compra-venta.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompraExistentePageRoutingModule } from './compra-existente-routing.module';

import { CompraExistentePage } from './compra-existente.page';
import { TablaGenericaModule } from 'src/app/componentes/tabla-generica/card-main.module';
import { ModalEditProductsModule } from 'src/app/componentes/modal-edit-products/modal-edit-products.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompraExistentePageRoutingModule,
    TablaGenericaModule,
    CardCompraVentaModule,
    DetalleCardCompraVentaModule,
    ModalEditProductsModule,
    ModalGenericoModule
  ],
  declarations: [CompraExistentePage]
})
export class CompraExistentePageModule {}
