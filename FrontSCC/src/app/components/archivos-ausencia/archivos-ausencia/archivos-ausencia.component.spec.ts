import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosAusenciaComponent } from './archivos-ausencia.component';

describe('ArchivosAusenciaComponent', () => {
  let component: ArchivosAusenciaComponent;
  let fixture: ComponentFixture<ArchivosAusenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivosAusenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivosAusenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
