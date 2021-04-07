import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-ver-asistencias',
  templateUrl: './ver-asistencias.page.html',
  styleUrls: ['./ver-asistencias.page.scss'],
})
export class VerAsistenciasPage implements OnInit {

  

  constructor(private menu: MenuController, private router: Router, private barcodeScanner: BarcodeScanner,
              private alert: ToastService) {} 

  ngOnInit() {
    
    this.menu.enable(true);
    
  }

  asistenciaDetalle(guarda)
  {
    //this.alert.error("¡Ocurrió un error al realizar la operación!");
    this.router.navigate(['/asistencia-detalle']); //Borrar siempre manda a esta parte aun la contraseña este bien
    console.log(guarda);
  }

  
  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);

      if( !barcodeData.cancelled){
        //this.asistenciaService.SaveRegister(barcodeData.text);
         
      }
     }).catch(err => {
         console.log('Error', err);
        //this.asistenciaService.SaveRegister("https://cuevana3.io/");
     });
  }
}
