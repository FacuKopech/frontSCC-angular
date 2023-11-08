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
  @Input() esErrorNomreAulaRepetido: any;
  @Input() esErrorGradoAulaRepetido: any;
  @Input() esErrorDivisionAulaRepetida: any;
  @Input() esErrorAgregarAusenciaHijoSinAulaAsignada: any;
  @Input() esErrorAgregarAlumnoYaExistente: any;
  @Input() esErrorEmailRepetido: any;
  @Input() esErrorUsernameRepetido: any;

  public cerrarClicked() {
    this.cerrarButtonClick.emit("cerrar_button_clicked");
  }

}
