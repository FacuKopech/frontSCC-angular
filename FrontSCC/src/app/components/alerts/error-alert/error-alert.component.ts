import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css']
})
export class ErrorAlertComponent {
  constructor() {
  }

  @Output()
  cerrarButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Input() esErrorAulaRepetida: any;
  @Input() esErrorAgregarAusenciaHijoSinAulaAsignada: any;
  @Input() esErrorAgregarAusenciaExistente: any;
  @Input() esErrorAlumnoNoEncontrado: any;
  @Input() esErrorAgregarAlumnoYaExistente: any;
  @Input() esErrorAusenciaNoEncontrada: any;
  @Input() esErrorIdInvalido: any;
  @Input() esErrorEmailRepetido: any;
  @Input() esErrorUsernameRepetido: any;
  @Input() esErrorDNIRepetido: any;
  @Input() esErrorEmailRepetidoPersona: any;
  @Input() esErrorNombreInstitucionRepetido: any;
  @Input() esErrorTelefonoInstitucionRepetido: any;
  @Input() esErrorClaveActualIncorrecta: any;
  @Input() esErrorConfirmacionClaveDesigual: any;
  @Input() esErrorAgregarHistorialAlumnoSinPadre: any;
  @Input() esErrorDatoClima: any;
  @Input() esAgregarEvento: any;
  @Input() esErrorEventoYaExistenteEnAula: any;
  @Input() esErrorBodyTooLarge: any;
  
  public cerrarClicked() {
    this.cerrarButtonClick.emit("cerrar_button_clicked");
  }

}
