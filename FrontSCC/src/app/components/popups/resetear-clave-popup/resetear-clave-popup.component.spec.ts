import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetearClavePopupComponent } from './resetear-clave-popup.component';

describe('ResetearClavePopupComponent', () => {
  let component: ResetearClavePopupComponent;
  let fixture: ComponentFixture<ResetearClavePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetearClavePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetearClavePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
