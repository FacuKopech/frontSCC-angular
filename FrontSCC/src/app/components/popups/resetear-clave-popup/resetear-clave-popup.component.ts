import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-resetear-clave-popup',
  templateUrl: './resetear-clave-popup.component.html',
  styleUrls: ['./resetear-clave-popup.component.css']
})
export class ResetearClavePopupComponent {
  @ViewChild('claveActualInput', { static: false }) claveActualInput!: ElementRef<HTMLInputElement>;
  @ViewChild('claveNuevaInput', { static: false }) claveNuevaInput!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmacionClaveInput', { static: false }) confirmacionClaveInput!: ElementRef<HTMLInputElement>;
  constructor() {}

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  resetearButtonClick = new EventEmitter<{claveActual: string, claveNueva: string, confirmacionClaveNueva: string}>();

  claveActual: string = '';
  claveNueva: string = '';
  confirmacionClaveNueva:string = '';


  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public resetearClicked = () => {
    const errorGeneral = document.querySelector(`span[id="generalError"]`) as HTMLElement;
    if(this.claveNuevaInput.nativeElement.value !== "" && this.confirmacionClaveInput.nativeElement.value !== "" && this.claveActualInput.nativeElement.value !== ""){
      errorGeneral.textContent = "";
      errorGeneral.style.display = "none";
      this.resetearButtonClick.emit({claveActual: this.claveActual, claveNueva: this.claveNueva, confirmacionClaveNueva: this.confirmacionClaveNueva });
    }else{
      const errorClaveNueva = document.querySelector(`span[id="claveError"]`) as HTMLElement;
      const errorConfirmacion = document.querySelector(`span[id="confirmacion"]`) as HTMLElement;

      errorClaveNueva.textContent = "";
      errorClaveNueva.style.display = "none";

      errorConfirmacion.textContent = "";
      errorConfirmacion.style.display = "none";

      errorGeneral.textContent = "Por favor, complete los campos requeridos";
      errorGeneral.style.display = "flex";
      errorGeneral.style.color = "red";
      errorGeneral.style.fontWeight = "bold";
      errorGeneral.style.justifyContent = "center";
    }

  }


  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent) {
    const clickedInsideClaveNueva = this.claveNuevaInput.nativeElement.contains(event.target as Node);
    const errorClaveNueva = document.querySelector(`span[id="claveError"]`) as HTMLElement;
    const clickedInsideConfirmacion = this.confirmacionClaveInput.nativeElement.contains(event.target as Node);
    const errorConfirmacion = document.querySelector(`span[id="confirmacion"]`) as HTMLElement;
    if (!clickedInsideClaveNueva) {
      if(this.claveNuevaInput.nativeElement.value !== "" && this.claveNuevaInput.nativeElement.value.length < 8){
        errorClaveNueva.textContent = "La clave debe contener al menos 8 caracteres";
        errorClaveNueva.style.display = "flex";
        errorClaveNueva.style.color = "red";
        errorClaveNueva.style.fontWeight = "bold";
      }
      else if(this.claveActualInput.nativeElement.value !== "" && this.claveActualInput.nativeElement.value == this.claveNuevaInput.nativeElement.value){
        errorClaveNueva.textContent = "La clave nueva no puede ser igual que la clave actual";
        errorClaveNueva.style.display = "flex";
        errorClaveNueva.style.color = "red";
        errorClaveNueva.style.fontWeight = "bold";
      }else{
        errorClaveNueva.textContent = "";
        errorClaveNueva.style.display = "none";
      }
    }

    if(!clickedInsideConfirmacion){
      if(this.confirmacionClaveInput.nativeElement.value !== this.claveNuevaInput.nativeElement.value){
        errorConfirmacion.textContent = "Las claves no coinciden!";
        errorConfirmacion.style.display = "flex";
        errorConfirmacion.style.color = "red";
        errorConfirmacion.style.fontWeight = "bold";
      }
      else{
        errorConfirmacion.textContent = "";
        errorConfirmacion.style.display = "none";
      }
    }else{
      errorConfirmacion.textContent = "";
      errorConfirmacion.style.display = "none";
    }
  }
}
