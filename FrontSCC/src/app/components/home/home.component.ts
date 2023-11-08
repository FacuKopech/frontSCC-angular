import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/user_services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private apiService: ApiService, private router: Router) { }
  public username: string = "";
  public groups: any[] = [];


  public ngOnInit(): void {
    const isLoggedInResult = localStorage.getItem('isLoggedInResult');
    console.log(isLoggedInResult);
    var isLoggedInResultObject = null;
    if(isLoggedInResult != null){
      isLoggedInResultObject = JSON.parse(isLoggedInResult);
    }
    if(isLoggedInResultObject != null){
      this.username = isLoggedInResultObject.usuario.username;
      this.groups = isLoggedInResultObject.usuario.grupos; 
    }
    // this.apiService.isLoggedIn().subscribe(res => {
    //   if (res) {
    //     this.username = res.usuario.username;
    //     this.groups = res.usuario.grupos; 
    //   }
    // });
  }

  public NotasEmitidas(): void {
    this.router.navigate(['/notas_emitidas']);
  }

  public NotasRecibidas(): void {
    this.router.navigate(['/notas_recibidas']);
  }

  public usuariosClick(){
    this.router.navigate(['/usuarios']);
  }
}
