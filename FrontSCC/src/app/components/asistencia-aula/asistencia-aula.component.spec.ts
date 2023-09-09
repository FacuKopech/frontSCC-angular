import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaAulaComponent } from './asistencia-aula.component';

describe('AsistenciaAulaComponent', () => {
  let component: AsistenciaAulaComponent;
  let fixture: ComponentFixture<AsistenciaAulaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsistenciaAulaComponent]
    });
    fixture = TestBed.createComponent(AsistenciaAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
