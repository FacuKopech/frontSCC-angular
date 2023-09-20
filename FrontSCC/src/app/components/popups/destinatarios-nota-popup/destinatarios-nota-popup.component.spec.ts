import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinatariosNotaPopupComponent } from './destinatarios-nota-popup.component';

describe('DestinatariosNotaPopupComponent', () => {
  let component: DestinatariosNotaPopupComponent;
  let fixture: ComponentFixture<DestinatariosNotaPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinatariosNotaPopupComponent]
    });
    fixture = TestBed.createComponent(DestinatariosNotaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
