import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nota-leida-alert',
  templateUrl: './nota-leida-alert.component.html',
  styleUrls: ['./nota-leida-alert.component.css']
})
export class NotaLeidaAlertComponent {
  @Output()
  aceptarButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public aceptarClicked() {
    this.aceptarButtonClick.emit("aceptar_button_clicked");
  }
}
