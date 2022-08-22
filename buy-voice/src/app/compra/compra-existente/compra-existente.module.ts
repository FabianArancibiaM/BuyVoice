import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompraExistentePageRoutingModule } from './compra-existente-routing.module';

import { CompraExistentePage } from './compra-existente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompraExistentePageRoutingModule
  ],
  declarations: [CompraExistentePage]
})
export class CompraExistentePageModule {}
