import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login_services/login.service';
import { AdminService } from 'src/app/services/admin_services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private loginService: LoginService, private adminService: AdminService) { }
  
  public username: string = "";
  public groups: any[] = [];
  openErrorAlert = false;
  openSuccessAlert = false;
  esBackupDB = false;

  public ngOnInit(): void {
    const user = this.loginService.getLoggedInUser();
    if(user != null){
      this.username = user.usuario.username;
      this.groups = user.roles; 
    }
  }

  public backupClick(){
    this.adminService.Backup().subscribe(res => {
      debugger
      if(res){
        console.log(res);
        debugger
        this.openSuccessAlert = true;
        this.esBackupDB = true;
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status >= 400){
        this.openErrorAlert = true;
      }
    });
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

  public personasClick(){
    this.router.navigate(['/personas']);
  }

  public institucionesClick(){
    this.router.navigate(['/instituciones']);
  }
}
