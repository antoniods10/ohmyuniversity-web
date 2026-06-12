import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicComeFunzionaComponent } from './topic-come-funziona.component';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CfuChartComponent } from '../../charts/cfu-chart/cfu-chart.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';
import { COME_FUNZIONA_DIFFERENZE, COME_FUNZIONA_TIPI_ESAME, COME_FUNZIONA_SESSIONI } from '@constants';

describe('TopicComeFunzionaComponent', () => {
  let component: TopicComeFunzionaComponent;
  let fixture: ComponentFixture<TopicComeFunzionaComponent>;
  let componentRef: ComponentRef<TopicComeFunzionaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicComeFunzionaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicComeFunzionaComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('hasPrev', false);
    componentRef.setInput('hasNext', true);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main h2 heading', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('Come funziona l\'università');
  });

  it('should render the differences table', () => {
    const table = fixture.nativeElement.querySelector('table');
    expect(table).not.toBeNull();
  });

  it('should render one row per differenza from constant', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(COME_FUNZIONA_DIFFERENZE.length);
  });

  it('should render the CFU section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Cosa sono i CFU?');
  });

  it('should render the app-cfu-chart component', () => {
    const chart = fixture.debugElement.query(By.directive(CfuChartComponent));
    expect(chart).not.toBeNull();
  });

  it('should render the tipi esame section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Tipi di esame');
  });

  it('should render one card per tipo di esame', () => {
    const tipiCards = fixture.nativeElement.querySelectorAll('.rounded-xl.border.border-gray-100.bg-gray-50.p-4');
    expect(tipiCards.length).toBeGreaterThanOrEqual(COME_FUNZIONA_TIPI_ESAME.length);
  });

  it('should render the sessioni section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Le sessioni d\'esame');
  });

  it('should render one badge per sessione', () => {
    const badges = fixture.debugElement.queryAll(By.directive(CustomBadgeComponent));
    expect(badges.length).toBeGreaterThanOrEqual(COME_FUNZIONA_SESSIONI.length);
  });

  it('should render the autonomy callout via CardStatus', () => {
    const statusCards = fixture.debugElement.queryAll(By.directive(CardStatusComponent));
    expect(statusCards.length).toBeGreaterThan(0);
  });

  it('should render the autonomy warning text', () => {
    expect(fixture.nativeElement.textContent).toContain('Autonomia totale');
  });

  it('should render the app-orientation-nav component', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav).not.toBeNull();
  });

  it('should pass hasPrev to orientation-nav', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav.componentInstance.hasPrev()).toBe(false);
  });

  it('should pass hasNext to orientation-nav', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav.componentInstance.hasNext()).toBe(true);
  });

  it('should emit prev when orientation-nav emits prev', () => {
    const spy = vi.fn();
    component.prev.subscribe(spy);
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    nav.componentInstance.prev.emit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should emit next when orientation-nav emits next', () => {
    const spy = vi.fn();
    component.next.subscribe(spy);
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    nav.componentInstance.next.emit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should emit backToList when orientation-nav emits backToList', () => {
    const spy = vi.fn();
    component.backToList.subscribe(spy);
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    nav.componentInstance.backToList.emit();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
