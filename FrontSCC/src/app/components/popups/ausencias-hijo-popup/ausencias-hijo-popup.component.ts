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
  @Input() message: string='';
  idHijo: number = -1;
  ausencia: any;
  openDatosAusenciaPopup = false;

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
    } else {
      return { 'background-color': 'red' };
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
        console.log("ELIMINADA BIEN");
        window.close();
      }else{
        console.log("ELIMINADA MAL");
      }
    });
  }

  public handleEditClicked(eventData: { fechaComienzo: Date, fechaFin: Date, motivo: string }){
    this.ausenciaService.EditarAusencia(this.ausencia.id, eventData).subscribe(res =>{
      if(res){
        console.log("MODIFICADA BIEN");
        window.close();
      }else{
        console.log("MODIFICADA MAL");
      }
    });
  }
}
