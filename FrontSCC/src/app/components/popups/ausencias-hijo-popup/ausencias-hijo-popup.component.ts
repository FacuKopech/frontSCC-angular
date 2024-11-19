import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AusenciaService } from 'src/app/services/ausencias_services/ausencia.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AulaService } from 'src/app/services/aulas_services/aula.service';

@Component({
  selector: 'app-ausencias-hijo-popup',
  templateUrl: './ausencias-hijo-popup.component.html',
  styleUrls: ['./ausencias-hijo-popup.component.css']
})
export class AusenciasHijoPopupComponent {
  @Input() hijo: any;
  @Input() alumno: any;
  @Input() esAusenciasHijo = false;
  @Input() esAusenciasAlumno = false;
  ausencia: any;
  idAlumno: string = '00000000-0000-0000-0000-000000000000';
  openDatosAusenciaPopup = false;
  openSuccessAlert = false;
  openErrorAlert = false;
  esDeleteAusencia = false;
  esEditAusencia = false;
  esAgregarAusencia = false;
  esAceptarAusencia = false;
  esDenegarAusencia = false;
  openAgregarAusenciaPopup = false;
  counter: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  idHijo: string = '00000000-0000-0000-0000-000000000000';
  idNene: string = '00000000-0000-0000-0000-000000000000';
  ausencias: any[] = [];
  alumnoOHijoSinAulaAsignada = false;
  esErrorAgregarAusenciaHijoSinAulaAsignada = false;
  esErrorAgregarAusenciaExistente = false;
  esErrorAlumnoNoEncontrado = false;
  esErrorAusenciaNoEncontrada = false;
  esErrorIdInvalido = false;
  messageAusencias: string = '';

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  constructor(private ausenciaService: AusenciaService, private aulaService: AulaService) {
  }

  public ngOnInit() {
    if (this.hijo != null) {
      this.esAusenciasHijo = true;
      this.esAusenciasAlumno = false;
      this.idHijo = this.hijo.id;
      this.idNene = this.idHijo;
      console.log(this.hijo);
    } else if (this.alumno != null) {
      this.esAusenciasAlumno = true;
      this.esAusenciasHijo = false;
      this.idAlumno = this.alumno.id;
      this.idNene = this.idAlumno;

    }
    this.ausenciaService.ObtenerAusenciasAlumno(this.idNene).subscribe(res => {
      if (res) {
        this.ausencias = res;
        console.log(this.ausencias);
        if (this.ausencias.length == 0) {
          if (this.esAusenciasHijo) {
            this.messageAusencias = "Su hijo/a aun no tiene ninguna ausencia cargada"
          } else if (this.esAusenciasAlumno) {
            this.messageAusencias = "Alumno/a sin ausencias cargadas"
          }
        } else {
          this.messageAusencias = "";
        }
        this.aulaService.ObtenerAulaHijo(this.idNene).subscribe(res => {
          if (res == null) {
            this.alumnoOHijoSinAulaAsignada = true;
          } else {
            this.alumnoOHijoSinAulaAsignada = false;
          }
        },
          (error: HttpErrorResponse) => {
            if (error.status >= 400) {
              this.openErrorAlert = true;
            }
          });
      }
    },
      (error: HttpErrorResponse) => {
        if (error.status >= 400) {
          this.openErrorAlert = true;
        }
      });
  }

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  getBackgroundColor(ausencia: any): any {
    if (ausencia.justificada == "Si") {
      return { 'background-color': '#0A7B30' };
    } else if (ausencia.justificada == "No") {
      return { 'background-color': '#9D140A' };
    } else {
      return { 'background-color': 'rgb(100 100 100)' };
    }
  }

  public verAusenciaHijo(ausencia: any, idHijo: string) {
    this.ausencia = ausencia;
    this.idHijo = idHijo;
    this.openDatosAusenciaPopup = true;
  }

  public verAusenciaAlumno(ausencia: any) {
    this.ausencia = ausencia;
    this.idAlumno = this.alumno.id;
    this.openDatosAusenciaPopup = true;
  }

  public handleCancelarClicked() {
    this.openDatosAusenciaPopup = false;
  }

  public handleDeleteClicked(eventData: { idAusencia: string, idHijo: string }) {
    this.ausenciaService.EliminarAusencia(eventData.idAusencia, eventData.idHijo).subscribe(res => {
      if (res) {
        this.openDatosAusenciaPopup = false;
        this.openSuccessAlert = true;
        this.esDeleteAusencia = true;
      }
    }, (error: HttpErrorResponse) => {
      this.openDatosAusenciaPopup = false;
      if (error.status == 404 && error.error == 'La Ausencia no se ha encontrado') {
        this.openErrorAlert = true;
        this.esErrorAusenciaNoEncontrada = true;
        this.esErrorIdInvalido = false;
        this.esErrorAgregarAusenciaHijoSinAulaAsignada = false;
        this.esErrorAgregarAusenciaExistente = false;
        this.esErrorAlumnoNoEncontrado = false;
      } else if (error.error == '') {
        if (error.status == 404 || error.status == 400) {
          this.openErrorAlert = true;
        }
      }

    });
  }

