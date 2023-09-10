import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './services/user_services/api.service';
import { HomeComponent } from './components/home/home.component';
import { RoutingModule } from 'angular-routing';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { NotasEmitidasComponent } from './components/notas-emitidas/notas-emitidas.component';
import { NotasRecibidasComponent } from './components/notas-recibidas/notas-recibidas.component';
import { ConfirmComponent } from './components/popups/confirm/confirm.component';
import { LeerNotaPopupComponent } from './components/popups/leer-nota-popup/leer-nota-popup.component';
import { EditarNotaPopupComponent } from './components/popups/editar-nota-popup/editar-nota-popup.component';
import { SuccessAlertComponent } from './components/alerts/success-alert/success-alert.component';
import { ErrorAlertComponent } from './components/alerts/error-alert/error-alert.component';
import { NotaLeidaAlertComponent } from './components/alerts/nota-leida-alert/nota-leida-alert.component';
import { CuerpoPopupComponent } from './components/popups/cuerpo-popup/cuerpo-popup.component';
import { AgregarNotaPopupComponent } from './components/popups/agregar-nota-popup/agregar-nota-popup.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ResetearClavePopupComponent } from './components/popups/resetear-clave-popup/resetear-clave-popup.component';
import { OlvideMiClavePopupComponent } from './components/popups/olvide-mi-clave-popup/olvide-mi-clave-popup.component';
import { RecuperarClavePopupComponent } from './components/popups/recuperar-clave-popup/recuperar-clave-popup.component';
import { GeneracionNuevaClavePopupComponent } from './components/popups/generacion-nueva-clave-popup/generacion-nueva-clave-popup.component';
import { HijosComponent } from './components/hijos/hijos/hijos.component';
import { DatosInstitucionPopupComponent } from './components/popups/datos-institucion-popup/datos-institucion-popup.component';
import { AusenciasHijoPopupComponent } from './components/popups/ausencias-hijo-popup/ausencias-hijo-popup.component';
import { GoBackButtonComponent } from './components/go-back-button/go-back-button.component';
import { DatosAusenciaPopupComponent } from './components/popups/datos-ausencia-popup/datos-ausencia-popup.component';
import { AgregarAusenciaPopupComponent } from './components/popups/agregar-ausencia-popup/agregar-ausencia-popup.component';
import { HistorialesComponent } from './components/historiales/historiales.component';
import { ConfirmacionFirmaNotaPopupComponent } from './components/popups/confirmacion-firma-nota-popup/confirmacion-firma-nota-popup.component';
import { ArchivosAusenciaComponent } from './components/archivos-ausencia/archivos-ausencia/archivos-ausencia.component';
import { CommonModule } from '@angular/common';
import { DatosAulaHijoPopupComponent } from './components/popups/datos-aula-hijo-popup/datos-aula-hijo-popup.component';
import { NuevaNotaADocentePopupComponent } from './components/popups/nueva-nota-adocente-popup/nueva-nota-adocente-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AulasComponent } from './components/aulas/aulas.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { AgregarHistorialPopupComponent } from './components/popups/agregar-historial-popup/agregar-historial-popup.component';
import { EditarHistorialPopupComponent } from './components/popups/editar-historial-popup/editar-historial-popup.component';
import { AsistenciaAulaComponent } from './components/asistencia-aula/asistencia-aula.component';
import { AsistenciaAlumnoPopupComponent } from './components/popups/asistencia-alumno-popup/asistencia-alumno-popup.component';
import { TomaDeAsistenciaComponent } from './components/toma-de-asistencia/toma-de-asistencia.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SpinnerComponent,
    NotasEmitidasComponent,
    NotasRecibidasComponent,
    ConfirmComponent,
    LeerNotaPopupComponent,
    EditarNotaPopupComponent,
    SuccessAlertComponent,
    ErrorAlertComponent,
    NotaLeidaAlertComponent,
    CuerpoPopupComponent,
    AgregarNotaPopupComponent,
    ResetearClavePopupComponent,
    OlvideMiClavePopupComponent,
    RecuperarClavePopupComponent,
    GeneracionNuevaClavePopupComponent,
    HijosComponent,
    DatosInstitucionPopupComponent,
    AusenciasHijoPopupComponent,
    GoBackButtonComponent,
    DatosAusenciaPopupComponent,
    AgregarAusenciaPopupComponent,
    HistorialesComponent,
    ConfirmacionFirmaNotaPopupComponent,
    ArchivosAusenciaComponent,
    DatosAulaHijoPopupComponent,
    NuevaNotaADocentePopupComponent,
    AulasComponent,
    AlumnosComponent,
    AgregarHistorialPopupComponent,
    EditarHistorialPopupComponent,
    AsistenciaAulaComponent,
    AsistenciaAlumnoPopupComponent,
    TomaDeAsistenciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RoutingModule,
    EditorModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }, { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
