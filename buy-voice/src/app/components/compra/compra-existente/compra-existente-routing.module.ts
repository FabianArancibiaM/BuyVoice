import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompraExistentePage } from './compra-existente.page';

const routes: Routes = [
  {
    path: '',
    component: CompraExistentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompraExistentePageRoutingModule {}
