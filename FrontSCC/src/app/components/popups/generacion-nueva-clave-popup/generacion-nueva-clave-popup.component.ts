import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-generacion-nueva-clave-popup',
  templateUrl: './generacion-nueva-clave-popup.component.html',
  styleUrls: ['./generacion-nueva-clave-popup.component.css']
})
export class GeneracionNuevaClavePopupComponent {
  @ViewChild('claveNuevaInput', { static: false }) claveNuevaInput!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmacionClaveInput', { static: false }) confirmacionClaveInput!: ElementRef<HTMLInputElement>;
  @Output()
  confirmarButtonClick = new EventEmitter<{nuevaClave: string, confirmacionNuevaClave: string}>();
  claveNueva: string = '';
  confirmacionClaveNueva: string = '';


  public confirmarClicked = () => {
    const errorConfirmacion = document.querySelector(`span[id="confirmacion"]`) as HTMLElement;
    const generalError = document.querySelector(`span[id="generalError"]`) as HTMLElement;
    const claveError = document.querySelector(`span[id="claveError"]`) as HTMLElement;
    if(this.claveNuevaInput.nativeElement.value !== this.confirmacionClaveInput.nativeElement.value){
      errorConfirmacion.textContent = "Las claves no coinciden";
      errorConfirmacion.style.display = "flex";
      errorConfirmacion.style.color = "red";
      errorConfirmacion.style.fontWeight = "bold";

      generalError.style.display = "none";
      claveError.style.display = "none";
    }else if(this.claveNuevaInput.nativeElement.value == "" || this.confirmacionClaveInput.nativeElement.value == ""){
      generalError.textContent = "Por favor complete los campos requeridos";
      generalError.style.display = "flex";
      generalError.style.color = "red";
      generalError.style.fontWeight = "bold";

      errorConfirmacion.style.display = "none";
      claveError.style.display = "none";
    }else if(this.claveNuevaInput.nativeElement.value.length < 8){
      claveError.textContent = "La clave debe contener al menos 8 caracteres";
      claveError.style.display = "flex";
      claveError.style.color = "red";
      claveError.style.fontWeight = "bold";

      generalError.style.display = "none";
      errorConfirmacion.style.display = "none";
    }else{
      this.confirmarButtonClick.emit({nuevaClave: this.claveNueva, confirmacionNuevaClave: this.confirmacionClaveNueva});
    }
  }
}
