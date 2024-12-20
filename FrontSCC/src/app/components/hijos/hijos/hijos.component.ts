import { Component, ViewChild } from '@angular/core';
import { PersonaService } from 'src/app/services/personas_services/persona.service';
import { AusenciaService } from 'src/app/services/ausencias_services/ausencia.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-hijos',
  templateUrl: './hijos.component.html',
  styleUrls: ['./hijos.component.css']
})
export class HijosComponent {

  constructor(private personaService: PersonaService, private ausenciaService: AusenciaService, private location: Location, private router: Router) {
  }

  public hijos: any[] = [];
  public ausencias: any[] = [];
  public message: string = "";
  public messageAusencia: string = "";
  openPopupDatosInstitucionHijo = false;
  openPopupDatosAulaHijo = false;
  openPopupAusenciasHijo = false;
  public institucion: any;
  public hijo: any;
  openAgregarAusenciasGenericasPopup = false;
  esGenerica = false;
  openSuccessAlert = false;
  openErrorAlert = false;
  esAgregarAusenciaGenerica = false;
  counter: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  esErrorAgregarAusenciaHijoSinAulaAsignada = false;
  esErrorAgregarAusenciaExistente = false;
  esErrorAlumnoNoEncontrado = false;

  ngOnInit(): void {
    this.personaService.ObtenerMisHijos().subscribe(res => {
      this.message = "";
      if (res) {
        this.hijos = res;
        if (this.hijos.length == 0) {
          this.message = "Usted aun no tiene hijos asignados en el sistema";
        }
      }
    });
  }

  public verInstitucion(institucion: any) {
    this.institucion = institucion;
    this.openPopupDatosInstitucionHijo = true;
  }

  public verAula(hijo: any) {
    this.hijo = hijo;
    this.openPopupDatosAulaHijo = true;
  }

  public verHistoriales(hijo: any) {
    this.hijo = hijo;
    this.router.navigate(['/historiales_hijo'], { state: { data: this.hijo, esAlumno: false } });
  }

  public verAusencias(hijo: any) {
    this.openPopupAusenciasHijo = true;
    this.hijo = hijo;
  }

  public handleAgregarAusenciaGenericaClick(eventData: { fechaComienzo: Date, fechaFin: Date, motivo: string, files: FormData }) {
    eventData.files?.forEach((value, key) => {
      if (value != '' || key != '') {
        this.counter += 1;
      }
    });
    if (this.counter > 0) {
      this.ausenciaService.AgregarAusenciaFiles(eventData.files).subscribe(res => {
        if (res) {
          this.ausenciaService.AgregarAusenciaGenerica(eventData.fechaComienzo, eventData.fechaFin, eventData.motivo).subscribe(res => {
            if (res) {
              this.openSuccessAlert = true;
              this.esAgregarAusenciaGenerica = true;
              this.openAgregarAusenciasGenericasPopup = false;
            }
          },
            (error: HttpErrorResponse) => {
              if (error.status == 400 && error.error == 'No puede agregar una Ausencia a un Hijo sin Aula asignada') {
                this.openErrorAlert = true;
                this.esErrorAgregarAusenciaHijoSinAulaAsignada = true;
                this.esErrorAgregarAusenciaExistente = false;
              } else if (error.status == 400 && error.error == 'La Ausencia ya existe') {
                this.openErrorAlert = true;
                this.esErrorAgregarAusenciaExistente = true;
                this.esErrorAgregarAusenciaHijoSinAulaAsignada = false;
              } else if (error.status == 404 && error.error == 'Hijo no encontrado') {
                this.openErrorAlert = true;
                this.esErrorAlumnoNoEncontrado = true;
                this.esErrorAgregarAusenciaExistente = false;
                this.esErrorAgregarAusenciaHijoSinAulaAsignada = false;
              } else if (error.error == '') {
                if (error.status == 404 || error.status == 400) {
                  this.openErrorAlert = true;
                }
              }

            });
        }
      });
    } else {
      this.ausenciaService.AgregarAusenciaGenerica(eventData.fechaComienzo, eventData.fechaFin, eventData.motivo).subscribe(res => {
        if (res) {
          this.openSuccessAlert = true;
          this.esAgregarAusenciaGenerica = true;
          this.openAgregarAusenciasGenericasPopup = false;
        }
      },
        (error: HttpErrorResponse) => {
          if (error.status == 400 && error.error == 'No puede agregar una Ausencia a un Hijo sin Aula asignada') {
            this.openErrorAlert = true;
            this.esErrorAgregarAusenciaHijoSinAulaAsignada = true;
            this.esErrorAgregarAusenciaExistente = false;
          } else if (error.status == 400 && error.error == 'La Ausencia ya existe') {
            this.openErrorAlert = true;
            this.esErrorAgregarAusenciaExistente = true;
            this.esErrorAgregarAusenciaHijoSinAulaAsignada = false;
          } else if (error.status == 404 && error.error == 'Hijo no encontrado') {
            this.openErrorAlert = true;
            this.esErrorAlumnoNoEncontrado = true;
            this.esErrorAgregarAusenciaExistente = false;
            this.esErrorAgregarAusenciaHijoSinAulaAsignada = false;
          } else if (error.error == '') {
            if (error.status == 404 || error.status == 400) {
              this.openErrorAlert = true;
            }
          }
        });
    }
  }

  public cerrarDatosInstitucionPopup() {
    this.institucion = null;
    this.openPopupDatosInstitucionHijo = false;
  }

  public cerrarDatosAulaPopup() {
    this.hijo = null;
    this.openPopupDatosAulaHijo = false;
  }

  public cerrarAusenciasHijoPopup() {
    this.openPopupAusenciasHijo = false;
  }

  public aceptarClicked() {
    this.openSuccessAlert = false;
    window.location.reload();
  }

  public calculateIndices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return { startIndex, endIndex };
  }

  public getPages(): number[] {
    const totalPages = Math.ceil(this.hijos.length / this.itemsPerPage);
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
