import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia-detalle',
  templateUrl: './asistencia-detalle.page.html',
  styleUrls: ['./asistencia-detalle.page.scss'],
})
export class AsistenciaDetallePage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    
  }

}
