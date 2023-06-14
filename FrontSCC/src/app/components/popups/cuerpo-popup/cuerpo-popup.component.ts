import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cuerpo-popup',
  templateUrl: './cuerpo-popup.component.html',
  styleUrls: ['./cuerpo-popup.component.css']
})
export class CuerpoPopupComponent {
  @Input() nota: any;

  @Output()
  cerrarButtonClick: EventEmitter<string> = new EventEmitter<string>();

  cuerpoNota: string = '';

  public ngOnInit() {
    this.cuerpoNota = this.nota.cuerpo;
  }

  public cerrarClick(){
    this.cerrarButtonClick.emit("cerrar_button_clicked");
  }
}
