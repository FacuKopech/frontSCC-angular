import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private hostUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public ObtenerMisHijos(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Personas/ObtenerMisHijos`);
  }

  public ObtenerPadresDeAlumno(idAlumno: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Personas/ObtenerPadresDeAlumno/${idAlumno}`);
  }

  public EditarAlumno(idAlumno: number, alumno: {nombre: string, apellido: string, dni: number, fechaNacimiento: Date}): Observable<any> {
    return this.http.put<any>(this.hostUrl + `/Personas/EditarAlumno/${idAlumno}/`, alumno);
  }

  public EliminarAlumno(idAlumno: number): Observable<boolean> {
    return this.http.delete<boolean>(this.hostUrl + `/Personas/EliminarAlumno/${idAlumno}`);
  }
}
