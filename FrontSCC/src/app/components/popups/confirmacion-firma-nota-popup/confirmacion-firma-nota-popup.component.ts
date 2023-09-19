import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmacion-firma-nota-popup',
  templateUrl: './confirmacion-firma-nota-popup.component.html',
  styleUrls: ['./confirmacion-firma-nota-popup.component.css']
})
export class ConfirmacionFirmaNotaPopupComponent {
  @Input() esFirmaHistorial: boolean = false;
  @Input() esFirmaNota: boolean = false;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  firmarButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public cancelarClicked(){
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public firmarClicked(){
    this.firmarButtonClick.emit("sign_button_clicked");
  }
}
