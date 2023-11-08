import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarUserPopupComponent } from './agregar-user-popup.component';

describe('AgregarUserPopupComponent', () => {
  let component: AgregarUserPopupComponent;
  let fixture: ComponentFixture<AgregarUserPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarUserPopupComponent]
    });
    fixture = TestBed.createComponent(AgregarUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
