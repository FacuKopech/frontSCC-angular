import { Component, ViewChild } from '@angular/core';
import { NotaService } from '../../services/notas_services/nota.service';
import { LeerNotaPopupComponent } from '../popups/leer-nota-popup/leer-nota-popup.component'
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/user_services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/services/login_services/login.service';
@Component({
  selector: 'app-notas-recibidas',
  templateUrl: './notas-recibidas.component.html',
  styleUrls: ['./notas-recibidas.component.css']
})
export class NotasRecibidasComponent {
  @ViewChild(LeerNotaPopupComponent) popupEditarNota!: LeerNotaPopupComponent;

  constructor(private notaService: NotaService, private userService: ApiService, private location: Location, private router: Router, private loginService: LoginService) {
    this.popupEditarNota = new LeerNotaPopupComponent();
  }

  filteredNotas: any[] = [];
  filterOptions: any = {
    titulo: '',
    tipo: '',
    startDate: null,
    endDate: null
  };
  openDeletionPopup = false;
  showDeletionSuccessAlert = false;
  showSuccessAlert = false;
  showErrorAlert = false;
  showNotaLeidaAlert = false;
  popupLeerNota = false;
  resLeerNota = false;
  public notaId: string = '';
  public message: string = "";
  public notas: any[] = [];
  public notaALeerr: any;
  public notaAFirmar: any;
  itemForDelete: string = '';
  openConfirmacionFirmaNotaPopup = false;
  openTokenConfirmation = false;
  esTokenParaFirmaNota = false;
  esFirmaNota = false
  token: string = '';
  emailUserLogueado = '';
  notaFirmada = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  public ngOnInit(): void {
    this.notaService.ObtenerNotasRecibidas().subscribe(res => {
      this.notas = res;
      if (this.notas !== null && this.notas.length > 0) {
        this.notas = res;
        this.applyFilter();
        console.log(this.notas);
      } else if (this.notas == null || this.notas.length === 0) {
        this.message = "No existen notas recibidas!";
        this.notas = [];
      }
    });

    let loggedInUser = this.loginService.getLoggedInUser();
    this.emailUserLogueado = loggedInUser.email;
    console.log(this.emailUserLogueado);
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

  public openDeletion(idNota: string): void {
    this.openDeletionPopup = true;
    this.notaId = idNota;
    this.itemForDelete = "nota";
  }

  public openLeer(nota: any): void {
    this.popupLeerNota = true;
    this.notaALeerr = nota;
    this.handleLeerClick();
  }

  public openConfirmacionFirmaPopup(nota: any) {
    this.notaAFirmar = nota
    console.log(this.notaAFirmar.id);
    this.openConfirmacionFirmaNotaPopup = true;
    this.esTokenParaFirmaNota = true;
  }

  public handleFirmarClick() {
    this.userService.getEmailPersonaLogueada().subscribe(res => {
      if (res) {
        this.userService.EnviarTokenSeguridad(res, "Nota").subscribe(res => {
          if (!res.includes('ERROR')) {
            this.token = res;
          }
        });
      }
    });
    this.esTokenParaFirmaNota = true;
    this.openTokenConfirmation = true;
  }

  public validarToken(eventData: { token: string }) {
    this.openTokenConfirmation = false;
    if (this.token == eventData.token.toUpperCase()) {
      this.notaService.FirmarNota(this.notaAFirmar.id).subscribe(res => {
        if (res) {
          this.esFirmaNota = true;
          this.showSuccessAlert = true;
        } else {
          this.showErrorAlert = true;
        }
      },
        (error: HttpErrorResponse) => {
          if (error.status >= 400) {
            this.showErrorAlert = true;
          }
        });
    } else {
      this.showErrorAlert = true;
    }
  }

  public checkEmailInFirmadaPor(nota: any): boolean {
    if (nota.firmadaPor.length > 0) {
      for (let index = 0; index < nota.firmadaPor.length; index++) {
        if (nota.firmadaPor[index].email === this.emailUserLogueado) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }

  public verArchivosNota(nota: any) {
    console.log(nota);
    this.router.navigate(['/archivos_ausencia'], { state: { data: nota } });
  }

  public closeModal(): void {
    this.openDeletionPopup = false;
  }

  public closeLeer(): void {
    this.popupLeerNota = false;
    if (this.resLeerNota) {
      this.showNotaLeidaAlert = true;
    } else {
      this.showNotaLeidaAlert = false;
    }
  }

  public closeLeidaAlert(): void {
    this.showNotaLeidaAlert = false;
  }

  public closeSuccessAlert() {
    this.showDeletionSuccessAlert = false;
    this.showSuccessAlert = false;
    this.openConfirmacionFirmaNotaPopup = false;
    window.location.reload();
  }

  public closeErrorAlert() {
    this.showErrorAlert = false;
  }

  public handleDeleteClick = () => {
    this.notaService.EliminarNotaRecibida(this.notaId).subscribe(res => {
      if (res) {
        this.reloadPage("success");
      }
      else {
        this.reloadPage("error");
      }
    });
    this.openDeletionPopup = false;
  }

  public handleLeerClick = () => {
    this.notaService.LeerNota(this.notaALeerr.id).subscribe(res => {
      if (res) {
        this.resLeerNota = true;
      }
      else {
        this.resLeerNota = false;
      }
    });
  }

  reloadPage(resultado: string) {
    if (resultado == "success") {
      this.showDeletionSuccessAlert = true;
      this.esFirmaNota = false;
    }
    else {
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
