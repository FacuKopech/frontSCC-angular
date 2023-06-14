import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuerpoPopupComponent } from './cuerpo-popup.component';

describe('CuerpoPopupComponent', () => {
  let component: CuerpoPopupComponent;
  let fixture: ComponentFixture<CuerpoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuerpoPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuerpoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
