import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('./Administracion/empleados/empleados.module').then(m => m.EmpleadosPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'empleado/:id',
    loadChildren: () => import('./Administracion/empleado/empleado.module').then(m => m.EmpleadoPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./Empleado/asistencia/asistencia.module').then(m => m.AsistenciaPageModule), canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
