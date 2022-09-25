import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjustarInventarioPageRoutingModule } from './ajustar-inventario-routing.module';

import { AjustarInventarioPage } from './ajustar-inventario.page';
import { ModalGenericoModule } from 'src/app/ui/modal-generico/modal-generico.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjustarInventarioPageRoutingModule,
    ModalGenericoModule
  ],
  declarations: [AjustarInventarioPage]
})
export class AjustarInventarioPageModule {}
