import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasEmitidasComponent } from './notas-emitidas.component';

describe('NotasEmitidasComponent', () => {
  let component: NotasEmitidasComponent;
  let fixture: ComponentFixture<NotasEmitidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotasEmitidasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasEmitidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
