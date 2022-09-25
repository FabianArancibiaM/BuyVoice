import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuSecundarioPage } from './menu-secundario.page';

const routes: Routes = [
  {
    path: '',
    component: MenuSecundarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuSecundarioPageRoutingModule {}
