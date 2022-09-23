import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { CardCompraVentaComponent } from './card-compra-venta.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [CardCompraVentaComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CardCompraVentaComponent]
})
export class CardCompraVentaModule { }
