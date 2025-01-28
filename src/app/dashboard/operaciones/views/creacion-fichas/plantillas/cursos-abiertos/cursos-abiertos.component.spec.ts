import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosAbiertosComponent } from './cursos-abiertos.component';

describe('CursosAbiertosComponent', () => {
  let component: CursosAbiertosComponent;
  let fixture: ComponentFixture<CursosAbiertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosAbiertosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosAbiertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