  public handleEditClicked(eventData: { fechaComienzo: Date, fechaFin: Date, motivo: string }) {
    this.ausenciaService.EditarAusencia(this.ausencia.id, this.idHijo, eventData).subscribe(res => {
      if (res) {
        this.openDatosAusenciaPopup = false;
        this.openSuccessAlert = true;
        this.esEditAusencia = true;
      }
    }, (error: HttpErrorResponse) => {
      this.openDatosAusenciaPopup = false;
      if (error.status == 400 && error.error == 'Id de Asuencia invalido') {
        this.openErrorAlert = true;
        this.esErrorIdInvalido = true;
        this.esErrorAgregarAusenciaHijoSinAulaAsignada = false;
        this.esErrorAgregarAusenciaExistente = false;
        this.esErrorAusenciaNoEncontrada = false;
        this.esErrorAlumnoNoEncontrado = false;
      }else if (error.status == 404 && error.error == 'Alumno no encontrado') {
        this.openErrorAlert = true;
        this.esErrorAlumnoNoEncontrado = true;
        this.esErrorAgregarAusenciaExistente = false;
        this.esErrorAgregarAusenciaHijoSinAulaAsignada = false;
        this.esErrorIdInvalido = false;
        this.esErrorAusenciaNoEncontrada = false;
      } else if (error.status == 404 && error.error == 'Ausencia no encontrada') {
        this.openErrorAlert = true;
        this.esErrorAusenciaNoEncontrada = true;
        this.esErrorAlumnoNoEncontrado = false;
        this.esErrorAgregarAusenciaExistente = false;
        this.esErrorAgregarAusenciaHijoSinAulaAsignada = false;
        this.esErrorIdInvalido = false;
      } else if (error.error == '') {
        if (error.status == 404 || error.status == 400) {
          this.openErrorAlert = true;
        }
      }

    });
  }

  public handleAgregarClick(eventData: { fechaComienzo: Date, fechaFin: Date, motivo: string, files: FormData }) {
    eventData.files?.forEach((value, key) => {
      if (value != '' || key != '') {
        this.counter += 1;
      }
    });
    if (this.counter > 0) {
      this.ausenciaService.AgregarAusenciaFiles(eventData.files).subscribe(res => {
        if (res) {
          this.ausenciaService.AgregarAusencia(this.idNene, eventData.fechaComienzo, eventData.fechaFin, eventData.motivo).subscribe(res => {
            if (res) {
              console.log(res);
              this.openAgregarAusenciaPopup = false;
              this.openSuccessAlert = true;
              this.esAgregarAusencia = true;
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
      this.ausenciaService.AgregarAusencia(this.idNene, eventData.fechaComienzo, eventData.fechaFin, eventData.motivo).subscribe(res => {
        console.log(res);
        if (res) {
          console.log(res);
          this.openSuccessAlert = true;
          this.esAgregarAusencia = true;
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

  public handleAceptarAusenciaClicked(eventData: { idAusencia: string, idAlumno: string, esAceptada: boolean }) {
    this.ausenciaService.AceptarODenegarAusencia(eventData.idAusencia, eventData.idAlumno, eventData.esAceptada).subscribe(res => {
      if (res) {
        this.openDatosAusenciaPopup = false;
        this.openSuccessAlert = true;
        this.esAceptarAusencia = true;
        this.esDenegarAusencia = false;
      }
    },
      (error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.openErrorAlert = true;
        }
      });
  }

  public handleDenegarAusenciaClicked(eventData: { idAusencia: string, idAlumno: string, esAceptada: boolean }) {
    this.ausenciaService.AceptarODenegarAusencia(eventData.idAusencia, eventData.idAlumno, eventData.esAceptada).subscribe(res => {
      if (res) {
        this.openDatosAusenciaPopup = false;
        this.openSuccessAlert = true;
        this.esDenegarAusencia = true;
        this.esAceptarAusencia = false;
      }
    },
      (error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.openErrorAlert = true;
        }
      });
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
    const totalPages = Math.ceil(this.ausencias.length / this.itemsPerPage);
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

  public cerrarClicked() {
    this.openErrorAlert = false;
  }
}
