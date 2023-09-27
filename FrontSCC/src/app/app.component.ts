import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public groups: any[] = [];
  public content = '';

  constructor(private apiService: ApiService, private router: Router,private authService: SharedAuthService) { }

  ngOnInit(): void{
    this.logueoFueraDeHorario = false;
    const seMostro = localStorage.getItem('flag');
    if(seMostro == null){
      localStorage.setItem('flag', 'false');
    }
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
    this.apiService.isLoggedIn().subscribe(res => {
      if (res) {
        this.loggedIn = true;
        this.groups = res['grupos'];

        // preguntamos a que hora se loguea el padre
        if(localStorage.getItem('flag') == 'false'){
          for (let i = 0; i < this.groups.length; i++) {
            if(this.groups[i].tipo == "Padre"){
              const currentDate = new Date();
              const currentHour = currentDate.getHours();
              const currentDay = currentDate.getDay()
              if((currentHour <= 8 || currentHour >= 16) && (currentDay == 6 || currentDay == 0)){
                this.logueoFueraDeHorario = true;
              }
              break;
            }
          }
        }
      }
    });
  }

  public getBackgroundImage(){
    if (this.loggedIn) {
      return { 'background-image': 'url(https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1644&q=80)' };
    }else {
      return { 'background-image': 'url(https://a-static.besthdwallpaper.com/white-chalk-and-blackboard-used-in-schools-for-education-teaching-wallpaper-2560x1440-95599_51.jpg)' };
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

  public misHijosClick(){
    this.router.navigate(['/hijos']);
  }

  public misAulasClick(){
    this.router.navigate(['/aulas']);
  }

}
