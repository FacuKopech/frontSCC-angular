import { Component, ViewChild } from '@angular/core';
import { NotaService } from '../../services/notas_services/nota.service';
import {LeerNotaPopupComponent} from '../popups/leer-nota-popup/leer-nota-popup.component'
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notas-recibidas',
  templateUrl: './notas-recibidas.component.html',
  styleUrls: ['./notas-recibidas.component.css']
})
export class NotasRecibidasComponent {
  @ViewChild(LeerNotaPopupComponent) popupEditarNota!: LeerNotaPopupComponent;

  constructor(private notaService: NotaService, private location: Location,  private router: Router)  {
    this.popupEditarNota = new LeerNotaPopupComponent();
  }

  openDeletionPopup = false;
  showDeletionSuccessAlert = false;
  showErrorAlert = false;
  showNotaLeidaAlert = false;
  popupLeerNota = false;
  resLeerNota=false;
  public notaId: number = -1;
  public message: string = "";
  public notas: any[] = [];
  public notaALeerr: any;
  itemForDelete: string ='';

  public ngOnInit(): void {
    this.notaService.ObtenerNotasRecibidas().subscribe(res => {
      if (res) {
        this.notas = res;
        if (this.notas.length == 0) {
          this.message = "No existen notas recibidas!";
        }
      }
    });
  }

  public goBack(){
    this.location.back();
  }

  public openDeletion(idNota: number): void {
    this.openDeletionPopup = true;
    this.notaId = idNota;
    this.itemForDelete = "nota";
  }

  public openLeer(nota: any): void {
    this.popupLeerNota = true;
    this.notaALeerr = nota;
    this.handleLeerClick();
  }

  public verArchivosNota(nota: any){
    console.log(nota);
    this.router.navigate(['/archivos_ausencia'], {state: {data: nota}});
  }

  public closeModal(): void {
    this.openDeletionPopup = false;
  }

  public closeLeer(): void {
    this.popupLeerNota = false;
    if(this.resLeerNota){
      this.showNotaLeidaAlert = true;
    }else{
      this.showNotaLeidaAlert = false;
    }
  }

  public closeLeidaAlert(): void {
    this.showNotaLeidaAlert = false;
  }

  public closeSuccessAlert(){
    this.showDeletionSuccessAlert = false;
    window.location.reload();
  }

  public closeErrorAlert(){
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
    if(resultado == "success"){
      this.showDeletionSuccessAlert = true;
    }
    else{
      this.showErrorAlert = true;
    }
  }
}
