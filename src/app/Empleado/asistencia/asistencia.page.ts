import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Console } from 'console';
import { EmpleadoModel } from 'src/app/Models/empleado.model';
import { HorarioModel } from 'src/app/Models/horario.model';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { HorariosService } from 'src/app/services/horarios.service';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  @ViewChild('hrHand', {static: false}) hrHand:ElementRef;
  @ViewChild('minHand', {static: false}) minHand:ElementRef;
  @ViewChild('secHand', {static: false}) secHand:ElementRef;
  currentUser: EmpleadoModel;
  horario_lista: HorarioModel;
  horarios: any = [{ data: {} as HorarioModel}];

  fecha: string = "";
  hora: string = "";
  dia: string = "";
  
  //#region Reloj Analogico
  day: string = "";
  month: string = "";
  hour: string = "";
  minute: string = "";
  second: string = "";
  //#endregion

  //#region Mostrar hora entrada/salida
  Aux: Date;
  hora_entrada: string;
  hora_salida: string;
  id: string;
  //#endregion
  
  

  constructor(private router: Router, private route: ActivatedRoute,private empleadosService: EmpleadosService, private alert: ToastService) {} 

  ngOnInit() {

    

    setInterval(()=>{
      const date = new Date();
      this.updateClock(date);
      this.fecha = this.getFecha(date);
      this.getHora(date);
      this.getDia(date);
      },1000);
      
      this.getEmpleadoHorario();
  }

  getOnlyEmployes(){
    this.currentUser = this.empleadosService.getLocal();
    this.empleadosService.getById_horario(this.currentUser.id)
        .subscribe((resp: EmpleadoModel) => {
          this.getAllHorario(resp.horarios)
        });
  }

  getAllHorario(horaios: any) {
    horaios.subscribe( datos =>{
      this.Aux = new Date ();
      this.horarios.hora_salida = this.getDia(this.Aux);
      this.horarios = datos;

      console.log("horarios", this.horarios);
      
      this.horarios.forEach(hora => {
        let newDate= new Date(hora.fecha) 
        this.Aux.setHours(0,0,0,0);
        if(newDate.getMonth() == this.Aux.getMonth() && newDate.getFullYear() == this.Aux.getFullYear() && newDate.getDate() == this.Aux.getDate() ){
            this.hora_entrada = hora.hora_entrada
            this.hora_salida = hora.hora_salida
        }
      });
      
    })
  }

  getEmpleadoHorario(){
    this.currentUser = this.empleadosService.getLocal();
    this.empleadosService.getHorarioEmpleado(this.getFecha(new Date), this.currentUser.id).subscribe((horarios: HorarioModel[]) => {
      if (horarios.length > 0) {
        let horario: HorarioModel = horarios[0];
        this.hora_entrada = horario.hora_entrada;
        this.hora_salida = horario.hora_salida;
        this.alert.warning("¡Horario Encontrado!");
      } 
      else {
        this.alert.warning("¡No ha registrado ninguna asistencia el dia de hoy!");
        this.hora_entrada = "------";
        this.hora_salida = "------";
      }
    }, error => {
      this.alert.error("¡Ocurrió un error al realizar la operación!");
    });
  }


  updateClock(date){
    this.secHand.nativeElement.style.transform = 'rotate(' +
          date.getSeconds() * 6 + 'deg)';
    this.minHand.nativeElement.style.transform = 'rotate(' +
          date.getMinutes() * 6 + 'deg)';
    this.hrHand.nativeElement.style.transform = 'rotate(' +
          (date.getHours() * 30 + date.getMinutes() * 0.5) + 'deg)';
  }

  getFecha(date){
    this.day = date.getDate();
    this.month = date.getMonth();

    if(date.getDate()<10)
      this.day = "0" + date.getDate();
    if((date.getMonth()+1)<10)
      this.month = "0"+ (date.getMonth()+1);

      let fecha = this.month+"/"+23+"/"+date.getFullYear();

      return fecha;
  }
  
  getHora(date){
    
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.second = date.getSeconds();

    if(date.getHours()<10)
      this.hour = "0" + date.getHours();
    if(date.getMinutes()<10)
      this.minute = "0"+ date.getMinutes();
    if(date.getSeconds()<10)
      this.second = "0"+ date.getSeconds();

      this.hora = this.hour + ":" + this.minute +":"+ this.second;
  }

  getDia(date){
    switch(date.getUTCDay()){
      case 0: this.dia= "Domingo";
      break;
      case 1: this.dia= "Lunes";
      break;
      case 2: this.dia= "Martes";
      break;
      case 3: this.dia= "Miercoles";
      break;
      case 4: this.dia= "Jueves";
      break;
      case 5: this.dia= "Viernes";
      break;
      case 6: this.dia= "Sabado";
      break;
    }
  }

  inicio()
  {
    this.router.navigate(['/ver-asistencias']); //Borrar siempre manda a esta parte aun la contraseña este bien
  }
  

}
