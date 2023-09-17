import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoNotaInfoPopupComponent } from './tipo-nota-info-popup.component';

describe('TipoNotaInfoPopupComponent', () => {
  let component: TipoNotaInfoPopupComponent;
  let fixture: ComponentFixture<TipoNotaInfoPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoNotaInfoPopupComponent]
    });
    fixture = TestBed.createComponent(TipoNotaInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
