import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login_services/login.service';
import { EventosService } from 'src/app/services/eventos_services/eventos.service';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { CalendarEvent } from 'angular-calendar';
import { addMonths, isBefore, isEqual, isSameDay, isWeekend, parseISO, subMonths } from 'date-fns';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent {
  public eventos: any[] = [];
  public calendarEvents: CalendarEvent[] = [];
  public viewDate: Date = new Date();
  public locale: string = 'es';
  public evento: any;
  public aulas: any[] = [];
  public institucion: any;
  public message: string = "";
  openAgregarEventoPopup = false;
  showEventoPopup = false;
  openSuccessAlert = false;
  openErrorAlert = false;
  esAgregarEvento = false;
  esEliminarEvento = false;
  esEditarEvento = false;
  esConfirmarAsistenciaEvento = false;
  esErrorEventoYaExistenteEnAula = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  public loggedInUser: any = this.loginService.getLoggedInUser();
  public isDirectivo = false;
  public isDocente = false;
  public isPadre = false;
  public yaConfirmoAsistencia = false;
  public tipoAsistencia = "";

  constructor(
    private eventoService: EventosService,
    private location: Location,
    private router: Router,
    private loginService: LoginService,
    private aulaService: AulaService
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.loadEventosAndAulas();
  }

  private loadUserData() {
    const loggedInUser = this.loginService.getLoggedInUser();
    this.loggedInUser = loggedInUser;
    this.isDirectivo = loggedInUser.roles.some((role: any) => role.tipo === 'Directivo');
    this.isDocente = loggedInUser.roles.some((role: any) => role.tipo === 'Docente');
    this.isPadre = loggedInUser.roles.some((role: any) => role.tipo === 'Padre');
    this.institucion = loggedInUser.institucion;
  }

  private loadEventosAndAulas() {
    this.eventoService.ObtenerEventos().subscribe(res => {
      this.message = "";
      if (res) {
        this.eventos = res;
        if (this.isPadre) {
          this.setAsistenciaForParent();
        }
        this.calendarEvents = this.eventos.map(evento => ({
          start: new Date(evento.fecha),
          title: evento.motivo,
          color: { primary: '#1e90ff', secondary: '#D1E8FF' },
          meta: { eventDetails: evento }
        }));
      } else {
        this.message = "No existen Eventos creados";
      }
      if (this.isDirectivo) {
        this.aulaService.ObtenerAulasInstitucion().subscribe(res => {
          if (res.length > 0) {
            this.aulas = res;
          }
        }, (error: HttpErrorResponse) => {
          this.handleError(error);
        });
      } else if (this.isDocente) {
        this.aulaService.ObtenerAulasDocente().subscribe(res => {
          if (res.length > 0) {
            this.aulas = res;
          }
        }, (error: HttpErrorResponse) => {
          this.handleError(error);
        });
      }
    }, (error: HttpErrorResponse) => {
      this.handleError(error);
    });
  }

  private setAsistenciaForParent() {
    this.eventos.forEach(evento => {
      evento.yaConfirmoAsistencia =
        evento.talVezAsistan.some((padre: any) => padre.id === this.loggedInUser.id) ||
        evento.noAsistiran.some((padre: any) => padre.id === this.loggedInUser.id) ||
        evento.asistiran.some((padre: any) => padre.id === this.loggedInUser.id);
      evento.tipoAsistencia =
        evento.talVezAsistan.some((padre: any) => padre.id === this.loggedInUser.id) ? "Tal Vez" :
          evento.noAsistiran.some((padre: any) => padre.id === this.loggedInUser.id) ? "No" :
            evento.asistiran.some((padre: any) => padre.id === this.loggedInUser.id) ? "Si" : "";
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 404 || error.status == 400) {
      this.openErrorAlert = true;
    }
  }

  public openEventoPopup(evento: any) {
    this.evento = evento;
    this.showEventoPopup = true;
  }

  public agregarEvento(eventData: { fecha: Date, localidad: string, motivo: string, descripcion: string, aula: string }) {
    const loggedInUser = this.loginService.getLoggedInUser();
    this.eventoService.AgregarEvento(eventData, loggedInUser.id).subscribe(res => {
      if (res) {
        this.openSuccessAlert = true;
        this.esAgregarEvento = true;
        this.esEliminarEvento = false;
        this.openAgregarEventoPopup = false;
      }
    },
      (error: HttpErrorResponse) => {
        if (error.status >= 400) {
          this.openErrorAlert = true;
          if (error.error.includes("El Aula ya contiene el Evento")) {
            this.esErrorEventoYaExistenteEnAula = true;
          } else {
            this.esAgregarEvento = true;
          }
        }
      });
  }

  public confirmEliminarEvento(eventData: { idEvento: string }) {
    this.eventoService.EliminarEvento(eventData.idEvento).subscribe(res => {
      if (res) {
        this.openSuccessAlert = true;
        this.esAgregarEvento = false;
        this.esEliminarEvento = true;
      }
    },
      (error: HttpErrorResponse) => {
        if (error.status >= 400) {
          this.openErrorAlert = true;
        }
      });
  }

  public editarEvento({ eventData }: { eventData: { fecha: Date, localidad: string, motivo: string, descripcion: string, aula: string, idEvento: string }}) {
    this.eventoService.EditarEvento(eventData.idEvento, eventData).subscribe(res => {
      if (res) {
        this.openSuccessAlert = true;
        this.esEditarEvento = true;
      }
    }, (error: HttpErrorResponse) => {
      if (error.status >= 400) {
        this.openErrorAlert = true;
        if (error.error.includes("El Aula ya contiene el Evento")) {
          this.esErrorEventoYaExistenteEnAula = true;
        }
      }
    });
  }

  public confirmarAsistencia(eventData: { idEvento: string, tipoAsistencia: string }) {
    this.eventoService.ConfirmarAsistenciaEvento(eventData.idEvento, eventData.tipoAsistencia).subscribe(res => {
      if (res) {
        this.openSuccessAlert = true;
        this.esConfirmarAsistenciaEvento = true;
      }
    }, (error: HttpErrorResponse) => {
      if (error.status >= 400) {
        this.openErrorAlert = true;
      }
    });
  }

  isEventExpired(eventDate: string): boolean {
    const today = new Date();
    const eventDateParsed = parseISO(eventDate);
    return isBefore(eventDateParsed, today) && !isSameDay(eventDateParsed, today);
  }

  isWeekendDay(date: Date): boolean {
    return isWeekend(date);
  }

  public closeSuccessAlert() {
    this.openSuccessAlert = false;
    window.location.reload();
  }

  public previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  public nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  public calculateIndices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return { startIndex, endIndex };
  }

  public getPages(): number[] {
    const totalPages = Math.ceil(this.eventos.length / this.itemsPerPage);
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
