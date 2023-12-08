import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  private hostUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public ObtenerLogInsAverage(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Reportes/ObtenerLogInsAverage`);
  }

  public ObtenerAuditoriasHistoriales(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Reportes/ObtenerAuditoriasHistoriales`);
  }

  public ObtenerAsistenciasPorAulaAverage(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Reportes/ObtenerAsistenciasPorAulaAverage`);
  }

  public ObtenerCondicionPorAulaAverage(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Reportes/ObtenerCondicionPorAulaAverage`);
  }

  public ObtenerNotasEnviadasYRecibidasAverage(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Reportes/ObtenerNotasEnviadasYRecibidasAverage`);
  }
}
