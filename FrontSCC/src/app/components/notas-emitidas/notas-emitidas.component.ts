import { Component, ViewChild } from '@angular/core';
import { NotaService } from '../../services/notas_services/nota.service';
import { ApiService } from '../../services/user_services/api.service';
import { EditarNotaPopupComponent } from '../popups/editar-nota-popup/editar-nota-popup.component';
import { Location } from '@angular/common';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/services/login_services/login.service';

@Component({
  selector: 'app-notas-emitidas',
  templateUrl: './notas-emitidas.component.html',
  styleUrls: ['./notas-emitidas.component.css']
})
export class NotasEmitidasComponent {
  @ViewChild(EditarNotaPopupComponent) popupEditarNota!: EditarNotaPopupComponent;

  constructor(private notaService: NotaService, private apiService: ApiService, private location: Location, private aulaService: AulaService, private router: Router, private loginService: LoginService) {
    this.popupEditarNota = new EditarNotaPopupComponent(aulaService, apiService);
  }


  showDeletionSuccessAlert = false;
  showModificationSuccessAlert = false;
  showAdditionSuccessAlert = false;
  showErrorAlert = false;
  esErrorBodyTooLarge = false;
  OpenpopupEditarNota = false;
  popuCuerpoNota = false;
  popuLeerNota = false;
  showDestinatariosPopup = false;
  openDeletionPopup = false;
  openEditionPopup = false;
  openAgregarNotaPopup = false;
  public notaId: string = '';
  public message: string = "";
  public notas: any[] = [];
  filteredNotas: any[] = [];
  filterOptions: any = {
    titulo: '',
    tipo: '',
    startDate: null,
    endDate: null
  };
  public notaAModificar: any;
  public notaALeerCuerpo: any;
  public gruposUsuario: any[] = [];
  itemForDelete: string = '';
  counter: number = 0;
  nota: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  public ngOnInit(): void {
    let loggedInUser = this.loginService.getLoggedInUser();
    this.gruposUsuario = loggedInUser.roles;
    this.notaService.ObtenerNotasEmitidas().subscribe(res => {
      if (res) {
        this.notas = res;
        this.applyFilter();
        if (this.notas.length == 0) {
          this.message = "No existen notas emitidas!";
        }
      }
    });
  }

  applyFilter() {
    this.filteredNotas = this.notas.filter(nota => {
      const matchesTitulo = nota.titulo.toLowerCase().includes(this.filterOptions.titulo.toLowerCase());
      const matchesTipo = this.filterOptions.tipo === '' || nota.tipo.toString() === this.filterOptions.tipo;

      const startDate = this.filterOptions.startDate ? new Date(this.filterOptions.startDate) : null;
      const endDate = this.filterOptions.endDate ? new Date(this.filterOptions.endDate) : null;

      const notaDate = new Date(nota.fecha);

      const matchesStartDate = !startDate || notaDate >= startDate;
      const matchesEndDate = !endDate || notaDate <= endDate;

      return matchesTitulo && matchesTipo && matchesStartDate && matchesEndDate;
    });
  }

  onFilterChange() {
    this.applyFilter();
  }

  clearFilter(tipoFiltro: string) {
    if (tipoFiltro == 'titulo') {
      this.filterOptions.titulo = '';
    } else if (tipoFiltro == 'tipo') {
      this.filterOptions.tipo = '';
    } else if (tipoFiltro == 'desde') {
      this.filterOptions.startDate = null;
    } else if (tipoFiltro == 'hasta') {
      this.filterOptions.endDate = null;
    }
    this.applyFilter();
  }

  public openDeletion(id: string): void {
    this.openDeletionPopup = true;
    this.notaId = id;
    this.itemForDelete = "nota";
  }

  public openEdition(nota: any): void {
    this.openEditionPopup = true;
    this.OpenpopupEditarNota = true;
    this.notaAModificar = nota;
  }

