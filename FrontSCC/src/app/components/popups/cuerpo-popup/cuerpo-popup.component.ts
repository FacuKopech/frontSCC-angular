import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cuerpo-popup',
  templateUrl: './cuerpo-popup.component.html',
  styleUrls: ['./cuerpo-popup.component.css']
})
export class CuerpoPopupComponent {
  @Input() nota: any;
  @Input() evento: any;

  @Output()
  cerrarButtonClick: EventEmitter<string> = new EventEmitter<string>();

  cuerpoNota: string = '';
  descripcionEvento: string = '';

  public ngOnInit() {
    if(this.nota){
      this.cuerpoNota = this.nota.cuerpo;
    }else{
      this.descripcionEvento = this.evento.meta.eventDetails.descripcion;
    }
    
  }

  public cerrarClick(){
    this.cerrarButtonClick.emit("cerrar_button_clicked");
  }
}
