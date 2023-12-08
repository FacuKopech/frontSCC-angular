import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarClaveAdminPopupComponent } from './confirmar-clave-admin-popup.component';

describe('ConfirmarClaveAdminPopupComponent', () => {
  let component: ConfirmarClaveAdminPopupComponent;
  let fixture: ComponentFixture<ConfirmarClaveAdminPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarClaveAdminPopupComponent]
    });
    fixture = TestBed.createComponent(ConfirmarClaveAdminPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
