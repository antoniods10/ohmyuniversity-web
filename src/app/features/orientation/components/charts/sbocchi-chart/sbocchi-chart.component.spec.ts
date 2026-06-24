import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SbocchiChartComponent } from './sbocchi-chart.component';
import { ComponentRef } from '@angular/core';
import { SBOCCHI_CHART_DEFAULT_DATA } from '@constants';

describe('SbocchiChartComponent', () => {
  let component: SbocchiChartComponent;
  let fixture: ComponentFixture<SbocchiChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbocchiChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SbocchiChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the outer container div', () => {
    const div = fixture.nativeElement.querySelector('.rounded-xl');
    expect(div).not.toBeNull();
  });

  it('should render the canvas element', () => {
    const canvas = fixture.nativeElement.querySelector('canvas');
    expect(canvas).not.toBeNull();
  });

  it('should render the chart description text', () => {
    expect(fixture.nativeElement.textContent).toContain('Tasso di occupazione');
  });

  it('should render the data source disclaimer', () => {
    expect(fixture.nativeElement.textContent).toContain('AlmaLaurea');
  });

  it('should render the placeholder data note', () => {
    const note = fixture.nativeElement.querySelector('p.mt-2');
    expect(note).not.toBeNull();
    expect(note.textContent).toContain('Dati placeholder');
  });

  it('should use SBOCCHI_CHART_DEFAULT_DATA as default input', () => {
    expect(component.data()).toEqual(SBOCCHI_CHART_DEFAULT_DATA);
  });

  it('should accept custom data via input', () => {
    const componentRef: ComponentRef<SbocchiChartComponent> = fixture.componentRef;
    const customData = [{ area: 'Test', occupazione: 80, colore: '#000' }];
    componentRef.setInput('data', customData);
    fixture.detectChanges();
    expect(component.data()).toEqual(customData);
  });

  it('should render the bg-gray-50 container', () => {
    const container = fixture.nativeElement.querySelector('.bg-gray-50');
    expect(container).not.toBeNull();
  });
});
