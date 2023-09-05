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
  alumnos: any[] = [];
  public idAlumno: number = -1;
  openSuccessAlert = false;
  openErrorAlert = false;
  openPopupAusenciasAlumno = false;

  constructor(private aulaService: AulaService, private location: Location){}

  ngOnInit(){
    this.aula = history.state.data;
    this.aulaService.ObtenerAlumnosAula(this.aula.id).subscribe(res =>{
      this.alumnos = res;
      if(this.alumnos.length == 0){
        this.message = "Esta aula aun no tiene alumnos"
      }
    });
  }

  public aceptarClick(){
    window.location.reload;
  }

  public verAusencias(idAlumno: number){
    this.idAlumno = idAlumno;
    this.openPopupAusenciasAlumno = true;
  }
  public goBack(){
    this.location.back();
  }
}
