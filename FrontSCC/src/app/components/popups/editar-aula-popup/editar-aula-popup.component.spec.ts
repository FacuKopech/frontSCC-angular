import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAulaPopupComponent } from './editar-aula-popup.component';

describe('EditarAulaPopupComponent', () => {
  let component: EditarAulaPopupComponent;
  let fixture: ComponentFixture<EditarAulaPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarAulaPopupComponent]
    });
    fixture = TestBed.createComponent(EditarAulaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
