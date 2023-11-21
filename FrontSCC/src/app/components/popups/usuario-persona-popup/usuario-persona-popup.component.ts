import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-usuario-persona-popup',
  templateUrl: './usuario-persona-popup.component.html',
  styleUrls: ['./usuario-persona-popup.component.css']
})
export class UsuarioPersonaPopupComponent {
  @Input() usuario: any;

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
}
