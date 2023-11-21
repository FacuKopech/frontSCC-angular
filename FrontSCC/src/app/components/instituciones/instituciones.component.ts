import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { InstitucionService } from 'src/app/services/institucion_services/institucion.service';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent{
  
  instituciones: any[] = [];
  itemForDelete: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;
  openSuccessAlert = false;
  openErrorAlert = false;
  esEliminarInstitucion = false;
  esEditarInstitucion = false;
  openAgregarInstitucionPopup = false;
  openConfirmDeletePopup = false;
  openEditarInstitucionPopup = false;  
  idInstitucion: number = -1;
  institucion: any;

  constructor( private institucionService: InstitucionService, private location: Location){}

  ngOnInit(){
    this.institucionService.ObtenerInstitucionesSistema().subscribe(res => {
      if(res){
        this.instituciones = res;
      }
    });
  }
  

  public eliminarInstitucion(institucion: any){
    this.openConfirmDeletePopup = true;
    this.itemForDelete = "institucion";
    this.idInstitucion = institucion.id;
  }

  public deleteClicked(){
    this.institucionService.EliminarInstitucion(this.idInstitucion).subscribe(res => {
      if(res){
        this.openSuccessAlert = true;
        this.esEliminarInstitucion = true;
      }
    },
    (error:HttpErrorResponse) =>{
      if(error.status >= 400){
        this.openErrorAlert = true;
      }
    });
  }

  public editarInstitucion(institucion: any){
    this.institucion = institucion;
    this.openEditarInstitucionPopup = true;
  }

  public aceptarClick(){
    this.openConfirmDeletePopup = false;
    this.openSuccessAlert = false;
    window.location.reload();
  }

  public calculateIndices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return { startIndex, endIndex };
  }

  public getPages(): number[] {
    const totalPages = Math.ceil(this.instituciones.length / this.itemsPerPage);
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

