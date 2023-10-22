import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nueva-nota-adocente-popup',
  templateUrl: './nueva-nota-adocente-popup.component.html',
  styleUrls: ['./nueva-nota-adocente-popup.component.css']
})
export class NuevaNotaADocentePopupComponent {
  @Input() hijo: any;
  @Input() aula: any;
  @Input() docente: any;
  @Input() padres: any[] = [];
  @Input() aulaInstitucion: any;
  @Input() hijoAulaInstitucion: any;

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  enviarButtonClick = new EventEmitter<{tipo: string, titulo:string, cuerpo: string, files:FormData}>();
  @ViewChild('divAlumnoReferido', { static: false }) alumnoRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('tituloInput', { static: false }) tituloInputRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('cuerpoInput', { static: false }) cuerpoInputRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('tituloLabel', { static: false }) tituloLabelRef!: ElementRef<HTMLElement>;
  @ViewChild('cuerpoLabel', { static: false }) cuerpoLabelRef!: ElementRef<HTMLElement>;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('radioButtonParticular', { static: false }) radioButtonParticularRef!: ElementRef<HTMLInputElement>;
  @ViewChild('radioButtonGenerica', { static: false }) radioButtonGenericaRef!: ElementRef<HTMLInputElement>;

  inputTitulo = document.getElementById("titulo");
  inputCuerpo = document.getElementById("cuerpo");

  tituloNota: string = '';
  cuerpoNota: string = '';
  tipoElegido = '0';
  fileToUpload: any;
  formData: FormData;
  files: File[] = [];
  esNotaParaPadre = false;
  particularRadioButtonCheck = false;
  genericaRadioButtonCheck = false;

  showErrorAlert = false
  showPopupNuevaNota = false;

  constructor(){
    this.formData = new FormData();
  }

  public ngOnInit(){
    console.log(this.hijo, this.docente, this.padres);
    if(this.docente == null && this.padres.length > 0){
      this.esNotaParaPadre = true;
    }else if(this.docente != null && this.padres.length == 0){
      this.esNotaParaPadre = false;
    }
    this.particularRadioButtonCheck = false;
    this.genericaRadioButtonCheck = false;
  }

  ngAfterViewInit(){
    this.tituloLabelRef.nativeElement.style.display = "none";
    this.tituloInputRef.nativeElement.style.display = "none";
    this.cuerpoLabelRef.nativeElement.style.display = "none";
    this.cuerpoInputRef.nativeElement.style.display = "none";
  }

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public enviarClicked() {
    var titulo = this.tituloInputRef.nativeElement.value;
    var cuerpo = this.cuerpoInputRef.nativeElement.value;
    const tipoError =   document.querySelector(`span[id="tipoError"]`) as HTMLElement;
    const tituloError =   document.querySelector(`span[id="tituloError"]`) as HTMLElement;
    const cuerpoError =   document.querySelector(`span[id="cuerpoError"]`) as HTMLElement;

    if(titulo.length === 0){
      tituloError.textContent = "Este campo es requerido";
      tituloError.style.display = "flex";
      tituloError.style.color = "red";
      tituloError.style.fontWeight = "bold";
    }else if(cuerpo.length === 0){
      cuerpoError.textContent = "Este campo es requerido";
      cuerpoError.style.display = "flex";
      cuerpoError.style.color = "red";
      cuerpoError.style.fontWeight = "bold";
    }else{
      tipoError.textContent = "";
      tipoError.style.display = "none";
      tituloError.textContent = "";
      tituloError.style.display = "none";
      cuerpoError.textContent = "";
      cuerpoError.style.display = "none";
      this.enviarButtonClick.emit({ tipo: this.tipoElegido, titulo: this.tituloNota, cuerpo: this.cuerpoNota, files: this.formData});
    }

    this.inputTitulo?.addEventListener("focus", function () {
      tituloError.textContent = "";
      tituloError.style.display = "none";
    });
    this.inputCuerpo?.addEventListener("focus", function () {
      cuerpoError.textContent = "";
      cuerpoError.style.display = "none";
    });
  }


  public particularCheck(){
    this.particularRadioButtonCheck = true;
    this.genericaRadioButtonCheck = false;
    this.tipoElegido = "Particular";
    this.tituloLabelRef.nativeElement.style.display = "flex";
    this.tituloLabelRef.nativeElement.style.justifyContent = "center";
    this.tituloInputRef.nativeElement.style.display = "flex";
    this.cuerpoLabelRef.nativeElement.style.display = "flex";
    this.cuerpoLabelRef.nativeElement.style.justifyContent = "center";
    this.cuerpoInputRef.nativeElement.style.display = "flex";
    this.alumnoReferidoShow();
  }

  public genericaCheck(){
    this.genericaRadioButtonCheck = true;
    this.particularRadioButtonCheck = false;
    this.tipoElegido = "Generica";
    this.tituloLabelRef.nativeElement.style.display = "flex";
    this.tituloLabelRef.nativeElement.style.justifyContent = "center";
    this.tituloInputRef.nativeElement.style.display = "flex";
    this.cuerpoLabelRef.nativeElement.style.display = "flex";
    this.cuerpoLabelRef.nativeElement.style.justifyContent = "center";
    this.cuerpoInputRef.nativeElement.style.display = "flex";
    this.alumnoReferidoShow();
  }

  public alumnoReferidoShow(){
    var divAlumnoReferido = this.alumnoRef.nativeElement;
    if (this.particularRadioButtonCheck) {
      divAlumnoReferido.style.display = "flex";
      divAlumnoReferido.style.flexWrap = "wrap";
      divAlumnoReferido.style.alignContent = "center";
      divAlumnoReferido.style.flexDirection = "column";
    }else{
      divAlumnoReferido.style.display = "none";
    }
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
      this.formData.delete(file.name);
    }
  }
}
