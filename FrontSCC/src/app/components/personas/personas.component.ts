import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonaService } from 'src/app/services/personas_services/persona.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent {

  constructor(private personaService: PersonaService, private location: Location) { }

  public personas: any[] = [];
  public persona: any;
  public message: string = "";
  public itemForDelete: string = "";
  institucion: any;
  usuario: any;
  openSuccessAlert = false;
  openErrorAlert = false;
  openDeletePopup = false;
  esEliminarPersona = false;
  openAgregarPersona = false;
  openEditarPersonaPopup = false;
  openUsuarioPersonaPopup = false;
  openInstitucionPersonaPopup = false;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  filteredPersonas: any[] = [];
  filterOptions: any = {
    nombre: '',
    dni: '',
  };

  ngOnInit(): void {
    this.personaService.ObtenerPersonasSistema().subscribe(res => {
      this.message = "";
      if (res) {
        this.personas = res;
        this.applyFilter();
        if (this.personas.length == 0) {
          this.message = "Usted aun no ha agregado Personas al sistema";
        }
      }
    });
  }

  applyFilter() {
    this.filteredPersonas = this.personas.filter(persona => {
      const matchesNombre = persona.nombre.toLowerCase().includes(this.filterOptions.nombre.toLowerCase()) || persona.apellido.toLowerCase().includes(this.filterOptions.nombre.toLowerCase());
      const matchesDNI = persona.dni.toString().includes(this.filterOptions.dni.toString());

      return matchesNombre && matchesDNI;
    });
  }

  onFilterChange() {
    this.applyFilter();
  }

  clearFilter(tipoFiltro: string) {
    if (tipoFiltro == 'nombre') {
      this.filterOptions.nombre = '';
    } else if (tipoFiltro == 'dni') {
      this.filterOptions.dni = '';
    }
    this.applyFilter();
  }

  public verUsuarioPersona(usuario: any) {
    this.openUsuarioPersonaPopup = true;
    this.usuario = usuario;
    console.log(this.usuario);
  }

  public verInstitucionPersona(institucion: any) {
    this.openInstitucionPersonaPopup = true;
    this.institucion = institucion;
  }

  public eliminarPersona(persona: any) {
    this.openDeletePopup = true;
    this.itemForDelete = "Persona";
    this.persona = persona;
  }

  public editarPersona(persona: any) {
    this.persona = persona;
    this.openEditarPersonaPopup = true;
  }

  public deletePersonaConfirmed() {
    this.openDeletePopup = false;
    this.personaService.EliminarPersona(this.persona.id).subscribe(res => {
      if (res) {
        this.openSuccessAlert = true;
        this.esEliminarPersona = true;
      }
    },
      (error: HttpErrorResponse) => {
        if (error.status >= 400) {
          this.openErrorAlert = true;
        }
      })
  }

  public cerrarSuccess() {
    this.openSuccessAlert = false;
    window.location.reload();
  }

  public calculateIndices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return { startIndex, endIndex };
  }

  public getPages(): number[] {
    const totalPages = Math.ceil(this.personas.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  public pageClick(page: number) {
    this.currentPage = page;
  }

  public previousPageClick() {
    this.currentPage = this.currentPage - 1
  }

  public nextPageClick() {
    this.currentPage = this.currentPage + 1
  }

  public goBack() {
    this.location.back();
  }
}
