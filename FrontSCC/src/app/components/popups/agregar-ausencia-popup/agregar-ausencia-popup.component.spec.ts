import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAusenciaPopupComponent } from './agregar-ausencia-popup.component';

describe('AgregarAusenciaPopupComponent', () => {
  let component: AgregarAusenciaPopupComponent;
  let fixture: ComponentFixture<AgregarAusenciaPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAusenciaPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarAusenciaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
