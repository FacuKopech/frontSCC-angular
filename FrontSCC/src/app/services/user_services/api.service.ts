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

  public ObtenerTipoPersonaLogueada(): Observable<any>{
    return this.http.get<any>(this.hostUrl + "/Usuarios/ObtenerTipoPersonaLogueada")
  }

  public ObtenerUsuariosSistema(): Observable<any>{
    return this.http.get<any>(this.hostUrl + "/Usuarios/ObtenerUsuariosSistema")
  }

  public ObtenerUsuariosSinAsignacionPersona(): Observable<any>{
    return this.http.get<any>(this.hostUrl + "/Usuarios/ObtenerUsuariosSinAsignacionPersona")
  }

  public ObtenerRolesSistema(): Observable<any>{
    return this.http.get<any>(this.hostUrl + "/Usuarios/ObtenerRolesSistema")
  }

  public ObtenerRolesUsuario(idUser: number): Observable<any>{
    return this.http.get<any>(this.hostUrl + `/Usuarios/ObtenerRolesUsuario/${idUser}`)
  }

  public EliminarUsuario(idUser: number): Observable<boolean> {
    return this.http.delete<boolean>(this.hostUrl + `/Usuarios/EliminarUsuario/${idUser}`);
  }

  public AgregarUsuario( usuario: {email: string, username: string, clave: string, rolesSeleccionados: any[]}): Observable<boolean> {    
    return this.http.post<boolean>(this.hostUrl + `/Usuarios/AgregarUsuario/`, usuario);
  }

  public EditarUsuario(idUser: number, usuario: {email: string, username: string, clave: string, rolesSeleccionados: any[]}): Observable<any> {
    return this.http.put<any>(this.hostUrl + `/Usuarios/EditarUsuario/${idUser}`, usuario);
  }
}
