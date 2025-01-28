import { ComponentFixture, TestBed } from '@angular/core/testing';
import CreacionFichasComponent from './creacion-fichas.component';


describe('CreacionFichasComponent', () => {
  let component: CreacionFichasComponent;
  let fixture: ComponentFixture<CreacionFichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionFichasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
