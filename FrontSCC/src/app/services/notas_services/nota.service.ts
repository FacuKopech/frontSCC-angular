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

  public ModificarNotaEmitida(notaIdModificar: number, nota: { titulo: string, cuerpo: string, aulasDestinadas: any[] }): Observable<boolean> {
    return this.http.put<boolean>(this.hostUrl + `/Notas/Edit/${notaIdModificar}`, nota);
  }

  public ObtenerAulasDestinatariosParaNuevaNota(tipoDeNota: string, conAula: boolean): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Notas/ObtenerAulasDestinatariosParaNuevaNota/${tipoDeNota}/${conAula}`);
  }

  public ObtenerAlumnosDeAulaParaNuevaNota(idAula: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Notas/ObtenerAlumnosDeAulaParaNuevaNota/${idAula}`);
  }

  public ObtenerListaDeDestinatariosParaNuevaNota(idAula: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Notas/ObtenerListaDeDestinatariosParaNuevaNota/${idAula}`);
  }

  public ObtenerAulasParaNuevaNota(tipoDeNota: string, isPadre: boolean, esPadreYAlgoMas:boolean, enviaNotaComoPadre: boolean): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Notas/ObtenerAulasParaNuevaNota/${tipoDeNota}/${isPadre}/${esPadreYAlgoMas}/${enviaNotaComoPadre}/`);
  }

  public ObtenerHijosPadreParaNuevaNota(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Notas/ObtenerHijosPadreParaNuevaNota/`);
  }

  public EnviarNuevaNota(nuevaNota: { tipo: string, conAula: boolean, aulasDestinadas: any[], idAlumnoReferido: number,
    destinatarios: any[], titulo:string, cuerpo: string, files: FormData}): Observable<any> {
    return this.http.post<any>(this.hostUrl + `/Notas/EnviarNuevaNota`, nuevaNota);
  }

  public EnviarNuevaNotaADocente(idHijo: number, nota: { tipo:string, titulo: string, cuerpo: string}): Observable<boolean> {
    return this.http.post<boolean>(this.hostUrl + `/Notas/EnviarNuevaNotaADocente/${idHijo}`, nota);
  }

  public EnviarNuevaNotaAPadres(idAlumno: number, nota: { tipo:string, titulo: string, cuerpo: string}): Observable<boolean> {
    return this.http.post<boolean>(this.hostUrl + `/Notas/EnviarNuevaNotaAPadres/${idAlumno}`, nota);
  }

  public AgregarNotaFiles(files: FormData): Observable<boolean> {
    return this.http.post<boolean>(this.hostUrl + `/Notas/AgregarNotaFiles/`, files);
  }

  public ObtenerArchivosNota(idNota: number): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Notas/ObtenerArchivosNota/${idNota}`);
  }

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

  public FirmarNota(idNota: number): Observable<any> {
    return this.http.put<any>(this.hostUrl + `/Notas/FirmarNota/${idNota}/`, null);
  }

}
