import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ausencias-hijo-popup',
  templateUrl: './ausencias-hijo-popup.component.html',
  styleUrls: ['./ausencias-hijo-popup.component.css']
})
export class AusenciasHijoPopupComponent {
  @Input() ausencias: any[] = [];
  @Input() hijo: any;
  @Input() message: string='';

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  getBackgroundColor(ausencia: any): any {
    if (ausencia.justificada == "Si") {
      return { 'background-color': '#17B890' };
    } else {
      return { 'background-color': 'red' };
    }
  }
}
