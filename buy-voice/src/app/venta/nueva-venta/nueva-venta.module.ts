import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaVentaPageRoutingModule } from './nueva-venta-routing.module';

import { NuevaVentaPage } from './nueva-venta.page';
import { TablaGenericaModule } from 'src/app/componentes/tabla-generica/card-main.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaVentaPageRoutingModule,
    TablaGenericaModule
  ],
  declarations: [NuevaVentaPage]
})
export class NuevaVentaPageModule {}
