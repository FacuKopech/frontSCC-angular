import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaLeidaAlertComponent } from './nota-leida-alert.component';

describe('NotaLeidaAlertComponent', () => {
  let component: NotaLeidaAlertComponent;
  let fixture: ComponentFixture<NotaLeidaAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaLeidaAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaLeidaAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
