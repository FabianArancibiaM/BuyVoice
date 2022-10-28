import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GraphicChartComponent } from './graphic.component';

@NgModule({
  exports: [GraphicChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  declarations: [GraphicChartComponent]
})
export class GraphicChartModule {}
