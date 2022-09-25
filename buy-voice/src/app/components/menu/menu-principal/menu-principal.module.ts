import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPrincipalPageRoutingModule } from './menu-principal-routing.module';

import { MenuPrincipalPage } from './menu-principal.page';
import { CardMainModule } from 'src/app/ui/card-main/card-main.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPrincipalPageRoutingModule,
    CardMainModule
  ],
  declarations: [MenuPrincipalPage],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MenuPrincipalPageModule {}
