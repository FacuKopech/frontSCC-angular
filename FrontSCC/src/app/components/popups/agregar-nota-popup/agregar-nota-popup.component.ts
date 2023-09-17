import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NotaService } from 'src/app/services/notas_services/nota.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-agregar-nota-popup',
  templateUrl: './agregar-nota-popup.component.html',
  styleUrls: ['./agregar-nota-popup.component.css']
})
export class AgregarNotaPopupComponent {

  tituloNota: string = '';
  cuerpoNota: string = '';
  tipoElegido = '';
  esConAula=false;
  public datosParaNota: any;
  public aulas: any[] = [];
  public alumnos: any[] = [];
  public destinatarios: any[] = [];
  public selectedDestinatarios: any[] = [];
  public alumnoSeleccionado: any;
  public aulaSeleccionada: any;
  public idAula: number = -1;
  public idAlumno: number = -1;
  isRadioButtonVisible = false;
  openTipoNotaInfoPopup = false;
  esTipo = false;
  fileToUpload: any;
  formData: FormData;
  files: File[] = [];

  constructor(private notaService: NotaService) {
    this.formData = new FormData();
  }

  @Input() tipoUser: string='';
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  enviarButtonClick = new EventEmitter<{tipo: string, conAula: boolean, idAulaDestinada: number, idAlumnoReferido: number, destinatarios: any[], titulo:string, cuerpo: string, files:FormData}>();
  @ViewChild('radioButtonParticular', { static: false }) radioButtonParticularRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('radioButtonGenerica', { static: false }) radioButtonGenericaRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('divAulaDestinada', { static: false }) aulaRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('divAlumnoReferido', { static: false }) alumnoRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('dropdown', { static: false }) destinatariosRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('dropdownMenu', { static: false }) destinatariosMenuRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('labelDropdownMenu', { static: false }) labelDestinatariosRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('selectAulas', { static: false }) selectAulasRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
  public enviarClicked = () => {
    console.log(this.tipoElegido, this.esConAula, this.idAula, this.idAlumno, this.selectedDestinatarios, this.tituloNota, this.cuerpoNota);
    this.enviarButtonClick.emit({ tipo: this.tipoElegido, conAula: this.esConAula, idAulaDestinada: this.idAula,
      idAlumnoReferido: this.idAlumno, destinatarios:this.selectedDestinatarios, titulo: this.tituloNota, cuerpo: this.cuerpoNota, files: this.formData});
  }

  public openInfoPopup(esTipo: boolean){
    this.esTipo = esTipo;
    this.openTipoNotaInfoPopup = true;
  }

  public openFileExplorer() {
    const fileError =   document.querySelector(`span[id="fileError"]`) as HTMLElement;
    fileError.style.display = "none";
    this.fileInput.nativeElement.click();
  }

  public onFilesSelected(event: Event) {
    const fileError =   document.querySelector(`span[id="fileError"]`) as HTMLElement;
    const files = (event.target as HTMLInputElement).files;
    console.log(files);
    if(files !== null){
      if (files.length === 0) {
        return;
      }
      if(files.length > 0){
        for (let index = 0; index < files?.length; index++) {
            this.fileToUpload = <File>files[index];
            let counter = 0;
            for (let index = 0; index < this.files.length; index++) {
              if(this.files[index].name == this.fileToUpload.name){
                break;
              }
              counter += 1;
            }

            if(counter == this.files.length){
              this.files.push(this.fileToUpload);
              this.formData.append(this.fileToUpload.name, this.fileToUpload, this.fileToUpload.name);
            }else if(counter < this.files.length){
              fileError.textContent = "Archivo ya seleccionado!";
              fileError.style.display = "flex";
              fileError.style.color = "red";
              fileError.style.fontWeight = "bold";
              this.deleteSelectedFile(this.fileToUpload);
            }

        }
      }else{
        this.fileToUpload = <File>files[0];
        this.files.push(this.fileToUpload);
        this.formData.append(this.fileToUpload.name, this.fileToUpload, this.fileToUpload.name);
        console.log(this.formData.get(this.fileToUpload.name), files);
      }
    }
  }

