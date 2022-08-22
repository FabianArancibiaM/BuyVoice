import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjustarInventarioPage } from './ajustar-inventario.page';

const routes: Routes = [
  {
    path: '',
    component: AjustarInventarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjustarInventarioPageRoutingModule {}
