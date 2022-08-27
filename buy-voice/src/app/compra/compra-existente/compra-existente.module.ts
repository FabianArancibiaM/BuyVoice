import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompraExistentePageRoutingModule } from './compra-existente-routing.module';

import { CompraExistentePage } from './compra-existente.page';
import { TablaGenericaModule } from 'src/app/componentes/tabla-generica/card-main.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompraExistentePageRoutingModule,
    TablaGenericaModule
  ],
  declarations: [CompraExistentePage]
})
export class CompraExistentePageModule {}
