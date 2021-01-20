import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  @ViewChild('hrHand', {static: false}) hrHand:ElementRef;
  @ViewChild('minHand', {static: false}) minHand:ElementRef;
  @ViewChild('secHand', {static: false}) secHand:ElementRef;
  
  fecha: string = "";
  hora: string = "";
  dia: string = "";

  day: string = "";
  month: string = "";

  hour: string = "";
  minute: string = "";
  second: string = "";

  constructor(private router: Router) {} 

  ngOnInit() {

    setInterval(()=>{
      const date = new Date();
      this.updateClock(date);
      this.getFecha(date);
      this.getHora(date);
      this.getDia(date);
      },1000);
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

      this.fecha = this.day+"/"+this.month+"/"+date.getFullYear();
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
