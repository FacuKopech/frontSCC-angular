import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { InstitucionService } from 'src/app/services/institucion_services/institucion.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-editar-institucion-popup',
  templateUrl: './editar-institucion-popup.component.html',
  styleUrls: ['./editar-institucion-popup.component.css']
})
export class EditarInstitucionPopupComponent {
  @Input() institucion: any;
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  showSuccessAlert = false;
  showErrorAlert = false;
  esErrorNombreInstitucionRepetido = false;
  esErrorTelefonoInstitucionRepetido = false;
  esEditarInstitucion = false;

  constructor (private institucionService: InstitucionService){}

  @ViewChild('nombreInput', { static: false }) nombreInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('direccionInput', { static: false }) direccionInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('telefonoInput', { static: false }) telefonoInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('ciudadInput', { static: false }) ciudadInputRef!: ElementRef<HTMLInputElement>;

  nombreInstitucion: string = '';
  direccionInstitucion: string = '';
  telefonoInstitucion: string = '';
  ciudadInstitucion: string = '';

  public ngOnInit(){
    this.nombreInstitucion = this.institucion.nombre;
    this.direccionInstitucion = this.institucion.direccion;
    this.telefonoInstitucion = this.institucion.telefono;
    this.ciudadInstitucion = this.institucion.ciudad;
  }
  public cancelarClicked(){
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public aceptarClick(){
    this.showSuccessAlert = false;
    window.location.reload();
  }
  
  public editarClick(){
    const nombreError = document.querySelector(`span[id="nombreError"]`) as HTMLElement;
    const direccionError = document.querySelector(`span[id="direccionError"]`) as HTMLElement;
    const telefonoError = document.querySelector(`span[id="telefonoError"]`) as HTMLElement;
    const ciudadError = document.querySelector(`span[id="ciudadError"]`) as HTMLElement;   
    const generalError = document.querySelector(`span[id="generalError"]`) as HTMLElement;   
    if(this.nombreInputRef.nativeElement.value == this.institucion.nombre && this.direccionInputRef.nativeElement.value == this.institucion.direccion &&
      this.telefonoInputRef.nativeElement.value == this.institucion.telefono && this.ciudadInputRef.nativeElement.value == this.institucion.ciudad){
        generalError.textContent = "Para poder editar una Institucion, debe ingresar nuevos valores en al menos un campo modificable";
        generalError.style.display = "flex";
        generalError.style.color = "red";
        generalError.style.fontWeight = "bold";
    }else if(this.nombreInputRef.nativeElement.value == ''){
      nombreError.textContent = "Este campo es requerido";
      nombreError.style.display = "flex";
      nombreError.style.color = "red";
      nombreError.style.fontWeight = "bold";
    }else if(this.direccionInputRef.nativeElement.value == ''){
      direccionError.textContent = "Este campo es requerido";
      direccionError.style.display = "flex";
      direccionError.style.color = "red";
      direccionError.style.fontWeight = "bold";
    }else if(this.telefonoInputRef.nativeElement.value == ''){
      telefonoError.textContent = "Este campo es requerido";
      telefonoError.style.display = "flex";
      telefonoError.style.color = "red";
      telefonoError.style.fontWeight = "bold";
    }else if(this.ciudadInputRef.nativeElement.value == ''){
      ciudadError.textContent = "Este campo es requerido";
      ciudadError.style.display = "flex";
      ciudadError.style.color = "red";
      ciudadError.style.fontWeight = "bold";
    }else{
      const eventData = {
        nombre: this.nombreInputRef.nativeElement.value,
        direccion: this.direccionInputRef.nativeElement.value,
        telefono: this.telefonoInputRef.nativeElement.value,
        ciudad: this.ciudadInputRef.nativeElement.value        
      };
      this.institucionService.EditarInstitucion(this.institucion.id, eventData).subscribe(res => {
        if(res){
          this.showSuccessAlert = true;
          this.esEditarInstitucion = true;
        }
      },  
      (error:HttpErrorResponse) =>{
        if(error.status == 400 && error.error == "Ya existe una Institucion con ese Nombre registrado"){
          this.showErrorAlert = true;         
          this.esErrorNombreInstitucionRepetido = true;
          this.esErrorTelefonoInstitucionRepetido = false;
        }else if(error.status == 400 && error.error == "Ya existe una Institucion con ese Telefono registrado"){
          this.showErrorAlert = true;    
          this.esErrorTelefonoInstitucionRepetido = true;
          this.esErrorNombreInstitucionRepetido = false;
        }else{
          this.showErrorAlert = true;  
          this.esErrorNombreInstitucionRepetido = false;
          this.esErrorTelefonoInstitucionRepetido = false;  
        }
      });
    }
  }
}

