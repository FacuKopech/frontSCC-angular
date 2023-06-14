import { Component, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-olvide-mi-clave-popup',
  templateUrl: './olvide-mi-clave-popup.component.html',
  styleUrls: ['./olvide-mi-clave-popup.component.css']
})
export class OlvideMiClavePopupComponent {
  @ViewChild('emailInput', { static: false }) emailInput!: ElementRef<HTMLInputElement>;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  recuperarButtonClick = new EventEmitter<{email: string}>();

  email: string = '';


  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public recuperarClicked = () => {
    const emailError = document.querySelector(`span[id="emailError"]`) as HTMLElement;
    if(!this.emailInput.nativeElement.value.includes('@') || !this.emailInput.nativeElement.value.includes('.com')){
      emailError.textContent = "Debe ingresar un email valido";
      emailError.style.display = "flex";
      emailError.style.color = "red";
      emailError.style.fontWeight = "bold";
    }
    else{
      emailError.textContent = "";
      emailError.style.display = "none";
      this.recuperarButtonClick.emit({email: this.email});
    }

  }
}
