import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AulaService } from 'src/app/services/aulas_services/aula.service';
import { ApiService } from 'src/app/services/user_services/api.service';

@Component({
  selector: 'app-editar-nota-popup',
  templateUrl: './editar-nota-popup.component.html',
  styleUrls: ['./editar-nota-popup.component.css']
})
export class EditarNotaPopupComponent {
  @Input() nota: any;

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  editarButtonClick = new EventEmitter<{titulo: string, cuerpo: string, aulasDestinadas: any[]}>();

  @ViewChild('aulaSelect', { static: false }) aulaSelectRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('dropdownMenuAulas', { static: false }) aulasMenuRef!: ElementRef<HTMLSelectElement>;

  tituloNota: string = '';
  cuerpoNota: string = '';
  aulaDestinadaIdNota: number = -1;
  aulaElegida: number = -1;
  public aulas: any[] = [];
  public tipoUser: string = '';
  aulasSeleccionadas: number[] = [];

  constructor(private aulaService: AulaService, private userService: ApiService){}

  public ngOnInit() {
    this.tituloNota = this.nota.titulo;
    this.cuerpoNota = this.nota.cuerpo;
    this.userService.ObtenerTipoPersonaLogueada().subscribe(res => {
      this.tipoUser = res;
      if(this.tipoUser == 'Padre'){
        this.aulaService.ObtenerAulasDeHijos().subscribe(res => {
          this.aulas = res;
        });
      }else{
        this.aulaService.ObtenerAulasDestinadasNota(this.nota.id).subscribe(res => {
          this.aulas = res;
          if(this.aulas.length > 0){
            for (let index = 0; index < this.aulas.length; index++) {
              this.aulasSeleccionadas.push(this.aulas[index].id);
            }
        }});
      }
    });
  }

  ngAfterViewInit() {
    this.aulaSelectRef.nativeElement.value = JSON.stringify(this.nota.aulasDestinadas[0].id);
    console.log(this.aulaSelectRef.nativeElement.value);
  }

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public editarClicked = () => {
    this.editarButtonClick.emit({ titulo: this.tituloNota, cuerpo: this.cuerpoNota, aulasDestinadas: this.aulasSeleccionadas });
  }

  showDropDownListAulas(){
    var dropDownListMenuAulas = this.aulasMenuRef.nativeElement;
    if(dropDownListMenuAulas.style.display == "flex"){
      dropDownListMenuAulas.style.display = "none";
    }else{
      dropDownListMenuAulas.style.display = "flex";
    }
  }

  public handleAulaSeleccionada = (idAula: number) => {
   if(this.tipoUser == "Docente" || this.tipoUser == "Directivo"){
      this.aulasCheck(idAula);
    }
  }

  public handleSingleAulaSeleccionada = (idAula: number) => {
    this.aulasSeleccionadas = [];
    this.aulasSeleccionadas.push(idAula);
    console.log(this.aulasSeleccionadas);
  }

  public aulasCheck = (idAula: number) => {
    let arrayAnterior: any[] = [];
    arrayAnterior = this.aulasSeleccionadas;
    this.aulasSeleccionadas = this.aulasSeleccionadas.filter((aulaArray) => aulaArray != idAula);
    if(arrayAnterior.length == this.aulasSeleccionadas.length){
      this.aulasSeleccionadas.push(idAula);
    }
    console.log(this.aulasSeleccionadas);
  }

}

