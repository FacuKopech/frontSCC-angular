import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {
  private hostUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public ObtenerInstitucionesSistema(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Instituciones/ObtenerInstitucionesSistema`);
  }

  public AgregarInstitucion(institucion: {nombre: string, direccion: string, telefono: string, ciudad: string} ): Observable<boolean> {    
    return this.http.post<boolean>(this.hostUrl + `/Instituciones/AgregarInstitucion/`, institucion);
  }

  public EditarInstitucion(idInstitucion: number, institucion: {nombre: string, direccion: string, telefono: string, ciudad: string }): Observable<any> {
    return this.http.put<any>(this.hostUrl + `/Instituciones/EditarInstitucion/${idInstitucion}`, institucion);
  }

  public EliminarInstitucion(idInstitucion: number): Observable<any> {
    return this.http.delete<any>(this.hostUrl + `/Instituciones/EliminarInstitucion/${idInstitucion}`);
  }
}
