import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarNotaPopupComponent } from './agregar-nota-popup.component';

describe('AgregarNotaPopupComponent', () => {
  let component: AgregarNotaPopupComponent;
  let fixture: ComponentFixture<AgregarNotaPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarNotaPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarNotaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