  public deleteSelectedFile(file: File) {
    const fileError =   document.querySelector(`span[id="fileError"]`) as HTMLElement;
    fileError.style.display = "none";
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

  public radioButtonShow(tipoElegido: string) {
    var divAulaDestinada = this.aulaRef.nativeElement;
    var divAlumnoReferido = this.alumnoRef.nativeElement;
    var dropDownListDestinatarios = this.destinatariosRef.nativeElement;
    var labelDropDownListDestinatarios = this.labelDestinatariosRef.nativeElement;
    var dropDownListDestinatarios = this.destinatariosRef.nativeElement;
    var labelDropDownListDestinatarios = this.labelDestinatariosRef.nativeElement;
    this.tipoElegido = tipoElegido;

    if (tipoElegido === 'G') {
      this.isRadioButtonVisible = true;
      divAlumnoReferido.style.display = 'none';
      if(this.tipoUser == "Padre"){
        this.isRadioButtonVisible = false;
        this.esConAula = false;
        this.idAula = 0;
        this.idAlumno = 0;
        divAulaDestinada.style.display = 'flex';
        this.selectAulasRef.nativeElement.value = "0";
      }
      this.ObtenerAulasDestinatariosParaNuevaNota(tipoElegido);
    } else if(tipoElegido === 'P') {
      this.isRadioButtonVisible = false;
      divAulaDestinada.style.display = 'flex';
      this.selectAulasRef.nativeElement.value = "0";
      this.esConAula = true;
      dropDownListDestinatarios.style.display = "none";
      labelDropDownListDestinatarios.style.display = "none";
      if(this.tipoUser != "Padre"){
        this.ObtenerAulasDestinatariosParaNuevaNota(tipoElegido);
      }
      if(this.tipoUser == "Padre"){
        this.idAula = 0;
        this.destinatarios = [];
        divAlumnoReferido.style.display = 'flex';
        divAulaDestinada.style.display = 'none';
        dropDownListDestinatarios.style.display = "none";
        labelDropDownListDestinatarios.style.display = "none";
        this.ObtenerHijosPadreParaNuevaNota();
      }
    }
  }

  mostrarAula(){
    this.esConAula = true;
    var divAulaDestinada = this.aulaRef.nativeElement;
    divAulaDestinada.style.display = "flex";
    this.selectAulasRef.nativeElement.value = "0";
    var divAlumnoReferido = this.alumnoRef.nativeElement;
    var dropDownListDestinatarios = this.destinatariosRef.nativeElement;
    dropDownListDestinatarios.style.display = "none";
    var labelDropDownListDestinatarios = this.labelDestinatariosRef.nativeElement;
    labelDropDownListDestinatarios.style.display = "none";
    var dropDownListMenuDestinatarios = this.destinatariosMenuRef.nativeElement;
    dropDownListMenuDestinatarios.style.display = "none";

    if(this.tipoElegido == 'G'){
      divAlumnoReferido.style.display = "none";
    }else{
      divAlumnoReferido.style.display = "flex";
    }
    this.ObtenerAulasDestinatariosParaNuevaNota(this.tipoElegido);
  }

  esconderAula(){
    this.esConAula = false;
    var divAulaDestinada = this.aulaRef.nativeElement;
    divAulaDestinada.style.display = "flex";
    this.selectAulasRef.nativeElement.value = "0";
    var divAlumnoReferido = this.alumnoRef.nativeElement;
    divAlumnoReferido.style.display = "none";
    this.ObtenerAulasDestinatariosParaNuevaNota(this.tipoElegido);
  }

  showDropDownListDestinatarios(){
    var dropDownListMenuDestinatarios = this.destinatariosMenuRef.nativeElement;
    if(dropDownListMenuDestinatarios.style.display == "flex"){
      dropDownListMenuDestinatarios.style.display = "none";
    }else{
      dropDownListMenuDestinatarios.style.display = "flex";
    }

  }

  public ObtenerAulasDestinatariosParaNuevaNota = (tipoDeNota: string) => {
    this.notaService.ObtenerAulasParaNuevaNota(tipoDeNota).subscribe(res => {
      this.aulas = res;
    });
  }

  public ObtenerHijosPadreParaNuevaNota = () => {
    this.notaService.ObtenerHijosPadreParaNuevaNota().subscribe(res => {
      this.alumnos = res;
    });
  }

  public handleAulaSeleccionada = (idAula: number) => {
    this.selectedDestinatarios.length = 0;
    console.log(this.destinatarios);
    if(this.tipoUser == "Padre" && this.tipoElegido == "G"){
      this.notaService.ObtenerListaDeDestinatariosParaNuevaNota(idAula).subscribe(res => {
        this.destinatarios = res;
      });
      var dropDownListDestinatarios = this.destinatariosRef.nativeElement;
      var labelDropDownListDestinatarios = this.labelDestinatariosRef.nativeElement;
      dropDownListDestinatarios.style.display = "flex";
      labelDropDownListDestinatarios.style.display = "flex";
    }
    if(this.tipoElegido == 'P'){
      this.notaService.ObtenerAlumnosDeAulaParaNuevaNota(idAula).subscribe(res => {
        this.alumnos = res;
        console.log(this.alumnos);
      });
      var divAlumnoReferido = this.alumnoRef.nativeElement;
      divAlumnoReferido.style.display = 'flex';
    }
    if(this.tipoElegido == "G" && this.tipoUser == "Docente"){
      this.idAlumno = 0;
      console.log(this.esConAula);
      if(this.esConAula){
        this.idAula = idAula;
      }else{
        this.notaService.ObtenerListaDeDestinatariosParaNuevaNota(idAula).subscribe(res => {
          this.destinatarios = res;
        });
        var dropDownListDestinatarios = this.destinatariosRef.nativeElement;
        var labelDropDownListDestinatarios = this.labelDestinatariosRef.nativeElement;
        dropDownListDestinatarios.style.display = "flex";
        labelDropDownListDestinatarios.style.display = "flex";
      }
    }
  }

  public guardarAlumnoSeleccionado = (idAlumno: number) => {
    console.log(idAlumno);
    this.idAlumno = idAlumno;
  }

  public destinatarioCheck = (destinatario: any) => {
    let arrayAnterior: any[] = [];
    arrayAnterior = this.selectedDestinatarios;
    this.selectedDestinatarios = this.selectedDestinatarios.filter((destinatarioArray) => destinatarioArray != destinatario.id);
    if(arrayAnterior.length == this.selectedDestinatarios.length){
      this.selectedDestinatarios.push(destinatario.id);
    }
    console.log(this.selectedDestinatarios);
  }
}
