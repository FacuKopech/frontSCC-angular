import { Component, ViewChild, ElementRef } from '@angular/core';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location, DatePipe  } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toma-de-asistencia',
  templateUrl: './toma-de-asistencia.component.html',
  styleUrls: ['./toma-de-asistencia.component.css']
})
export class TomaDeAsistenciaComponent {

  aula: any;
  alumnos: any[] = [];
  alumnosPresentes: any[] = [];
  message = '';
  showErrorAlert = false;
  openSuccessAlert = false;
  esCargaDeAsistencia = false;
  fechaHoy = new Date();
  fechaString: string = '';
  idAlumno: number = -1;
  ausencias: any[] = [];
  openDatosAusenciaPopup = false;
  openConfirmCargaAsistenciaPopup = false;

  constructor(private aulaService: AulaService, private location: Location, private datePipe: DatePipe, private router: Router){
    this.fechaString = JSON.stringify(this.fechaHoy);
  }

  public ngOnInit(){
    this.aula = history.state.data;
    this.aulaService.ObtenerAlumnosAula(this.aula.id).subscribe(res => {
      this.alumnos = res;
      if(this.alumnos.length == 0){
        this.message = "El aula aun no tiene alumnos";
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status == 404 || error.status == 400){
        this.showErrorAlert = true;
      }
    });
  }

  public presenteChecked(alumno: any){
    let arrayAnterior: any[] = [];
    arrayAnterior = this.alumnosPresentes;
    this.alumnosPresentes = this.alumnosPresentes.filter((alumnoArray) => alumnoArray.id !== alumno.id);
    if(arrayAnterior.length == this.alumnosPresentes.length){
      this.alumnosPresentes.push(alumno);
    }
    console.log(this.alumnosPresentes);
  }

  public tieneAusenciaEnEstaFecha(ausencias: any[]): boolean{
    var today = new Date();
    const formattedDate = this.datePipe.transform(today, 'yyyy-MM-ddTHH:mm:ss');
    if(formattedDate){
      for (let index = 0; index < ausencias.length; index++) {
        if(formattedDate >= ausencias[index].fechaComienzo && formattedDate <= ausencias[index].fechaFin){
          return true;
        }
      }
      return false;
    }
    return false;
  }

  public verAusenciaAlumnoAusente(idAlumno: number, ausencias: any[]){
    this.openDatosAusenciaPopup = true;
    this.idAlumno = idAlumno,
    this.ausencias = ausencias;
  }

  public cargarAsistencia(){
    this.aulaService.CargarNuevaAsistencia(this.aula.id, this.alumnosPresentes).subscribe(res =>{
      if(res){
        this.esCargaDeAsistencia = true;
        this.openSuccessAlert = true;
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status == 404 || error.status == 400){
        this.showErrorAlert = true;
      }
    });
  }

  public closeSuccessPopup(){
    this.openSuccessAlert = false;
    this.location.back();
  }

  public goBack(){
    this.location.back();
  }
}
