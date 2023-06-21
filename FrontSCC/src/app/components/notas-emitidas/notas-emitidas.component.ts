import { Component, ViewChild } from '@angular/core';
import { NotaService } from '../../services/notas_services/nota.service';
import { ApiService } from '../../services/user_services/api.service';
import { EditarNotaPopupComponent } from '../popups/editar-nota-popup/editar-nota-popup.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notas-emitidas',
  templateUrl: './notas-emitidas.component.html',
  styleUrls: ['./notas-emitidas.component.css']
})
export class NotasEmitidasComponent {
  @ViewChild(EditarNotaPopupComponent) popupEditarNota!: EditarNotaPopupComponent;

  constructor(private notaService: NotaService, private apiService: ApiService,  private location: Location) {
    this.popupEditarNota = new EditarNotaPopupComponent();
  }


  showDeletionSuccessAlert = false;
  showModificationSuccessAlert = false;
  showErrorAlert = false;
  OpenpopupEditarNota = false;
  popuCuerpoNota = false;
  popuLeerNota = false;
  openDeletionPopup = false;
  openEditionPopup = false;
  openAgregarNotaPopup = false;
  public notaId: number = -1;
  public message: string = "";
  public notas: any[] = [];
  public notaAModificar: any;
  public notaALeerCuerpo: any;
  public tipoUsuario: string='';
  itemForDelete: string = '';


  public ngOnInit(): void {
    this.notaService.ObtenerNotasEmitidas().subscribe(res => {
      if (res) {
        this.notas = res;
        console.log(this.notas);
        if (this.notas.length == 0) {
          this.message = "No existen notas emitidas!";
        }
      }
    });
  }

  public goBack(){
    this.location.back();
  }

  public openDeletion(id: number): void {
    this.openDeletionPopup = true;
    this.notaId = id;
    this.itemForDelete = "nota";
  }

  public openEdition(nota: any): void {
    this.openEditionPopup = true;
    this.OpenpopupEditarNota = true;
    this.notaAModificar = nota;
  }

  public openLeerCuerpo(nota: any):void{
    this.notaALeerCuerpo = nota;
    this.popuCuerpoNota = true;
  }

  public closeModal(): void {
    this.openDeletionPopup = false;
    this.openEditionPopup = false;
    this.openAgregarNotaPopup = false;
  }

  public closeSuccessAlert(){
    this.showDeletionSuccessAlert = false;
    this.showModificationSuccessAlert = false;
    window.location.reload();
  }

  public closeErrorAlert(){
    this.showErrorAlert = false;
  }

  public handleDeleteClick = () => {
    this.notaService.EliminarNotaEmitida(this.notaId).subscribe(res => {
      if (res) {
        this.reloadPage("success", "deletion");
      }
      else {
        this.reloadPage("error", "deletion");
      }
    });
    this.openDeletionPopup = false;
  }

  public handleEditClick(eventData: { titulo: string, cuerpo: string, idAula: number }) {
    const nota = { titulo: eventData.titulo, cuerpo: eventData.cuerpo, IdAula: eventData.idAula }
    this.notaService.ModificarNotaEmitida(this.notaAModificar.id, nota).subscribe(res => {
      if (res) {
        this.reloadPage("success", "edition");
      }
      else {
        this.reloadPage("error", "edition");
      }
    });
    this.openEditionPopup = false;
  }

  public handleAgregarClick() {
    this.apiService.ObtenerTipoPersonaLogueada().subscribe(res =>{
      this.tipoUsuario = res;
    });
  }

  public handleEnviarClick(eventData: { tipo: string, conAula: boolean, idAulaDestinada: number, idAlumnoReferido: number, destinatarios: any[], titulo:string, cuerpo: string}) {
    console.log('.');
    this.openAgregarNotaPopup = false;
  }

  reloadPage(resultado: string, action: string) {
    if(resultado == "success"){
      if(action == "deletion"){
          this.showDeletionSuccessAlert = true;
      }else {
        this.showModificationSuccessAlert = true;
      }
    }
    else{
      this.showErrorAlert = true;
    }
  }
}
