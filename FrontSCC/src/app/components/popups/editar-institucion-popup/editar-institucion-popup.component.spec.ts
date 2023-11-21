import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInstitucionPopupComponent } from './editar-institucion-popup.component';

describe('EditarInstitucionPopupComponent', () => {
  let component: EditarInstitucionPopupComponent;
  let fixture: ComponentFixture<EditarInstitucionPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarInstitucionPopupComponent]
    });
    fixture = TestBed.createComponent(EditarInstitucionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
