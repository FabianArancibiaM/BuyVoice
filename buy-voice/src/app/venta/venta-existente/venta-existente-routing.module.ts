import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentaExistentePage } from './venta-existente.page';

const routes: Routes = [
  {
    path: '',
    component: VentaExistentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentaExistentePageRoutingModule {}
