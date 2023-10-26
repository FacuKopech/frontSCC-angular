import { Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonaService } from 'src/app/services/personas_services/persona.service';

@Component({
  selector: 'app-editar-alumno-popup',
  templateUrl: './editar-alumno-popup.component.html',
  styleUrls: ['./editar-alumno-popup.component.css']
})

export class EditarAlumnoPopupComponent {

  @Input() alumno: any;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('radioButtonNuevo', { static: false }) radioButtonNuevoRef!: ElementRef<HTMLInputElement>;
  @ViewChild('radioButtonExistente', { static: false }) radioButtonExistenteRef!: ElementRef<HTMLInputElement>;
  @ViewChild('dropdownMenu', { static: false }) alumnosMenuRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('nombreInput', { static: false }) nombreInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('apellidoInput', { static: false }) apellidoInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('dniInput', { static: false }) dniInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('fechaNacimientoInput', { static: false }) fechaNacimientoInputRef!: ElementRef<HTMLInputElement>;


  showSuccessAlert = false;
  showErrorAlert = false;
  esEditarAlumno = false;
  nombre: string = '';
  apellido: string = '';
  dni: number = 0;
  fechaNacimiento: Date;


  constructor(private personaService: PersonaService){
    this.fechaNacimiento = new Date();
  }

  public ngOnInit(){
    this.nombre = this.alumno.nombre;
    this.apellido = this.alumno.apellido;
    this.dni = this.alumno.dni;
    this.fechaNacimiento = new Date(this.alumno.fechaNacimiento);
  }
  public cancelarClicked(){
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public editarClicked(){
    const date = new Date(this.alumno.fechaNacimiento);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    console.log(this.alumno, this.nombreInputRef.nativeElement.value, this.apellidoInputRef.nativeElement.value, this.dniInputRef.nativeElement.value, this.fechaNacimientoInputRef.nativeElement.value);
    const nombreError =   document.querySelector(`span[id="nombreError"]`) as HTMLElement;
    const apellidoError =   document.querySelector(`span[id="apellidoError"]`) as HTMLElement;
    const DNIError =   document.querySelector(`span[id="DNIError"]`) as HTMLElement;
    const fechaNacimientoError =   document.querySelector(`span[id="fechaNacimientoError"]`) as HTMLElement;
    if(this.nombreInputRef.nativeElement.value == ""){
      nombreError.textContent = "Este campo es requerido";
      nombreError.style.display = "flex";
      nombreError.style.color = "red";
      nombreError.style.fontWeight = "bold";
    }else  if(this.apellidoInputRef.nativeElement.value == ""){
      apellidoError.textContent = "Este campo es requerido";
      apellidoError.style.display = "flex";
      apellidoError.style.color = "red";
      apellidoError.style.fontWeight = "bold";
    }else  if(this.dniInputRef.nativeElement.value == ""){
      DNIError.textContent = "Este campo es requerido";
      DNIError.style.display = "flex";
      DNIError.style.color = "red";
      DNIError.style.fontWeight = "bold";
    }else  if(this.fechaNacimientoInputRef.nativeElement.value == ""){
      fechaNacimientoError.textContent = "Este campo es requerido";
      fechaNacimientoError.style.display = "flex";
      fechaNacimientoError.style.color = "red";
      fechaNacimientoError.style.fontWeight = "bold";
    }else if(this.nombreInputRef.nativeElement.value == this.alumno.nombre && this.apellidoInputRef.nativeElement.value == this.alumno.apellido && this.dniInputRef.nativeElement.value == this.alumno.dni &&
      this.fechaNacimientoInputRef.nativeElement.value == formattedDate){
        nombreError.textContent = "Edite al menos un campo";
        nombreError.style.display = "flex";
        nombreError.style.color = "red";
        nombreError.style.fontWeight = "bold";
        apellidoError.textContent = "Edite al menos un campo";
        apellidoError.style.display = "flex";
        apellidoError.style.color = "red";
        apellidoError.style.fontWeight = "bold";
        DNIError.textContent = "Edite al menos un campo";
        DNIError.style.display = "flex";
        DNIError.style.color = "red";
        DNIError.style.fontWeight = "bold";
        fechaNacimientoError.textContent = "Edite al menos un campo";
        fechaNacimientoError.style.display = "flex";
        fechaNacimientoError.style.color = "red";
        fechaNacimientoError.style.fontWeight = "bold";
    }else{
      const eventData = {
        nombre: this.nombre,
        apellido: this.apellido,
        dni: this.dni,
        fechaNacimiento: this.fechaNacimiento
      }

      this.personaService.EditarAlumno(this.alumno.id, eventData).subscribe(res => {
        if(res){
          this.showSuccessAlert = true;
          this.esEditarAlumno = true;
        }
      },
      (error:HttpErrorResponse) =>{
        if(error.status >= 400){
          this.showErrorAlert = true;
        }
      });
    }
  }


  public closeSuccessAlert(){
    this.showSuccessAlert = false;
    window.location.reload();
  }

}

