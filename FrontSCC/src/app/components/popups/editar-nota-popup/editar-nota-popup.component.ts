import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editar-nota-popup',
  templateUrl: './editar-nota-popup.component.html',
  styleUrls: ['./editar-nota-popup.component.css']
})
export class EditarNotaPopupComponent {
  @Input() nota: any;

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  editarButtonClick = new EventEmitter<{titulo: string, cuerpo: string, idAula: number}>();

  tituloNota: string = '';
  cuerpoNota: string = '';
  aulaDestinadaIdNota: number = -1;


  public ngOnInit() {
    this.tituloNota = this.nota.titulo;
    this.cuerpoNota = this.nota.cuerpo;
    this.aulaDestinadaIdNota = this.nota.aulaDestinada.id;
  }

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public editarClicked = () => {
    this.editarButtonClick.emit({ titulo: this.tituloNota, cuerpo: this.cuerpoNota, idAula: this.aulaDestinadaIdNota });
  }
}
