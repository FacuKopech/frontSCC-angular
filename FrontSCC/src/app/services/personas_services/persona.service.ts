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

  public ObtenerPersonasSistema(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Personas/ObtenerPersonasSistema`);
  }

  public ObtenerAlumnosSinPadre(idPersona: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Personas/ObtenerAlumnosSinPadreAsignado/${idPersona}`);
  }

  public ObtenerHijosDePersona(idPersona: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Personas/ObtenerHijosDePersona/${idPersona}`);
  }

  public ObtenerPadresDeAlumno(idAlumno: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Personas/ObtenerPadresDeAlumno/${idAlumno}`);
  }
  public AgregarPersona(persona:{tipoPersona: string, nombre: string, apellido: string, dni: string, email: string, telefono: string, domicilio: string,
  usuario: any, institucion: any}): Observable<boolean> {
    return this.http.post<boolean>(this.hostUrl + `/Personas/AgregarPersona/`, persona);
  }

  public EditarAlumno(idAlumno: number, alumno: {nombre: string, apellido: string, dni: number, fechaNacimiento: Date}): Observable<any> {
    return this.http.put<any>(this.hostUrl + `/Personas/EditarAlumno/${idAlumno}/`, alumno);
  }

  public EditarPersona(idPersona: number, persona: {nombre: string, apellido: string, dni: number, email: string, telefono: string, domicilio: string, 
    usuarioSeleccionado: any, institucionSeleccionada: any, hijosSeleccionados: any[]}): Observable<any> {
    return this.http.put<any>(this.hostUrl + `/Personas/EditarPersona/${idPersona}/`, persona);
  }

  public EliminarAlumno(idAlumno: number): Observable<boolean> {
    return this.http.delete<boolean>(this.hostUrl + `/Personas/EliminarAlumno/${idAlumno}`);
  }

  public EliminarPersona(idPersona: number): Observable<boolean> {
    return this.http.delete<boolean>(this.hostUrl + `/Personas/EliminarPersona/${idPersona}`);
  }
}
