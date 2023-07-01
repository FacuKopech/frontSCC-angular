import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AusenciaService } from 'src/app/services/ausencias_services/ausencia.service';

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
  ausencia: any;
  openDatosAusenciaPopup = false;
  openSuccessAlert = false;
  openErrorAlert = false;
  esDeleteAusencia = false;
  esEditAusencia = false;
  esAgregarAusencia = false;
  openAgregarAusenciaPopup = false;
  counter: number = 0;

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  constructor(private ausenciaService: AusenciaService) {
  }
  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  getBackgroundColor(ausencia: any): any {
    if (ausencia.justificada == "Si") {
      return { 'background-color': '#17B890' };
    } else if (ausencia.justificada == "No"){
      return { 'background-color': 'red' };
    }else{
      return { 'background-color': '#f0e234' };
    }
  }

  public verAusencia(ausencia: any, idHijo: number){
    this.ausencia = ausencia;
    this.idHijo = idHijo;
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
    this.ausenciaService.AgregarAusencia(this.idHijo, eventData.fechaComienzo, eventData.fechaFin, eventData.motivo).subscribe(res => {
      if(res){
        this.openSuccessAlert = true;
        this.esAgregarAusencia = true;

        eventData.files?.forEach((value, key) => {
          if(value != '' || key != ''){
            this.counter += 1;
          }
        });
        if(this.counter > 0){
          this.handleAusenciaFiles(eventData.files);
          this.counter = 0;
        }

      }else{
        this.openErrorAlert = true;
      }
    });
  }

  public handleAusenciaFiles(files: FormData){
    this.ausenciaService.AgregarAusenciaFiles(files).subscribe(res =>{

    });
  }

  public aceptarClicked(){
    this.openSuccessAlert = false;
    window.location.reload();
  }

  public cerrarClicked(){
    this.openErrorAlert = false;
  }
}
