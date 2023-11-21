import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPersonaPopupComponent } from './agregar-persona-popup.component';

describe('AgregarPersonaPopupComponent', () => {
  let component: AgregarPersonaPopupComponent;
  let fixture: ComponentFixture<AgregarPersonaPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarPersonaPopupComponent]
    });
    fixture = TestBed.createComponent(AgregarPersonaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
