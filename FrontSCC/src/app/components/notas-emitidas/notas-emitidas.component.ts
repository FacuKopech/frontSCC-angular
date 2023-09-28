import { Component, ViewChild } from '@angular/core';
import { NotaService } from '../../services/notas_services/nota.service';
import { ApiService } from '../../services/user_services/api.service';
import { EditarNotaPopupComponent } from '../popups/editar-nota-popup/editar-nota-popup.component';
import { Location } from '@angular/common';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-notas-emitidas',
  templateUrl: './notas-emitidas.component.html',
  styleUrls: ['./notas-emitidas.component.css']
})
export class NotasEmitidasComponent {
  @ViewChild(EditarNotaPopupComponent) popupEditarNota!: EditarNotaPopupComponent;

  constructor(private notaService: NotaService, private apiService: ApiService,  private location: Location, private aulaService: AulaService, private router: Router) {
    this.popupEditarNota = new EditarNotaPopupComponent(aulaService, apiService);
  }


  showDeletionSuccessAlert = false;
  showModificationSuccessAlert = false;
  showAdditionSuccessAlert = false;
  showErrorAlert = false;
  OpenpopupEditarNota = false;
  popuCuerpoNota = false;
  popuLeerNota = false;
  showDestinatariosPopup = false;
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
  counter: number = 0;
  nota: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;

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

  public openDestinatariosPopup(nota: any){
    this.nota = nota;
    this.showDestinatariosPopup = true;
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
    this.showAdditionSuccessAlert = false;
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
        this.reloadPage("error", "");
      }
    });
    this.openDeletionPopup = false;
  }

  public handleEditClick(eventData: { titulo: string, cuerpo: string, aulasDestinadas: any[] }) {
    const nota = { titulo: eventData.titulo, cuerpo: eventData.cuerpo, aulasDestinadas: eventData.aulasDestinadas }
    this.notaService.ModificarNotaEmitida(this.notaAModificar.id, nota).subscribe(res => {
      console.log(res);
      if (res) {
        this.reloadPage("success", "edition");
      }
      else {
        this.reloadPage("error", "");
      }
    });
    this.openEditionPopup = false;
  }

  public handleAgregarClick() {
    this.apiService.ObtenerTipoPersonaLogueada().subscribe(res =>{
      this.tipoUsuario = res;
    });
  }

  public handleEnviarClick(eventData: { tipo: string, conAula: boolean, aulasDestinadas: any[], idAlumnoReferido: number, destinatarios: any[], titulo:string, cuerpo: string, files:FormData}) {
    eventData.files?.forEach((value, key) => {
      if(value != '' || key != ''){
        this.counter += 1;
      }
    });
    if(this.counter > 0){
      this.notaService.AgregarNotaFiles(eventData.files).subscribe(res =>{
        if(res){
          this.notaService.EnviarNuevaNota(eventData).subscribe(res => {
            if(res){
              this.reloadPage("success", "addition");
              this.openAgregarNotaPopup = false;
            }else{
              this.reloadPage("error", "");
            }
          },
          (error:HttpErrorResponse) =>{
            if(error.status == 404 || error.status == 400){
              console.log(error);
              this.reloadPage("error", "");
            }
          });
        }
      });
    }else{
      this.notaService.EnviarNuevaNota(eventData).subscribe(res => {
        if(res){
          this.reloadPage("success", "addition");
          this.openAgregarNotaPopup = false;
        }else{
          this.reloadPage("error", "");
        }
      },
      (error:HttpErrorResponse) =>{
        if(error.status == 404 || error.status == 400){
          this.reloadPage("error", "");
        }
      });
    }
  }

  public verArchivosNota(nota: any){
    console.log(nota);
    this.router.navigate(['/archivos_ausencia'], {state: {data: nota}});
  }

  reloadPage(resultado: string, action: string) {
    if(resultado == "success"){
      if(action == "deletion"){
          this.showDeletionSuccessAlert = true;
      }else if(action == "edition") {
        this.showModificationSuccessAlert = true;
      }else if(action == "addition"){
        this.showAdditionSuccessAlert = true;
      }
    }
    else{
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

  public pageClick(page: number){
    this.currentPage = page;
  }

  public previousPageClick(){
    this.currentPage = this.currentPage - 1
  }

  public nextPageClick(){
    this.currentPage = this.currentPage + 1
  }

  public goBack(){
    this.location.back();
  }
}
