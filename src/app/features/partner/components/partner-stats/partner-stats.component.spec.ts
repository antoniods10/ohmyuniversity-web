import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PartnerStatsComponent } from './partner-stats.component';
import { CardStatComponent } from '@ui/custom-card/card-variants.component';

const MOCK_STATS = [
  { value: '120.000+', label: 'Studenti attivi' },
  { value: '98%', label: 'Soddisfazione' },
  { value: '50+', label: 'Università' },
  { value: '3x', label: 'Engagement medio' },
];

describe('PartnerStatsComponent', () => {
  let component: PartnerStatsComponent;
  let fixture: ComponentFixture<PartnerStatsComponent>;
  let componentRef: ComponentRef<PartnerStatsComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerStatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerStatsComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    nativeEl = fixture.nativeElement;

    componentRef.setInput('stats', MOCK_STATS);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section with bg-gray-50', () => {
    const section = nativeEl.querySelector('section.bg-gray-50');
    expect(section).not.toBeNull();
  });

  it('should render one app-card-stat per stat entry', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    expect(cards.length).toBe(MOCK_STATS.length);
  });

  it('should pass correct value to each card-stat', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    MOCK_STATS.forEach((stat, i) => {
      expect(cards[i].componentInstance.value).toBe(stat.value);
    });
  });

  it('should pass correct label to each card-stat', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    MOCK_STATS.forEach((stat, i) => {
      expect(cards[i].componentInstance.label).toBe(stat.label);
    });
  });

  it('should render a grid container', () => {
    const grid = nativeEl.querySelector('.grid');
    expect(grid).not.toBeNull();
  });

  it('should recompute when stats input changes', () => {
    const newStats = [{ value: '1', label: 'Test' }];
    componentRef.setInput('stats', newStats);
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    expect(cards.length).toBe(1);
  });
});
