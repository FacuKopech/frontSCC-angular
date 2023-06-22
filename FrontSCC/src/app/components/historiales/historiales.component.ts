import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { HistorialService } from 'src/app/services/historiales_services/historial.service';
import { ApiService } from 'src/app/services/user_services/api.service';

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
  idHistorial: number = -1;
  emailPersonaLogueada: string = "";
  openConfirmacionFirmaNotaPopup = false;
  openTokenConfirmation = false;
  esTokenParaFirmaHistorial = false;
  openSuccessAlert = false;
  openErrorAlert = false;
  esFirmaHistorial = false;

  constructor( private historialService: HistorialService, private userService: ApiService, private location: Location){}

  ngOnInit(){
    this.hijo = history.state.data
    this.historialService.ObtenerHistorialesHijo(this.hijo.id).subscribe(res => {
      this.message = "";
      this.historiales = res;
      console.log(this.historiales);
      if(this.historiales.length == 0){
        this.message = `${this.hijo.nombre} aun no tiene ningun historial registrado`;
      }
    });
  }
  public openConfirmacionFirmaPopup(id: number){
    this.idHistorial = id;
    this.openConfirmacionFirmaNotaPopup = true;
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

  public aceptarClick(){
    window.location.reload;
  }


  public goBack(){
    this.location.back();
  }
}
