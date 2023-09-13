import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private hostUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public ObtenerMisHijos(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Personas/ObtenerMisHijos`);
  }

  public ObtenerPadresDeAlumno(idAlumno: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Personas/ObtenerPadresDeAlumno/${idAlumno}`);
  }
}
