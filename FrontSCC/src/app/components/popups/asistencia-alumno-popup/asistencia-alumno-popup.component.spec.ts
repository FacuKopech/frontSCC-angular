import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaAlumnoPopupComponent } from './asistencia-alumno-popup.component';

describe('AsistenciaAlumnoPopupComponent', () => {
  let component: AsistenciaAlumnoPopupComponent;
  let fixture: ComponentFixture<AsistenciaAlumnoPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsistenciaAlumnoPopupComponent]
    });
    fixture = TestBed.createComponent(AsistenciaAlumnoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
