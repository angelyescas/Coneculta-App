import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('./Administracion/empleados/empleados.module').then( m => m.EmpleadosPageModule)
  },
  {
    path: 'empleado/:id',
    loadChildren: () => import('./Administracion/empleado/empleado.module').then( m => m.EmpleadoPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./Empleado/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
