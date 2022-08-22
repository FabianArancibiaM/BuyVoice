import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentaExistentePageRoutingModule } from './venta-existente-routing.module';

import { VentaExistentePage } from './venta-existente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentaExistentePageRoutingModule
  ],
  declarations: [VentaExistentePage]
})
export class VentaExistentePageModule {}
