import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private hostUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public ObtenerHistorialesHijo(idHijo: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Historiales/ObtenerHistorialesDeAlumno/${idHijo}`);
  }

  public FirmarHistorial(idHijo: number, idHistorial: number): Observable<any> {
    return this.http.put<any>(this.hostUrl + `/Historiales/FirmarHistorial/${idHijo}/${idHistorial}`, null);
  }

  public EliminarHistorial(idHistorial: number, idAlumno: number): Observable<any> {
    return this.http.delete<any>(this.hostUrl + `/Historiales/DeleteHistorial/${idHistorial}/${idAlumno}`);
  }

}
