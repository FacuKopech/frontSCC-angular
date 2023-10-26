import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { NotaService } from 'src/app/services/notas_services/nota.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-datos-aula-hijo-popup',
  templateUrl: './datos-aula-hijo-popup.component.html',
  styleUrls: ['./datos-aula-hijo-popup.component.css']
})
export class DatosAulaHijoPopupComponent {
  @Input() hijo: any;
  @Input() aulaInstitucion: any;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  aula: any;
  docente: any;
  openErrorAlert = false
  openSuccessAlert = false;
  showPopupNuevaNota = false;
  esEnvioNotaDocente = false;
  counter: number = 0;
  hijoAulaInstitucion: any
  sinAula = false;

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
  constructor(private aulaService: AulaService, private notaService: NotaService) {}


  ngOnInit(): void{

    if(this.aulaInstitucion == null){
      this.aulaService.ObtenerAulaHijo(this.hijo.id).subscribe(res => {
        if(res == null){
          this.sinAula = true;
        }else{
          this.aula = res;
          this.docente = this.aula.docente;
        }
      });
    }else{
      this.aula = this.aulaInstitucion;
      this.docente = this.aulaInstitucion.docente;
      this.aulaService.ObtenerAlumnosAula(this.aulaInstitucion.id).subscribe(res => {
        if(res){
          this.hijoAulaInstitucion = res[0];
        }
      });
    }

  }

  public cerrarPopupNuevaNota(){
    this.showPopupNuevaNota = false;
  }

  public enviarNotaADocente(eventData: { tipo: string, titulo: string, cuerpo: string,  files: FormData}){
    eventData.files?.forEach((value, key) => {
      if(value != '' || key != ''){
        this.counter += 1;
      }
    });
    if(this.counter > 0){
      this.notaService.AgregarNotaFiles(eventData.files).subscribe(res =>{
        if(res){
          this.notaService.EnviarNuevaNotaADocente(this.hijo.id, eventData).subscribe(res => {
            if(res){
              this.openSuccessAlert = true;
              this.esEnvioNotaDocente = true;
              this.showPopupNuevaNota = false;
            }else{
              this.openErrorAlert = true;
            }
          },
          (error:HttpErrorResponse) =>{
            if(error.status == 404 || error.status == 400){
              this.openErrorAlert = true;
            }
          });

        }else{
          this.openErrorAlert = true;
        }
      });
    }else{
      this.notaService.EnviarNuevaNotaADocente(this.hijo.id, eventData).subscribe(res => {
        if(res){
          this.openSuccessAlert = true;
          this.esEnvioNotaDocente = true;
          this.showPopupNuevaNota = false;
        }else{
          this.openErrorAlert = true;
        }
      },
      (error:HttpErrorResponse) =>{
        if(error.status == 404 || error.status == 400){
          this.openErrorAlert = true;
        }
      });
    }
  }

  aceptarClick(){
    this.openSuccessAlert = false;
    window.location.reload();
  }
}
