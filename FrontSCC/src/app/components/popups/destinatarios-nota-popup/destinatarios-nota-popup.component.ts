import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-destinatarios-nota-popup',
  templateUrl: './destinatarios-nota-popup.component.html',
  styleUrls: ['./destinatarios-nota-popup.component.css']
})
export class DestinatariosNotaPopupComponent {

  @Input() nota: any;

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
}
