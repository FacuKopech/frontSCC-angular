import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datos-institucion-popup',
  templateUrl: './datos-institucion-popup.component.html',
  styleUrls: ['./datos-institucion-popup.component.css']
})
export class DatosInstitucionPopupComponent {
  @Input() institucion: any;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
}
