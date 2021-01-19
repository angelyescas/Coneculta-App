import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-ver-asistencias',
  templateUrl: './ver-asistencias.page.html',
  styleUrls: ['./ver-asistencias.page.scss'],
})
export class VerAsistenciasPage implements OnInit {

  constructor(private menu: MenuController, private router: Router) {} 

  ngOnInit() {
    
  }

  asistenciaDetalle()
  {
    //this.alert.error("¡Ocurrió un error al realizar la operación!");
    this.router.navigate(['/asistencia-detalle']); //Borrar siempre manda a esta parte aun la contraseña este bien
  }
}
