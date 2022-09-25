import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerStockPage } from './ver-stock.page';

const routes: Routes = [
  {
    path: '',
    component: VerStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerStockPageRoutingModule {}
