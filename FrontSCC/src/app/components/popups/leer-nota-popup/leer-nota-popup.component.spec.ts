import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerNotaPopupComponent } from './leer-nota-popup.component';

describe('LeetNotaPopupComponent', () => {
  let component: LeerNotaPopupComponent;
  let fixture: ComponentFixture<LeerNotaPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerNotaPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeerNotaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
