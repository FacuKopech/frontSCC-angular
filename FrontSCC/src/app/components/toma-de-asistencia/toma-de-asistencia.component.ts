import { Component } from '@angular/core';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-toma-de-asistencia',
  templateUrl: './toma-de-asistencia.component.html',
  styleUrls: ['./toma-de-asistencia.component.css']
})
export class TomaDeAsistenciaComponent {

  aula: any;
  alumnos: any[] = [];
  message = '';
  showErrorAlert = false;

  constructor(private aulaService: AulaService, private location: Location){}

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

  public goBack(){
    this.location.back();
  }
}
