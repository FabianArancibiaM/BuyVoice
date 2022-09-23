import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { DetalleCardCompraVentaComponent } from './detalle-card-compra-venta.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [DetalleCardCompraVentaComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  declarations: [DetalleCardCompraVentaComponent]
})
export class DetalleCardCompraVentaModule { }
