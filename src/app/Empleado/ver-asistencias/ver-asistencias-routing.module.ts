import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerAsistenciasPage } from './ver-asistencias.page';

const routes: Routes = [
  {
    path: '',
    component: VerAsistenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerAsistenciasPageRoutingModule {}
