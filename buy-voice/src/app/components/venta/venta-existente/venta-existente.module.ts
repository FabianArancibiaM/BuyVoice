import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentaExistentePageRoutingModule } from './venta-existente-routing.module';

import { VentaExistentePage } from './venta-existente.page';
import { TablaGenericaModule } from 'src/app/ui/tabla-generica/card-main.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentaExistentePageRoutingModule,
    TablaGenericaModule
  ],
  declarations: [VentaExistentePage]
})
export class VentaExistentePageModule {}
