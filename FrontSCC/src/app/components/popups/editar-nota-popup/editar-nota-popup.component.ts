import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AulaService } from 'src/app/services/aulas_services/aula.service';

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

  @ViewChild('options', { static: false }) optionsRef!: ElementRef<HTMLSelectElement>;

  tituloNota: string = '';
  cuerpoNota: string = '';
  aulaDestinadaIdNota: number = -1;
  aulaElegida: number = -1;
  public aulas: any[] = [];
  constructor(private aulaService: AulaService){}

  public ngOnInit() {
    this.tituloNota = this.nota.titulo;
    this.cuerpoNota = this.nota.cuerpo;
    this.aulaDestinadaIdNota = this.nota.aulaDestinada.id;
    this.aulaElegida = this.aulaDestinadaIdNota;
    this.aulaService.ObtenerAulasDeHijos().subscribe(res => {
      this.aulas = res;
    });
  }

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public editarClicked = () => {
    this.editarButtonClick.emit({ titulo: this.tituloNota, cuerpo: this.cuerpoNota, idAula: this.aulaDestinadaIdNota });
  }

  public handleAulaSeleccionada(aulaId: number) {
    this.aulaDestinadaIdNota = aulaId;
    console.log(this.aulaDestinadaIdNota);
  }

}

