import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarInstitucionPopupComponent } from './agregar-institucion-popup.component';

describe('AgregarInstitucionPopupComponent', () => {
  let component: AgregarInstitucionPopupComponent;
  let fixture: ComponentFixture<AgregarInstitucionPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarInstitucionPopupComponent]
    });
    fixture = TestBed.createComponent(AgregarInstitucionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
