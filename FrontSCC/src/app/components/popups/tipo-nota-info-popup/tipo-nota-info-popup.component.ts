import { Component,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tipo-nota-info-popup',
  templateUrl: './tipo-nota-info-popup.component.html',
  styleUrls: ['./tipo-nota-info-popup.component.css']
})
export class TipoNotaInfoPopupComponent {

  @Input() esTipo: boolean = false;
  @Input() esVariosRoles: boolean = false;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public cerrarClick(){
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
}
