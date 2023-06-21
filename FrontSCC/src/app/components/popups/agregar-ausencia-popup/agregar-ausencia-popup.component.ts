import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-agregar-ausencia-popup',
  templateUrl: './agregar-ausencia-popup.component.html',
  styleUrls: ['./agregar-ausencia-popup.component.css']
})
export class AgregarAusenciaPopupComponent {
  @ViewChild('motivoInput', { static: false }) motivoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fechaDesdeInput', { static: false }) fechaDesdeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fechaHastaInput', { static: false }) fechaHastaInput!: ElementRef<HTMLInputElement>;

  fechaComienzo: Date;
  fechaFin: Date;
  motivoAusencia: string = '';

  constructor(){
    this.fechaComienzo = new Date();
    this.fechaFin = new Date();
  }

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  agregarButtonClick = new EventEmitter<{fechaComienzo: Date, fechaFin: Date, motivo: string}>();


  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public agregarClicked = () => {
    const motivoError =   document.querySelector(`span[id="motivoError"]`) as HTMLElement;
    const fechaDesdeError =   document.querySelector(`span[id="fechaDesdeError"]`) as HTMLElement;
    const fechaHastaError =   document.querySelector(`span[id="fechaHastaError"]`) as HTMLElement;
    const fechaDesdeSelected = new Date(this.fechaDesdeInput.nativeElement.value);
    const fechaHastaSelected = new Date(this.fechaHastaInput.nativeElement.value);

    const today = new Date();
    if(this.motivoInput.nativeElement.value == ''){
      motivoError.textContent = "Debe ingresar un motivo para la ausencia";
      motivoError.style.display = "flex";
      motivoError.style.color = "red";
      motivoError.style.fontWeight = "bold";
    }else if(this.fechaDesdeInput.nativeElement.value == ''){
      fechaDesdeError.textContent = "Debe informar a partir de cuando su hijo/a estara ausente";
      fechaDesdeError.style.display = "flex";
      fechaDesdeError.style.color = "red";
      fechaDesdeError.style.fontWeight = "bold";
    }else if(this.fechaHastaInput.nativeElement.value == ''){
      fechaHastaError.textContent = "Debe informar hasta cuando su hijo/a estara ausente";
      fechaHastaError.style.display = "flex";
      fechaHastaError.style.color = "red";
      fechaHastaError.style.fontWeight = "bold";
    }else if(this.fechaHastaInput.nativeElement.value < this.fechaDesdeInput.nativeElement.value){
      fechaDesdeError.textContent = "La fecha de comienzo de la ausencia no puede ser mayor a la fecha de fin";
      fechaDesdeError.style.display = "flex";
      fechaDesdeError.style.color = "red";
      fechaDesdeError.style.fontWeight = "bold";

      fechaHastaError.textContent = "La fecha de fin de la ausencia no puede ser menor a la fecha de comienzo";
      fechaHastaError.style.display = "flex";
      fechaHastaError.style.color = "red";
      fechaHastaError.style.fontWeight = "bold";
    }else if(fechaDesdeSelected.getDate() < today.getDate()){
      console.log(fechaDesdeSelected.getDate(), Date.now());
      fechaDesdeError.textContent = "Esta fecha ya finalizo";
      fechaDesdeError.style.display = "flex";
      fechaDesdeError.style.color = "red";
      fechaDesdeError.style.fontWeight = "bold";
    }else if(fechaHastaSelected.getDate() <today.getDate()){
      fechaHastaError.textContent = "Esta fecha ya finalizo";
      fechaHastaError.style.display = "flex";
      fechaHastaError.style.color = "red";
      fechaHastaError.style.fontWeight = "bold";
    }else{
      motivoError.textContent = "";
      motivoError.style.display = "none";

      fechaDesdeError.textContent = "";
      fechaDesdeError.style.display = "none";

      fechaHastaError.textContent = "";
      fechaHastaError.style.display = "none";

      this.agregarButtonClick.emit({fechaComienzo: this.fechaComienzo, fechaFin: this.fechaFin,  motivo: this.motivoAusencia });
    }
  }
}
