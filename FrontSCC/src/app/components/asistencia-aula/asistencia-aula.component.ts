import { Component } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia-aula',
  templateUrl: './asistencia-aula.component.html',
  styleUrls: ['./asistencia-aula.component.css']
})
export class AsistenciaAulaComponent {

  constructor(private aulaService: AulaService, private location: Location, private router: Router, private datePipe: DatePipe) { }
  public aula: any;
  public asistencias: any[] = [];
  filteredAsistencias: any[] = [];
  public asistencia: any
  showErrorAlert = false;
  message: string = '';
  asistenciaHoyTomada = false;
  esPresentes = false;
  openAsistenciaAlumnosPopup = false;
  filterOptions: any = {
    date: null,
  };
  currentPage: number = 1;
  itemsPerPage: number = 8;

  ngOnInit(): void {
    this.aula = history.state.data;
    this.aulaService.ObtenerAsistenciasAula(this.aula.id).subscribe(res => {
      this.message = "";
      if (res) {
        this.asistencias = res;
        this.applyFilter();
        if (this.asistencias.length == 0) {
          this.message = "No se registraron Asistencias para esta Aula";
        }
        var today = new Date();
        const formattedDate = this.datePipe.transform(today, 'yyyy-MM-dd');
        if (formattedDate) {
          for (let index = 0; index < this.asistencias.length; index++) {
            const formattedAusenciaDate = this.datePipe.transform(this.asistencias[index].fechaAsistenciaTomada, 'yyyy-MM-dd')
            if (formattedDate == formattedAusenciaDate) {
              this.asistenciaHoyTomada = true;
              break;
            } else {
              this.asistenciaHoyTomada = false;
            }
          }
        }
      }
    },
      (error: HttpErrorResponse) => {
        if (error.status == 404 || error.status == 400) {
          this.showErrorAlert = true;
        }
      });
  }

  applyFilter() {
    this.filteredAsistencias = this.asistencias.filter(asistencia => {
      const date = this.filterOptions.date ? new Date(this.filterOptions.date) : null;
      const asistenciaDate = new Date(asistencia.fechaAsistenciaTomada);
      
      const formatDate = (date: Date) => {
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
      };
  
      const formattedFilterDate = date ? formatDate(date) : null;
      const formattedAsistenciaDate = formatDate(asistenciaDate);
      const matchesDate = !formattedFilterDate || formattedAsistenciaDate === formattedFilterDate;
      return matchesDate;
    });
  }

  onFilterChange() {
    this.applyFilter();
  }

  clearFilter() {
    this.filterOptions.date = null;
    this.applyFilter();
  }

  public tomarAsistencia() {
    this.router.navigate(['/tomar_asistencia'], { state: { data: this.aula } });
  }

  public verAsistenciaAlumnos(asistencia: any, esPresentes: boolean) {
    this.asistencia = asistencia;
    this.esPresentes = esPresentes;
    this.openAsistenciaAlumnosPopup = true;
  }

  public calculateIndices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return { startIndex, endIndex };
  }

  public getPages(): number[] {
    const totalPages = Math.ceil(this.asistencias.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  public pageClick(page: number) {
    this.currentPage = page;
  }

  public previousPageClick() {
    this.currentPage = this.currentPage - 1
  }

  public nextPageClick() {
    this.currentPage = this.currentPage + 1
  }


  public goBack() {
    this.location.back();
  }
}
