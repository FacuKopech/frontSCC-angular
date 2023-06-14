import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasRecibidasComponent } from './notas-recibidas.component';

describe('NotasRecibidasComponent', () => {
  let component: NotasRecibidasComponent;
  let fixture: ComponentFixture<NotasRecibidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotasRecibidasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasRecibidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
