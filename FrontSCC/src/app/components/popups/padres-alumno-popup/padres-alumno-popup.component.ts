import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NotaService } from 'src/app/services/notas_services/nota.service';
import { PersonaService } from 'src/app/services/personas_services/persona.service';
import { ApiService } from 'src/app/services/user_services/api.service';

@Component({
  selector: 'app-padres-alumno-popup',
  templateUrl: './padres-alumno-popup.component.html',
  styleUrls: ['./padres-alumno-popup.component.css']
})
export class PadresAlumnoPopupComponent {
  @Input() alumno: any;
  @Input() aula: any;

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  padres: any[] = [];
  openErrorAlert = false
  openSuccessAlert = false;
  showPopupNuevaNota = false;
  esEnvioNotaPadre = false;
  counter: number = 0;
  message: string = '';
  personaLogueada: any;
  padreDeAlumnoEstaLogueado = false;

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
  constructor(private personaService: PersonaService, private notaService: NotaService, private userService: ApiService) {}


  ngOnInit(): void{
    this.userService.isLoggedIn().subscribe(res =>{
      if(res){
        this.personaLogueada = res;
        this.personaService.ObtenerPadresDeAlumno(this.alumno.id).subscribe(res => {
          this.padres = res;
          this.padres.forEach(padre => {
            if(padre.nombre == this.personaLogueada.nombre && padre.apellido == this.personaLogueada.apellido){
              this.padreDeAlumnoEstaLogueado = true;
            }
          });
          if(this.padres.length == 0){
            this.message = "Este alumno aun no tiene Padre(s) asignado en el sistema";
          }
        },
        (error:HttpErrorResponse) =>{
          if(error.status == 404 || error.status == 400){
            this.openErrorAlert = true;
          }
        });
      }
    });

  }

  public cerrarPopupNuevaNota(){
    this.showPopupNuevaNota = false;
  }

  public enviarNotaAPadre(eventData: { tipo: string, titulo: string, cuerpo: string,  files: FormData}){
    eventData.files?.forEach((value, key) => {
      if(value != '' || key != ''){
        this.counter += 1;
      }
    });
    if(this.counter > 0){
      this.notaService.AgregarNotaFiles(eventData.files).subscribe(res =>{
        if(res){
          this.notaService.EnviarNuevaNotaAPadres(this.alumno.id, eventData).subscribe(res => {
            if(res){
              this.openSuccessAlert = true;
              this.esEnvioNotaPadre = true;
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
      this.notaService.EnviarNuevaNotaAPadres(this.alumno.id, eventData).subscribe(res => {
        if(res){
          this.openSuccessAlert = true;
          this.esEnvioNotaPadre = true;
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
