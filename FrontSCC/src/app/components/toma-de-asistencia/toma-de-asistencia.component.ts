import { Component, ViewChild, ElementRef } from '@angular/core';
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
  alumnosPresentes: any[] = [];
  message = '';
  showErrorAlert = false;
  fechaHoy = new Date();
  fechaString: string = '';

  @ViewChild('inputCheckboxP', { static: false }) inputCheckboxP!: ElementRef<HTMLInputElement>;

  constructor(private aulaService: AulaService, private location: Location){
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
    if(this.inputCheckboxP.nativeElement.checked == true){
      this.alumnosPresentes.push(alumno);
    }else{
      this.alumnosPresentes.forEach(alumnoArray => {
        if(alumnoArray.id == alumno.id){
          this.alumnosPresentes.splice(alumno);
        }
      });
    }
    console.log(this.alumnosPresentes);
  }

  public goBack(){
    this.location.back();
  }
}
