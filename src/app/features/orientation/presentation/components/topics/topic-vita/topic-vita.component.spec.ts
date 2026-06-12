import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicVitaComponent } from './topic-vita.component';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';
import { VITA_CONSIGLI_ORARI, VITA_CONSIGLI_STUDIO, VITA_FUORISEDE, VITA_TEMPO_SLICES } from '@constants';

describe('TopicVitaComponent', () => {
  let component: TopicVitaComponent;
  let fixture: ComponentFixture<TopicVitaComponent>;
  let componentRef: ComponentRef<TopicVitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicVitaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicVitaComponent);
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
    expect(h2.textContent).toContain('Vita universitaria concreta');
  });

  it('should render the canvas for the pie chart', () => {
    const canvas = fixture.nativeElement.querySelector('canvas');
    expect(canvas).not.toBeNull();
  });

  it('should render the time distribution section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Come si distribuisce il tempo');
  });

  it('should render one legend row per tempoSlice', () => {
    const legendRows = fixture.nativeElement.querySelectorAll('.flex.items-center.gap-3');
    expect(legendRows.length).toBeGreaterThanOrEqual(VITA_TEMPO_SLICES.length);
  });

  it('should render each slice label', () => {
    VITA_TEMPO_SLICES.forEach(slice => {
      expect(fixture.nativeElement.textContent).toContain(slice.label);
    });
  });

  it('should render the orari section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Gli orari delle lezioni');
  });

  it('should render one orari card per consiglio', () => {
    const cards = fixture.nativeElement.querySelectorAll('.rounded-xl.border.border-gray-100.p-4');
    expect(cards.length).toBeGreaterThanOrEqual(VITA_CONSIGLI_ORARI.length);
  });

  it('should render the studio individuale section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Studio individuale');
  });

  it('should render CardStatus cards for studio consigli', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatusComponent));
    expect(cards.length).toBeGreaterThanOrEqual(VITA_CONSIGLI_STUDIO.length);
  });

  it('should render the vita fuori sede section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Vita fuori sede');
  });

  it('should render one table row per voce fuorisede', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(VITA_FUORISEDE.length);
  });

  it('should render the DSU borse di studio note', () => {
    expect(fixture.nativeElement.textContent).toContain('borse di studio DSU');
  });

  it('should render the app-orientation-nav component', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav).not.toBeNull();
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
    fixture.debugElement.query(By.directive(OrientationNavComponent)).componentInstance.backToList.emit();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
