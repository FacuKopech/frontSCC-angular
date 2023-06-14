import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionNuevaClavePopupComponent } from './generacion-nueva-clave-popup.component';

describe('GeneracionNuevaClavePopupComponent', () => {
  let component: GeneracionNuevaClavePopupComponent;
  let fixture: ComponentFixture<GeneracionNuevaClavePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneracionNuevaClavePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneracionNuevaClavePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
