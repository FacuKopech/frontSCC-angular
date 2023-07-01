import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AusenciaService {

  private hostUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public ObtenerAusenciasHijo(idHijo: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Ausencias/ObtenerAusenciasDeAlumno/${idHijo}`);
  }

  public GetEsAusenciaGenerica(idAusencia: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Ausencias/GetEsAusenciaGenerica/${idAusencia}`);
  }

  public AgregarAusencia(idHijo: number, fechaComienzo: Date, fechaFin: Date, motivo: string): Observable<boolean> {
    const ausencia = {fechaComienzo: fechaComienzo, fechaFin: fechaFin, motivo: motivo};
    return this.http.post<boolean>(this.hostUrl + `/Ausencias/AgregarAusencia/${idHijo}`, ausencia);
  }

  public AgregarAusenciaGenerica(fechaComienzo: Date, fechaFin: Date, motivo: string): Observable<boolean> {
    const ausencia = {fechaComienzo: fechaComienzo, fechaFin: fechaFin, motivo: motivo};
    return this.http.post<boolean>(this.hostUrl + `/Ausencias/AgregarAusenciaGenerica`, ausencia);
  }

  public AgregarAusenciaFiles(files: FormData): Observable<boolean> {
    return this.http.post<boolean>(this.hostUrl + `/Ausencias/AgregarAusenciaFiles`, files);
  }

  public EditarAusencia(ausenciaIdModificar: number, idHijo: number, ausencia: { fechaComienzo: Date, fechaFin: Date, motivo: string }): Observable<any> {
    return this.http.put<any>(this.hostUrl + `/Ausencias/EditarAusencia/${ausenciaIdModificar}/${idHijo}`, ausencia);
  }

  public EliminarAusencia(idAusencia: number, idHijo: number): Observable<any> {
    return this.http.delete<any>(this.hostUrl + `/Ausencias/DeleteConfirmed/${idAusencia}/${idHijo}`);
  }

}

