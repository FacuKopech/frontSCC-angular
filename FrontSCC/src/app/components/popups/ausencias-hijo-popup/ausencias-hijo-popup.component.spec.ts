import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AusenciasHijoPopupComponent } from './ausencias-hijo-popup.component';

describe('AusenciasHijoPopupComponent', () => {
  let component: AusenciasHijoPopupComponent;
  let fixture: ComponentFixture<AusenciasHijoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AusenciasHijoPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AusenciasHijoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
