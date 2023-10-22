import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

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

  ngOnInit(): void{
    this.aulaService.ObtenerAulasInstitucion().subscribe(res => {
      this.message = "";
      if(res){
        this.aulas = res;
        this.institucion = this.aulas[0].institucion;
        console.log(this.aulas, this.institucion);
        if(this.aulas.length == 0){
          this.message = "No existen Aulas en esta Institucion";
        }

        this.aulaService.ObtenerPorcentajesAsistenciaAulas(this.institucion.id).subscribe(res =>{
          if(res){
            this.porcentajesAulas = res;
            console.log(this.porcentajesAulas);
          }
        });
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
    window.location.reload;
  }

  public editarAula(aula: any){

  }

  public goBack(){
    this.location.back();
  }
}
