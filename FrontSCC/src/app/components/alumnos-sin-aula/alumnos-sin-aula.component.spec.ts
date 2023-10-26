import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosSinAulaComponent } from './alumnos-sin-aula.component';

describe('AlumnosSinAulaComponent', () => {
  let component: AlumnosSinAulaComponent;
  let fixture: ComponentFixture<AlumnosSinAulaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnosSinAulaComponent]
    });
    fixture = TestBed.createComponent(AlumnosSinAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
