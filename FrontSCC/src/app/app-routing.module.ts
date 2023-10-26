import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotasEmitidasComponent } from './components/notas-emitidas/notas-emitidas.component';
import { NotasRecibidasComponent } from './components/notas-recibidas/notas-recibidas.component';
import { AuthGuard } from './guards/auth.guard';
import { HijosComponent } from './components/hijos/hijos/hijos.component';
import { HistorialesComponent } from './components/historiales/historiales.component';
import { ArchivosAusenciaComponent } from './components/archivos-ausencia/archivos-ausencia/archivos-ausencia.component';
import { AulasComponent } from './components/aulas/aulas.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { AsistenciaAulaComponent } from './components/asistencia-aula/asistencia-aula.component';
import { TomaDeAsistenciaComponent } from './components/toma-de-asistencia/toma-de-asistencia.component';
import { AulasInstitucionComponent } from './components/aulas-institucion/aulas-institucion.component';
import { AlumnosSinAulaComponent } from './components/alumnos-sin-aula/alumnos-sin-aula.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['Padre', 'Docente', 'Directivo'] } },
  { path: 'notas_emitidas', component: NotasEmitidasComponent, canActivate: [AuthGuard], data: { roles: ['Padre', 'Docente', 'Directivo'] } },
  { path: 'notas_recibidas', component: NotasRecibidasComponent, canActivate: [AuthGuard], data: { roles: ['Padre', 'Docente', 'Directivo'] } },
  { path: 'hijos', component: HijosComponent, canActivate: [AuthGuard], data: { roles: ['Padre'] } },
  { path: 'historiales_hijo', component: HistorialesComponent, canActivate: [AuthGuard], data: { roles: ['Padre', 'Docente', 'Directivo'] } },
  { path: 'archivos_ausencia', component: ArchivosAusenciaComponent, canActivate: [AuthGuard], data: { roles: ['Padre', 'Docente', 'Directivo'] } },
  { path: 'aulas', component: AulasComponent, canActivate: [AuthGuard], data: { roles: ['Docente', 'Directivo'] } },
  { path: 'alumnos_aula', component: AlumnosComponent, canActivate: [AuthGuard], data: { roles: ['Docente', 'Directivo'] } },
  { path: 'asistencia_aula', component: AsistenciaAulaComponent, canActivate: [AuthGuard], data: { roles: ['Docente'] } },
  { path: 'tomar_asistencia', component: TomaDeAsistenciaComponent, canActivate: [AuthGuard], data: { roles: ['Docente'] } },
  { path: 'aulas-institucion', component: AulasInstitucionComponent, canActivate: [AuthGuard], data: { roles: ['Directivo'] } },
  { path: 'alumnos-sin-aula', component: AlumnosSinAulaComponent, canActivate: [AuthGuard], data: { roles: ['Directivo'] } }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
