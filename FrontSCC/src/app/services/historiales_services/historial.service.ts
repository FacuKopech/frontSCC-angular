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

  public AgregarHistorial(idAlumno: number, descripcion: string, calificacion: number, estado: number ): Observable<boolean> {
    const historial = {descripcion: descripcion, calificacion: calificacion, estado: estado};
    return this.http.post<boolean>(this.hostUrl + `/Historiales/AgregarHistorial/${idAlumno}`, historial);
  }

  public ObtenerHistorialesHijo(idHijo: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Historiales/ObtenerHistorialesDeAlumno/${idHijo}`);
  }

  public FirmarHistorial(idHijo: number, idHistorial: number): Observable<any> {
    return this.http.put<any>(this.hostUrl + `/Historiales/FirmarHistorial/${idHijo}/${idHistorial}`, null);
  }

  public EditarHistorial(idAlumno: number, historial: {idHistorial: number, descripcion: string, calificacion: number, estado: number }): Observable<any> {
    return this.http.put<any>(this.hostUrl + `/Historiales/EditHistorialAlumno/${idAlumno}/${historial.idHistorial}`, historial);
  }

  public EliminarHistorial(idHistorial: number, idAlumno: number): Observable<any> {
    return this.http.delete<any>(this.hostUrl + `/Historiales/DeleteHistorial/${idHistorial}/${idAlumno}`);
  }

}
