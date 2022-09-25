import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnularVentaPage } from './anular-venta.page';

const routes: Routes = [
  {
    path: '',
    component: AnularVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnularVentaPageRoutingModule {}
