import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonaService } from 'src/app/services/personas_services/persona.service';
import { ApiService } from 'src/app/services/user_services/api.service';
import { InstitucionService } from 'src/app/services/institucion_services/institucion.service';

@Component({
  selector: 'app-editar-persona-popup',
  templateUrl: './editar-persona-popup.component.html',
  styleUrls: ['./editar-persona-popup.component.css']
})
export class EditarPersonaPopupComponent {
  @Input() persona: any;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('dropdownMenu', { static: false }) alumnosMenuRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('nombreInput', { static: false }) nombreInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('apellidoInput', { static: false }) apellidoInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('dniInput', { static: false }) dniInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput', { static: false }) emailInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('telefonoInput', { static: false }) telefonoInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('domicilioInput', { static: false }) domicilioInputRef!: ElementRef<HTMLInputElement>;

  constructor (private personaService: PersonaService, private userService: ApiService, private institucionService: InstitucionService){}

  emailPersona: string = '';
  nombrePersona: string = '';
  apellidoPersona: string = '';
  dniPersona: number = 0;
  telefonoPersona: string = '';
  domicilioPersona: string = '';
  emailInputValue: string = '';
  usuarioSeleccionado: any  
  institucionSeleccionada: any
  roles: any[] = [];
  hijosPersona: any[] = [];
  usuarios: any[] = [];
  instituciones: any[] = [];
  hijosSeleccionados: any[] = [];
  hijosSeleccionadosCopia: any[] = [];
  alumnosSinPadresAsignados: any[] = [];
  showErrorAlert=  false;
  esErrorEmailRepetido = false;
  esErrorDNIRepetido = false;
  showSuccessAlert = false;
  esEditarPersona = false;
  hijosArrayAreEqual = false; 
  personaEsPadre = false; 
  
  public ngOnInit(){
    console.log(this.persona);
    this.nombrePersona = this.persona.nombre;
    this.apellidoPersona = this.persona.apellido;
    this.emailPersona = this.persona.email;
    this.dniPersona = this.persona.dni;
    this.telefonoPersona = this.persona.telefono;
    this.domicilioPersona = this.persona.domicilio;
    this.usuarioSeleccionado = this.persona.usuario;
    this.institucionSeleccionada = this.persona.institucion;
    this.hijosSeleccionadosCopia = this.hijosSeleccionados;
    
    this.personaService.ObtenerAlumnosSinPadre(this.persona.id).subscribe(res => {
      if(res){
        this.alumnosSinPadresAsignados = res;
        this.personaService.ObtenerHijosDePersona(this.persona.id).subscribe(res => {
          if(res){
            this.hijosPersona = res;
            console.log(this.hijosPersona);
            for (let index = 0; index < this.hijosPersona.length; index++) {
              this.hijosSeleccionados.push(this.hijosPersona[index].id);
              this.alumnosSinPadresAsignados.push(this.hijosPersona[index]);
            }
            console.log(this.hijosSeleccionados);
            this.userService.ObtenerUsuariosSinAsignacionPersona().subscribe(res => {
              if(res){
                this.usuarios = res;    
                this.userService.ObtenerRolesUsuario(this.persona.usuario.id).subscribe(res => {
                  if(res){              
                    this.roles = res;
                    for (let index = 0; index < this.roles.length; index++) {
                      if(this.roles[index].tipo == 'Padre'){
                        this.personaEsPadre = true;
                        break;
                      }                  
                    }
                    this.institucionService.ObtenerInstitucionesSistema().subscribe(res => {
                      if(res){
                        this.instituciones = res;
                      }
                    }); 
                  }
                });        
              }
            });
          }
        });
      }
    });
  }

