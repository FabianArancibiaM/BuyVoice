import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuSecundarioPageRoutingModule } from './menu-secundario-routing.module';

import { MenuSecundarioPage } from './menu-secundario.page';
import { InfoMenu } from 'src/app/models/info-menu.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuSecundarioPageRoutingModule
  ],
  providers:[InfoMenu],
  declarations: [MenuSecundarioPage]
})
export class MenuSecundarioPageModule {}
