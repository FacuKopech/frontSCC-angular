import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/user_services/api.service';

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

  constructor(private apiService: ApiService, private router: Router) { }


  ngOnInit(): void{
    this.logueoFueraDeHorario = false;
    const seMostro = localStorage.getItem('flag');
    if(seMostro == null){
      localStorage.setItem('flag', 'false');
    }
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
