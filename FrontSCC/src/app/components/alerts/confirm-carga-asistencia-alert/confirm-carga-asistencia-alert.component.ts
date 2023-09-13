import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-carga-asistencia-alert',
  templateUrl: './confirm-carga-asistencia-alert.component.html',
  styleUrls: ['./confirm-carga-asistencia-alert.component.css']
})
export class ConfirmCargaAsistenciaAlertComponent {
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  cargarButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public cargarClicked = () => {
    this.cargarButtonClick.emit("eliminar_button_clicked");
  }
}