  public editarClick(){
    const generalError =   document.querySelector(`span[id="generalError"]`) as HTMLElement;
    const nombreError =   document.querySelector(`span[id="nombreError"]`) as HTMLElement;
    const apellidoError =   document.querySelector(`span[id="apellidoError"]`) as HTMLElement;
    const dniError =   document.querySelector(`span[id="dniError"]`) as HTMLElement;

    this.checkHijosArraysEquality();
    if(this.nombreInputRef.nativeElement.value == this.persona.nombre && this.apellidoInputRef.nativeElement.value == this.persona.apellido && 
      this.domicilioInputRef.nativeElement.value == this.persona.domicilio && this.telefonoInputRef.nativeElement.value == this.persona.telefono &&
      this.dniInputRef.nativeElement.value == this.persona.dni && this.emailInputRef.nativeElement.value == this.persona.email 
      && this.usuarioSeleccionado.id == this.persona.usuario.id && this.hijosArrayAreEqual){
        generalError.textContent = "Para poder editar una Persona, debe modificar al menos un campo";
        generalError.style.display = "flex";
        generalError.style.color = "red";
        generalError.style.fontWeight = "bold";
    }else if(this.nombreInputRef.nativeElement.value == ''){
      nombreError.textContent = "Este campo es requerido";
      nombreError.style.display = "flex";
      nombreError.style.color = "red";
      nombreError.style.fontWeight = "bold";
    }else if(this.apellidoInputRef.nativeElement.value == ''){
      apellidoError.textContent = "Este campo es requerido";
      apellidoError.style.display = "flex";
      apellidoError.style.color = "red";
      apellidoError.style.fontWeight = "bold";
    }else if(this.dniInputRef.nativeElement.value == ''){
      dniError.textContent = "Este campo es requerido";
      dniError.style.display = "flex";
      dniError.style.color = "red";
      dniError.style.fontWeight = "bold";
    }else{
      const eventData = {
        nombre: this.nombreInputRef.nativeElement.value,
        apellido: this.apellidoInputRef.nativeElement.value,
        dni: parseInt(this.dniInputRef.nativeElement.value),
        email:  this.emailInputRef.nativeElement.value,
        telefono:  this.telefonoInputRef.nativeElement.value,
        domicilio:  this.domicilioInputRef.nativeElement.value,
        usuarioSeleccionado:  this.usuarioSeleccionado,
        institucionSeleccionada:  this.institucionSeleccionada,
        hijosSeleccionados:  this.hijosSeleccionados,
      };   
      this.personaService.EditarPersona(this.persona.id, eventData).subscribe(res => {
        if(res){
          this.showSuccessAlert = true;
          this.esEditarPersona = true;
        }
      },
      (error:HttpErrorResponse) =>{
        if(error.status == 400 && error.error == "Ya existe una Persona con ese Email registrado"){
          this.showErrorAlert = true;         
          this.esErrorEmailRepetido = true;
          this.esErrorDNIRepetido = false;
        }else if(error.status == 400 && error.error == "Ya existe una Persona con ese DNI registrado"){
          this.showErrorAlert = true;    
          this.esErrorDNIRepetido = true;
          this.esErrorEmailRepetido = false;
        }else{
          this.showErrorAlert = true;  
          this.esErrorDNIRepetido = false;
          this.esErrorEmailRepetido = false;  
        }
      });
    }
  }

  public checkHijosArraysEquality(){
    var counter = 0;
    if(this.hijosSeleccionados.length === this.hijosSeleccionadosCopia.length){
      for (let index = 0; index < this.hijosSeleccionados.length; index++) {
        if(this.hijosSeleccionados.includes(this.hijosSeleccionadosCopia[index])){
          counter += 1;
        }
      }
      if(counter === this.hijosSeleccionados.length){
        this.hijosArrayAreEqual = true;
      }else{
        this.hijosArrayAreEqual = false;
      }
    }else{
      this.hijosArrayAreEqual = false;
    }
  }
  public cancelarClicked(){
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public onUsuarioSelected(){
    if(this.usuarioSeleccionado != undefined){
      this.usuarioSeleccionado = this.usuarioSeleccionado;
      this.emailInputValue = this.usuarioSeleccionado.email;
      console.log(this.usuarioSeleccionado, this.emailInputValue);
    }else{
      this.usuarioSeleccionado = this.persona.usuario;
      this.emailInputValue = this.usuarioSeleccionado.email;
    }
    
  }

  public onInstitucionSelected(){
    if(this.institucionSeleccionada != undefined){
      this.institucionSeleccionada = this.institucionSeleccionada;
      console.log(this.institucionSeleccionada);
    }else{
      this.institucionSeleccionada = this.persona.institucion;
    }   
  }

  public closeSuccessAlert(){
    this.showSuccessAlert = false;
    this.esEditarPersona = false;
    window.location.reload();
  }
  showDropDownListAlumnos(){
    var dropDownListMenuAlumnos = this.alumnosMenuRef.nativeElement;
    if(dropDownListMenuAlumnos.style.display == "flex"){
      dropDownListMenuAlumnos.style.display = "none";
    }else{
      dropDownListMenuAlumnos.style.display = "flex";
    }
  }

  public alumnoCheck(alumno: any){
    let arrayAnterior: any[] = [];
    arrayAnterior = this.hijosSeleccionados;
    this.hijosSeleccionados = this.hijosSeleccionados.filter((hijo) => hijo != alumno.id);
    if(arrayAnterior.length == this.hijosSeleccionados.length){
      this.hijosSeleccionados.push(alumno.id);
    }
    console.log(this.hijosSeleccionados)
  }
}

