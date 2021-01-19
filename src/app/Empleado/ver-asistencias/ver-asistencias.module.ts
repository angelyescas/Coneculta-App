import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerAsistenciasPageRoutingModule } from './ver-asistencias-routing.module';

import { VerAsistenciasPage } from './ver-asistencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerAsistenciasPageRoutingModule
  ],
  declarations: [VerAsistenciasPage]
})
export class VerAsistenciasPageModule {}
