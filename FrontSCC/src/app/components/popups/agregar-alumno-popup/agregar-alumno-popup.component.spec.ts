import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAlumnoPopupComponent } from './agregar-alumno-popup.component';

describe('AgregarAlumnoPopupComponent', () => {
  let component: AgregarAlumnoPopupComponent;
  let fixture: ComponentFixture<AgregarAlumnoPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarAlumnoPopupComponent]
    });
    fixture = TestBed.createComponent(AgregarAlumnoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
