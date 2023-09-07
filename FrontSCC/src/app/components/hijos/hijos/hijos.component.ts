import { Component, ViewChild } from '@angular/core';
import { PersonaService } from 'src/app/services/personas_services/persona.service';
import { AusenciaService } from 'src/app/services/ausencias_services/ausencia.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hijos',
  templateUrl: './hijos.component.html',
  styleUrls: ['./hijos.component.css']
})
export class HijosComponent {

  constructor(private personaService: PersonaService, private ausenciaService: AusenciaService, private location: Location, private router: Router) {
  }

  public hijos: any[] = [];
  public ausencias: any[] = [];
  public message: string = "";
  public messageAusencia: string = "";
  openPopupDatosInstitucionHijo = false;
  openPopupDatosAulaHijo = false;
  openPopupAusenciasHijo = false;
  public institucion: any;
  public idHijo: number = -1;
  public hijo: any;
  openAgregarAusenciasGenericasPopup = false;
  esGenerica = false;
  openSuccessAlert = false;
  openErrorAlert = false;
  esAgregarAusenciaGenerica = false;
  counter: number = 0;

  ngOnInit(): void{
    this.personaService.ObtenerMisHijos().subscribe(res => {
      this.message = "";
      if(res){
        this.hijos = res;
        console.log(this.hijos);
        if(this.hijos.length == 0){
          this.message = "Usted aun no tiene hijos asignados en el sistema";
        }
      }
    });
  }

  public goBack(){
    this.location.back();
  }

  public verInstitucion(institucion: any){
    this.institucion = institucion;
    this.openPopupDatosInstitucionHijo = true;
  }

  public verAula(hijo: any){
    this.hijo = hijo;
    this.openPopupDatosAulaHijo = true;
  }

  public verHistoriales(hijo: any){
    this.hijo = hijo;
    this.router.navigate(['/historiales_hijo'], {state: {data: this.hijo, esAlumno: false}});
  }

  public verAusencias(idHijo: number, hijo: any){
    this.openPopupAusenciasHijo = true;
    this.ausenciaService.ObtenerAusenciasHijo(idHijo).subscribe(res => {
      if(res){
        this.ausencias = res;
        this.hijo = hijo;
        this.idHijo = idHijo;
        console.log(this.ausencias);
        if(this.ausencias.length == 0){
          this.messageAusencia = "Su hijo/a aun no tiene ninguna ausencia cargada"
        }else{
          this.messageAusencia = "";
        }
      }
    });
  }

  public handleAgregarAusenciaGenericaClick(eventData: {fechaComienzo: Date, fechaFin: Date, motivo: string, files: FormData}){
    this.ausenciaService.AgregarAusenciaGenerica(eventData.fechaComienzo, eventData.fechaFin, eventData.motivo).subscribe(res=>{
      if(res){
        this.openSuccessAlert = true;
        this.esAgregarAusenciaGenerica = true;

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

  public cerrarDatosInstitucionPopup(){
    this.institucion = null;
    this.openPopupDatosInstitucionHijo = false;
  }

  public cerrarDatosAulaPopup(){
    this.hijo = null;
    this.openPopupDatosAulaHijo = false;
  }

  public cerrarAusenciasHijoPopup(){
    this.openPopupAusenciasHijo = false;
  }

  public aceptarClicked(){
    this.openSuccessAlert = false;
    window.location.reload();
  }

}
