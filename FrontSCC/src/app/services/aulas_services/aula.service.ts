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
}
