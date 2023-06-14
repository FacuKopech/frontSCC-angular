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
    this.recuperarButtonClick.emit({email: this.email});
  }
}
