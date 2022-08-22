import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnularCompraPageRoutingModule } from './anular-compra-routing.module';

import { AnularCompraPage } from './anular-compra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnularCompraPageRoutingModule
  ],
  declarations: [AnularCompraPage]
})
export class AnularCompraPageModule {}
