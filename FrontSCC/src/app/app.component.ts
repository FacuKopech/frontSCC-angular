import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router   } from '@angular/router';
import { ApiService } from './services/user_services/api.service';
import { SharedAuthService } from './services/sharedAuthService/shared-auth.service';

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

  constructor(private apiService: ApiService, private router: Router,private authService: SharedAuthService) {
    if (window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
      console.log(window.location.pathname);
      this.apiService.isLoggedIn().subscribe(res => {
        if (res) {
          this.loggedIn = res;
          if(window.location.pathname === "/" && this.loggedIn){
            this.router.navigate(['/home']);
          }else if(window.location.pathname === "/" && !this.loggedIn){
            this.router.navigate(['/login']);
          }
        }
      });
    }
  }

  ngOnInit(): void{
    this.logueoFueraDeHorario = false;
    const seMostro = localStorage.getItem('flag');
    if(seMostro == null){
      localStorage.setItem('flag', 'false');
    }

    this.apiService.isLoggedIn().subscribe(res => {
      if (res) {
        console.log(res);
        this.loggedIn = true;
        this.groups = res.usuario.grupos;
        this.nombreUserLogueado = res.nombre;
        this.apellidoUserLogueado = res.apellido;
        if(this.groups.length > 0){
          // preguntamos a que hora se loguea el padre
          if(localStorage.getItem('flag') == 'false'){
            for (let i = 0; i < this.groups.length; i++) {
              if(this.groups[i].tipo == "Padre"){
                const currentDate = new Date();
                const currentHour = currentDate.getHours();
                const currentDay = currentDate.getDay()
                if((currentHour <= 8 || currentHour >= 16)){
                  this.logueoFueraDeHorario = true;
                }
                break;
              }
            }
          }
        }else{
          this.isLoggedWithNoRoles = true;
        }
      }
    });

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
        this.loggedIn = false;
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

}
