import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login_services/login.service';
import { AdminService } from 'src/app/services/admin_services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from 'src/app/services/user_services/api.service';
import { EncryptionService } from 'src/app/services/encryption_services/encryption.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private loginService: LoginService, private adminService: AdminService, private userService: ApiService, private encryptionService: EncryptionService) { }
  
  public username: string = "";
  public groups: any[] = [];
  path: string = '';
  openErrorAlert = false;
  openSuccessAlert = false;
  openClaveConfirmacion = false;
  esBackupDB = false;
  esRestoreDB = false;

  public ngOnInit(): void {
    const user = this.loginService.getLoggedInUser();
    if(user != null){
      this.username = user.usuario.username;
      this.groups = user.roles; 
    }
  }

  public esBackUpClick(){
    this.esBackupDB = true;
    this.esRestoreDB = false;
    this.openClaveConfirmacion = true;
  }

  public esRestoreClick(){
    this.esBackupDB = false;
    this.esRestoreDB = true;
    this.openClaveConfirmacion = true;
  }

  public validarClaveAdmin(event:{clave: string}){
    const claveAdmin = this.encryptionService.encryptPassword(event.clave);
    this.userService.ValidarClaveAdmin(claveAdmin).subscribe(res => {
      if(res){
        this.openClaveConfirmacion = false;
        if(this.esBackupDB){
          this.backupClick();
        }else if(this.esRestoreDB){
          this.restoreClick();
        }        
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status >= 400){
        this.openClaveConfirmacion = false;
        this.openErrorAlert = true;
      }
    });
  }

  public backupClick(){    
    this.adminService.Backup().subscribe((res:any) => {
      if(res){
        this.path = res.path;
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

  public restoreClick(){    
    this.adminService.Restore().subscribe((res:any) => {
      if(res){
        this.openSuccessAlert = true;
        this.esRestoreDB = true;
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

  public personasClick(){
    this.router.navigate(['/personas']);
  }

  public usuariosClick(){
    this.router.navigate(['/usuarios']);
  }

  public auditoriasClick(){
    this.router.navigate(['/reportes']);
  }

  public institucionesClick(){
    this.router.navigate(['/instituciones']);
  }
}
