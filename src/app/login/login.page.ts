import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { EmpleadoModel } from '../Models/empleado.model';
import { EmpleadosService } from '../services/empleados.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  phone: FormControl;
  password: FormControl;
  constructor(private menu: MenuController, private employeeService: EmpleadosService, private alert: ToastService, private router: Router) { }

  ngOnInit() {
    this.phone = new FormControl('', [Validators.required, Validators.minLength(10), Validators.min(10)]);
    this.password = new FormControl('', Validators.required);
    this.menu.enable(false);
  }

  login() {
    this.employeeService.getUserByPhoneAndPassword(this.phone.value, this.password.value).subscribe((empleados: EmpleadoModel[]) => {
      if (empleados.length > 0) {
        let empleado: EmpleadoModel = empleados[0];
        this.alert.success("¡Inicio sesión exitosamente!");
        this.employeeService.saveLocal(empleado);
        if (empleado.rol == "administrador")
          this.router.navigate(['/empleados']);
        else
          this.router.navigate(['/asistencia']);
      } else {
        this.alert.warning("¡Telefono o contraseña no valido!");
      }
    }, error => {
      this.alert.error("¡Ocurrió un error al realizar la operación!");
    });
  }

}