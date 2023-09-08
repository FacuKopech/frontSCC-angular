import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHistorialPopupComponent } from './agregar-historial-popup.component';

describe('AgregarHistorialPopupComponent', () => {
  let component: AgregarHistorialPopupComponent;
  let fixture: ComponentFixture<AgregarHistorialPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarHistorialPopupComponent]
    });
    fixture = TestBed.createComponent(AgregarHistorialPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
