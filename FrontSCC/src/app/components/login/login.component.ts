import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/user_services/api.service';
import { AppComponent } from '../../app.component';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/services/login_services/login.service';
import * as CryptoJS from 'crypto-js/';
import { EncryptionService } from 'src/app/services/encryption_services/encryption.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  authSubscription!: Subscription;
  constructor(private apiService: ApiService, private router: Router, private appComponent: AppComponent, private loginService: LoginService, private encryptionService: EncryptionService, private socialAuthService: SocialAuthService) { }
  @Input() username: string = "";
  @Input() clave: string = "";
  public message: string = "";
  public loggedInActionRegistered = false;
  showOlvideMiClavePopup = false;
  showRecuperarClavePopup = false;
  showGeneracionNuevaClavePopup = false;
  showSuccessAlert = false;
  showErrorAlert = false;
  token: string = '';
  showPassword: boolean = false;
  emailUser: string = '';
  passwordHidden: boolean = true;
  socialUser!: SocialUser | null;

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  ngOnInit() {
    this.authSubscription = this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        console.log('calling login backend')
        this.apiService.Login(user.email, '', '').subscribe(res => {
          if (res) {
            this.loginService.setLoggedInUser(res);
            this.message = "";
            this.router.navigate(['/home']);
            this.appComponent.afterSuccessfulLogIn();
          }
        })
      }
    },
      (error: HttpErrorResponse) => {
        console.log(error)
        if (error.status == 400) {
          this.message = "Usuario o clave incorrectos";
          this.clave = '';
        } else if (error.status == 404) {
          if (error.error.includes("Usuario no encontrado")) {
            this.message = "Usuario no encontrado o credenciales incorrectas";
            this.clave = '';
          } else if (error.error.includes("Usuario sin Persona asignada")) {
            this.message = "Usuario sin Persona asignada";
            this.clave = '';
          }
        } else if (error.status >= 500 || error.status == 0) {
          this.message = "Error del servidor";
          this.clave = '';
        }
      });
  }

  togglePasswordVisibility() {
    if (this.passwordHidden) {
      this.passwordHidden = false;
    } else {
      this.passwordHidden = true;
    }
  }

  public handleLogIn() {
    if (this.username == "" || this.clave == "") {
      this.message = "Ingrese sus credenciales"
    }
    else {
      const encryptedPassword = this.encryptionService.encryptPassword(this.clave);
      this.apiService.Login('', this.username, encryptedPassword).subscribe(res => {
        if (res) {
          this.loginService.setLoggedInUser(res);
          this.message = "";
          this.router.navigate(['/home']);
          this.appComponent.afterSuccessfulLogIn();
        }
      },
        (error: HttpErrorResponse) => {
          console.log(error)
          if (error.status == 400) {
            this.message = "Usuario o clave incorrectos";
            this.clave = '';
          } else if (error.status == 404) {
            if (error.error.includes("Usuario no encontrado")) {
              this.message = "Usuario no encontrado o credenciales incorrectas";
              this.clave = '';
            } else if (error.error.includes("Usuario sin Persona asignada")) {
              this.message = "Usuario sin Persona asignada";
              this.clave = '';
            }
          } else if (error.status >= 500 || error.status == 0) {
            this.message = "Error del servidor";
            this.clave = '';
          }
        });
    }
  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }

  public handleRecuperarClick(eventData: { email: string }) {
    if (eventData.email.length > 0) {
      this.emailUser = eventData.email;
    }
    this.apiService.RecuperarClave(this.emailUser).subscribe(res => {
      if (!res.includes("ERROR")) {
        this.showOlvideMiClavePopup = false;
        this.showRecuperarClavePopup = true;
        this.token = res;
      }
      else {
        this.showErrorAlert = true;
      }
    });
  }
  public handleValidarTokenClick(eventData: { token: string }) {
    if (eventData.token.toUpperCase() == this.token) {
      this.showRecuperarClavePopup = false;
      this.showGeneracionNuevaClavePopup = true;
    } else {
      this.showErrorAlert = true;
    }
  }

  public handleConfirmarClick(eventData: { nuevaClave: string }) {
    const encryptedPassword = this.encryptionService.encryptPassword(eventData.nuevaClave);
    const clave = { claveNueva: encryptedPassword, emailUsuario: this.emailUser }
    this.apiService.RecuperacionClave(clave).subscribe(res => {
      this.showGeneracionNuevaClavePopup = false;
      if (res) {
        this.showSuccessAlert = true;
        this.message = '';
      } else {
        this.showErrorAlert = true;
      }
    });
  }

  public closeModal() {
    this.showOlvideMiClavePopup = false;
  }

  public closeSuccessAlert() {
    this.showSuccessAlert = false;
  }

  public closeErrorAlert() {
    this.showErrorAlert = false;
  }
}
