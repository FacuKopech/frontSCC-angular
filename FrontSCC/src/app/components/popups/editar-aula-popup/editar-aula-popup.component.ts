import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router   } from '@angular/router';

@Component({
  selector: 'app-editar-aula-popup',
  templateUrl: './editar-aula-popup.component.html',
  styleUrls: ['./editar-aula-popup.component.css']
})
export class EditarAulaPopupComponent {

  @Input() aula: any;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  reloadClick: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('nombreInput', { static: false }) nombreInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('gradoInput', { static: false }) gradoInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('divisionInput', { static: false }) divisionInputRef!: ElementRef<HTMLInputElement>;


  showErrorAlert = false;
  showSuccessAlert = false;
  showEditionAulaSuccessAlert = false;
  esErrorAulaRepetida = false;
  docenteSeleccionadaId: number = 0;
  docentesDeInstitucion: any[] = [];
  alumnosSeleccionados: any[] = [];
  nombreAula: string = '';
  gradoAula: string = '';
  divisionAula: string = '';

  constructor(private aulaService: AulaService, private router: Router){}

  public ngOnInit(){
    console.log(this.aula);
    this.aulaService.ObtenerDocentesDeInstitucion(this.aula.institucion.id).subscribe(res =>{
      if(res){
        this.docentesDeInstitucion = res;
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status == 404){
        this.docentesDeInstitucion = [];
      }
    });
    this.nombreAula = this.aula.nombre;
    this.gradoAula = this.aula.grado;
    this.divisionAula = this.aula.division;
    if(this.aula.docente != null){
      this.docenteSeleccionadaId = this.aula.docente.id;
    }
  }

  public onDocenteSelected($event: Event){
    this.docenteSeleccionadaId =  parseInt(($event.target as HTMLInputElement).value);
    console.log(this.docenteSeleccionadaId);
  }

  public cancelarClicked(){
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public editarClicked(){
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
    }else if((this.docenteSeleccionadaId == 0 && this.aula.docente == null) || (this.aula.docente != null && this.docenteSeleccionadaId == this.aula.docente.id)){
      if(this.nombreInputRef.nativeElement.value == this.aula.nombre && this.gradoInputRef.nativeElement.value == this.aula.grado && this.divisionInputRef.nativeElement.value == this.aula.division){
        nombreError.textContent = "El valor del campo es el mismo";
        nombreError.style.display = "flex";
        nombreError.style.color = "red";
        nombreError.style.fontWeight = "bold";
        gradoError.textContent = "El valor del campo es el mismo";
        gradoError.style.display = "flex";
        gradoError.style.color = "red";
        gradoError.style.fontWeight = "bold";
        divisionError.textContent = "El valor del campo es el mismo";
        divisionError.style.display = "flex";
        divisionError.style.color = "red";
        divisionError.style.fontWeight = "bold";
      }else{
        const eventData = {
          nombreAula: this.nombreAula,
          gradoAula: this.gradoAula,
          divisionAula: this.divisionAula,
          institucionId: this.aula.institucion.id,
          alumnosSeleccionados: this.alumnosSeleccionados,
          docenteId: this.docenteSeleccionadaId.toString(),
        };
        console.log(eventData);
        this.aulaService.EditarAula(this.aula.id, eventData).subscribe(res => {
          if(res){
            this.showSuccessAlert = true;
            this.showEditionAulaSuccessAlert = true;
          }
        },
        (error:HttpErrorResponse) =>{
          if(error.status == 404 || error.status >= 500 || error.status == 0){
            this.showErrorAlert = true;
          }else if(error.status == 400 && error.error == "Existente"){
            this.showErrorAlert = true;
            this.esErrorAulaRepetida = true;
          }
        });
      }
    }else{
      const eventData = {
        nombreAula: this.nombreAula,
        gradoAula: this.gradoAula,
        divisionAula: this.divisionAula,
        institucionId: this.aula.institucion.id,
        alumnosSeleccionados: this.alumnosSeleccionados,
        docenteId: this.docenteSeleccionadaId.toString(),
      };
      console.log(eventData);
      this.aulaService.EditarAula(this.aula.id, eventData).subscribe(res => {
        if(res){
          this.showSuccessAlert = true;
          this.showEditionAulaSuccessAlert = true;
        }
      },
      (error:HttpErrorResponse) =>{
        if(error.status == 404 || error.status >= 500 || error.status == 0){
          this.showErrorAlert = true;
        }else if(error.status == 400 && error.error == "Existente"){
          this.showErrorAlert = true;
          this.esErrorAulaRepetida = true;
        }else if(error.status == 400 && error.error == ""){
          this.showErrorAlert = true;
        }
      });
    }
  }

  public closeSuccessAlert(){
    this.showSuccessAlert = false;
    window.location.reload();
    this.reloadClick.emit("reload_clicked");
  }
}
