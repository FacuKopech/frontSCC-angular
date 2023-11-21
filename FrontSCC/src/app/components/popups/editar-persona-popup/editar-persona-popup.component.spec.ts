import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPersonaPopupComponent } from './editar-persona-popup.component';

describe('EditarPersonaPopupComponent', () => {
  let component: EditarPersonaPopupComponent;
  let fixture: ComponentFixture<EditarPersonaPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPersonaPopupComponent]
    });
    fixture = TestBed.createComponent(EditarPersonaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
