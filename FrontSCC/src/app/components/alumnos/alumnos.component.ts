import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { AulaService } from 'src/app/services/aulas_services/aula.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {
  message: string='';
  @Input() aula: any;
  public alumnos: any[] = [];
  ausenciasAlumno: any[] = [];
  alumno: any;
  public idAlumno: number = -1;
  openSuccessAlert = false;
  openErrorAlert = false;
  openPopupAusenciasAlumno = false;
  esAceptarAusenciaAlumno = false;
  esDenegarAusenciaAlumno = false;
  esAusenciasAlumno = true;
  messageAusencia = "";

  constructor(private aulaService: AulaService, private location: Location){}

  ngOnInit(){
    this.aula = history.state.data;
    this.aulaService.ObtenerAlumnosAula(this.aula.id).subscribe(res =>{
      this.alumnos = res;
      console.log(this.alumnos);
      if(this.alumnos.length == 0 || this.alumnos == null){
        this.message = "Esta aula aun no tiene alumnos"
      }
    });
  }

  public aceptarClick(){
    window.location.reload;
  }

  public verAusencias(alumno: any){
    this.alumno = alumno;
    this.ausenciasAlumno = alumno.ausencias;
    if(this.ausenciasAlumno.length == 0){
      this.messageAusencia = "No existen Ausencias";
    }
    this.openPopupAusenciasAlumno = true;
  }

  public cerrarAusenciasAlumnoPopup(){
    this.openPopupAusenciasAlumno = false;
  }

  public verHistoriales(alumno: any){

  }

  public goBack(){
    this.location.back();
  }
}
