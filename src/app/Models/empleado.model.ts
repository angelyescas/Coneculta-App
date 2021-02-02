

import { HorarioModel } from '../Models/horario.model';

export class EmpleadoModel {
    id: string;
    nombre: string;
    apellido: string;
    phone: string;
    rol: string;
    password: string;
    horarios: any = [{
        data: {} as HorarioModel
    }];
    

}