import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadresAlumnoPopupComponent } from './padres-alumno-popup.component';

describe('PadresAlumnoPopupComponent', () => {
  let component: PadresAlumnoPopupComponent;
  let fixture: ComponentFixture<PadresAlumnoPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PadresAlumnoPopupComponent]
    });
    fixture = TestBed.createComponent(PadresAlumnoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
