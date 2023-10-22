import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulasInstitucionComponent } from './aulas-institucion.component';

describe('AulasInstitucionComponent', () => {
  let component: AulasInstitucionComponent;
  let fixture: ComponentFixture<AulasInstitucionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AulasInstitucionComponent]
    });
    fixture = TestBed.createComponent(AulasInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
