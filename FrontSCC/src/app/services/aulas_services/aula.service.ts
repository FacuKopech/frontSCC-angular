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

  public ObtenerAulasDocente(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAulasDocente`);
  }

  public ObtenerAlumnosAula(idAula: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAlumnosAula/${idAula}`);
  }

  public ObtenerAsistenciasAula(idAula: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAsistenciasAula/${idAula}`);
  }

  public ObtenerAsistenciaAlumnos(idAula: number, idAsistencia: number, esPresentes: boolean): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Aulas/ObtenerAsistenciaAlumnos/${idAula}/${idAsistencia}/${esPresentes}`);
  }
}
