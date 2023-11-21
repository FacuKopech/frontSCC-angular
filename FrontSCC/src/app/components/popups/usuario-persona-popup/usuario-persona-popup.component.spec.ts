import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPersonaPopupComponent } from './usuario-persona-popup.component';

describe('UsuarioPersonaPopupComponent', () => {
  let component: UsuarioPersonaPopupComponent;
  let fixture: ComponentFixture<UsuarioPersonaPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioPersonaPopupComponent]
    });
    fixture = TestBed.createComponent(UsuarioPersonaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
