import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosInstitucionPopupComponent } from './datos-institucion-popup.component';

describe('DatosInstitucionPopupComponent', () => {
  let component: DatosInstitucionPopupComponent;
  let fixture: ComponentFixture<DatosInstitucionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosInstitucionPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosInstitucionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
