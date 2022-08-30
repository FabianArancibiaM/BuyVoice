import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnularVentaPageRoutingModule } from './anular-venta-routing.module';

import { AnularVentaPage } from './anular-venta.page';
import { TablaGenericaModule } from 'src/app/componentes/tabla-generica/card-main.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnularVentaPageRoutingModule,
    TablaGenericaModule
  ],
  declarations: [AnularVentaPage]
})
export class AnularVentaPageModule {}
