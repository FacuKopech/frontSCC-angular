import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { ApiService } from './services/user_services/api.service';
import { SharedAuthService } from './services/sharedAuthService/shared-auth.service';
import { LoginService } from './services/login_services/login.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontSCC';
  openResetearClavePopup = false;
  showRessetClaveSuccessAlert = false;
  esResetearClave = false;
  esErrorClaveActualIncorrecta = false;
  esErrorConfirmacionClaveDesigual  = false;
  showErrorAlert = false;
  logueoFueraDeHorario = false;
  public loggedIn: boolean = false;
  public isUnauthorized: boolean = false;
  public groups: any[] = [];
  public content = '';
  isLoggedWithNoRoles: boolean = false;
  nombreUserLogueado = '';
  apellidoUserLogueado = '';
  loggedInUser: any;

  constructor(private apiService: ApiService, private router: Router,private authService: SharedAuthService, private loginService: LoginService) {
    if (window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
      console.log(window.location.pathname);
        if(window.location.pathname === "/" && this.loggedIn){
          this.router.navigate(['/home']);
        }else if(window.location.pathname === "/" && !this.loggedIn){
          this.router.navigate(['/login']);
        }
      
    }
  }

  ngOnInit(): void{
    this.loggedInUser = this.loginService.getLoggedInUser();
    this.logueoFueraDeHorario = false;
    const seMostro = localStorage.getItem('flag');
    if(seMostro == null){
      localStorage.setItem('flag', 'false');
    }
    if(this.loggedInUser != null){
      this.loggedIn = true;
      if(this.loggedInUser.roles.length > 0){
        this.groups = this.loggedInUser.roles;
        this.nombreUserLogueado = this.loggedInUser.nombre;
        this.apellidoUserLogueado = this.loggedInUser.apellido;
        if(localStorage.getItem('flag') == 'false'){
          for (let i = 0; i < this.groups.length; i++) {
            if(this.groups[i].tipo == "Padre"){
              const currentDate = new Date();
              const currentHour = currentDate.getHours();    
              const currentDay = currentDate.getDay();       
              if((currentHour < 8 || currentHour > 16) || (currentDay == 6) || (currentDay == 0)){
                this.logueoFueraDeHorario = true;
              }
              break;
            }
          }
        }
      }else{
        this.loggedIn = true;
        this.isLoggedWithNoRoles = true;
      }
    }else{
      this.loggedIn = false;
    }
   
    this.authService.isUnauthorized$.subscribe((unauthorized) => {
      this.isUnauthorized = unauthorized;
    });
  }

  public afterSuccessfulLogIn(){
    this.loggedInUser = this.loginService.getLoggedInUser();
    this.logueoFueraDeHorario = false;
    const seMostro = localStorage.getItem('flag');
    if(seMostro == null){
      localStorage.setItem('flag', 'false');
    }
    if(this.loggedInUser != null){
      this.loggedIn = true;
      if(this.loggedInUser.roles.length > 0){
        this.groups = this.loggedInUser.roles;
        this.nombreUserLogueado = this.loggedInUser.nombre;
        this.apellidoUserLogueado = this.loggedInUser.apellido;
        if(localStorage.getItem('flag') == 'false'){
          for (let i = 0; i < this.groups.length; i++) {
            if(this.groups[i].tipo == "Padre"){
              const currentDate = new Date();
              const currentHour = currentDate.getHours();           
              if((currentHour < 8 || currentHour > 16)){
                this.logueoFueraDeHorario = true;
              }
              break;
            }
          }
        }
      }else{
        this.loggedIn = true;
        this.isLoggedWithNoRoles = true;
      }
    }else{
      this.loggedIn = false;
    }
   
    this.authService.isUnauthorized$.subscribe((unauthorized) => {
      this.isUnauthorized = unauthorized;
    });
  }

  public getBackgroundImage(){
    if (this.loggedIn && !this.isUnauthorized) {
      return { 'background-image': 'url(https://a-static.besthdwallpaper.com/white-chalk-and-blackboard-used-in-schools-for-education-teaching-wallpaper-2560x1440-95599_51.jpg)' };
    }else if(!this.loggedIn){
      return { 'background-image': 'url(https://a-static.besthdwallpaper.com/white-chalk-and-blackboard-used-in-schools-for-education-teaching-wallpaper-2560x1440-95599_51.jpg)' };
    }else if(this.isUnauthorized){
      return { 'background-color': '#3f3f3f'};
    }else{
      return null;
    }
  }

  public Logout(): void {
    this.apiService.ActualizarLoginAuditEnLogoutAction().subscribe(res => {
      if(res){
        this.apiService.Logout().subscribe(res => {
          if (res) {        
            this.loginService.logoutUser();
            this.loggedIn = false;
            this.isUnauthorized = false;
            localStorage.removeItem('flag');
          }
        });
      }
    });    
    this.router.navigate(['']);
  }

  public volerAInicioClick(){
    this.isUnauthorized = false;
    this.router.navigate(['/home']);
  }

  public closeResetearPopup(){
    this.openResetearClavePopup = false;
  }

  public handleResetearClick(eventData: { claveActual: string, claveNueva: string, confirmacionClaveNueva: string }){
    const clave = {claveActual: eventData.claveActual, claveNueva: eventData.claveNueva, confirmacionClaveNueva: eventData.confirmacionClaveNueva}
    this.apiService.ResetearClave(clave).subscribe(res =>{
      if(res){
        this.showRessetClaveSuccessAlert = true;
        this.esResetearClave = true;
      }else{
        this.showErrorAlert = true;
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status == 400 && error.error == "La clave actual es incorrecta"){
        this.showErrorAlert = true;         
        this.esErrorClaveActualIncorrecta = true;
        this.esErrorConfirmacionClaveDesigual = false;
      }else if(error.status == 400 && error.error == "La clave nueva y su confirmacion no son iguales"){
        this.showErrorAlert = true;    
        this.esErrorClaveActualIncorrecta = false;
        this.esErrorConfirmacionClaveDesigual = true;
      }else{
        this.showErrorAlert = true;  
        this.esErrorClaveActualIncorrecta = false;
        this.esErrorConfirmacionClaveDesigual = false;  
      }
    });
  }

  public closeSuccessAlert(){
    this.openResetearClavePopup = false;
    this.showRessetClaveSuccessAlert = false;
    this.esResetearClave = false;
    this.Logout();
  }

  public closeErrorAlert(){
    this.showErrorAlert = false;
  }

  public closeFueraHorarioAlert(){
    localStorage.setItem('flag', 'true');
    this.logueoFueraDeHorario = false;
  }

  public homeClick(){
    this.router.navigate(['/home']);
  }

  public misHijosClick(){
    this.router.navigate(['/hijos']);
  }

  public misAulasClick(){
    this.router.navigate(['/aulas']);
  }

  public aulasClick(){
    this.router.navigate(['/aulas-institucion']);
  }

  public reportesClick(){
    this.router.navigate(['/reportes']);
  }

  public personasClick(){
    this.router.navigate(['/personas']);
  }

  public usuariosClick(){
    this.router.navigate(['/usuarios']);
  }
  
  public institucionesClick(){
    this.router.navigate(['/instituciones']);
  }

}
