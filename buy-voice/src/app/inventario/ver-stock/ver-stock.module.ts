import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerStockPageRoutingModule } from './ver-stock-routing.module';

import { VerStockPage } from './ver-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerStockPageRoutingModule
  ],
  declarations: [VerStockPage]
})
export class VerStockPageModule {}
