import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { NotaService } from 'src/app/services/notas_services/nota.service';

@Component({
  selector: 'app-datos-aula-hijo-popup',
  templateUrl: './datos-aula-hijo-popup.component.html',
  styleUrls: ['./datos-aula-hijo-popup.component.css']
})
export class DatosAulaHijoPopupComponent {
  @Input() hijo: any;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  aula: any;
  docente: any;
  openErrorAlert = false
  openSuccessAlert = false;
  showPopupNuevaNota = false;
  esEnvioNotaDocente = false;
  counter: number = 0;

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
  constructor(private aulaService: AulaService, private notaService: NotaService) {}


  ngOnInit(): void{
    this.aulaService.ObtenerAulaHijo(this.hijo.id).subscribe(res => {
      if(res == null){
        this.openErrorAlert = true;
      }else{
        this.aula = res;
        this.docente = this.aula.docente;
      }
    });
  }

  public cerrarPopupNuevaNota(){
    this.showPopupNuevaNota = false;
  }

  public enviarNotaADocente(eventData: { tipo: string, titulo: string, cuerpo: string,  files: FormData}){
    console.log(this.hijo.id, eventData);
    this.notaService.EnviarNuevaNotaADocente(this.hijo.id, eventData).subscribe(res => {
      if(res){
        eventData.files?.forEach((value, key) => {
          if(value != '' || key != ''){
            this.counter += 1;
          }
        });
        if(this.counter > 0){
          this.handleNotaFiles(eventData.files);
          this.counter = 0;
        }
      }else{
        this.openErrorAlert = true;
      }
    });
  }

  public handleNotaFiles(files: FormData){
    this.notaService.AgregarNotaFiles(files).subscribe(res =>{
      if(res){
        this.openSuccessAlert = true;
        this.esEnvioNotaDocente = true;
        this.showPopupNuevaNota = false;
      }else{
        this.openErrorAlert = true;
      }
    });
  }

  aceptarClick(){
    this.openSuccessAlert = false;
    window.location.reload();
  }
}