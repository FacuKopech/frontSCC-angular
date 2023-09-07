import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AusenciaService } from 'src/app/services/ausencias_services/ausencia.service';

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
  openConfirmDeletePopup=false;
  itemForDelete: string = '';
  esAusenciaGenerica = false;
  @Input() filesAusencia: FormData;
  @Input() idHijo: number=-1;
  @Input() idAlumno: number=-1;
  @Input() ausencia: any;

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  deleteButtonClick = new EventEmitter<{idAusencia: number, idHijo: number}>();
  @Output()
  editButtonClick = new EventEmitter<{fechaComienzo: Date, fechaFin: Date, motivo: string}>();
  @Output()
  aceptarAusenciaButtonClick = new EventEmitter<{idAusencia: number, idAlumno: number, esAceptada: boolean}>();
  @Output()
  denegarAusenciaButtonClick = new EventEmitter<{idAusencia: number, idAlumno: number, esAceptada: boolean}>();

  constructor(private ausenciaService: AusenciaService, private router: Router){
    this.fechaComienzo = new Date();
    this.fechaFin = new Date();
    this.filesAusencia = new FormData();
  }

  ngOnInit(){
    if(this.idAlumno >= 0){
      document.getElementById("div-actionButtons")?.classList.remove("divActionButtons")
      document.getElementById("div-actionButtons")?.classList.add("show-close-button");
      document.getElementById("popup-widthClass")?.classList.remove("popup");
      document.getElementById("popup-widthClass")?.classList.add("change-width");
    }
    this.count = 0;
    this.motivoAusencia = this.ausencia.motivo;
    this.fechaComienzo = this.ausencia.fechaComienzo;
    this.fechaFin = this.ausencia.fechaFin;
    this.ausenciaService.GetEsAusenciaGenerica(this.ausencia.id, this.idAlumno).subscribe(res => {
      if(res){
        this.esAusenciaGenerica = true;
      }else{
        this.esAusenciaGenerica = false;
      }
    });
  }

  public openDeletionPopup(){
    this.openConfirmDeletePopup = true;
    this.itemForDelete = "ausencia";
  }
  public closeDeletionPopup(){
    this.openConfirmDeletePopup = false;
  }

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
  public deleteClicked() {
    this.deleteButtonClick.emit({idAusencia: this.ausencia.id, idHijo: this.idHijo});
    this.openConfirmDeletePopup = false;
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

  public verArchivosAusencia(){
    this.router.navigate(['/archivos_ausencia'], {state: {data: this.ausencia}});
  }

  public aceptarAusenciaClicked(){
    this.aceptarAusenciaButtonClick.emit({idAusencia: this.ausencia.id, idAlumno: this.idAlumno, esAceptada: true});
  }

  public denegarAusenciaClicked(){
    this.denegarAusenciaButtonClick.emit({idAusencia: this.ausencia.id, idAlumno: this.idAlumno, esAceptada: false});
  }
}
