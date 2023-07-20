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




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'notas_emitidas', component: NotasEmitidasComponent },
  { path: 'notas_recibidas', component: NotasRecibidasComponent },
  { path: 'hijos', component: HijosComponent },
  { path: 'historiales_hijo', component: HistorialesComponent },
  { path: 'archivos_ausencia', component: ArchivosAusenciaComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
