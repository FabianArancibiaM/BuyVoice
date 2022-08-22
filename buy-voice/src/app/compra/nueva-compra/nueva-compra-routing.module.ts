import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaCompraPage } from './nueva-compra.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaCompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaCompraPageRoutingModule {}
