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
  constructor(private apiService: ApiService, private router: Router) { }
  public loggedIn: boolean = false;
  public groups: any[] = [];
  public content = '';
  ngOnInit(): void{
    this.apiService.isLoggedIn().subscribe(res => {
      if (res) {
        this.loggedIn = true;
        this.groups = res['grupos'];
      }
    });
  }

  public Logout(): void {
    this.apiService.Logout().subscribe(res => {
      if (res) {
        this.loggedIn = false;
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

  public misHijosClick(){
    this.router.navigate(['/hijos']);
  }

}
