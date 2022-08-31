import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerStockPageRoutingModule } from './ver-stock-routing.module';

import { VerStockPage } from './ver-stock.page';
import { TablaGenericaModule } from 'src/app/componentes/tabla-generica/card-main.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerStockPageRoutingModule,
    TablaGenericaModule
  ],
  declarations: [VerStockPage]
})
export class VerStockPageModule {}
