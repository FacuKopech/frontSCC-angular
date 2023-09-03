import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaNotaADocentePopupComponent } from './nueva-nota-adocente-popup.component';

describe('NuevaNotaADocentePopupComponent', () => {
  let component: NuevaNotaADocentePopupComponent;
  let fixture: ComponentFixture<NuevaNotaADocentePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaNotaADocentePopupComponent]
    });
    fixture = TestBed.createComponent(NuevaNotaADocentePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
