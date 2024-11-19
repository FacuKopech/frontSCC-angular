import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private hostUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public ObtenerEventos(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Eventos/ObtenerEventos/`);
  }

  public AgregarEvento(eventData: { fecha: Date, localidad: string, motivo: string, descripcion: string, aula: string }, idUser: number): Observable<boolean> {
    const evento = {fecha: eventData.fecha, localidad: eventData.localidad, motivo: eventData.motivo, descripcion: eventData.descripcion, idAulaDestinada: eventData.aula, idCreador: idUser};
    return this.http.post<boolean>(this.hostUrl + `/Eventos/AgregarEvento/`, evento);
  }

  public EditarEvento(eventoId: string, eventData: { fecha: Date, localidad: string, motivo: string, descripcion: string, aula: string }): Observable<boolean> {
    const evento = {fecha: eventData.fecha, localidad: eventData.localidad, motivo: eventData.motivo, descripcion: eventData.descripcion, idAulaDestinada: eventData.aula};
    return this.http.put<boolean>(this.hostUrl + `/Eventos/ModificarEvento/${eventoId}`, evento);
  }

  public ConfirmarAsistenciaEvento(idEvento: string, confirmacion: string): Observable<boolean> {
    return this.http.put<boolean>(this.hostUrl + `/Eventos/ConfirmarAsistenciaEvento/${idEvento}/${confirmacion}`, {});
  }

  public ChequearClima(localidad: string, fecha: string): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Eventos/ChequearClima/${localidad}/${fecha}`);
  }

  public EliminarEvento(eventoId: string): Observable<string> {
    return this.http.delete<string>(this.hostUrl + `/Eventos/EliminarEvento/${eventoId}`);
  }
}
