import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatoClimaPopupComponent } from './dato-clima-popup.component';

describe('DatoClimaPopupComponent', () => {
  let component: DatoClimaPopupComponent;
  let fixture: ComponentFixture<DatoClimaPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatoClimaPopupComponent]
    });
    fixture = TestBed.createComponent(DatoClimaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
