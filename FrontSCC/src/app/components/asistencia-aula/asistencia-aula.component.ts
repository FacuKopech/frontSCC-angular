import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia-aula',
  templateUrl: './asistencia-aula.component.html',
  styleUrls: ['./asistencia-aula.component.css']
})
export class AsistenciaAulaComponent {

  constructor(private aulaService: AulaService, private location: Location, private router: Router){}
  public aula: any;
  public asistencias: any[] = [];
  public asistencia: any
  showErrorAlert = false;
  message: string = '';
  asistenciaHoyTomada = false;
  esPresentes = false;
  openAsistenciaAlumnosPopup = false;

  ngOnInit(): void{
    this.aula = history.state.data;
    this.aulaService.ObtenerAsistenciasAula(this.aula.id).subscribe(res => {
      this.message = "";
      if(res){
        this.asistencias = res;
        console.log(this.asistencias);
        if(this.asistencias.length == 0){
          this.message = "Nose registraron asistencias para esta aula";
        }
        const today = new Date();
        for (let index = 0; index < this.asistencias.length; index++) {
          if(today == this.asistencias[index].fechaAsistenciaTomada){
            this.asistenciaHoyTomada = true;
          }else{
            this.asistenciaHoyTomada = false;
          }
        }
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status == 404 || error.status == 400){
        this.showErrorAlert = true;
      }
    });
  }

  public tomarAsistencia(){
    this.router.navigate(['/tomar_asistencia'], {state: {data: this.aula}});
  }

  public verAsistenciaAlumnos(asistencia: any, esPresentes: boolean){
    this.asistencia = asistencia;
    this.esPresentes = esPresentes;
    this.openAsistenciaAlumnosPopup = true;
  }

  public goBack(){
    this.location.back();
  }
}
