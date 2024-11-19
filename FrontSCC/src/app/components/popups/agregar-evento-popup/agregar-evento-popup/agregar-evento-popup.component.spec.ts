import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEventoPopupComponent } from './agregar-evento-popup.component';

describe('AgregarEventoPopupComponent', () => {
  let component: AgregarEventoPopupComponent;
  let fixture: ComponentFixture<AgregarEventoPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEventoPopupComponent]
    });
    fixture = TestBed.createComponent(AgregarEventoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
