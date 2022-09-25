import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'reporte',
    loadChildren: () => import('./components/reporte/reporte.module').then( m => m.ReportePageModule)
  },
  {
    path: 'ver-stock',
    loadChildren: () => import('./components/inventario/ver-stock/ver-stock.module').then( m => m.VerStockPageModule)
  },
  {
    path: 'ajustar-inventario',
    loadChildren: () =>
      import('./components/inventario/ajustar-inventario/ajustar-inventario.module').then( m => m.AjustarInventarioPageModule)
  },
  {
    path: 'nueva-compra',
    loadChildren: () => import('./components/compra/nueva-compra/nueva-compra.module').then( m => m.NuevaCompraPageModule)
  },
  {
    path: 'compra-existente',
    loadChildren: () => import('./components/compra/compra-existente/compra-existente.module').then( m => m.CompraExistentePageModule)
  },
  {
    path: 'anular-compra',
    loadChildren: () => import('./components/compra/anular-compra/anular-compra.module').then( m => m.AnularCompraPageModule)
  },
  {
    path: 'nueva-venta',
    loadChildren: () => import('./components/venta/nueva-venta/nueva-venta.module').then( m => m.NuevaVentaPageModule)
  },
  {
    path: 'venta-existente',
    loadChildren: () => import('./components/venta/venta-existente/venta-existente.module').then( m => m.VentaExistentePageModule)
  },
  {
    path: 'anular-venta',
    loadChildren: () => import('./components/venta/anular-venta/anular-venta.module').then( m => m.AnularVentaPageModule)
  },
  {
    path: 'menu-principal',
    loadChildren: () => import('./components/menu/menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule)
  },
  {
    path: 'menu-secundario',
    loadChildren: () => import('./components/menu/menu-secundario/menu-secundario.module').then( m => m.MenuSecundarioPageModule)
  },
  {
    path: '**',
    redirectTo: 'menu-principal',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
