import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmpleadoModel } from '../Models/empleado.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  employee: BehaviorSubject<EmpleadoModel> = new BehaviorSubject<EmpleadoModel>(null);
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