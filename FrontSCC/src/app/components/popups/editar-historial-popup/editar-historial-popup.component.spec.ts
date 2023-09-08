import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHistorialPopupComponent } from './editar-historial-popup.component';

describe('EditarHistorialPopupComponent', () => {
  let component: EditarHistorialPopupComponent;
  let fixture: ComponentFixture<EditarHistorialPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarHistorialPopupComponent]
    });
    fixture = TestBed.createComponent(EditarHistorialPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
