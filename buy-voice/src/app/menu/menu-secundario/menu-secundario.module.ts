import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuSecundarioPageRoutingModule } from './menu-secundario-routing.module';
import { MenuSecundarioPage } from './menu-secundario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuSecundarioPageRoutingModule
  ],
  declarations: [MenuSecundarioPage],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuSecundarioPageModule {}
