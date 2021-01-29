import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { HorarioModel } from '../Models/horario.model';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

    horario_empleado: BehaviorSubject<HorarioModel> = new BehaviorSubject<HorarioModel>(null);
    constructor(private firestore: AngularFirestore) { }


}
