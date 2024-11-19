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
  public aulasDestinadas: any[] = [];
  public alumnos: any[] = [];
  public destinatarios: any[] = [];
  public selectedDestinatarios: any[] = [];
  public alumnoSeleccionado: any;
  public aulaSeleccionada: any;
  public idAlumno: string = '';
  isRadioButtonVisible = false;
  openTipoNotaInfoPopup = false;
  esTipo = false;
  esVariosRoles = false;
  fileToUpload: any;
  formData: FormData;
  files: File[] = [];
  esPadreYAlgoMas = false;
  roleAdicional: string = '';
  enviaNotaComoPadre = false;
  isTipoLabelVisible = false;
  isTipoOptionsVisible = false;
  particularRadioButtonCheck = false;
  genericaRadioButtonCheck = false;
  conAulaRadioButtonCheck = false;
  sinAulaRadioButtonCheck = false;
  selectedAulaId: number = 0;
  selectedAlumnoId: number = 0;
  enviaNotaComo = "";

  constructor(private notaService: NotaService) {
    this.formData = new FormData();
  }

  @Input() gruposUsuario: any[]= [];
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  enviarButtonClick = new EventEmitter<{tipo: string, conAula: boolean, aulasDestinadas: any[], idAlumnoReferido: string, destinatarios: any[], titulo:string, cuerpo: string, files:FormData, enviaNotaComo: string}>();
  @ViewChild('radioButtonPadre', { static: false }) radioButtonPadreRef!: ElementRef<HTMLInputElement>;
  @ViewChild('radioButtonRoleAdicional', { static: false }) radioButtonRoleAdicionalRef!: ElementRef<HTMLInputElement>;
  @ViewChild('radioButtonParticular', { static: false }) radioButtonParticularRef!: ElementRef<HTMLInputElement>;
  @ViewChild('radioButtonGenerica', { static: false }) radioButtonGenericaRef!: ElementRef<HTMLInputElement>;
  @ViewChild('radioButtonConAula', { static: false }) radioButtonConAulaRef!: ElementRef<HTMLInputElement>;
  @ViewChild('radioButtonSinAula', { static: false }) radioButtonSinAulaRef!: ElementRef<HTMLInputElement>;
  @ViewChild('divAulaDestinada', { static: false }) aulaRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('dropdownAulas', { static: false }) aulasRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('dropdownMenuAulas', { static: false }) aulasMenuRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('labelDropdownMenuAulas', { static: false }) labelAulasRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('divAlumnoReferido', { static: false }) alumnoRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('dropdown', { static: false }) destinatariosRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('dropdownMenu', { static: false }) destinatariosMenuRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('labelDropdownMenu', { static: false }) labelDestinatariosRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('selectAulas', { static: false }) selectAulasRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('divTituloAndCuerpo', { static: false }) divTituloAndCuerpoElementRef!: ElementRef<HTMLElement>;
  @ViewChild('tituloInput', { static: false }) tituloInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('cuerpoTextArea', { static: false }) cuerpoTextAreaRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('divFiles', { static: false }) divFilesElementRef!: ElementRef<HTMLElement>;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;


  public ngOnInit(){
    if(this.gruposUsuario.length === 2){
      const isPadre = this.gruposUsuario.some(obj => obj.tipo === 'Padre');
      if(isPadre){
        this.enviaNotaComo = "Padre"
      }else{
        const isDocente = this.gruposUsuario.some(obj => obj.tipo === 'Docente');
        if(isDocente){
          this.enviaNotaComo = "Docente"
        }else{
          const isDirectivo = this.gruposUsuario.some(obj => obj.tipo === 'Directivo');
          if(isDirectivo){
            this.enviaNotaComo = "Directivo"
          }
        }
      }
      this.isTipoLabelVisible = true;
      this.isTipoOptionsVisible = true;
    }else{
      if(this.gruposUsuario.length > 2){
        const isPadre = this.gruposUsuario.some(obj => obj.tipo === 'Padre');
        this.isTipoLabelVisible = false;
        this.isTipoOptionsVisible = false;
        if(isPadre){
          this.esPadreYAlgoMas = true;
          const grupoAdicional = this.gruposUsuario.find(obj => obj.tipo !== 'Padre' && obj.tipo !== 'UserRegular');
          this.roleAdicional = grupoAdicional.tipo;
        }else{
          this.esPadreYAlgoMas = false;
        }
      }
    }
  }

  ngAfterViewInit() {
    this.radioButtonParticularRef.nativeElement.checked = false;
    this.radioButtonGenericaRef.nativeElement.checked = false;
    this.radioButtonConAulaRef.nativeElement.checked = false;
    this.radioButtonSinAulaRef.nativeElement.checked = false;

    this.particularRadioButtonCheck = this.radioButtonParticularRef.nativeElement.checked;
    this.genericaRadioButtonCheck = this.radioButtonGenericaRef.nativeElement.checked;
    this.conAulaRadioButtonCheck = this.radioButtonConAulaRef.nativeElement.checked;
    this.sinAulaRadioButtonCheck = this.radioButtonSinAulaRef.nativeElement.checked;
  }

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
  public enviarClicked = () => {
    const tituloError =   document.querySelector(`span[id="tituloError"]`) as HTMLElement;
    const cuerpoError =   document.querySelector(`span[id="cuerpoError"]`) as HTMLElement;
    const generalError =   document.querySelector(`span[id="generalError"]`) as HTMLElement;
    if(this.tituloInputRef.nativeElement.value == ""){
      tituloError.textContent = "Este campo es requerido";
      tituloError.style.display = "flex";
      tituloError.style.color = "red";
      tituloError.style.fontWeight = "bold";
      generalError.textContent = "Campos incompletos";
      generalError.style.display = "flex";
      generalError.style.color = "red";
      generalError.style.fontWeight = "bold";
    }else if(this.tituloInputRef.nativeElement.value.length < 5){
      tituloError.textContent = "El Titulo debe contener al menos 5 caracteres";
      tituloError.style.display = "flex";
      tituloError.style.color = "red";
      tituloError.style.fontWeight = "bold";
      generalError.textContent = "Campos incompletos";
      generalError.style.display = "flex";
      generalError.style.color = "red";
      generalError.style.fontWeight = "bold";
    }else if(this.cuerpoTextAreaRef.nativeElement.value == ""){
      cuerpoError.textContent = "Este campo es requerido";
      cuerpoError.style.display = "flex";
      cuerpoError.style.color = "red";
      cuerpoError.style.fontWeight = "bold";
      generalError.textContent = "Campos incompletos";
      generalError.style.display = "flex";
      generalError.style.color = "red";
      generalError.style.fontWeight = "bold";
    }else if(this.cuerpoTextAreaRef.nativeElement.value.length < 10){
      cuerpoError.textContent = "El Cuerpo debe contener al menos 10 caracteres";
      cuerpoError.style.display = "flex";
      cuerpoError.style.color = "red";
      cuerpoError.style.fontWeight = "bold";
      generalError.textContent = "Campos incompletos";
      generalError.style.display = "flex";
      generalError.style.color = "red";
      generalError.style.fontWeight = "bold";
    }else{
      this.enviarButtonClick.emit({ tipo: this.tipoElegido, conAula: this.esConAula, aulasDestinadas: this.aulasDestinadas,
        idAlumnoReferido: this.idAlumno, destinatarios:this.selectedDestinatarios, titulo: this.tituloNota, cuerpo: this.cuerpoNota, files: this.formData, enviaNotaComo: this.enviaNotaComo});
    }
  }

  public openInfoPopup(esTipo: boolean){
    this.esTipo = esTipo;
    this.esVariosRoles = false;
    this.openTipoNotaInfoPopup = true;
  }

  public openInfoPopupVariosRoles(){
    this.esVariosRoles = true;
    this.esTipo = false;
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

  public enviarNotaComoClick(enviaNotaComo: string){
    if(enviaNotaComo == 'P'){
      this.enviaNotaComoPadre = true;
      this.enviaNotaComo = "Padre";
      this.radioButtonPadreRef.nativeElement.checked = true;
      this.radioButtonRoleAdicionalRef.nativeElement.checked = false;
    }else{
      this.enviaNotaComoPadre = false;
      this.radioButtonRoleAdicionalRef.nativeElement.checked = true;
      this.radioButtonPadreRef.nativeElement.checked = false;

      const isDocente = this.gruposUsuario.some(obj => obj.tipo === 'Docente');
      const isDirectivo = this.gruposUsuario.some(obj => obj.tipo === 'Directivo');

      if(isDocente){
        this.enviaNotaComo = "Docente";
      }else if(isDirectivo){
        this.enviaNotaComo = "Directivo";
      }
    }
    this.isTipoLabelVisible = true;
    this.isTipoOptionsVisible = true;
    this.particularRadioButtonCheck = false;
    this.genericaRadioButtonCheck = false;
    this.conAulaRadioButtonCheck = false;
    this.sinAulaRadioButtonCheck = false;
    this.isRadioButtonVisible = false;
    var divAulaDestinada = this.aulaRef.nativeElement;
    var divAlumnoReferido = this.alumnoRef.nativeElement;
    var dropDownListAulas = this.aulasRef.nativeElement;
    var dropDownListMenuAulas = this.aulasMenuRef.nativeElement;
    var labelDropDownListDestinatarios = this.labelDestinatariosRef.nativeElement;
    var dropDownListDestinatarios = this.destinatariosRef.nativeElement;

    divAlumnoReferido.style.display = 'none';
    divAulaDestinada.style.display = 'none';
    dropDownListAulas.style.display = 'none';
    dropDownListMenuAulas.style.display = 'none';
    dropDownListDestinatarios.style.display = "none";
    labelDropDownListDestinatarios.style.display = "none";
    this.divTituloAndCuerpoElementRef.nativeElement.style.display = "none";
    this.divFilesElementRef.nativeElement.style.display = "none";
  }

  public radioButtonShow(tipoElegido: string) {
    this.divTituloAndCuerpoElementRef.nativeElement.style.display = "none";
    this.divFilesElementRef.nativeElement.style.display = "none";
    var divAulaDestinada = this.aulaRef.nativeElement;
    var divAlumnoReferido = this.alumnoRef.nativeElement;
    var dropDownListAulas = this.aulasRef.nativeElement;
    var dropDownListMenuAulas = this.aulasMenuRef.nativeElement;
    var labelDropDownListDestinatarios = this.labelDestinatariosRef.nativeElement;
    var dropDownListDestinatarios = this.destinatariosRef.nativeElement;

    this.tipoElegido = tipoElegido;
    const isPadre = this.gruposUsuario.some(obj => obj.tipo === 'Padre');

    if (tipoElegido === 'G') {
      this.genericaRadioButtonCheck = true;
      this.particularRadioButtonCheck = false;
      this.isRadioButtonVisible = true;
      divAlumnoReferido.style.display = 'none';
      if(isPadre){
        if(this.esPadreYAlgoMas){
          if(this.enviaNotaComoPadre){
            this.isRadioButtonVisible = false;
            this.esConAula = false;
            this.aulasDestinadas = [];
            this.idAlumno = '00000000-0000-0000-0000-000000000000';
            divAulaDestinada.style.display = 'flex';
            this.selectAulasRef.nativeElement.value = "0";
          }else{
            divAulaDestinada.style.display = 'none';
            dropDownListAulas.style.display = 'none';
          }
          this.ObtenerAulasDestinatariosParaNuevaNota(tipoElegido, isPadre, this.esPadreYAlgoMas, this.enviaNotaComoPadre);
        }else{
          this.isRadioButtonVisible = false;
            this.esConAula = false;
            this.aulasDestinadas = [];
            this.idAlumno = '00000000-0000-0000-0000-000000000000';
            divAulaDestinada.style.display = 'flex';
            this.selectAulasRef.nativeElement.value = "0";
          this.ObtenerAulasDestinatariosParaNuevaNota(tipoElegido, isPadre, false, false);
        }
      }else{
        divAulaDestinada.style.display = 'none';
        dropDownListAulas.style.display = 'none';
        this.ObtenerAulasDestinatariosParaNuevaNota(tipoElegido, isPadre, false, false);
      }
    } else if(tipoElegido === 'P') {
      this.genericaRadioButtonCheck = false;
      this.particularRadioButtonCheck = true;
      dropDownListAulas.style.display = 'none';
      dropDownListMenuAulas.style.display = 'none';
      this.isRadioButtonVisible = false;
      divAulaDestinada.style.display = 'flex';
      this.selectAulasRef.nativeElement.value = "0";
      this.esConAula = true;
      dropDownListDestinatarios.style.display = "none";
      labelDropDownListDestinatarios.style.display = "none";
      if(!isPadre){
        this.ObtenerAulasDestinatariosParaNuevaNota(tipoElegido, false, false, false);
      } else if((isPadre && this.enviaNotaComoPadre) || (isPadre && !this.esPadreYAlgoMas)){
        this.aulasDestinadas = [];
        this.destinatarios = [];
        divAlumnoReferido.style.display = 'flex';
        divAulaDestinada.style.display = 'none';
        dropDownListDestinatarios.style.display = "none";
        labelDropDownListDestinatarios.style.display = "none";
        this.ObtenerHijosPadreParaNuevaNota();
      }else if(isPadre && !this.enviaNotaComoPadre){
        this.ObtenerAulasDestinatariosParaNuevaNota(tipoElegido, true, true, false);
      }
    }
  }

  mostrarAula(){
    this.divTituloAndCuerpoElementRef.nativeElement.style.display = "none";
    this.divFilesElementRef.nativeElement.style.display = "none";
    this.conAulaRadioButtonCheck = true;
    this.sinAulaRadioButtonCheck = false;
    this.esConAula = true;
    var divAulaDestinada = this.aulaRef.nativeElement;
    var dropDownListAulas = this.aulasRef.nativeElement;
    divAulaDestinada.style.display = "none";
    dropDownListAulas.style.display = "flex";
    this.labelAulasRef.nativeElement.style.display = "flex";
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
    const isDocente = this.gruposUsuario.some(obj => obj.tipo === 'Docente');
    if(isDocente){
      if(this.gruposUsuario.length > 2){
        if(!this.enviaNotaComoPadre){
          this.ObtenerAulasDestinatariosParaNuevaNota(this.tipoElegido, true, true, false);
        }
      }else{
        this.ObtenerAulasDestinatariosParaNuevaNota(this.tipoElegido, false, false, false);
      }
    }
  }

  esconderAula(){
    this.divTituloAndCuerpoElementRef.nativeElement.style.display = "none";
    this.divFilesElementRef.nativeElement.style.display = "none";
    this.sinAulaRadioButtonCheck = true;
    this.conAulaRadioButtonCheck = false;
    this.esConAula = false;
    var divAulaDestinada = this.aulaRef.nativeElement;
    var dropDownListAulas = this.aulasRef.nativeElement;
    var dropDownListMenuAulas = this.aulasMenuRef.nativeElement;
    divAulaDestinada.style.display = "flex";
    dropDownListAulas.style.display = "none";
    this.labelAulasRef.nativeElement.style.display = "none";
    dropDownListMenuAulas.style.display = "none";
    this.selectAulasRef.nativeElement.value = "0";
    var divAlumnoReferido = this.alumnoRef.nativeElement;
    divAlumnoReferido.style.display = "none";

    const isDocente = this.gruposUsuario.some(obj => obj.tipo === 'Docente');
    if(isDocente){
      if(this.gruposUsuario.length > 2){
        if(!this.enviaNotaComoPadre){
          this.ObtenerAulasDestinatariosParaNuevaNota(this.tipoElegido, true, true, false);
        }
      }else{
        this.ObtenerAulasDestinatariosParaNuevaNota(this.tipoElegido, false, false, false);
      }
    }
  }

  showDropDownListDestinatarios(){
    var dropDownListMenuDestinatarios = this.destinatariosMenuRef.nativeElement;
    if(dropDownListMenuDestinatarios.style.display == "flex"){
      dropDownListMenuDestinatarios.style.display = "none";
    }else{
      dropDownListMenuDestinatarios.style.display = "flex";
    }
  }

  showDropDownListAulas(){
    var dropDownListMenuAulas = this.aulasMenuRef.nativeElement;
    if(dropDownListMenuAulas.style.display == "flex"){
      dropDownListMenuAulas.style.display = "none";
    }else{
      dropDownListMenuAulas.style.display = "flex";
    }
  }

  public ObtenerAulasDestinatariosParaNuevaNota = (tipoDeNota: string, isPadre: boolean, esPadreYAlgoMas: boolean, enviaNotaComoPadre: boolean) => {
    this.notaService.ObtenerAulasParaNuevaNota(tipoDeNota, isPadre, esPadreYAlgoMas, enviaNotaComoPadre).subscribe(res => {
      this.aulas = res;
      console.log(this.aulas);
    });
  }

  public ObtenerHijosPadreParaNuevaNota = () => {
    this.notaService.ObtenerHijosPadreParaNuevaNota().subscribe(res => {
      if(res != null){
        console.log('alumnos', res);
        this.alumnos = res;
      }
    });
  }

  public handleAulaSeleccionada = ($event: Event) => {
    const idAula =  ($event.target as HTMLInputElement).value;
    const aulaId = idAula;
    this.selectedDestinatarios.length = 0;
    const isPadre = this.gruposUsuario.some(obj => obj.tipo === 'Padre');
    const isDocente = this.gruposUsuario.some(obj => obj.tipo === 'Docente');
    const isDirectivo = this.gruposUsuario.some(obj => obj.tipo === 'Directivo');
    var dropDownListDestinatarios = this.destinatariosRef.nativeElement;
    var labelDropDownListDestinatarios = this.labelDestinatariosRef.nativeElement;

    if((isPadre && this.tipoElegido == "G" && this.enviaNotaComoPadre) || (isPadre && this.tipoElegido == "G")){
      this.notaService.ObtenerListaDeDestinatariosParaNuevaNota(aulaId, this.enviaNotaComo).subscribe(res => {
        this.destinatarios = res;
      });
      var dropDownListDestinatarios = this.destinatariosRef.nativeElement;
      var labelDropDownListDestinatarios = this.labelDestinatariosRef.nativeElement;
      dropDownListDestinatarios.style.display = "flex";
      labelDropDownListDestinatarios.style.display = "flex";
    }
    if(this.tipoElegido == 'P'){
      this.notaService.ObtenerAlumnosDeAulaParaNuevaNota(aulaId).subscribe(res => {
        this.alumnos = res;
        console.log(this.alumnos);
      });
      var divAlumnoReferido = this.alumnoRef.nativeElement;
      divAlumnoReferido.style.display = 'flex';
    }

    if(this.tipoElegido == "G" && isDocente && !this.enviaNotaComoPadre){
      this.idAlumno = '00000000-0000-0000-0000-000000000000';
      if(this.esConAula){
        dropDownListDestinatarios.style.display = "none";
        labelDropDownListDestinatarios.style.display = "none";
        this.aulasCheck(aulaId);
        if(this.aulasDestinadas.length === 0){
          this.divTituloAndCuerpoElementRef.nativeElement.style.display = "none";
          this.divFilesElementRef.nativeElement.style.display = "none";
        }else{
          this.divTituloAndCuerpoElementRef.nativeElement.style.display = "flex";
          this.divFilesElementRef.nativeElement.style.display = "flex";
        }
      }else{
        this.notaService.ObtenerListaDeDestinatariosParaNuevaNota(aulaId, this.enviaNotaComo).subscribe(res => {
          this.destinatarios = res;
        });

        if(aulaId === ''){
          dropDownListDestinatarios.style.display = "none";
          labelDropDownListDestinatarios.style.display = "none";
        }else if(aulaId != ''){
          dropDownListDestinatarios.style.display = "flex";
          labelDropDownListDestinatarios.style.display = "flex";
        }
        this.divTituloAndCuerpoElementRef.nativeElement.style.display = "none";
        this.divFilesElementRef.nativeElement.style.display = "none";
      }
    }
    if(this.tipoElegido == "G" && isDirectivo && !this.enviaNotaComoPadre){
      if(this.esConAula){
        dropDownListDestinatarios.style.display = "none";
        labelDropDownListDestinatarios.style.display = "none";
        this.aulasCheck(aulaId);
        if(this.aulasDestinadas.length === 0){
          this.divTituloAndCuerpoElementRef.nativeElement.style.display = "none";
          this.divFilesElementRef.nativeElement.style.display = "none";
        }else{
          this.divTituloAndCuerpoElementRef.nativeElement.style.display = "flex";
          this.divFilesElementRef.nativeElement.style.display = "flex";
        }
      }else{
        this.notaService.ObtenerListaDeDestinatariosParaNuevaNota(aulaId, this.enviaNotaComo).subscribe(res => {
          this.destinatarios = res;
        });
        if(aulaId == ''){
          dropDownListDestinatarios.style.display = "none";
          labelDropDownListDestinatarios.style.display = "none";
        }else if(aulaId != ''){
          dropDownListDestinatarios.style.display = "flex";
          labelDropDownListDestinatarios.style.display = "flex";
        }
        this.divTituloAndCuerpoElementRef.nativeElement.style.display = "none";
        this.divFilesElementRef.nativeElement.style.display = "none";
      }
    }
  }

  public guardarAlumnoSeleccionado = ($event: Event) => {
    const idAlumno =  ($event.target as HTMLInputElement).value;
    console.log(idAlumno);
    this.idAlumno = idAlumno;
    this.divTituloAndCuerpoElementRef.nativeElement.style.display = "flex";
    this.divFilesElementRef.nativeElement.style.display = "flex";
  }

  public destinatarioCheck = (destinatario: any) => {
    let arrayAnterior: any[] = [];
    arrayAnterior = this.selectedDestinatarios;
    this.selectedDestinatarios = this.selectedDestinatarios.filter((destinatarioArray) => destinatarioArray != destinatario.id);
    if(arrayAnterior.length == this.selectedDestinatarios.length){
      this.selectedDestinatarios.push(destinatario.id);
    }
    console.log(this.selectedDestinatarios);
    if(this.selectedDestinatarios.length === 0){
      this.divTituloAndCuerpoElementRef.nativeElement.style.display = "none";
      this.divFilesElementRef.nativeElement.style.display = "none";
    }else if(this.selectedDestinatarios.length > 0){
      this.divTituloAndCuerpoElementRef.nativeElement.style.display = "flex";
      this.divFilesElementRef.nativeElement.style.display = "flex";
    }

  }

  public aulasCheck = (idAula: string) => {
    let arrayAnterior: any[] = [];
    arrayAnterior = this.aulasDestinadas;
    this.aulasDestinadas = this.aulasDestinadas.filter((aulaArray) => aulaArray != idAula);
    if(arrayAnterior.length == this.aulasDestinadas.length){
      this.aulasDestinadas.push(idAula);
    }
    console.log(this.aulasDestinadas);
  }
}
