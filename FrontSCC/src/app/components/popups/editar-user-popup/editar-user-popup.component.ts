import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/user_services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-user-popup',
  templateUrl: './editar-user-popup.component.html',
  styleUrls: ['./editar-user-popup.component.css']
})
export class EditarUserPopupComponent {
  @Input() user: any;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('dropdownMenu', { static: false }) rolesMenuRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('emailInput', { static: false }) emailInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('usernameInput', { static: false }) usernameInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('claveInput', { static: false }) claveInputRef!: ElementRef<HTMLInputElement>;

  constructor (private userService: ApiService){}

  emailUsuario: string = '';
  usernameUsuario: string = '';
  claveUsuario: string = '';
  rolesUser: any[] = [];
  rolesUserTipos: any[] = [];
  rolesSistema: any[] = [];
  rolesSeleccionados: any[] = [];
  showErrorAlert=  false;
  esErrorEmailRepetido = false;
  esErrorUsernameRepetido = false;
  showSuccessAlert = false;
  esEditarUsuario = false;
  rolesArraysAreEqual = false;
  
  public ngOnInit(){
    this.emailUsuario = this.user.email;
    this.usernameUsuario = this.user.username;
    this.userService.ObtenerRolesUsuario(this.user.id).subscribe(res => {
      if(res){
        this.rolesUser = res;
        for (let index = 0; index < this.rolesUser.length; index++) {
          this.rolesSeleccionados.push(this.rolesUser[index].tipo)          
        }
        for (let index = 0; index < this.rolesUser.length; index++) {
          this.rolesUserTipos.push(this.rolesUser[index].tipo)          
        }
        
        this.userService.ObtenerRolesSistema().subscribe(res => {
          if(res){
            this.rolesSistema = res;
          }
        });
      }
    });
  }

  public editarClick(){
    const emailError =   document.querySelector(`span[id="emailError"]`) as HTMLElement;
    const usernameError =   document.querySelector(`span[id="usernameError"]`) as HTMLElement;
    const generalError =   document.querySelector(`span[id="generalError"]`) as HTMLElement;
    this.checkRolesArraysEquality();
    if(this.emailInputRef.nativeElement.value == this.user.email && this.usernameInputRef.nativeElement.value == this.user.username && this.rolesArraysAreEqual){
        generalError.textContent = "Para poder editar un Usuario, debe modificar al menos un campo: Email - Username - Roles";
        generalError.style.display = "flex";
        generalError.style.color = "red";
        generalError.style.fontWeight = "bold";
    }else if(this.emailInputRef.nativeElement.value == ''){
      emailError.textContent = "Este campo es requerido";
      emailError.style.display = "flex";
      emailError.style.color = "red";
      emailError.style.fontWeight = "bold";
    }else if(this.usernameInputRef.nativeElement.value == ''){
      usernameError.textContent = "Este campo es requerido";
      usernameError.style.display = "flex";
      usernameError.style.color = "red";
      usernameError.style.fontWeight = "bold";
    }else{
      const eventData = {
        email: this.emailInputRef.nativeElement.value,
        username: this.usernameInputRef.nativeElement.value,
        clave: this.claveInputRef.nativeElement.value,
        rolesSeleccionados:  this.rolesSeleccionados
      };
      if(eventData.clave == ''){
        eventData.clave = this.user.clave;
      }
      this.userService.EditarUsuario(this.user.id, eventData).subscribe(res => {
        if(res){
          this.showSuccessAlert = true;
          this.esEditarUsuario = true;
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

  public checkRolesArraysEquality(){
    var counter = 0;
    for (let index = 0; index < this.rolesUserTipos.length; index++) {
      if(this.rolesSeleccionados.includes(this.rolesUserTipos[index])){
        counter += 1;
      }
    }
    if(counter === this.rolesUserTipos.length && this.rolesUserTipos.length ===  this.rolesSeleccionados.length){
      this.rolesArraysAreEqual = true;
    }else{
      this.rolesArraysAreEqual = false;
    }
  }
  public cancelarClicked(){
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public closeSuccessAlert(){
    this.showSuccessAlert = false;
    this.esEditarUsuario = false;
    window.location.reload();
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
    console.log(this.rolesSeleccionados)
  }
}
