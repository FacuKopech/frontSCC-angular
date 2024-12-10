import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-evento-popup',
  templateUrl: './evento-popup.component.html',
  styleUrls: ['./evento-popup.component.css']
})
export class EventoPopupComponent {
  @Input() evento: any;
  @Input() aulas: any;
  @Input() loggedInUser: any;
  @Input() isDirectivo: any;
  @Input() isDocente: any;
  @Input() isPadre: any;
  openDescripcionEventoPopup = false;
  openDeletionPopup = false;
  openEditarEventoPopup = false;
  showAsistenciaEventoPopup = false;
  itemForDelete = '';
  areEqualDates = false;
  today = new Date();
  eventoDate!: Date;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  editarButtonClick = new EventEmitter<{eventData:{ fecha: Date, localidad: string, motivo: string, descripcion: string, aula: string, idEvento: string }}>();
  @Output()
  eliminarButtonClick: EventEmitter<{idEvento: string}> = new EventEmitter<{idEvento: string}>();
  @Output()
  confirmarButtonClick: EventEmitter<{idEvento: string, tipoAsistencia: string}> = new EventEmitter<{idEvento: string, tipoAsistencia: string}>();

  ngOnInit() {
    this.eventoDate = new Date(this.evento.meta.eventDetails.fecha);
    this.areEqualDates = this.areDatesEqual(this.eventoDate, this.today);
  }
  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  areDatesEqual(eventoDate: Date, today: Date): boolean {
    return (
      eventoDate.getFullYear() === today.getFullYear() &&
      eventoDate.getMonth() === today.getMonth() &&
      eventoDate.getDate() === today.getDate()
    );
  }
  
  public openPopupEditarEvento(evento: any) {
    this.evento = evento;
    this.openEditarEventoPopup = true;
  }

  public openDescripcionEvento(evento: any) {
    this.openDescripcionEventoPopup = true;
    this.evento = evento;
  }

  public eliminarEvento(evento: any) {
    this.openDeletionPopup = true;
    this.evento = evento;
    this.itemForDelete = "Evento";
  }

  public verAsistenciaEvento(evento: any) {
    this.showAsistenciaEventoPopup = true;
    this.evento = evento;
  }

  public editarEvento(eventData: { fecha: Date, localidad: string, motivo: string, descripcion: string, aula: string }) {
    this.editarButtonClick.emit({eventData:{ fecha: eventData.fecha, localidad: eventData.localidad, motivo: eventData.motivo, descripcion: eventData.descripcion, aula: eventData.aula, idEvento:  this.evento.meta.eventDetails.id}});
  }

  public confirmEliminarEvento() {
    this.eliminarButtonClick.emit({idEvento: this.evento.meta.eventDetails.id});
  }

  public confirmarAsistencia(idEvento: string, tipoAsistencia: string){
    this.confirmarButtonClick.emit({idEvento: idEvento, tipoAsistencia: tipoAsistencia});
  }

}
