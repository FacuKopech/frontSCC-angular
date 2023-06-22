import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionFirmaNotaPopupComponent } from './confirmacion-firma-nota-popup.component';

describe('ConfirmacionFirmaNotaPopupComponent', () => {
  let component: ConfirmacionFirmaNotaPopupComponent;
  let fixture: ComponentFixture<ConfirmacionFirmaNotaPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacionFirmaNotaPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionFirmaNotaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
