import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private hostUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public Login(username: string, clave: string): Observable<boolean> {
    return this.http.get<boolean>(this.hostUrl + `/Usuarios/LogIn/${username}/${clave}`);
  }

  public isLoggedIn(): Observable<any> {
    return this.http.get<any>(this.hostUrl + "/Usuarios/LoggedIn");
  }

  public getEmailPersonaLogueada(): Observable<string> {
    let HTTPOptions:Object = {
      responseType: 'text'
   }
    return this.http.get<string>(this.hostUrl + "/Usuarios/GetEmailPersonaLogueada", HTTPOptions);
  }

  public Logout(): Observable<boolean> {
    return this.http.get<boolean>(this.hostUrl + "/Usuarios/LogOff")
  }

  public ResetearClave(clave: { claveActual: string, claveNueva: string, confirmacionClaveNueva: string }): Observable<boolean> {
    return this.http.put<boolean>(this.hostUrl + `/Usuarios/ResetearClave/`, clave);
  }

  public RecuperarClave(email: string): Observable<string> {
    let HTTPOptions:Object = {
      responseType: 'text'
   }
    return this.http.get<string>(this.hostUrl + `/Usuarios/RecuperarClave/${email}`, HTTPOptions)
  }

  public EnviarTokenSeguridad(email: string, firmaDe: string): Observable<string> {
    let HTTPOptions:Object = {
      responseType: 'text'
   }
    return this.http.get<string>(this.hostUrl + `/Usuarios/EnviarTokenSeguridad/${email}/${firmaDe}`, HTTPOptions)
  }

  public RecuperacionClave(clave: {claveNueva: string, emailUsuario: string}): Observable<boolean> {
    return this.http.put<boolean>(this.hostUrl + `/Usuarios/RecuperacionClave/`, clave)
  }

  public ObtenerTipoPersonaLogueada(): Observable<string>{
    let HTTPOptions:Object = {
      responseType: 'text'
   }
    return this.http.get<string>(this.hostUrl + "/Usuarios/ObtenerTipoPersonaLogueada", HTTPOptions)
  }
}
