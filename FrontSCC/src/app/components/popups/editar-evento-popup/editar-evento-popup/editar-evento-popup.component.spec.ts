import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEventoPopupComponent } from './editar-evento-popup.component';

describe('EditarEventoPopupComponent', () => {
  let component: EditarEventoPopupComponent;
  let fixture: ComponentFixture<EditarEventoPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarEventoPopupComponent]
    });
    fixture = TestBed.createComponent(EditarEventoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
