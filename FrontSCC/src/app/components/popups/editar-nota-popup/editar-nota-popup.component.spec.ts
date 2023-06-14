import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNotaPopupComponent } from './editar-nota-popup.component';

describe('EditarNotaPopupComponent', () => {
  let component: EditarNotaPopupComponent;
  let fixture: ComponentFixture<EditarNotaPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarNotaPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarNotaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
