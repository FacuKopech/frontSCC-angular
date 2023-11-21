import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { InstitucionService } from 'src/app/services/institucion_services/institucion.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-agregar-institucion-popup',
  templateUrl: './agregar-institucion-popup.component.html',
  styleUrls: ['./agregar-institucion-popup.component.css']
})
export class AgregarInstitucionPopupComponent {

  showSuccessAlert = false;
  showErrorAlert = false;
  esErrorNombreInstitucionRepetido = false;
  esErrorTelefonoInstitucionRepetido = false;
  esAgregarInstitucion = false;


  constructor (private institucionService: InstitucionService){}

  @ViewChild('nombreInput', { static: false }) nombreInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('direccionInput', { static: false }) direccionInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('telefonoInput', { static: false }) telefonoInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('ciudadInput', { static: false }) ciudadInputRef!: ElementRef<HTMLInputElement>;

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public aceptarClick(){
    this.showSuccessAlert = false;
    window.location.reload();
  }

  public agregarClicked = () => {
    const nombreError = document.querySelector(`span[id="nombreError"]`) as HTMLElement;
    const direccionError = document.querySelector(`span[id="direccionError"]`) as HTMLElement;
    const telefonoError = document.querySelector(`span[id="telefonoError"]`) as HTMLElement;
    const ciudadError = document.querySelector(`span[id="ciudadError"]`) as HTMLElement;   
    if(this.nombreInputRef.nativeElement.value == ''){
      nombreError.textContent = "Este campo es requerido";
      nombreError.style.display = "flex";
      nombreError.style.color = "red";
      nombreError.style.fontWeight = "bold";
    }else  if(this.direccionInputRef.nativeElement.value == ''){
      direccionError.textContent = "Este campo es requerido";
      direccionError.style.display = "flex";
      direccionError.style.color = "red";
      direccionError.style.fontWeight = "bold";
    }else if(this.telefonoInputRef.nativeElement.value == ''){
      telefonoError.textContent = "Este campo es requerido";
      telefonoError.style.display = "flex";
      telefonoError.style.color = "red";
      telefonoError.style.fontWeight = "bold";
    }else  if(this.ciudadInputRef.nativeElement.value == ''){
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

      this.institucionService.AgregarInstitucion(eventData).subscribe(res => {
        if(res){
          this.showSuccessAlert = true;
          this.esAgregarInstitucion = true;
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
