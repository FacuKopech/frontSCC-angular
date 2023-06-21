import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NotaService } from 'src/app/services/notas_services/nota.service';
declare var tinymce: any;
@Component({
  selector: 'app-agregar-nota-popup',
  templateUrl: './agregar-nota-popup.component.html',
  styleUrls: ['./agregar-nota-popup.component.css']
})
export class AgregarNotaPopupComponent {

  constructor(private notaService: NotaService) {

  }

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

  @Input() tipoUser: string='';
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  enviarButtonClick = new EventEmitter<{tipo: string, conAula: boolean, idAulaDestinada: number, idAlumnoReferido: number, destinatarios: any[], titulo:string, cuerpo: string}>();
  @ViewChild('options', { static: false }) optionsRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('radioButtons', { static: false }) radioButtonsRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('label', { static: false }) labelRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('divAulaDestinada', { static: false }) aulaRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('divAlumnoReferido', { static: false }) alumnoRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('dropdown', { static: false }) destinatariosRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('dropdownMenu', { static: false }) destinatariosMenuRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('labelDropdownMenu', { static: false }) labelDestinatariosRef!: ElementRef<HTMLSelectElement>;
  isRadioButtonVisible = false;

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
  public enviarClicked = () => {
    this.enviarButtonClick.emit({ tipo: this.tipoElegido, conAula: this.esConAula, idAulaDestinada: this.idAula,
      idAlumnoReferido: this.idAlumno, destinatarios:this.selectedDestinatarios, titulo: this.tituloNota, cuerpo: this.cuerpoNota });
  }

  ngOnInit() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tinymce@5.9.2/tinymce.min.js';
    script.onload = () => {
      tinymce.init({
        selector: '#myTextarea',
        height: 150,
        menubar: false,
        content_css: ['./agregar-nota-popup.component.css'],
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help',
        branding: false,
        statusbar: true,
        contextmenu: false
      });
    };
    document.head.appendChild(script);
  }


  radioButtonShow() {
    const selectedOption = this.optionsRef.nativeElement.value;
    this.tipoElegido = this.optionsRef.nativeElement.value;
    const radioButtonContainer = this.radioButtonsRef.nativeElement
    const labelRadioButton = this.labelRef.nativeElement
    var divAulaDestinada = this.aulaRef.nativeElement;
    var divAlumnoReferido = this.alumnoRef.nativeElement;
    var dropDownListDestinatarios = this.destinatariosRef.nativeElement;
    var labelDropDownListDestinatarios = this.labelDestinatariosRef.nativeElement;
    var dropDownListDestinatarios = this.destinatariosRef.nativeElement;
    var labelDropDownListDestinatarios = this.labelDestinatariosRef.nativeElement;

    if (selectedOption === 'G') {
      this.isRadioButtonVisible = true;
      divAlumnoReferido.style.display = 'none';
      if(this.tipoUser == "Padre"){
        radioButtonContainer.style.display = 'none';
        labelRadioButton.style.display = 'none';
        divAulaDestinada.style.display = 'none';
        dropDownListDestinatarios.style.display = "flex";
        labelDropDownListDestinatarios.style.display = "flex";
        this.ObtenerAulasDestinatariosParaNuevaNota(selectedOption, false);
      }
      else{
        radioButtonContainer.style.display = 'flex';
        labelRadioButton.style.display = 'flex';
      }
    } else {
      this.isRadioButtonVisible = false;
      radioButtonContainer.style.display = 'none';
      labelRadioButton.style.display = 'none';
      divAulaDestinada.style.display = 'flex';
      divAlumnoReferido.style.display = 'flex';
      this.esConAula = true;
      dropDownListDestinatarios.style.display = "none";
      labelDropDownListDestinatarios.style.display = "none";
      this.ObtenerAulasDestinatariosParaNuevaNota(selectedOption, true);
      if(this.tipoUser == "Padre"){
        radioButtonContainer.style.display = 'none';
        labelRadioButton.style.display = 'none';
        divAulaDestinada.style.display = 'none';
        dropDownListDestinatarios.style.display = "none";
        labelDropDownListDestinatarios.style.display = "none";
      }
    }
  }

  mostrarAula(){
    this.esConAula = true;
    var divAulaDestinada = this.aulaRef.nativeElement;
    divAulaDestinada.style.display = "flex";
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
    this.ObtenerAulasDestinatariosParaNuevaNota(this.tipoElegido, this.esConAula);
  }

  esconderAula(){
    this.esConAula = false;
    var divAulaDestinada = this.aulaRef.nativeElement;
    divAulaDestinada.style.display = "none";
    var divAlumnoReferido = this.alumnoRef.nativeElement;
    divAlumnoReferido.style.display = "none";
    var dropDownListDestinatarios = this.destinatariosRef.nativeElement;
    dropDownListDestinatarios.style.display = "flex";
    var labelDropDownListDestinatarios = this.labelDestinatariosRef.nativeElement;
    labelDropDownListDestinatarios.style.display = "flex";
    var dropDownListMenuDestinatarios = this.destinatariosMenuRef.nativeElement;
    dropDownListMenuDestinatarios.style.display = "none";
    this.ObtenerAulasDestinatariosParaNuevaNota(this.tipoElegido, this.esConAula);
  }

  showDropDownListDestinatarios(){
    var dropDownListMenuDestinatarios = this.destinatariosMenuRef.nativeElement;
    if(dropDownListMenuDestinatarios.style.display == "flex"){
      dropDownListMenuDestinatarios.style.display = "none";
    }else{
      dropDownListMenuDestinatarios.style.display = "flex";
    }

  }

  public ObtenerAulasDestinatariosParaNuevaNota = (tipoDeNota: string, conAula: boolean) => {
    this.notaService.ObtenerAulasDestinatariosParaNuevaNota(tipoDeNota, conAula).subscribe(res => {
      this.datosParaNota = res;
      this.aulas = this.datosParaNota.aulas;
      this.destinatarios = this.datosParaNota.destinatarios;
      this.alumnos = this.datosParaNota.alumnos;
    });
  }

  public handleAulaSeleccionada = (aula: any) => {
    if(this.tipoElegido == 'P'){
      this.aulaSeleccionada = aula;
      this.notaService.ObtenerAlumnosDeAulaParaNuevaNota(aula.id).subscribe(res => {
        this.datosParaNota = res;
        this.alumnos = this.datosParaNota.alumnos;
        console.log(this.alumnos);
      });
    }

  }

  public guardarAlumnoSeleccionado = (alumno: any) => {
    this.alumnoSeleccionado = alumno;
  }

  public destinatarioSelected = (destinatario: string) => {
    return this.selectedDestinatarios.push(destinatario);
  }

  public changedSelection = (destinatario: string) => {
    if(this.selectedDestinatarios.includes(destinatario)){
      this.selectedDestinatarios = this.selectedDestinatarios.filter(item => item !== destinatario)
    }else{
      this.selectedDestinatarios.push(destinatario);
    }
  }



}
