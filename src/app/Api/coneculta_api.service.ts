import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsistenciaModel } from '../Models/asistencia.model';

@Injectable({
    providedIn: 'root'
  })

export class ConecultaApiService {
  
    url:string = 'http://localhost/ApiConeculta/';
  
    constructor(private http:HttpClient) {}
    
    public getHorarios(){
      return this.http.get<AsistenciaModel[]>(this.url)
    }
}