import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AsistenciaModel } from '../Models/asistencia.model';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {


  guardar: AsistenciaModel [] = [];

  constructor(private firestore: AngularFirestore) { }

  

  SaveRegister(text: string) {
   const newregister = new AsistenciaModel(text);
   this.guardar.unshift(newregister);
  }
 




 
  }

 

 

