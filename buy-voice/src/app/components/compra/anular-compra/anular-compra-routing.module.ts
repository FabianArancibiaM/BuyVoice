import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnularCompraPage } from './anular-compra.page';

const routes: Routes = [
  {
    path: '',
    component: AnularCompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnularCompraPageRoutingModule {}
