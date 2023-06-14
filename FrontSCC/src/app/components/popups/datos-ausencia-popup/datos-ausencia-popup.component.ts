import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-datos-ausencia-popup',
  templateUrl: './datos-ausencia-popup.component.html',
  styleUrls: ['./datos-ausencia-popup.component.css'],
})
export class DatosAusenciaPopupComponent {
  @ViewChild('motivoInput', { static: false }) motivoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fechaComienzoInput', { static: false }) fechaComienzoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fechaFinInput', { static: false }) fechaFinInput!: ElementRef<HTMLInputElement>;

  fechaComienzo: Date;
  fechaFin: Date;
  motivoAusencia: string = '';
  count: number = 0;

  constructor(){
    this.fechaComienzo = new Date();
    this.fechaFin = new Date();
  }

  @Input() idHijo: number=-1;
  @Input() ausencia: any;

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  deleteButtonClick = new EventEmitter<{idAusencia: number, idHijo: number}>();
  @Output()
  editButtonClick = new EventEmitter<{fechaComienzo: Date, fechaFin: Date, motivo: string}>();

  ngOnInit(){
    this.count = 0;
    this.motivoAusencia = this.ausencia.motivo;
    this.fechaComienzo = this.ausencia.fechaComienzo;
    this.fechaFin = this.ausencia.fechaFin;
  }

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
  public deleteClicked() {
    this.deleteButtonClick.emit({idAusencia: this.ausencia.id, idHijo: this.idHijo});
  }
  public editClicked() {
    this.count += 1;
    console.log(this.count);
    if(this.count == 1){
      this.motivoInput.nativeElement.disabled = false;
      this.fechaComienzoInput.nativeElement.disabled = false;
      this.fechaFinInput.nativeElement.disabled = false;
    }
    else if(this.count > 1){
      if(this.motivoInput.nativeElement.value == this.ausencia.motivo && this.fechaComienzo == this.ausencia.fechaComienzo && this.fechaFin == this.ausencia.fechaFin){
        console.log('boludo');
        const errorGeneral =   document.querySelector(`span[id="generalError"]`) as HTMLElement;
        errorGeneral.textContent = "Para modificar una Ausencia debe modificar al menos 1 campo";
        errorGeneral.style.display = "flex";
        errorGeneral.style.color = "red";
        errorGeneral.style.fontWeight = "bold";
      }else{
        this.editButtonClick.emit({fechaComienzo: this.fechaComienzo, fechaFin: this.fechaFin, motivo: this.motivoAusencia});
        this.count = 0;
      }
    }

  }
}
