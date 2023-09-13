import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCargaAsistenciaAlertComponent } from './confirm-carga-asistencia-alert.component';

describe('ConfirmCargaAsistenciaAlertComponent', () => {
  let component: ConfirmCargaAsistenciaAlertComponent;
  let fixture: ComponentFixture<ConfirmCargaAsistenciaAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmCargaAsistenciaAlertComponent]
    });
    fixture = TestBed.createComponent(ConfirmCargaAsistenciaAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
