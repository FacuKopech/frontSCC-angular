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
  public historial: any
  @Input() hijo: any;
  @Input() alumno: any;
  @Input() accedeDirectivo: any;
  idHistorial: string = '';
  emailPersonaLogueada: string = "";
  openConfirmacionFirmaHistorialPopup = false;
  openTokenConfirmation = false;
  esTokenParaFirmaHistorial = false;
  openSuccessAlert = false;
  openErrorAlert = false;
  esFirmaHistorial = false;
  esAgregarHistorial = false;
  esEliminarHistorial = false;
  esEditarHistorial = false;
  esAlumno = false;
  openAgregarHistorialPopup = false;
  openConfirmDeletePopup = false;
  openEditarHistorialPopup = false;
  esErrorAgregarHistorialAlumnoSinPadre = false;
  itemForDelete: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;

  constructor( private historialService: HistorialService, private userService: ApiService, private location: Location){}

  ngOnInit(){
    this.esAlumno = history.state.esAlumno;
    this.accedeDirectivo = history.state.accedeDirectivo;
    if(this.esAlumno){
      this.alumno = history.state.data;
      this.historialService.ObtenerHistorialesHijo(this.alumno.id).subscribe(res => {
      this.message = "";
      this.historiales = res;
      if(this.historiales.length == 0){
        this.message = `${this.alumno.nombre} aun no tiene ningun historial registrado`;
      }
    });
    }else{
      this.hijo = history.state.data;
      this.historialService.ObtenerHistorialesHijo(this.hijo.id).subscribe(res => {
        this.message = "";
        this.historiales = res;
        if(this.historiales.length == 0){
          this.message = `${this.hijo.nombre} aun no tiene ningun historial registrado`;
        }
      });
    }
  }
  public openConfirmacionFirmaPopup(id: string){
    this.idHistorial = id;
    this.openConfirmacionFirmaHistorialPopup = true;
  }

  public handleFirmarClick(){
    this.userService.getEmailPersonaLogueada().subscribe(res => {
      if(res){
        this.userService.EnviarTokenSeguridad(res, "Historial").subscribe(res => {
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
          this.openTokenConfirmation = false;
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

  public handleAgregarHistorialClick(eventData: {descripcion: string, calificacion: number, estado: number}){
    this.historialService.AgregarHistorial(this.alumno.id, eventData.descripcion, eventData.calificacion, eventData.estado).subscribe(res => {
      if(res){
        this.openSuccessAlert = true;
        this.esAgregarHistorial = true;
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status == 400 && error.error == "No puede agregarse el Historial debido a que el Alumno aun no tiene Padre(s) asignado(s)"){
        this.openErrorAlert = true;
        this.esErrorAgregarHistorialAlumnoSinPadre = true;
      }else if(error.status >= 400){
        this.openErrorAlert = true;
        this.esErrorAgregarHistorialAlumnoSinPadre = false;
      }
    });
  }

  public handleEditHistorialClick(eventData: {idHistorial: string, descripcion: string, calificacion: number, estado: number}){
    this.historialService.EditarHistorial(this.alumno.id, eventData).subscribe(res => {
      if(res){
        this.openSuccessAlert = true;
        this.esEditarHistorial = true;
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status == 404 || error.status == 400){
        this.openErrorAlert = true;
      }
    });
  }

  public openDeletion(idHistorial: string){
    this.openConfirmDeletePopup = true;
    this.itemForDelete = "historial";
    this.idHistorial = idHistorial;
  }

  public closeDeletionPopup(){
    this.openConfirmDeletePopup = false;
  }

  public closeAgregarPopup(){
    this.openAgregarHistorialPopup = false;
  }

  public deleteClicked(){
    this.historialService.EliminarHistorial(this.idHistorial, this.alumno.id).subscribe(res => {
      if(res){
        this.openSuccessAlert = true;
        this.esEliminarHistorial = true;
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status == 404 || error.status == 400){
        this.openErrorAlert = true;
      }
    });
  }

  public openEdition(historial: any){
    this.historial = historial;
    this.openEditarHistorialPopup = true;
  }
  public aceptarClick(){
    this.openConfirmDeletePopup = false;
    this.openSuccessAlert = false;
    window.location.reload();
  }

  public calculateIndices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return { startIndex, endIndex };
  }

  public getPages(): number[] {
    const totalPages = Math.ceil(this.historiales.length / this.itemsPerPage);
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
