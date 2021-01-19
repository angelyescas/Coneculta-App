import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EmpleadosService } from './services/empleados.service';
import { EmpleadoModel } from './Models/empleado.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  currentUser: EmpleadoModel;
  public appPages = [
    {
      title: 'Ver-asistencias',
      url: '/ver-asistecias',
      svg: '../assets/icon/asistencia.svg',
      role: "administrador"
    },
    {
      title: 'Empleados',
      url: '/empleados',
      role: "usuario"
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private employeeService: EmpleadosService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('ver-asistecias/')[1];
    this.employeeService.employee.subscribe(res => {
      this.currentUser = this.employeeService.getLocal();
    });
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  exit() {
    this.employeeService.saveLocal();
    this.router.navigate(['/login']);
  }
}
