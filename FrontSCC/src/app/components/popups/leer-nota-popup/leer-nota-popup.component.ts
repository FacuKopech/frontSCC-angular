import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-leer-nota-popup',
  templateUrl: './leer-nota-popup.component.html',
  styleUrls: ['./leer-nota-popup.component.css']
})
export class LeerNotaPopupComponent {
  @Input() nota: any;

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
}
