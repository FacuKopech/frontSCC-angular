import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomaDeAsistenciaComponent } from './toma-de-asistencia.component';

describe('TomaDeAsistenciaComponent', () => {
  let component: TomaDeAsistenciaComponent;
  let fixture: ComponentFixture<TomaDeAsistenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TomaDeAsistenciaComponent]
    });
    fixture = TestBed.createComponent(TomaDeAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
