import { TablaGenericaModule } from './../../componentes/tabla-generica/card-main.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaCompraPageRoutingModule } from './nueva-compra-routing.module';

import { NuevaCompraPage } from './nueva-compra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaCompraPageRoutingModule,
    TablaGenericaModule
  ],
  declarations: [NuevaCompraPage]
})
export class NuevaCompraPageModule {}
