import { Component, Output, EventEmitter } from '@angular/core';

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

  public cerrarClicked() {
    this.cerrarButtonClick.emit("cerrar_button_clicked");
  }

}
