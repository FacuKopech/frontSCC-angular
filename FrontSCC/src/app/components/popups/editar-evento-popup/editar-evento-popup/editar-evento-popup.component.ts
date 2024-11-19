import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EventosService } from 'src/app/services/eventos_services/eventos.service';

@Component({
  selector: 'app-editar-evento-popup',
  templateUrl: './editar-evento-popup.component.html',
  styleUrls: ['./editar-evento-popup.component.css']
})
export class EditarEventoPopupComponent {
  @ViewChild('fechaInput', { static: false }) fechaInput!: ElementRef<HTMLInputElement>;
  @ViewChild('localidadInput', { static: false }) localidadInput!: ElementRef<HTMLInputElement>;
  @ViewChild('motivoInput', { static: false }) motivoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descripcionInput', { static: false }) descripcionInput!: ElementRef<HTMLInputElement>;
  @ViewChild('aulaInput', { static: false }) aulaInput!: ElementRef<HTMLInputElement>;

  fechaEvento: Date;
  localidadEvento: string = "";
  motivoEvento: string = "";
  descripcionEvento: string = "";
  aulaEvento: string = "";
  currentDate = new Date();
  weatherData: any = null;
  showWeatherResultPopup = false;
  showErrorAlert = false;

  constructor(private eventoService: EventosService) {
    this.fechaEvento = new Date();
  }

  @Input() evento: any;
  @Input() aulas: any;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  editarButtonClick = new EventEmitter<{ fecha: Date, localidad: string, motivo: string, descripcion: string, aula: string }>();

  public ngOnInit(){
    this.fechaEvento = this.evento.meta.eventDetails.fecha.split('T')[0];
    this.localidadEvento = this.evento.meta.eventDetails.localidad;
    this.motivoEvento = this.evento.meta.eventDetails.motivo;
    this.descripcionEvento = this.evento.meta.eventDetails.descripcion;
    this.aulaEvento = this.evento.meta.eventDetails.aulaDestinada.id;
  }

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public handleAulaSeleccionada = ($event: Event) => {
    this.aulaEvento = ($event.target as HTMLInputElement).value;
  }

  public checkWeather() {
    if (this.fechaInput.nativeElement.value !== '' && this.localidadInput.nativeElement.value !== '') {
      this.eventoService.ChequearClima(this.localidadInput.nativeElement.value, this.fechaInput.nativeElement.value).subscribe(res => {
        if (res) {
          this.weatherData = res;
          this.showWeatherResultPopup = true;
        }
      }, (error: HttpErrorResponse) => {
        if (error.status == 404 || error.status == 400) {
          this.showErrorAlert = true;
        }
      });
    }
  }

  public editarClicked = () => {
    this.currentDate.setHours(0, 0, 0, 0);
    const inputDateValue = this.fechaInput.nativeElement.value ? this.fechaInput.nativeElement.value : '';
    const inputDate = new Date(inputDateValue);
    inputDate.setHours(0, 0, 0, 0);
    const gralError = document.querySelector(`span[id="gralError"]`) as HTMLElement;
    const fechaError = document.querySelector(`span[id="fechaError"]`) as HTMLElement;
    const localidadError = document.querySelector(`span[id="localidadError"]`) as HTMLElement;
    const motivoError = document.querySelector(`span[id="motivoError"]`) as HTMLElement;
    const descripcionError = document.querySelector(`span[id="descripcionError"]`) as HTMLElement;
    const aulaError = document.querySelector(`span[id="aulaError"]`) as HTMLElement;
    if(inputDate == this.evento.fecha 
      && this.localidadInput.nativeElement.value == this.evento.localidad
      && this.motivoInput.nativeElement.value == this.evento.motivo
      && this.descripcionInput.nativeElement.value == this.evento.descripcion
      && this.aulaInput.nativeElement.value == this.evento.aulaDestinada.id
    ){
      gralError.textContent = "Para poder editar un Evento, debe modificar al menos un campo";
      gralError.style.display = "flex";
      gralError.style.color = "red";
      gralError.style.fontWeight = "bold";
    }else if (this.fechaInput.nativeElement.value == '') {
      fechaError.textContent = "Debe ingresar una fecha para el evento";
      fechaError.style.display = "flex";
      fechaError.style.color = "red";
      fechaError.style.fontWeight = "bold";
    } else if (inputDate <= this.currentDate) {
      fechaError.textContent = "La fecha seleccionada no puede ser igual o menor a la actual";
      fechaError.style.display = "flex";
      fechaError.style.color = "red";
      fechaError.style.fontWeight = "bold";
    } else if (this.localidadInput.nativeElement.value == '') {
      fechaError.textContent = "";
      fechaError.style.display = "none";
      localidadError.textContent = "Debe ingresar una localidad para el evento";
      localidadError.style.display = "flex";
      localidadError.style.color = "red";
      localidadError.style.fontWeight = "bold";
    } else if (this.motivoInput.nativeElement.value == '') {
      localidadError.textContent = "";
      localidadError.style.display = "none";
      motivoError.textContent = "Debe ingresar un motivo para el evento";
      motivoError.style.display = "flex";
      motivoError.style.color = "red";
      motivoError.style.fontWeight = "bold";
    } else if (this.descripcionInput.nativeElement.value == '') {
      motivoError.textContent = "";
      motivoError.style.display = "none";
      descripcionError.textContent = "Debe ingresar una descripcion para el evento";
      descripcionError.style.display = "flex";
      descripcionError.style.color = "red";
      descripcionError.style.fontWeight = "bold";
    } else if (this.descripcionInput.nativeElement.value.length <= 10) {
      motivoError.textContent = "";
      motivoError.style.display = "none";
      descripcionError.textContent = "Debe ingresar una descripcion que contenga mas de 10 caracteres";
      descripcionError.style.display = "flex";
      descripcionError.style.color = "red";
      descripcionError.style.fontWeight = "bold";
    } else if (this.aulaInput.nativeElement.value == '') {
      descripcionError.textContent = "";
      descripcionError.style.display = "none";
      aulaError.textContent = "Debe seleccionar un Aula";
      aulaError.style.display = "flex";
      aulaError.style.color = "red";
      aulaError.style.fontWeight = "bold";
    } else {
      fechaError.textContent = "";
      fechaError.style.display = "none";
      localidadError.textContent = "";
      localidadError.style.display = "none";
      motivoError.textContent = "";
      motivoError.style.display = "none";
      descripcionError.textContent = "";
      descripcionError.style.display = "none";
      aulaError.textContent = "";
      aulaError.style.display = "none";
      this.editarButtonClick.emit({ fecha: this.fechaEvento, localidad: this.localidadEvento, motivo: this.motivoEvento, descripcion: this.descripcionEvento, aula: this.aulaEvento });
    }
  }
}
