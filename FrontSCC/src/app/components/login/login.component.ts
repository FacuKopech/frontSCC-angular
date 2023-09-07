import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/user_services/api.service';
import {  tap } from 'rxjs';
import { AppComponent } from '../../app.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private apiService: ApiService, private router: Router, private appComponent: AppComponent) { }

  @Input() username: string = "";
  @Input() clave: string = "";
  public message: string = "";
  showOlvideMiClavePopup = false;
  showRecuperarClavePopup = false;
  showGeneracionNuevaClavePopup = false;
  showSuccessAlert = false;
  showErrorAlert = false;
  token: string = '';
  showPassword: boolean = false;
  emailUser: string='';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  public LogIn(): void {
    if (this.username == "" || this.clave == "") {
      this.message = "Debe ingresar sus credenciales para loguearse"
    }
    else {
      this.apiService.Login(this.username, this.clave).subscribe(res => {
        if (res) {
          this.message = "";
          this.router.navigate(['/home']);
          this.appComponent.ngOnInit();
        }
      },
      (error:HttpErrorResponse) =>{
        if(error.status == 404){
          this.message = "Usuario o clave incorrectos!";
          this.clave = '';
        }
      });
    }
  }

  public handleRecuperarClick(eventData: { email: string}){
    this.emailUser = eventData.email;
    this.apiService.RecuperarClave(eventData.email).subscribe(res => {
      if(!res.includes("ERROR")){
        this.showOlvideMiClavePopup = false;
        this.showRecuperarClavePopup = true;
        this.token = res;
      }
      else{

      }
    });
  }
  public handleValidarTokenClick(eventData: {token: string}){
    if(eventData.token.toUpperCase() == this.token){
      this.showRecuperarClavePopup = false;
      this.showGeneracionNuevaClavePopup = true;
    }else{
      this.showErrorAlert = true;
    }
  }

  public handleConfirmarClick(eventData: {nuevaClave: string}){
    const clave = {claveNueva: eventData.nuevaClave, emailUsuario: this.emailUser}
    this.apiService.RecuperacionClave(clave).subscribe(res => {
      this.showGeneracionNuevaClavePopup = false;
      if(res){
        this.showSuccessAlert = true;
      }else{
        this.showErrorAlert = true;
      }
    });
  }

  public closeModal(){
    this.showOlvideMiClavePopup = false;
  }

  public closeSuccessAlert(){
    this.showSuccessAlert = false;
  }

  public closeErrorAlert(){
    this.showErrorAlert = false;
  }
}
