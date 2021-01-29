import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmpleadoModel } from '../Models/empleado.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { HorarioModel } from '../Models/horario.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  employee: BehaviorSubject<EmpleadoModel> = new BehaviorSubject<EmpleadoModel>(null);
  data: any[];
  constructor(private firestore: AngularFirestore) { }

  create(empleado: EmpleadoModel) {
    return this.firestore.collection("empleados").add({
      ...empleado
    });
  }

  update(empleado: EmpleadoModel) {
    return this.firestore.collection("empleados").doc(empleado.id).update({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      phone: empleado.phone,
      rol: empleado.rol,
      password: empleado.password
    });
  }

  delete(id: string) {
    return this.firestore.collection("empleados").doc(id).delete();
  }


  getAll() {
    return this.firestore.collection("empleados").snapshotChanges().pipe(map(res => {
      return res.map(empleados => {
        let emp = empleados.payload.doc.data() as EmpleadoModel;
        emp.id = empleados.payload.doc.id;
        return emp;
      })
    }));
  }

  getById(id: string) {
    return this.firestore.collection("empleados").doc(id).snapshotChanges().pipe(map(empleados => {
      let emp = empleados.payload.data() as EmpleadoModel;
      emp.id = empleados.payload.id;
      return emp;
    }));
  }

  getById_horario(id: string) {
    return this.firestore.collection("empleados").doc(id).snapshotChanges().pipe(map(empleados => {
      let emp = empleados.payload.data() as EmpleadoModel;
      emp.id = empleados.payload.id;

      //emp.horarios = this.firestore.collection("empleados").doc(id).collection("Horarios").get();
      
      emp.horarios = this.firestore.collection("empleados/"+id+"/Horarios").snapshotChanges().pipe(map(res => {
        return res.map(horario => {
            
            let hor = horario.payload.doc.data() as HorarioModel;
            hor.id = horario.payload.doc.id;
            return hor;
        })
        
      }))

      /*emp.listahorario = this.firestore.collection('empleados').doc(id)
      .collection('horarios').snapshotChanges().pipe(map(res => {
          return res;
      }))*/

      return emp;

    }));
  }

  getHorarioEmpleado(fecha: string, id: string){
    return this.firestore.collection("empleados/"+id+"/Horarios", ref => ref.where('fecha', '==', fecha)).get().pipe(map(res => {
      return res.docs.map(item =>{
        let horario = item.data() as HorarioModel;
        horario.id = item.id;
        return horario;
      })
    }))
  }

  getUserByPhoneAndPassword(phone: string, password: string) {
    return this.firestore.collection("empleados", ref => ref.where('phone', '==', phone).where('password', '==', password)).get().pipe(map(res => {
      return res.docs.map(item => {
        let emp = item.data() as EmpleadoModel;
        emp.id = item.id;
        return emp;
      })
    }));
  }

  getLocal(): EmpleadoModel {
    const storage = localStorage.getItem('currentUser');
    if (storage) {
      return JSON.parse(storage);
    }
  }

  saveLocal(user?: EmpleadoModel) {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.employee.next(user);
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  get isLogged(): boolean {
    return this.getLocal() != null;;
  }

}