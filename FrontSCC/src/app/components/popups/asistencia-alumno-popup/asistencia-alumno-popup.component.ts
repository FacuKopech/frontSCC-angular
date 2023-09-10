import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-asistencia-alumno-popup',
  templateUrl: './asistencia-alumno-popup.component.html',
  styleUrls: ['./asistencia-alumno-popup.component.css']
})
export class AsistenciaAlumnoPopupComponent {
  @Input() asistencia: any;
  @Input() aula: any;
  @Input() esPresentes: any;
  public alumnos: any[] = [];
  showErrorAlert = false;
  message = "";

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  constructor(private aulaService: AulaService){}
  public ngOnInit(){
    this.aulaService.ObtenerAsistenciaAlumnos(this.aula.id, this.asistencia.id, this.esPresentes).subscribe(res=>{
      this.alumnos = res;
      if(this.alumnos.length == 0){
        if(this.esPresentes){
          this.message = "No hay alumnos presentes";
        }else{
          this.message = "No hay alumnos ausentes";
        }
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status == 404 || error.status == 400){
        this.showErrorAlert = true;
      }
    });
  }

  public cancelarClicked(){
    this.cancelButtonClick.emit();
  }
}
