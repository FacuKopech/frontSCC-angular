import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nueva-aula-popup',
  templateUrl: './nueva-aula-popup.component.html',
  styleUrls: ['./nueva-aula-popup.component.css']
})
export class NuevaAulaPopupComponent {

  @Input() institucion: any;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('dropdownMenu', { static: false }) alumnosMenuRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('nombreInput', { static: false }) nombreInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('gradoInput', { static: false }) gradoInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('divisionInput', { static: false }) divisionInputRef!: ElementRef<HTMLInputElement>;

  constructor(private aulaService: AulaService){}

  nombreAula: string = '';
  gradoAula: string = '';
  divisionAula: string = '';
  alumnosSinAula: any[] = [];
  docentesSinAula: any[] = [];
  alumnosSeleccionados: any[] = [];
  docenteSeleccionadaId: number = 0;
  showErrorAlert = false
  showSuccessAlert = false;
  esErrorNomreAulaRepetido = false;
  esErrorGradoAulaRepetido = false;
  esErrorDivisionAulaRepetida = false;
  showAdditionAulaSuccessAlert = false;

  public ngOnInit(){
    this.aulaService.ObtenerAlumnosSinAula(this.institucion.id).subscribe(res => {
      if(res){
        this.alumnosSinAula = res;
        this.aulaService.ObtenerDocentesSinAulaAsignada(this.institucion.id).subscribe(res =>{
          if(res){
            this.docentesSinAula = res;
          }
        });
      }
    });
  }

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public agregarClicked() {
    const nombreError =   document.querySelector(`span[id="nombreError"]`) as HTMLElement;
    const gradoError =   document.querySelector(`span[id="gradoError"]`) as HTMLElement;
    const divisionError =   document.querySelector(`span[id="divisionError"]`) as HTMLElement;
    if(this.nombreInputRef.nativeElement.value == ""){
      nombreError.textContent = "Este campo es requerido";
      nombreError.style.display = "flex";
      nombreError.style.color = "red";
      nombreError.style.fontWeight = "bold";
    }else if(this.gradoInputRef.nativeElement.value == ""){
      gradoError.textContent = "Este campo es requerido";
      gradoError.style.display = "flex";
      gradoError.style.color = "red";
      gradoError.style.fontWeight = "bold";
    }else if(this.divisionInputRef.nativeElement.value == ""){
      divisionError.textContent = "Este campo es requerido";
      divisionError.style.display = "flex";
      divisionError.style.color = "red";
      divisionError.style.fontWeight = "bold";
    }else{
      const eventData = {
        nombreAula: this.nombreAula,
        gradoAula: this.gradoAula,
        divisionAula: this.divisionAula,
        institucionId: this.institucion.id,
        alumnosSeleccionados: this.alumnosSeleccionados,
        docenteId: this.docenteSeleccionadaId,
      };
      console.log(eventData);
      this.aulaService.AgregarAula(eventData).subscribe(res => {
        if(res){
          this.showSuccessAlert = true;
          this.showAdditionAulaSuccessAlert = true;
        }
      },
      (error:HttpErrorResponse) =>{
        if(error.status == 404 || error.status >= 500 || error.status == 0){
          this.showErrorAlert = true;
        }else if(error.status == 400 && error.error == "Nombre existente"){
          this.showErrorAlert = true;
          this.esErrorNomreAulaRepetido = true;
          this.esErrorGradoAulaRepetido = false;
          this.esErrorDivisionAulaRepetida = false;
        }else if(error.status == 400 && error.error == "Grado existente"){
          this.showErrorAlert = true;
          this.esErrorNomreAulaRepetido = false;
          this.esErrorGradoAulaRepetido = true;
          this.esErrorDivisionAulaRepetida = false;
        }else if(error.status == 400 && error.error == "Division existente"){
          this.showErrorAlert = true;
          this.esErrorNomreAulaRepetido = false;
          this.esErrorGradoAulaRepetido = false;
          this.esErrorDivisionAulaRepetida = true;
        }else if(error.status == 400 && error.error == ""){
          this.showErrorAlert = true;
        }
      });
    }
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

  public onDocenteSelected($event: Event){
    this.docenteSeleccionadaId =  parseInt(($event.target as HTMLInputElement).value);
    console.log(this.docenteSeleccionadaId);
  }

  public closeSuccessAlert(){
    this.showSuccessAlert = false;
    window.location.reload();
  }
}

