import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvideMiClavePopupComponent } from './olvide-mi-clave-popup.component';

describe('OlvideMiClavePopupComponent', () => {
  let component: OlvideMiClavePopupComponent;
  let fixture: ComponentFixture<OlvideMiClavePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlvideMiClavePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlvideMiClavePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
