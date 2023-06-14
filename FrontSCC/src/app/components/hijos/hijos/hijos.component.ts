import { Component, ViewChild } from '@angular/core';
import { PersonaService } from 'src/app/services/personas_services/persona.service';
import { AusenciaService } from 'src/app/services/ausencias_services/ausencia.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hijos',
  templateUrl: './hijos.component.html',
  styleUrls: ['./hijos.component.css']
})
export class HijosComponent {

  constructor(private personaService: PersonaService, private ausenciaService: AusenciaService, private location: Location) {
  }

  public hijos: any[] = [];
  public ausencias: any[] = [];
  public message: string = "";
  public messageAusencia: string = "";
  openPopupDatosInstitucionHijo = false;
  openPopupAusenciasHijo = false;
  public institucion: any;
  public idHijo: number = -1;
  public hijo: any;

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
    console.log(institucion);
    this.institucion = institucion;
    this.openPopupDatosInstitucionHijo = true;
  }

  public verAusencias(idHijo: number, hijo: any){
    this.openPopupAusenciasHijo = true;
    this.ausenciaService.ObtenerAusenciasHijo(idHijo).subscribe(res => {
      if(res){
        this.ausencias = res;
        this.hijo = hijo;
        console.log(this.ausencias);
        if(this.ausencias.length == 0){
          this.messageAusencia = "Su hijo/a aun no tiene ninguna ausencia cargada"
        }else{
          this.messageAusencia = "";
        }
      }
    });
  }

  public cerrarDatosInstitucionPopup(){
    this.openPopupDatosInstitucionHijo = false;
  }

  public cerrarAusenciasHijoPopup(){
    this.openPopupAusenciasHijo = false;
  }

}
