import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private hostUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public ObtenerAulaHijo(idHijo: string): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAulaDeHijo/${idHijo}`);
  }

  public ObtenerAulasDeHijos(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAulasDeHijos`);
  }

  public ObtenerAulasDestinadasNota(idNota: string): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAulasDestinadasNota/${idNota}`);
  }

  public ObtenerAulasDocente(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAulasDocente`);
  }

  public ObtenerAulasInstitucion(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAulasInstitucion`);
  }

  public ObtenerPorcentajesAsistenciaAulas(idInstitucion: string): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerPorcentajesAsistenciaAulas/${idInstitucion}`);
  }

  public ObtenerAlumnosAula(idAula: string): Observable<any> {
    const body = {idAula}
    return this.http.post<any>(this.hostUrl + `/Aulas/ObtenerAlumnosAula/`, body);
  }

  public ObtenerAlumnosSinAula(idInstitucion: string): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAlumnosSinAula/${idInstitucion}`);
  }

  public ObtenerDocentesSinAulaAsignada(idInstitucion: string): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerDocentesSinAulaAsignada/${idInstitucion}`);
  }
  public ObtenerDocentesDeInstitucion(idInstitucion: string): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerDocentesDeInstitucion/${idInstitucion}`);
  }

  public ObtenerAsistenciasAula(idAula: string): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAsistenciasAula/${idAula}`);
  }

  public ObtenerAsistenciaAlumnos(idAula: string, idAsistencia: string, esPresentes: boolean): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAsistenciaAlumnos/${idAula}/${idAsistencia}/${esPresentes}`);
  }

  public CargarNuevaAsistencia(idAula: string, alumnos: any[]): Observable<boolean> {
    return this.http.post<boolean>(this.hostUrl + `/Aulas/CargarNuevaAsistencia/${idAula}`, alumnos);
  }

  public AgregarAula(aula:{nombreAula: string, gradoAula:string, divisionAula: string, institucionId: string, alumnosSeleccionados: any[], docenteId: string} ): Observable<boolean> {
    return this.http.post<boolean>(this.hostUrl + `/Aulas/AgregarAula/`, aula);
  }

  public EditarAula(idAula: string, aula:{nombreAula: string, gradoAula:string, divisionAula: string, institucionId: string, alumnosSeleccionados: any[], docenteId: string} ): Observable<boolean> {
    return this.http.put<boolean>(this.hostUrl + `/Aulas/EditarAula/${idAula}`, aula);
  }

  public EliminarAlumnoDeAula(idAlumno: string): Observable<boolean> {
    return this.http.put<boolean>(this.hostUrl + `/Aulas/EliminarAlumnoDeAula/${idAlumno}`, null);
  }

  public AgrgarAlumnoExistenteAAula(idAula: string, alumnos:{alumnosSeleccionados: any[]}) : Observable<boolean> {
    return this.http.put<boolean>(this.hostUrl + `/Aulas/AgrgarAlumnoExistenteAAula/${idAula}`, alumnos);
  }

  public AgrgarAlumnoNuevoAAula(idAula: string, alumno:{nombre: string, apellido:string, DNI: number, fechaNacimiento: Date} ): Observable<boolean> {
    return this.http.put<boolean>(this.hostUrl + `/Aulas/AgrgarAlumnoNuevoAAula/${idAula}`, alumno);
  }

  public EliminarAula(idAula: string): Observable<any> {
    return this.http.delete<any>(this.hostUrl + `/Aulas/EliminarAula/${idAula}`);
  }
}
