import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/user_services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  constructor(private userService: ApiService, private location: Location){}

  public users: any[] = [];
  public user: any;
  public message: string = "";
  public itemForDelete: string = "";
  openSuccessAlert = false;
  openErrorAlert = false;
  openUserRolesPopup = false;
  openDeletePopup = false;
  esEliminarUser = false;
  openAgregarUsuario = false;
  openEditarUsuarioPopup = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit(): void{
    this.userService.ObtenerUsuariosSistema().subscribe(res => {
      this.message = "";
      if(res){
        this.users = res;
        console.log(this.users);
        if(this.users.length == 0){
          this.message = "Usted aun no ha agregado Usuarios al sistema";
        }
      }
    });
  }

  public verRoles(user: any){
    this.user = user;
    this.openUserRolesPopup = true;
  }

  public eliminarUser(user: any){
    this.openDeletePopup = true;
    this.itemForDelete = "Usuario";
    this.user = user;
  }

  public editarUser(user: any){
    this.user = user;
    this.openEditarUsuarioPopup = true;
  }

  public deleteUserConfirmed(){
    this.openDeletePopup = false;
    this.userService.EliminarUsuario(this.user.id).subscribe(res => {
      if(res){
        this.openSuccessAlert = true;
        this.esEliminarUser = true;
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status >= 400){
        this.openErrorAlert = true;
      }
    })
  }

  public cerrarSuccess(){
    this.openSuccessAlert = false;
    window.location.reload();
  }

  public calculateIndices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return { startIndex, endIndex };
  }

  public getPages(): number[] {
    const totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  public pageClick(page: number){
    this.currentPage = page;
  }

  public previousPageClick(){
    this.currentPage = this.currentPage - 1
  }

  public nextPageClick(){
    this.currentPage = this.currentPage + 1
  }

  public goBack(){
    this.location.back();
  }
}
