import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CfuChartComponent } from './cfu-chart.component';
import { ComponentRef } from '@angular/core';
import { CFU_CHART_DEFAULT_DATA } from '@shared/constants';

describe('CfuChartComponent', () => {
  let component: CfuChartComponent;
  let fixture: ComponentFixture<CfuChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CfuChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CfuChartComponent);
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

  it('should render the chart title/description text', () => {
    expect(fixture.nativeElement.textContent).toContain('CFU per anno');
  });

  it('should render the CFU legend item', () => {
    expect(fixture.nativeElement.textContent).toContain('CFU anno');
  });

  it('should render the studio hours legend item', () => {
    expect(fixture.nativeElement.textContent).toContain('Ore studio');
  });

  it('should render two legend color boxes', () => {
    const legendBoxes = fixture.nativeElement.querySelectorAll('.h-3.w-3.rounded-sm');
    expect(legendBoxes.length).toBe(2);
  });

  it('should use CFU_CHART_DEFAULT_DATA as default input', () => {
    expect(component.data()).toEqual(CFU_CHART_DEFAULT_DATA);
  });

  it('should accept custom data via input', () => {
    const componentRef: ComponentRef<CfuChartComponent> = fixture.componentRef;
    const customData = [{ anno: '1°', cfu: 60, oreStudio: 20 }];
    componentRef.setInput('data', customData);
    fixture.detectChanges();
    expect(component.data()).toEqual(customData);
  });

  it('should render the bg-blue-500 legend color for CFU', () => {
    const cfuLegend = fixture.nativeElement.querySelector('.bg-blue-500');
    expect(cfuLegend).not.toBeNull();
  });

  it('should render the bg-blue-300 legend color for ore studio', () => {
    const oreLegend = fixture.nativeElement.querySelector('.bg-blue-300');
    expect(oreLegend).not.toBeNull();
  });

  it('should render the legend flex container', () => {
    const flex = fixture.nativeElement.querySelector('.flex.items-center.gap-5');
    expect(flex).not.toBeNull();
  });
});
