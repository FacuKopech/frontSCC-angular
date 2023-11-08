import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUserPopupComponent } from './editar-user-popup.component';

describe('EditarUserPopupComponent', () => {
  let component: EditarUserPopupComponent;
  let fixture: ComponentFixture<EditarUserPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarUserPopupComponent]
    });
    fixture = TestBed.createComponent(EditarUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
