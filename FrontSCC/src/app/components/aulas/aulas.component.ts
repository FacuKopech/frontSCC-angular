import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AulaService } from 'src/app/services/aulas_services/aula.service';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.css']
})
export class AulasComponent {
  constructor(private aulaService: AulaService, private location: Location, private router: Router) {}

  public aulas: any[] = [];
  public aula: any;
  public message: string = "";
  openPopupDatosInstitucionAula = false;
  public institucion: any;
  public idAula: number = -1;

  ngOnInit(): void{
    this.aulaService.ObtenerAulasDocente().subscribe(res => {
      this.message = "";
      if(res){
        this.aulas = res;
        console.log(this.aulas);
        if(this.aulas.length == 0){
          this.message = "Usted aun no tiene aulas asignadas en el sistema";
        }
      }
    });
  }

  public goBack(){
    this.location.back();
  }

  public verInstitucion(institucion: any){
    this.institucion = institucion;
    this.openPopupDatosInstitucionAula = true;
  }

  public verAlumnosAula(aula: any){
    this.aula = aula;
    this.router.navigate(['/alumnos_aula'], {state: {data: this.aula}});
  }

  public cerrarDatosInstitucionPopup(){
    this.institucion = null;
    this.openPopupDatosInstitucionAula = false;
  }
}
