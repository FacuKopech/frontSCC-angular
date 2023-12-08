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

  public ObtenerAulaHijo(idHijo: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAulaDeHijo/${idHijo}`);
  }

  public ObtenerAulasDeHijos(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAulasDeHijos`);
  }

  public ObtenerAulasDestinadasNota(idNota: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAulasDestinadasNota/${idNota}`);
  }

  public ObtenerAulasDocente(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAulasDocente`);
  }

  public ObtenerAulasInstitucion(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAulasInstitucion`);
  }

  public ObtenerPorcentajesAsistenciaAulas(idInstitucion: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerPorcentajesAsistenciaAulas/${idInstitucion}`);
  }

  public ObtenerAlumnosAula(idAula: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAlumnosAula/${idAula}`);
  }

  public ObtenerAlumnosSinAula(idInstitucion: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAlumnosSinAula/${idInstitucion}`);
  }

  public ObtenerDocentesSinAulaAsignada(idInstitucion: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerDocentesSinAulaAsignada/${idInstitucion}`);
  }
  public ObtenerDocentesDeInstitucion(idInstitucion: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerDocentesDeInstitucion/${idInstitucion}`);
  }

  public ObtenerAsistenciasAula(idAula: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAsistenciasAula/${idAula}`);
  }

  public ObtenerAsistenciaAlumnos(idAula: number, idAsistencia: number, esPresentes: boolean): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAsistenciaAlumnos/${idAula}/${idAsistencia}/${esPresentes}`);
  }

  public CargarNuevaAsistencia(idAula: number, alumnos: any[]): Observable<boolean> {
    return this.http.post<boolean>(this.hostUrl + `/Aulas/CargarNuevaAsistencia/${idAula}`, alumnos);
  }

  public AgregarAula(aula:{nombreAula: string, gradoAula:string, divisionAula: string, institucionId: number, alumnosSeleccionados: any[], docenteId: number} ): Observable<boolean> {
    console.log(aula.alumnosSeleccionados);
    return this.http.post<boolean>(this.hostUrl + `/Aulas/AgregarAula/`, aula);
  }

  public EditarAula(idAula: number, aula:{nombreAula: string, gradoAula:string, divisionAula: string, institucionId: number, alumnosSeleccionados: any[], docenteId: number} ): Observable<boolean> {
    return this.http.put<boolean>(this.hostUrl + `/Aulas/EditarAula/${idAula}`, aula);
  }

  public EliminarAlumnoDeAula(idAlumno: number): Observable<boolean> {
    return this.http.put<boolean>(this.hostUrl + `/Aulas/EliminarAlumnoDeAula/${idAlumno}`, null);
  }

  public AgrgarAlumnoExistenteAAula(idAula: number, alumnos:{alumnosSeleccionados: any[]}) : Observable<boolean> {
    return this.http.put<boolean>(this.hostUrl + `/Aulas/AgrgarAlumnoExistenteAAula/${idAula}`, alumnos);
  }

  public AgrgarAlumnoNuevoAAula(idAula: number, alumno:{nombre: string, apellido:string, DNI: number, fechaNacimiento: Date} ): Observable<boolean> {
    return this.http.put<boolean>(this.hostUrl + `/Aulas/AgrgarAlumnoNuevoAAula/${idAula}`, alumno);
  }

  public EliminarAula(idAula: number): Observable<any> {
    return this.http.delete<any>(this.hostUrl + `/Aulas/EliminarAula/${idAula}`);
  }
}
