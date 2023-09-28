import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { Router } from '@angular/router';

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
  openPopupPadresAlumno = false;
  esAceptarAusenciaAlumno = false;
  esDenegarAusenciaAlumno = false;
  esAusenciasAlumno = true;
  messageAusencia = "";
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private aulaService: AulaService, private location: Location, private router: Router){}

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

  public verPadres(alumno: any){
    this.alumno = alumno;
    this.openPopupPadresAlumno = true;
  }

  public cerrarAusenciasAlumnoPopup(){
    this.openPopupAusenciasAlumno = false;
  }

  public verHistoriales(alumno: any){
    this.alumno = alumno;
    this.router.navigate(['/historiales_hijo'], {state: {data: this.alumno, esAlumno: true}});
  }

  public calculateIndices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return { startIndex, endIndex };
  }

  public getPages(): number[] {
    const totalPages = Math.ceil(this.alumnos.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  public pageClick(page: number){
    this.currentPage = page;
  }

  public previousPageClick(){
    this.currentPage = this.currentPage - 1
  }

  public nextPageClick(){
    this.currentPage = this.currentPage + 1
  }

  public goBack(){
    this.location.back();
  }
}
