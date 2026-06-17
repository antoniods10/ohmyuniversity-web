import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicQuizComponent } from './topic-quiz.component';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';
import { QUIZ_TESTS_ESMPIO, QUIZ_CONSIGLI, QUIZ_AUTOVALUTAZIONE } from '@constants';

describe('TopicQuizComponent', () => {
  let component: TopicQuizComponent;
  let fixture: ComponentFixture<TopicQuizComponent>;
  let componentRef: ComponentRef<TopicQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicQuizComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicQuizComponent);
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
    expect(h2.textContent).toContain('Quiz e Autovalutazione');
  });

  it('should render the TOLC section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Cosa sono i TOLC?');
  });

  it('should render one test card per testsEsempio entry', () => {
    const testCards = fixture.nativeElement.querySelectorAll(
      '.rounded-xl.border.border-gray-100.bg-gray-50.p-4',
    );
    expect(testCards.length).toBeGreaterThanOrEqual(QUIZ_TESTS_ESMPIO.length);
  });

  it('should render badges for ateneo in each test card', () => {
    const badges = fixture.debugElement.queryAll(By.directive(CustomBadgeComponent));
    expect(badges.length).toBeGreaterThan(0);
  });

  it('should render the autovalutazione section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Autovalutazione rapida');
  });

  it('should render one autovalutazione card per item', () => {
    const items = fixture.nativeElement.querySelectorAll('.rounded-xl.border.border-gray-100.p-4');
    expect(items.length).toBeGreaterThanOrEqual(QUIZ_AUTOVALUTAZIONE.length);
  });

  it('should render each autovalutazione question', () => {
    QUIZ_AUTOVALUTAZIONE.forEach(item => {
      expect(fixture.nativeElement.textContent).toContain(item.domanda);
    });
  });

  it('should render the practical advice section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Consigli pratici');
  });

  it('should render one CardStatus per consiglio', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatusComponent));
    expect(cards.length).toBeGreaterThanOrEqual(QUIZ_CONSIGLI.length);
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
    fixture.debugElement
      .query(By.directive(OrientationNavComponent))
      .componentInstance.backToList.emit();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
