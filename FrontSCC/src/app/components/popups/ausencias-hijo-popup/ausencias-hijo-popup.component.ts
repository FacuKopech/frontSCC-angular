import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AusenciaService } from 'src/app/services/ausencias_services/ausencia.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ausencias-hijo-popup',
  templateUrl: './ausencias-hijo-popup.component.html',
  styleUrls: ['./ausencias-hijo-popup.component.css']
})
export class AusenciasHijoPopupComponent {
  @Input() ausencias: any[] = [];
  @Input() hijo: any;
  @Input() idHijo: number = -1;
  @Input() message: string ='';
  @Input() alumno: any;
  @Input() esAusenciasHijo = false;
  @Input() esAusenciasAlumno = false;
  ausencia: any;
  idAlumno: number = -1;
  openDatosAusenciaPopup = false;
  openSuccessAlert = false;
  openErrorAlert = false;
  esDeleteAusencia = false;
  esEditAusencia = false;
  esAgregarAusencia = false;
  esAceptarAusencia = false;
  esDenegarAusencia = false;
  openAgregarAusenciaPopup = false;
  counter: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 4;

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  constructor(private ausenciaService: AusenciaService) {
  }

  public ngOnInit(){
    if(this.hijo != null){
      this.esAusenciasHijo = true;
      this.esAusenciasAlumno = false;
    }else if(this.alumno != null){
      this.esAusenciasAlumno = true;
      this.esAusenciasHijo = false;
    }
  }

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  getBackgroundColor(ausencia: any): any {
    if (ausencia.justificada == "Si") {
      return { 'background-color': '#0A7B30' };
    } else if (ausencia.justificada == "No"){
      return { 'background-color': '#9D140A' };
    }else{
      return { 'background-color': 'rgb(100 100 100)' };
    }
  }

  public verAusenciaHijo(ausencia: any, idHijo: number){
    this.ausencia = ausencia;
    this.idHijo = idHijo;
    this.openDatosAusenciaPopup = true;
  }

  public verAusenciaAlumno(ausencia: any){
    this.ausencia = ausencia;
    this.idAlumno = this.alumno.id;
    this.openDatosAusenciaPopup = true;
  }

  public handleCancelarClicked(){
    this.openDatosAusenciaPopup = false;
  }

  public handleDeleteClicked(eventData: { idAusencia: number, idHijo: number }){
    this.ausenciaService.EliminarAusencia(eventData.idAusencia, eventData.idHijo).subscribe(res =>{
      if(res){
        this.openSuccessAlert = true;
        this.esDeleteAusencia = true;
      }else{
       this.openErrorAlert = true;
      }
    });
  }

  public handleEditClicked(eventData: {fechaComienzo: Date, fechaFin: Date, motivo: string }){
    this.ausenciaService.EditarAusencia(this.ausencia.id, this.idHijo, eventData).subscribe(res =>{
      if(res){
        this.openSuccessAlert = true;
        this.esEditAusencia = true;
      }else{
       this.openErrorAlert = true;
      }
    });
  }

  public handleAgregarClick(eventData: {fechaComienzo: Date, fechaFin: Date, motivo: string, files: FormData}){
    eventData.files?.forEach((value, key) => {
      if(value != '' || key != ''){
        this.counter += 1;
      }
    });
    if(this.counter > 0){
      this.ausenciaService.AgregarAusenciaFiles(eventData.files).subscribe(res =>{
        if(res){
          this.ausenciaService.AgregarAusencia(this.idHijo, eventData.fechaComienzo, eventData.fechaFin, eventData.motivo).subscribe(res => {
            if(res){
              this.openSuccessAlert = true;
              this.esAgregarAusencia = true;
            }else{
              this.openErrorAlert = true;
            }
          },
          (error:HttpErrorResponse) =>{
            if(error.status == 404 || error.status == 400){
              this.openErrorAlert = true;
            }
          });
        }
      });
    }else{
      this.ausenciaService.AgregarAusencia(this.idHijo, eventData.fechaComienzo, eventData.fechaFin, eventData.motivo).subscribe(res => {
        if(res){
          this.openSuccessAlert = true;
          this.esAgregarAusencia = true;
        }else{
          this.openErrorAlert = true;
        }
      },
      (error:HttpErrorResponse) =>{
        if(error.status == 404 || error.status == 400){
          this.openErrorAlert = true;
        }
      });
    }
  }

  public handleAceptarAusenciaClicked(eventData: {idAusencia: number, idAlumno: number, esAceptada: boolean}){
    this.ausenciaService.AceptarODenegarAusencia(eventData.idAusencia, eventData.idAlumno, eventData.esAceptada).subscribe(res => {
      if (res) {
        this.openSuccessAlert = true;
        this.esAceptarAusencia = true;
        this.esDenegarAusencia = false;
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status == 404){
        this.openErrorAlert = true;
      }
    });
  }

  public handleDenegarAusenciaClicked(eventData: {idAusencia: number, idAlumno: number, esAceptada: boolean}){
    this.ausenciaService.AceptarODenegarAusencia(eventData.idAusencia, eventData.idAlumno, eventData.esAceptada).subscribe(res => {
      if (res) {
        this.openSuccessAlert = true;
        this.esDenegarAusencia = true;
        this.esAceptarAusencia = false;
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status == 404){
        this.openErrorAlert = true;
      }
    });
  }

  public aceptarClicked(){
    this.openSuccessAlert = false;
    window.location.reload();
  }

  public calculateIndices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return { startIndex, endIndex };
  }

  public getPages(): number[] {
    const totalPages = Math.ceil(this.ausencias.length / this.itemsPerPage);
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

  public cerrarClicked(){
    this.openErrorAlert = false;
  }
}
