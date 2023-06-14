import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAusenciaPopupComponent } from './datos-ausencia-popup.component';

describe('DatosAusenciaPopupComponent', () => {
  let component: DatosAusenciaPopupComponent;
  let fixture: ComponentFixture<DatosAusenciaPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosAusenciaPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosAusenciaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
