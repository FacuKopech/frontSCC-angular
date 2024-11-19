import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { CommonModule, DatePipe } from '@angular/common';
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
import { ConfirmCargaAsistenciaAlertComponent } from './components/alerts/confirm-carga-asistencia-alert/confirm-carga-asistencia-alert.component';
import { PadresAlumnoPopupComponent } from './components/popups/padres-alumno-popup/padres-alumno-popup.component';
import { TipoNotaInfoPopupComponent } from './components/popups/tipo-nota-info-popup/tipo-nota-info-popup.component';
import { DestinatariosNotaPopupComponent } from './components/popups/destinatarios-nota-popup/destinatarios-nota-popup.component';
import { AulasInstitucionComponent } from './components/aulas-institucion/aulas-institucion.component';
import { NuevaAulaPopupComponent } from './components/popups/nueva-aula-popup/nueva-aula-popup.component';
import { EditarAulaPopupComponent } from './components/popups/editar-aula-popup/editar-aula-popup.component';
import { AgregarAlumnoPopupComponent } from './components/popups/agregar-alumno-popup/agregar-alumno-popup.component';
import { EditarAlumnoPopupComponent } from './components/popups/editar-alumno-popup/editar-alumno-popup.component';
import { AlumnosSinAulaComponent } from './components/alumnos-sin-aula/alumnos-sin-aula.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UserRolesPopupComponent } from './components/popups/user-roles-popup/user-roles-popup.component';
import { AgregarUserPopupComponent } from './components/popups/agregar-user-popup/agregar-user-popup.component';
import { EditarUserPopupComponent } from './components/popups/editar-user-popup/editar-user-popup.component';
import { PersonasComponent } from './components/personas/personas.component';
import { AgregarPersonaPopupComponent } from './components/popups/agregar-persona-popup/agregar-persona-popup.component';
import { UsuarioPersonaPopupComponent } from './components/popups/usuario-persona-popup/usuario-persona-popup.component';
import { EditarPersonaPopupComponent } from './components/popups/editar-persona-popup/editar-persona-popup.component';
import { InstitucionesComponent } from './components/instituciones/instituciones.component';
import { AgregarInstitucionPopupComponent } from './components/popups/agregar-institucion-popup/agregar-institucion-popup.component';
import { EditarInstitucionPopupComponent } from './components/popups/editar-institucion-popup/editar-institucion-popup.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartsComponent } from './components/charts/charts.component';
import { ConfirmarClaveAdminPopupComponent } from './components/popups/confirmar-clave-admin-popup/confirmar-clave-admin-popup.component';
import { EventosComponent } from './components/eventos/eventos/eventos.component';
import { AgregarEventoPopupComponent } from './components/popups/agregar-evento-popup/agregar-evento-popup/agregar-evento-popup.component';
import { DatoClimaPopupComponent } from './components/popups/dato-clima-popup/dato-clima-popup/dato-clima-popup.component';
import { EditarEventoPopupComponent } from './components/popups/editar-evento-popup/editar-evento-popup/editar-evento-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { GoogleSigninComponent } from './components/google-signin/google-signin/google-signin.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { EventoPopupComponent } from './components/popups/evento-popup/evento-popup/evento-popup.component';
registerLocaleData(localeEs, 'es'); 




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
    TomaDeAsistenciaComponent,
    ConfirmCargaAsistenciaAlertComponent,
    PadresAlumnoPopupComponent,
    TipoNotaInfoPopupComponent,
    DestinatariosNotaPopupComponent,
    AulasInstitucionComponent,
    NuevaAulaPopupComponent,
    EditarAulaPopupComponent,
    AgregarAlumnoPopupComponent,
    EditarAlumnoPopupComponent,
    AlumnosSinAulaComponent,
    UsuariosComponent,
    UserRolesPopupComponent,
    AgregarUserPopupComponent,
    EditarUserPopupComponent,
    PersonasComponent,
    AgregarPersonaPopupComponent,
    UsuarioPersonaPopupComponent,
    EditarPersonaPopupComponent,
    InstitucionesComponent,
    AgregarInstitucionPopupComponent,
    EditarInstitucionPopupComponent,
    ChartsComponent,
    ConfirmarClaveAdminPopupComponent,
    EventosComponent,
    AgregarEventoPopupComponent,
    DatoClimaPopupComponent,
    EditarEventoPopupComponent,
    GoogleSigninComponent,
    EventoPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RoutingModule,
    EditorModule,
    ReactiveFormsModule,
    NgChartsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [ApiService, { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }, { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }, DatePipe, {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('802476254023-jjohn3src86rrrappvusa68bjut7t1p3.apps.googleusercontent.com', {
            scopes: 'openid profile email',
          })
        }
      ], onError: (err) => {
        console.error(err);
      },
    } as SocialAuthServiceConfig,
  },  { provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
