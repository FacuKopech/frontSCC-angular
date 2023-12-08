import { Component, Input, Output, EventEmitter, ElementRef, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-confirmar-clave-admin-popup',
  templateUrl: './confirmar-clave-admin-popup.component.html',
  styleUrls: ['./confirmar-clave-admin-popup.component.css']
})
export class ConfirmarClaveAdminPopupComponent {

  @ViewChild('claveInput', { static: false }) claveInput!: ElementRef<HTMLInputElement>;
  @Output()
  validarButtonClick = new EventEmitter<{clave: string}>();
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  @Input() esBackupDB: any;
  @Input() esRestoreDB: any;
  clave: string = '';
  
  public validarClicked = () => {
    const claveError = document.querySelector(`span[id="claveError"]`) as HTMLElement;
    if(this.claveInput.nativeElement.value == ''){
      claveError.textContent = "Debe ingresar una clave";
      claveError.style.display = "flex";
      claveError.style.color = "red";
      claveError.style.fontWeight = "bold";
    }else{
      claveError.textContent = "";
      claveError.style.display = "none";
      this.validarButtonClick.emit({clave: this.clave});
    }
  }

  
  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
}

