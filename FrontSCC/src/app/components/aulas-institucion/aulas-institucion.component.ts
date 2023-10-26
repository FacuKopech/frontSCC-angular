import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'console';

@Component({
  selector: 'app-aulas-institucion',
  templateUrl: './aulas-institucion.component.html',
  styleUrls: ['./aulas-institucion.component.css']
})
export class AulasInstitucionComponent {

  constructor(private aulaService: AulaService, private location: Location, private router: Router){}

  public aulas: any[] = [];
  public aula: any;
  public institucion: any;
  public message: string = "";
  openInfoAulaPopup = false;
  porcentajesAulas: any[] = [];
  openAgregarAulaPopup = false;
  openDeletionPopup = false;
  itemForDelete = '';
  openSuccessAlert = false;
  openErrorAlert = false;
  esEliminarAula = false;
  openEditarAulaPopup = false;
  currentPage: number = 1;
  itemsPerPage: number = 2;

  ngOnInit(): void{
    this.aulaService.ObtenerAulasInstitucion().subscribe(res => {
      this.message = "";
      if(res){
        this.aulas = res;
        this.institucion = this.aulas[0].institucion;
        console.log(this.aulas, this.institucion);
        if(this.aulas.length == 0){
          this.message = "No existen Aulas en esta Institucion";
        }else{
          this.aulaService.ObtenerPorcentajesAsistenciaAulas(this.institucion.id).subscribe(res =>{
            if(res){
              this.porcentajesAulas = res;
              console.log(this.porcentajesAulas);
            }
          });
        }

      }
    });
  }

  public openInfoPopup(aula: any){
    this.openInfoAulaPopup = true;
    this.aula = aula;
  }

  public verAlumnosAula(aula: any){
    this.aula = aula;
    this.router.navigate(['/alumnos_aula'], {state: {data: this.aula, accedeDirectivo: true}});
  }

  public eliminarAula(aula: any){
    this.openDeletionPopup = true;
    this.aula = aula;
    this.itemForDelete = "Aula";
  }

  public confirmEliminarAula(){
    this.openDeletionPopup = false;
      this.aulaService.EliminarAula(this.aula.id).subscribe(res =>{
        if(res){
          this.openSuccessAlert = true;
          this.esEliminarAula = true;
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

  public editarAula(aula: any){
    this.aula = aula;
    this.openEditarAulaPopup = true;
  }

  public calculateIndices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return { startIndex, endIndex };
  }

  public getPages(): number[] {
    const totalPages = Math.ceil(this.aulas.length / this.itemsPerPage);
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
