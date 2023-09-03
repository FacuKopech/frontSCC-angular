import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAulaHijoPopupComponent } from './datos-aula-hijo-popup.component';

describe('DatosAulaHijoPopupComponent', () => {
  let component: DatosAulaHijoPopupComponent;
  let fixture: ComponentFixture<DatosAulaHijoPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosAulaHijoPopupComponent]
    });
    fixture = TestBed.createComponent(DatosAulaHijoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
