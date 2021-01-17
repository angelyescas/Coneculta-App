import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmpleadoModel } from '../../Models/empleado.model';
import { EmpleadosService } from '../../services/empleados.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.page.html',
  styleUrls: ['./empleado.page.scss'],
})
export class EmpleadoPage implements OnInit {

  employeeForm: FormGroup;
  id: string;
  constructor(private empleadosService: EmpleadosService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: ToastService
  ) { }

  ngOnInit() {
    this.initForm();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== 'nuevo') {
      this.empleadosService.getById(this.id)
        .subscribe((resp: EmpleadoModel) => {
          this.initForm(resp);
        });
    }
  }

  initForm(employee?: EmpleadoModel) {
    this.employeeForm = new FormGroup({
      id: new FormControl(employee ? employee.id : ''),
      nombre: new FormControl(employee ? employee.nombre : '', Validators.required),
      apellido: new FormControl(employee ? employee.apellido : '', Validators.required),
      phone: new FormControl(employee ? employee.phone : '', [Validators.required, Validators.maxLength(10)]),
      rol: new FormControl(employee ? employee.rol : '', Validators.required),
      password: new FormControl(employee ? employee.password : '', Validators.required),
    });
  }

  save() {
    if (this.id == "nuevo") {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    this.empleadosService.create(this.employeeForm.value).then(() => {
      this.alert.success("¡Se ha creado correctamente al usuario!");
      this.router.navigate(['/empleados']);
    }).catch(() => {
      this.alert.error("¡Ocurrió un error al realizar la operación!");
    });
  }

  update() {
    this.empleadosService.update(this.employeeForm.value).then(() => {
      this.alert.success("¡Se ha actualizado correctamente al usuario!");
      this.router.navigate(['/empleados']);
    }).catch(() => {
      this.alert.error("¡Ocurrió un error al realizar la operación!");
    });
  }

}
