import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicSbocchiComponent } from './topic-sbocchi.component';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { SbocchiChartComponent } from '../../charts/sbocchi-chart/sbocchi-chart.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';
import { SBOCCHI_AREE, SBOCCHI_CONSIGLI } from '@constants';

describe('TopicSbocchiComponent', () => {
  let component: TopicSbocchiComponent;
  let fixture: ComponentFixture<TopicSbocchiComponent>;
  let componentRef: ComponentRef<TopicSbocchiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicSbocchiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicSbocchiComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('hasPrev', true);
    componentRef.setInput('hasNext', true);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main h2 heading', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('Sbocchi lavorativi reali');
  });

  it('should render the sbocchi chart component', () => {
    const chart = fixture.debugElement.query(By.directive(SbocchiChartComponent));
    expect(chart).not.toBeNull();
  });

  it('should render the salary table heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Stipendi medi netti');
  });

  it('should render one table row per area from SBOCCHI_AREE', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(SBOCCHI_AREE.length);
  });

  it('should render a badge with occupazione percentage per area', () => {
    const badges = fixture.debugElement.queryAll(By.directive(CustomBadgeComponent));
    expect(badges.length).toBeGreaterThanOrEqual(SBOCCHI_AREE.length);
  });

  it('should render advice cards via CardStatus', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatusComponent));
    expect(cards.length).toBeGreaterThanOrEqual(SBOCCHI_CONSIGLI.length);
  });

  it('should render the AlmaLaurea callout', () => {
    expect(fixture.nativeElement.textContent).toContain('AlmaLaurea');
  });

  it('should render the app-orientation-nav', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav).not.toBeNull();
  });

  it('should return "success" for occupazione >= 75', () => {
    expect(component.occupazioneVariant(75)).toBe('success');
    expect(component.occupazioneVariant(90)).toBe('success');
    expect(component.occupazioneVariant(100)).toBe('success');
  });

  it('should return "warning" for occupazione >= 55 and < 75', () => {
    expect(component.occupazioneVariant(55)).toBe('warning');
    expect(component.occupazioneVariant(65)).toBe('warning');
    expect(component.occupazioneVariant(74)).toBe('warning');
  });

  it('should return "error" for occupazione < 55', () => {
    expect(component.occupazioneVariant(54)).toBe('error');
    expect(component.occupazioneVariant(30)).toBe('error');
    expect(component.occupazioneVariant(0)).toBe('error');
  });

  it('should emit prev when orientation-nav emits prev', () => {
    const spy = vi.fn();
    component.prev.subscribe(spy);
    fixture.debugElement.query(By.directive(OrientationNavComponent)).componentInstance.prev.emit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should emit next when orientation-nav emits next', () => {
    const spy = vi.fn();
    component.next.subscribe(spy);
    fixture.debugElement.query(By.directive(OrientationNavComponent)).componentInstance.next.emit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should emit backToList when orientation-nav emits backToList', () => {
    const spy = vi.fn();
    component.backToList.subscribe(spy);
    fixture.debugElement
      .query(By.directive(OrientationNavComponent))
      .componentInstance.backToList.emit();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
