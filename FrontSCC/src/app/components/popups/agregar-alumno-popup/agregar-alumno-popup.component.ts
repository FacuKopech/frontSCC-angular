import { Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-agregar-alumno-popup',
  templateUrl: './agregar-alumno-popup.component.html',
  styleUrls: ['./agregar-alumno-popup.component.css']
})
export class AgregarAlumnoPopupComponent {

  @Input() aula: any;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('radioButtonNuevo', { static: false }) radioButtonNuevoRef!: ElementRef<HTMLInputElement>;
  @ViewChild('radioButtonExistente', { static: false }) radioButtonExistenteRef!: ElementRef<HTMLInputElement>;
  @ViewChild('dropdownMenu', { static: false }) alumnosMenuRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('nombreInput', { static: false }) nombreInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('apellidoInput', { static: false }) apellidoInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('dniInput', { static: false }) dniInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('fechaNacimientoInput', { static: false }) fechaNacimientoInputRef!: ElementRef<HTMLInputElement>;
  nuevoRadioButtonCheck = false;
  existenteRadioButtonCheck = false;
  alumnosSinAula: any[] = [];
  alumnosSeleccionados: any[] = [];
  showSuccessAlert = false;
  showErrorAlert = false;
  esAgregarAlumnoExistenteAAula = false;
  esAgregarAlumnoNuevoAAula = false;
  esErrorAgregarAlumnoYaExistente = false;
  today: Date;

  constructor(private aulaService: AulaService){this.today = new Date();}

  public ngOnInit(){
    this.aulaService.ObtenerAlumnosSinAula(this.aula.institucion.id).subscribe(res => {
      if(res){
        this.alumnosSinAula = res;
      }
    });
  }
  public cancelarClicked(){
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public agregarClicked(){
    const datePartsNacimiento = this.fechaNacimientoInputRef.nativeElement.value.split('/');
    const year = parseInt(datePartsNacimiento[0]);
    const month = parseInt(datePartsNacimiento[1]) - 1; 
    const day = parseInt(datePartsNacimiento[2]);
    const fechaNacimientoSelected = new Date(year, month, day);
    const nacimientoDate = new Date(this.fechaNacimientoInputRef.nativeElement.value);
    if(this.existenteRadioButtonCheck){
      if(this.alumnosSeleccionados.length == 0){
        const divisionError =   document.querySelector(`span[id="alumnosDropdownError"]`) as HTMLElement;
        divisionError.textContent = "Debe seleccionar al menos un Alumno";
        divisionError.style.display = "flex";
        divisionError.style.color = "red";
        divisionError.style.fontWeight = "bold";
      }else if(this.alumnosSeleccionados.length >= 1){
        const eventData = {
          alumnosSeleccionados: this.alumnosSeleccionados
        };
        this.aulaService.AgrgarAlumnoExistenteAAula(this.aula.id, eventData).subscribe(res => {
          if(res){
            this.showSuccessAlert = true;
            this.esAgregarAlumnoExistenteAAula = true;
          }
        },
        (error:HttpErrorResponse) =>{
          if(error.status >= 400){
            this.showErrorAlert = true;
          }
        });
      }
    }else if(this.nuevoRadioButtonCheck){
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
      }else if(nacimientoDate > this.today){
        fechaNacimientoError.textContent = "La fecha de nacimiento no puede ser mayor a la fecha actual";
        fechaNacimientoError.style.display = "flex";
        fechaNacimientoError.style.color = "red";
        fechaNacimientoError.style.fontWeight = "bold";
      }else{
        const eventData = {
          nombre: this.nombreInputRef.nativeElement.value,
          apellido: this.apellidoInputRef.nativeElement.value,
          DNI: parseInt(this.dniInputRef.nativeElement.value),
          fechaNacimiento:  new Date(this.fechaNacimientoInputRef.nativeElement.value)
        };
        this.aulaService.AgrgarAlumnoNuevoAAula(this.aula.id, eventData).subscribe(res => {
          if(res){
            this.showSuccessAlert = true;
            this.esAgregarAlumnoNuevoAAula = true;
          }
        },
        (error:HttpErrorResponse) =>{
          if(error.status == 400 && error.error == "El DNI de Alumno que intenta agregar ya existe"){
            this.showErrorAlert = true;
            this.esErrorAgregarAlumnoYaExistente = true;
          }else if(error.status >= 400){
            this.showErrorAlert = true;
            this.esErrorAgregarAlumnoYaExistente = false;
          }
        });
      }
    }
  }

  public nuevoCheck(){
    this.nuevoRadioButtonCheck = true;
    this.existenteRadioButtonCheck = false;
  }

  public existenteCheck(){
    this.nuevoRadioButtonCheck = false;
    this.existenteRadioButtonCheck = true;
  }
  showDropDownListAlumnos(){
    var dropDownListMenuAlumnos = this.alumnosMenuRef.nativeElement;
    if(dropDownListMenuAlumnos.style.display == "flex"){
      dropDownListMenuAlumnos.style.display = "none";
    }else{
      dropDownListMenuAlumnos.style.display = "flex";
    }
  }

  public alumnoCheck(alumno: any){
    let arrayAnterior: any[] = [];
    arrayAnterior = this.alumnosSeleccionados;
    this.alumnosSeleccionados = this.alumnosSeleccionados.filter((alumnoArray) => alumnoArray != alumno.id);
    if(arrayAnterior.length == this.alumnosSeleccionados.length){
      this.alumnosSeleccionados.push(alumno.id);
    }
    console.log(this.alumnosSeleccionados)
  }
  public closeSuccessAlert(){
    this.showSuccessAlert = false;
    window.location.reload();
  }

}
