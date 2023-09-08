import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.css']
})
export class SuccessAlertComponent {
  @Input() esModification: any;
  @Input() esDeletion: any;
  @Input() esResset: any;
  @Input() esRecover: any;
  @Input() esEditAusencia: any;
  @Input() esAgregarAusencia: any;
  @Input() esDeleteAusencia: any;
  @Input() esAgregarAusenciaGenerica: any;
  @Input() esFirmaHistorial: any;
  @Input() esEnvioNotaDocente: any;
  @Input() esAceptarAusenciaAlumno: any;
  @Input() esDenegarAusenciaAlumno: any;
  @Input() esAgregarHistorial: any;
  @Input() esEliminarHistorial: any;
  @Input() esEditarHistorial: any;

  constructor() {
  }

  @Output()
  cerrarButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public cerrarClicked() {
    this.cerrarButtonClick.emit("cerrar_button_clicked");
  }

}
