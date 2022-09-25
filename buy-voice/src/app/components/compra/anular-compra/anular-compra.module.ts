import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnularCompraPageRoutingModule } from './anular-compra-routing.module';

import { AnularCompraPage } from './anular-compra.page';
import { TablaGenericaModule } from 'src/app/ui/tabla-generica/card-main.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnularCompraPageRoutingModule,
    TablaGenericaModule
  ],
  declarations: [AnularCompraPage]
})
export class AnularCompraPageModule {}
