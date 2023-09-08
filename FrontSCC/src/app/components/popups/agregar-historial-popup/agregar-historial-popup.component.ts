import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-agregar-historial-popup',
  templateUrl: './agregar-historial-popup.component.html',
  styleUrls: ['./agregar-historial-popup.component.css']
})
export class AgregarHistorialPopupComponent {
  @ViewChild('descripcionInput', { static: false }) descripcionInput!: ElementRef<HTMLInputElement>;
  @ViewChild('calificacionInput', { static: false }) calificacionInput!: ElementRef<HTMLInputElement>;
  @ViewChild('estadoOptions', { static: false }) estadoOptions!: ElementRef<HTMLInputElement>;

  descripcionHistorial: string = "";
  calificacionHistorial: number = 0;
  estadoHistorial: number = 0;

  constructor(){}
  @Input() alumno: any;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  agregarButtonClick = new EventEmitter<{descripcion: string, calificacion: number, estado: number}>();

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public agregarClicked = () => {
    const descripcionError =   document.querySelector(`span[id="descripcionError"]`) as HTMLElement;
    const estadoError =   document.querySelector(`span[id="estadoError"]`) as HTMLElement;
    if(this.calificacionInput.nativeElement.value == null){
      this.calificacionHistorial = 0;
    }
    if(this.descripcionInput.nativeElement.value == ''){
      descripcionError.textContent = "Debe ingresar una descripcion para el historial";
      descripcionError.style.display = "flex";
      descripcionError.style.color = "red";
      descripcionError.style.fontWeight = "bold";
    }else if(this.estadoOptions.nativeElement.value == '' || this.estadoOptions.nativeElement.value == 'Seleccionar estado...'){
      estadoError.textContent = "Debe seleccionar un estado para el historial";
      estadoError.style.display = "flex";
      estadoError.style.color = "red";
      estadoError.style.fontWeight = "bold";
    }else{
      descripcionError.textContent = "";
      descripcionError.style.display = "none";

      estadoError.textContent = "";
      estadoError.style.display = "none";

      this.agregarButtonClick.emit({descripcion: this.descripcionHistorial, calificacion: this.calificacionHistorial, estado: this.estadoHistorial});
    }
  }
}
