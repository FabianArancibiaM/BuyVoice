import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { TablaGenericaModule } from 'src/app/ui/tabla-generica/card-main.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    TablaGenericaModule
  ],
  declarations: [LoginPage]
})
export class AnularCompraPageModule {}
