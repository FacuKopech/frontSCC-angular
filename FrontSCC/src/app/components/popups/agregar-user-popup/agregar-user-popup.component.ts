import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/user_services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EncryptionService } from 'src/app/services/encryption_services/encryption.service';

@Component({
  selector: 'app-agregar-user-popup',
  templateUrl: './agregar-user-popup.component.html',
  styleUrls: ['./agregar-user-popup.component.css']
})
export class AgregarUserPopupComponent {
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('dropdownMenu', { static: false }) rolesMenuRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('emailInput', { static: false }) emailInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('usernameInput', { static: false }) usernameInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('claveInput', { static: false }) claveInputRef!: ElementRef<HTMLInputElement>;

  rolesSeleccionados: any[] = [];
  roles: any[] = [];
  showErrorAlert = false;
  showSuccessAlert = false;
  esAgregarUsuario = false;
  esErrorEmailRepetido = false;
  esErrorUsernameRepetido = false;

  constructor (private userService: ApiService, private encryptionService: EncryptionService){}

  public ngOnInit(){
    this.userService.ObtenerRolesSistema().subscribe(res => {
      if(res){
        this.roles = res;
      }
    });
  }

  public cancelarClicked(){
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public cerrarSuccess(){
    this.showSuccessAlert = false;
    window.location.reload();
  }

  public agregarClicked(){    
    const emailError =   document.querySelector(`span[id="emailError"]`) as HTMLElement;
    const usernameError =   document.querySelector(`span[id="usernameError"]`) as HTMLElement;
    const claveError =   document.querySelector(`span[id="claveError"]`) as HTMLElement;
    if(this.emailInputRef.nativeElement.value == ""){
      emailError.textContent = "Este campo es requerido";
      emailError.style.display = "flex";
      emailError.style.color = "red";
      emailError.style.fontWeight = "bold";
    }else  if(this.usernameInputRef.nativeElement.value == ""){
      usernameError.textContent = "Este campo es requerido";
      usernameError.style.display = "flex";
      usernameError.style.color = "red";
      usernameError.style.fontWeight = "bold";
    }else  if(this.claveInputRef.nativeElement.value == ""){
      claveError.textContent = "Este campo es requerido";
      claveError.style.display = "flex";
      claveError.style.color = "red";
      claveError.style.fontWeight = "bold";
    }else{
      const eventData = {
        email: this.emailInputRef.nativeElement.value,
        username: this.usernameInputRef.nativeElement.value,
        clave: this.encryptionService.encryptPassword(this.claveInputRef.nativeElement.value),
        rolesSeleccionados: this.rolesSeleccionados
      };
      this.userService.AgregarUsuario(eventData).subscribe(res => {
        if(res){
          this.showSuccessAlert = true;
          this.esAgregarUsuario = true;
        }
      },
      (error:HttpErrorResponse) =>{
        if(error.status == 400 && error.error == "Ya existe un Usuario con ese Email registrado"){
          this.showErrorAlert = true;         
          this.esErrorEmailRepetido = true;
          this.esErrorUsernameRepetido = false;
        }else if(error.status == 400 && error.error == "Ya existe un Usuario con ese Username registrado"){
          this.showErrorAlert = true;    
          this.esErrorUsernameRepetido = true;
          this.esErrorEmailRepetido = false;
        }else{
          this.showErrorAlert = true;  
          this.esErrorUsernameRepetido = false;
          this.esErrorEmailRepetido = false;  
        }
      });
    }
  } 

  showDropDownListRoles(){
    var dropDownListMenuAlumnos = this.rolesMenuRef.nativeElement;
    if(dropDownListMenuAlumnos.style.display == "flex"){
      dropDownListMenuAlumnos.style.display = "none";
    }else{
      dropDownListMenuAlumnos.style.display = "flex";
    }
  }

  public rolCheck(rol: any){
    let arrayAnterior: any[] = [];
    arrayAnterior = this.rolesSeleccionados;
    this.rolesSeleccionados = this.rolesSeleccionados.filter((rolArray) => rolArray != rol.tipo);
    if(arrayAnterior.length == this.rolesSeleccionados.length){
      this.rolesSeleccionados.push(rol.tipo);
    }
  }

}
