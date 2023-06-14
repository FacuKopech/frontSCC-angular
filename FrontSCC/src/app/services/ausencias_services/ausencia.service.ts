import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AusenciaService {

  private hostUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public ObtenerNotasEmitidas(idHijo: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Ausencias/ObtenerAusenciasDeAlumno/${idHijo}`);
  }
}
