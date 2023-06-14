import { Component, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-recuperar-clave-popup',
  templateUrl: './recuperar-clave-popup.component.html',
  styleUrls: ['./recuperar-clave-popup.component.css']
})
export class RecuperarClavePopupComponent {
  @ViewChild('tokenInput', { static: false }) tokenInput!: ElementRef<HTMLInputElement>;
  @Output()
  validarButtonClick = new EventEmitter<{token: string}>();

  token: string = '';

  ngAfterViewInit(): void {
    this.tokenInput.nativeElement.addEventListener('input', (event: Event) => {
      const inputValue = (event.target as HTMLInputElement).value;
      if(inputValue.length == 3){
        this.tokenInput.nativeElement.value += '-'
      }else if (inputValue.length == 4 && inputValue.charAt(3) === '-') {
        // The user is deleting characters, remove the hyphen
        this.tokenInput.nativeElement.value = inputValue.slice(0, 3);
      }
    })
  }

  public validarClicked = () => {
    const tokenError = document.querySelector(`span[id="tokenError"]`) as HTMLElement;
    if(this.tokenInput.nativeElement.value.length !== 7){ //contando el '-'
      tokenError.textContent = "El Token debe contener 6 caracteres y es alfanumerico.";
      tokenError.style.display = "flex";
      tokenError.style.color = "red";
      tokenError.style.fontWeight = "bold";
    }else{
      tokenError.textContent = "";
      tokenError.style.display = "none";
      this.validarButtonClick.emit({token: this.token});
    }
  }
}
