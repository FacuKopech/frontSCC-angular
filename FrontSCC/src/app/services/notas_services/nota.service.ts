import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private hostUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  // NOTAS EMITIDAS SERVICE
  public ObtenerNotasEmitidas(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Notas/IndexNotasEmitidas`);
  }

  public EliminarNotaEmitida(notaIdEliminar: number): Observable<boolean> {
    return this.http.delete<boolean>(this.hostUrl + `/Notas/DeleteConfirmed/${notaIdEliminar}`);
  }

  public ModificarNotaEmitida(notaIdModificar: number, nota: { titulo: string, cuerpo: string, IdAula: number }): Observable<boolean> {
    return this.http.put<boolean>(this.hostUrl + `/Notas/Edit/${notaIdModificar}`, nota);
  }

  public ObtenerAulasDestinatariosParaNuevaNota(tipoDeNota: string, conAula: boolean): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Notas/ObtenerAulasDestinatariosParaNuevaNota/${tipoDeNota}/${conAula}`);
  }

  public ObtenerAlumnosDeAulaParaNuevaNota(idAula: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Notas/ObtenerAlumnosDeAulaParaNuevaNota/${idAula}`);
  }

  // public EnviarNuevaNota(): Observable<boolean> {
  //   return this.http.post<boolean>(this.hostUrl + `/Notas/EnviarNuevaNota`, );
  // }


  // NOTAS RECIBIDAS SERVICE

  public ObtenerNotasRecibidas(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Notas/IndexNotasRecibidas`);
  }

  public EliminarNotaRecibida(notaIdEliminar: number): Observable<boolean> {
    return this.http.delete<boolean>(this.hostUrl + `/Notas/DeleteConfirmed/${notaIdEliminar}`);
  }

  public LeerNota(idNotaLeida: number): Observable<boolean>{
    return this.http.put<boolean>(this.hostUrl + `/Notas/LeerNota/${idNotaLeida}`, null);
  }

}
