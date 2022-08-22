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
  },  {
    path: 'reporte',
    loadChildren: () => import('./reporte/reporte.module').then( m => m.ReportePageModule)
  },
  {
    path: 'ver-stock',
    loadChildren: () => import('./inventario/ver-stock/ver-stock.module').then( m => m.VerStockPageModule)
  },
  {
    path: 'ajustar-inventario',
    loadChildren: () => import('./inventario/ajustar-inventario/ajustar-inventario.module').then( m => m.AjustarInventarioPageModule)
  },
  {
    path: 'nueva-compra',
    loadChildren: () => import('./compra/nueva-compra/nueva-compra.module').then( m => m.NuevaCompraPageModule)
  },
  {
    path: 'compra-existente',
    loadChildren: () => import('./compra/compra-existente/compra-existente.module').then( m => m.CompraExistentePageModule)
  },
  {
    path: 'anular-compra',
    loadChildren: () => import('./compra/anular-compra/anular-compra.module').then( m => m.AnularCompraPageModule)
  },
  {
    path: 'nueva-venta',
    loadChildren: () => import('./venta/nueva-venta/nueva-venta.module').then( m => m.NuevaVentaPageModule)
  },
  {
    path: 'venta-existente',
    loadChildren: () => import('./venta/venta-existente/venta-existente.module').then( m => m.VentaExistentePageModule)
  },
  {
    path: 'anular-venta',
    loadChildren: () => import('./venta/anular-venta/anular-venta.module').then( m => m.AnularVentaPageModule)
  },
  {
    path: 'menu-principal',
    loadChildren: () => import('./menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
