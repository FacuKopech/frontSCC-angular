import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { HistorialService } from 'src/app/services/historiales_services/historial.service';
import { ApiService } from 'src/app/services/user_services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-historiales',
  templateUrl: './historiales.component.html',
  styleUrls: ['./historiales.component.css']
})
export class HistorialesComponent{
  message: string='';
  token: string='';
  public historiales: any[] = [];
  @Input() hijo: any;
  @Input() alumno: any;
  idHistorial: number = -1;
  emailPersonaLogueada: string = "";
  openConfirmacionFirmaHistorialPopup = false;
  openTokenConfirmation = false;
  esTokenParaFirmaHistorial = false;
  openSuccessAlert = false;
  openErrorAlert = false;
  esFirmaHistorial = false;
  esEliminarHistorial = false;
  esEditarHistorial = false;
  esAlumno = false;
  openAgregarHistorialPopup = false;
  openConfirmDeletePopup = false;
  itemForDelete: string = '';

  constructor( private historialService: HistorialService, private userService: ApiService, private location: Location){}

  ngOnInit(){
    this.esAlumno = history.state.esAlumno;
    if(this.esAlumno){
      this.alumno = history.state.data;
      this.historialService.ObtenerHistorialesHijo(this.alumno.id).subscribe(res => {
      this.message = "";
      this.historiales = res;
      console.log(this.historiales);
      if(this.historiales.length == 0){
        this.message = `${this.alumno.nombre} aun no tiene ningun historial registrado`;
      }
    });
    }else{
      this.hijo = history.state.data;
      this.historialService.ObtenerHistorialesHijo(this.hijo.id).subscribe(res => {
        this.message = "";
        this.historiales = res;
        console.log(this.historiales);
        if(this.historiales.length == 0){
          this.message = `${this.hijo.nombre} aun no tiene ningun historial registrado`;
        }
      });
    }
  }
  public openConfirmacionFirmaPopup(id: number){
    this.idHistorial = id;
    this.openConfirmacionFirmaHistorialPopup = true;
  }

  public handleFirmarClick(){
    this.userService.getEmailPersonaLogueada().subscribe(res => {
      if(res){
        this.userService.EnviarTokenSeguridad(res).subscribe(res => {
          if(!res.includes('ERROR')){
            this.token = res;
          }
        });
      }
    });
    this.esTokenParaFirmaHistorial = true;
    this.openTokenConfirmation = true;
  }

  public validarToken(eventData: {token: string}){
    if(this.token == eventData.token.toUpperCase()){
      this.historialService.FirmarHistorial(this.hijo.id, this.idHistorial).subscribe(res =>{
        if(res){
          this.esFirmaHistorial = true;
          this.openSuccessAlert = true;
        }else{
          this.openErrorAlert = true;
        }
      });
    }else{
      this.openErrorAlert = true;
    }
  }

  public openDeletion(idHistorial: number){
    this.openConfirmDeletePopup = true;
    this.itemForDelete = "historial";
    this.idHistorial = idHistorial;
  }

  public closeDeletionPopup(){
    this.openConfirmDeletePopup = false;
  }

  public deleteClicked(){
    this.historialService.EliminarHistorial(this.idHistorial, this.alumno.id).subscribe(res => {
      if(res){
        this.openSuccessAlert = true;
        this.esEliminarHistorial = true;
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status == 404){
        this.openErrorAlert = true;
      }
    });
  }

  public openEdition(historial: any){

  }
  public aceptarClick(){
    this.openConfirmDeletePopup = false;
    this.openSuccessAlert = false;
    window.location.reload();
  }

  public goBack(){
    this.location.back();
  }
}
