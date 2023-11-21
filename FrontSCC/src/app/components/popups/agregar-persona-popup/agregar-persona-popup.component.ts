import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/user_services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonaService } from 'src/app/services/personas_services/persona.service';
import { InstitucionService } from 'src/app/services/institucion_services/institucion.service';

@Component({
  selector: 'app-agregar-persona-popup',
  templateUrl: './agregar-persona-popup.component.html',
  styleUrls: ['./agregar-persona-popup.component.css']
})
export class AgregarPersonaPopupComponent {
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('nombreInput', { static: false }) nombreInputRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('apellidoInput', { static: false }) apellidoInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('dniInput', { static: false }) dniInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput', { static: false }) emailInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('telefonoInput', { static: false }) telefonoInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('domicilioInput', { static: false }) domicilioInputRef!: ElementRef<HTMLInputElement>;

  usuarioSeleccionado: any;
  institucionSeleccionada: any;
  users: any[] = [];
  instituciones: any[] = [];
  tipoPersona: string = '';
  emailInputValue: string = '';
  showErrorAlert = false;
  showSuccessAlert = false;
  esAgregarPersona = false;
  esErrorEmailRepetidoPersona = false;
  esErrorDNIRepetido = false;
  padreRadioBtnCheck = false;
  docenteRadioBtnCheck = false;
  directivoRadioBtnCheck = false;
  containerShow = false;

  constructor (private userService: ApiService, private personaService: PersonaService, private institucionService: InstitucionService){}

  public ngOnInit(){
    this.userService.ObtenerUsuariosSinAsignacionPersona().subscribe(res => {
      if(res){
        this.users = res;
        this.institucionService.ObtenerInstitucionesSistema().subscribe(res => {
          if(res){
            this.instituciones = res;
          }
        }); 
      }
    });
  }

  public cancelarClicked(){
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public cerrarSuccess(){
    this.showSuccessAlert = false;
    window.location.reload();
  }

  public padreCheck(){
    this.padreRadioBtnCheck = true;
    this.docenteRadioBtnCheck = false;
    this.directivoRadioBtnCheck = false;
    this.tipoPersona = "Padre";
    this.containerShow = true;
    console.log(this.tipoPersona);
  }
  public docenteCheck(){
    this.padreRadioBtnCheck = false;
    this.docenteRadioBtnCheck = true;
    this.directivoRadioBtnCheck = false;
    this.tipoPersona = "Docente";
    this.containerShow = true;
    console.log(this.tipoPersona);
  }
  public directivoCheck(){
    this.padreRadioBtnCheck = false;
    this.docenteRadioBtnCheck = false;
    this.directivoRadioBtnCheck = true;
    this.tipoPersona = "Directivo";
    this.containerShow = true;
    console.log(this.tipoPersona);
  }

  public onUsuarioSelected(){
    this.usuarioSeleccionado = this.usuarioSeleccionado;
    this.emailInputValue = this.usuarioSeleccionado.email;
    console.log(this.usuarioSeleccionado, this.emailInputValue);
  }

  public onInstitucionSelected(){
    this.institucionSeleccionada = this.institucionSeleccionada;
    console.log(this.institucionSeleccionada);
  }

  public agregarClicked(){    
    const nombreError =   document.querySelector(`span[id="nombreError"]`) as HTMLElement;
    const apellidoError =   document.querySelector(`span[id="apellidoError"]`) as HTMLElement;
    const dniError =   document.querySelector(`span[id="dniError"]`) as HTMLElement;
    if(this.nombreInputRef.nativeElement.value == ""){
      nombreError.textContent = "Este campo es requerido";
      nombreError.style.display = "flex";
      nombreError.style.color = "red";
      nombreError.style.fontWeight = "bold";
    }else  if(this.apellidoInputRef.nativeElement.value == ""){
      apellidoError.textContent = "Este campo es requerido";
      apellidoError.style.display = "flex";
      apellidoError.style.color = "red";
      apellidoError.style.fontWeight = "bold";
    }else  if(this.dniInputRef.nativeElement.value == ""){
      dniError.textContent = "Este campo es requerido";
      dniError.style.display = "flex";
      dniError.style.color = "red";
      dniError.style.fontWeight = "bold";
    }else{
      const eventData = {
        tipoPersona: this.tipoPersona,
        nombre: this.nombreInputRef.nativeElement.value,
        apellido: this.apellidoInputRef.nativeElement.value,
        dni: this.dniInputRef.nativeElement.value,
        email: this.emailInputRef.nativeElement.value,
        telefono: this.telefonoInputRef.nativeElement.value,
        domicilio: this.domicilioInputRef.nativeElement.value,
        usuario: this.usuarioSeleccionado,
        institucion: this.institucionSeleccionada
      };
      this.personaService.AgregarPersona(eventData).subscribe(res => {
        if(res){
          this.showSuccessAlert = true;
          this.esAgregarPersona = true;
        }
      },
      (error:HttpErrorResponse) =>{
        if(error.status == 400 && error.error == "Ya existe una Persona con ese Email registrado"){
          this.showErrorAlert = true;         
          this.esErrorEmailRepetidoPersona = true;
          this.esErrorDNIRepetido = false;
        }else if(error.status == 400 && error.error == "Ya existe una Persona con ese DNI registrado"){
          this.showErrorAlert = true;    
          this.esErrorDNIRepetido = true;
          this.esErrorEmailRepetidoPersona = false;
        }else{
          this.showErrorAlert = true;  
          this.esErrorDNIRepetido = false;
          this.esErrorEmailRepetidoPersona = false;  
        }
      });
    }
  } 


}
