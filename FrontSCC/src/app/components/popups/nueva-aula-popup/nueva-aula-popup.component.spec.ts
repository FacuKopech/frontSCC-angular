import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaAulaPopupComponent } from './nueva-aula-popup.component';

describe('NuevaAulaPopupComponent', () => {
  let component: NuevaAulaPopupComponent;
  let fixture: ComponentFixture<NuevaAulaPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaAulaPopupComponent]
    });
    fixture = TestBed.createComponent(NuevaAulaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
