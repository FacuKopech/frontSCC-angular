import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarClavePopupComponent } from './recuperar-clave-popup.component';

describe('RecuperarClavePopupComponent', () => {
  let component: RecuperarClavePopupComponent;
  let fixture: ComponentFixture<RecuperarClavePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarClavePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarClavePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
