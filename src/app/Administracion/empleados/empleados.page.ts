import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { EmpleadoModel } from 'src/app/Models/empleado.model';
import Swal from 'sweetalert2';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  empleados: EmpleadoModel[] = [];
  cargando = false;

  constructor(private empleadoService: EmpleadosService, private menu: MenuController) { }

  ngOnInit() {
    this.cargando = true;
    this.menu.enable(true);
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.empleadoService.getAll()
      .subscribe(resp => {
        this.empleados = resp;
        this.cargando = false;
      });
  }

  borrarEmpleado(empleado: EmpleadoModel, i: number) {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta seguro de elimar al empledo ${empleado.nombre}`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
    }).then(resp => {
      if (resp.value) {
        this.empleadoService.delete(empleado.id).then(() => {
          this.getAllEmployee();
        })
      }
    });
  }

}
