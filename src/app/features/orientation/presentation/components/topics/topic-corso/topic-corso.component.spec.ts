import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicCorsoComponent } from './topic-corso.component';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';
import { CORSO_AREE, CORSO_CONSIGLI } from '@constants';

describe('TopicCorsoComponent', () => {
  let component: TopicCorsoComponent;
  let fixture: ComponentFixture<TopicCorsoComponent>;
  let componentRef: ComponentRef<TopicCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicCorsoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicCorsoComponent);
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
    expect(h2.textContent).toContain('Scegli il corso adatto a te');
  });

  it('should render the macro-aree section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Le macro-aree di studio');
  });

  it('should render one card per area from CORSO_AREE', () => {
    const areaCards = fixture.nativeElement.querySelectorAll('.flex.items-start.gap-3.rounded-xl');
    expect(areaCards.length).toBe(CORSO_AREE.length);
  });

  it('should render each area label', () => {
    CORSO_AREE.forEach(area => {
      expect(fixture.nativeElement.textContent).toContain(area.label);
    });
  });

  it('should render the "come fare la scelta giusta" section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Come fare la scelta giusta');
  });

  it('should render one CardStatus per consiglio', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatusComponent));
    expect(cards.length).toBeGreaterThanOrEqual(CORSO_CONSIGLI.length);
  });

  it('should render the "media scolastica" callout', () => {
    expect(fixture.nativeElement.textContent).toContain('La media scolastica conta?');
  });

  it('should render the app-orientation-nav component', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav).not.toBeNull();
  });

  it('should pass hasPrev to orientation-nav', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav.componentInstance.hasPrev()).toBe(true);
  });

  it('should pass hasNext to orientation-nav', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav.componentInstance.hasNext()).toBe(true);
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
