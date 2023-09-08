import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-editar-historial-popup',
  templateUrl: './editar-historial-popup.component.html',
  styleUrls: ['./editar-historial-popup.component.css']
})
export class EditarHistorialPopupComponent {
  @Input() historial: any;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  editButtonClick = new EventEmitter<{idHistorial: number, descripcion: string, calificacion: number, estado: number}>();

  @ViewChild('descripcionInput', { static: false }) descripcionInput!: ElementRef<HTMLInputElement>;
  @ViewChild('calificacionInput', { static: false }) calificacionInput!: ElementRef<HTMLInputElement>;
  @ViewChild('estadoInput', { static: false }) estadoInput!: ElementRef<HTMLInputElement>;

  descripcionHistorial: string = '';
  calificacionHistorial: number = 0;
  estadoHistorial: number = 0;

  public ngOnInit(){
    this.descripcionHistorial = this.historial.descripcion;
    this.calificacionHistorial = this.historial.calificacion;
    this.estadoHistorial = this.historial.estado;
  }
  public cancelarClicked(){
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public editarClick(){
    if(this.calificacionHistorial == null){
      this.calificacionHistorial = 0;
    }

    const errorGeneral =   document.querySelector(`span[id="generalError"]`) as HTMLElement;
    const calificacionError =   document.querySelector(`span[id="calificacionError"]`) as HTMLElement;
    const estadoError =   document.querySelector(`span[id="estadoError"]`) as HTMLElement;
    if(this.descripcionInput.nativeElement.value == this.historial.descripcion && this.calificacionInput.nativeElement.value == this.historial.calificacion &&
      this.estadoInput.nativeElement.value == this.historial.estado){
        errorGeneral.textContent = "Para poder editar un Historial, debe ingresar nuevos valores en al menos un campo modificable";
        errorGeneral.style.display = "flex";
        errorGeneral.style.color = "red";
        errorGeneral.style.fontWeight = "bold";
    }else if(parseInt(this.calificacionInput.nativeElement.value) < 0){
      calificacionError.textContent = "La calificacion no puede ser menor a cero. Si no hay calificacion, ingrese cero (0)";
      calificacionError.style.display = "flex";
      calificacionError.style.color = "red";
      calificacionError.style.fontWeight = "bold";
    }else if(this.estadoInput.nativeElement.value == '0'){
      estadoError.textContent = "Debe seleccionar un estado para el Historial";
      estadoError.style.display = "flex";
      estadoError.style.color = "red";
      estadoError.style.fontWeight = "bold";
    }else{
      this.editButtonClick.emit({idHistorial: this.historial.idHistorial, descripcion: this.descripcionHistorial, calificacion: this.calificacionHistorial, estado: this.estadoHistorial});
    }
  }
}
