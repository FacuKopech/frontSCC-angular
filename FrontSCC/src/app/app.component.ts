import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { ApiService } from './services/user_services/api.service';
import { SharedAuthService } from './services/sharedAuthService/shared-auth.service';
import { LoginService } from './services/login_services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontSCC';
  openResetearClavePopup = false;
  showRessetClaveSuccessAlert = false;
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
      return { 'background-image': 'url(https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1644&q=80)' };
    }else if(!this.loggedIn){
      return { 'background-image': 'url(https://a-static.besthdwallpaper.com/white-chalk-and-blackboard-used-in-schools-for-education-teaching-wallpaper-2560x1440-95599_51.jpg)' };
    }else if(this.isUnauthorized){
      return { 'background-color': '#3f3f3f'};
    }else{
      return null;
    }
  }

  public Logout(): void {
    this.apiService.Logout().subscribe(res => {
      if (res) {
        this.loginService.logoutUser();
        this.loggedIn = false;
        this.isUnauthorized = false;
        localStorage.removeItem('flag');
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
      }else{
        this.showErrorAlert = true;
      }
    });
  }

  public closeSuccessAlert(){
    this.openResetearClavePopup = false;
    this.showRessetClaveSuccessAlert = false;
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
