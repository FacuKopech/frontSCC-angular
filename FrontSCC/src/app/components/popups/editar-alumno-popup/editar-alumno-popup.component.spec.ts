import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlumnoPopupComponent } from './editar-alumno-popup.component';

describe('EditarAlumnoPopupComponent', () => {
  let component: EditarAlumnoPopupComponent;
  let fixture: ComponentFixture<EditarAlumnoPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarAlumnoPopupComponent]
    });
    fixture = TestBed.createComponent(EditarAlumnoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
