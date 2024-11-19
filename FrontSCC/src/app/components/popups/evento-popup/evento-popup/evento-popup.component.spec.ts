import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoPopupComponent } from './evento-popup.component';

describe('EventoPopupComponent', () => {
  let component: EventoPopupComponent;
  let fixture: ComponentFixture<EventoPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventoPopupComponent]
    });
    fixture = TestBed.createComponent(EventoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
