import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.css']
})
export class SuccessAlertComponent {
  @Input() esModification: any;
  @Input() esDeletion: any;
  @Input() esAddition: any;
  @Input() esResset: any;
  @Input() esRecover: any;
  @Input() esEditAusencia: any;
  @Input() esAgregarAusencia: any;
  @Input() esDeleteAusencia: any;
  @Input() esAgregarAusenciaGenerica: any;
  @Input() esFirmaHistorial: any;
  @Input() esFirmaNota: any;
  @Input() esEnvioNotaDocente: any;
  @Input() esAceptarAusenciaAlumno: any;
  @Input() esDenegarAusenciaAlumno: any;
  @Input() esAgregarHistorial: any;
  @Input() esEliminarHistorial: any;
  @Input() esEditarHistorial: any;
  @Input() esCargaDeAsistencia: any;
  @Input() esEnvioNotaPadre: any;
  @Input() esAdditionAula: any;
  @Input() esRemoverAlumnoDeAula: any;
  @Input() esEliminarAula: any;
  @Input() esEditionAula: any;
  @Input() esAgregarAlumnoExistenteAAula: any;
  @Input() esAgregarAlumnoNuevoAAula: any;
  @Input() esEditarAlumno: any;
  @Input() esEliminarAlumnoDelSistema: any;
  @Input() esEliminarUser: any;
  @Input() esAgregarUsuario: any;
  @Input() esEditarUsuario: any;
  @Input() esEliminarPersona: any;
  @Input() esEditarPersona: any;
  @Input() esAgregarPersona: any;
  @Input() esAgregarInstitucion: any;
  @Input() esEliminarInstitucion: any;
  @Input() esEditarInstitucion: any;
  
  constructor() {
  }

  @Output()
  cerrarButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public cerrarClicked() {
    this.cerrarButtonClick.emit("cerrar_button_clicked");
  }

}