  public openDestinatariosPopup(nota: any) {
    this.nota = nota;
    this.showDestinatariosPopup = true;
  }

  public openLeerCuerpo(nota: any): void {
    this.notaALeerCuerpo = nota;
    this.popuCuerpoNota = true;
  }

  public closeModal(): void {
    this.openDeletionPopup = false;
    this.openEditionPopup = false;
    this.openAgregarNotaPopup = false;
  }

  public closeSuccessAlert() {
    this.showDeletionSuccessAlert = false;
    this.showModificationSuccessAlert = false;
    this.showAdditionSuccessAlert = false;
    window.location.reload();
  }

  public closeErrorAlert() {
    this.showErrorAlert = false;
  }

  public handleDeleteClick = () => {
    this.notaService.EliminarNotaEmitida(this.notaId).subscribe(res => {
      if (res) {
        this.reloadPage("success", "deletion");
      }
      else {
        this.reloadPage("error", "");
      }
    });
    this.openDeletionPopup = false;
  }

  public handleEditClick(eventData: { titulo: string, cuerpo: string, aulasDestinadas: any[] }) {
    const nota = { titulo: eventData.titulo, cuerpo: eventData.cuerpo, aulasDestinadas: eventData.aulasDestinadas }
    this.notaService.ModificarNotaEmitida(this.notaAModificar.id, nota).subscribe(res => {
      if (res) {
        this.reloadPage("success", "edition");
      }
      else {
        this.reloadPage("error", "");
      }
    });
    this.openEditionPopup = false;
  }

  public handleEnviarClick(eventData: { tipo: string, conAula: boolean, aulasDestinadas: any[], idAlumnoReferido: string, destinatarios: any[], titulo: string, cuerpo: string, files: FormData, enviaNotaComo: string }) {
    eventData.files?.forEach((value, key) => {
      if (value != '' || key != '') {
        this.counter += 1;
      }
    });
    if (this.counter > 0) {
      this.notaService.AgregarNotaFiles(eventData.files).subscribe(res => {
        if (res) {
          this.notaService.EnviarNuevaNota(eventData).subscribe(res => {
            if (res) {
              this.reloadPage("success", "addition");
              this.openAgregarNotaPopup = false;
            } else {
              this.reloadPage("error", "");
            }
          },
            (error: HttpErrorResponse) => {
              if (error.status == 404 || error.status == 400) {
                this.reloadPage("error", "");
              }
            });
        }
      },
        (error: HttpErrorResponse) => {
          if (error.error.includes("Request body too large")) {
            this.reloadPage("Request body too large error", "");
          } else if (error.status == 404 || error.status == 400) {
            this.reloadPage("error", "");
          }
        });
    } else {
      this.notaService.EnviarNuevaNota(eventData).subscribe(res => {
        if (res) {
          this.reloadPage("success", "addition");
          this.openAgregarNotaPopup = false;
        } else {
          this.reloadPage("error", "");
        }
      },
        (error: HttpErrorResponse) => {
          if (error.status >= 400) {
            this.reloadPage("error", "");
          }
        });
    }
  }

  public verArchivosNota(nota: any) {
    this.router.navigate(['/archivos_ausencia'], { state: { data: nota } });
  }

  reloadPage(resultado: string, action: string) {
    if (resultado == "success") {
      if (action == "deletion") {
        this.showDeletionSuccessAlert = true;
      } else if (action == "edition") {
        this.showModificationSuccessAlert = true;
      } else if (action == "addition") {
        this.showAdditionSuccessAlert = true;
      }
    }
    else {
      if(resultado == "Request body too large error"){
        this.esErrorBodyTooLarge = true;
      }else{
        this.esErrorBodyTooLarge = false
      }
      this.showErrorAlert = true;
    }
  }

  public calculateIndices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return { startIndex, endIndex };
  }

  public getPages(): number[] {
    const totalPages = Math.ceil(this.notas.length / this.itemsPerPage);
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
