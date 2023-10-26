import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonaService } from 'src/app/services/personas_services/persona.service';

@Component({
  selector: 'app-alumnos-sin-aula',
  templateUrl: './alumnos-sin-aula.component.html',
  styleUrls: ['./alumnos-sin-aula.component.css']
})
export class AlumnosSinAulaComponent {


  idInstitucion: number = 0;
  openSuccessAlert = false;
  openErrorAlert = false;
  message: string = '';
  esEliminarAlumnoDelSistema = false;
  openDeletionPopup = false;
  itemForDelete = '';
  alumnosSinAula: any[] = [];
  alumno: any;
  currentPage: number = 1;
  itemsPerPage: number = 2;

  constructor(private location: Location, private aulaService: AulaService, private personaService: PersonaService){}

  public ngOnInit(){
    this.idInstitucion = history.state.data;
    this.aulaService.ObtenerAlumnosSinAula(this.idInstitucion).subscribe(res => {
      if(res){
       this.alumnosSinAula = res;
       this.alumnosSinAula.sort((a, b) => {
        return a.apellido.localeCompare(b.apellido, undefined, { sensitivity: 'base' });
      });
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status >= 400){
        this.openErrorAlert = true;
      }
    });
  }

  public deleteClick(alumno: any){
    this.alumno = alumno;
    this.openDeletionPopup = true;
    this.itemForDelete = "Alumno";
  }

  public confirmEliminarAlumno(){
    this.openDeletionPopup = false;
    this.personaService.EliminarAlumno(this.alumno.id).subscribe(res => {
      if(res){
        this.openSuccessAlert = true;
        this.esEliminarAlumnoDelSistema = true;
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status >= 400){
        this.openErrorAlert = true;
      }
    });
  }

  public closeSuccessAlert(){
    this.openSuccessAlert = false;
    window.location.reload();
  }

  public calculateIndices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return { startIndex, endIndex };
  }

  public getPages(): number[] {
    const totalPages = Math.ceil(this.alumnosSinAula.length / this.itemsPerPage);
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
