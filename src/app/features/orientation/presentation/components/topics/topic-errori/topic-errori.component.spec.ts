import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicErroriComponent } from './topic-errori.component';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';
import { ERRORI_ORIENTAMENTO } from '@constants';
import { provideRouter } from '@angular/router';

describe('TopicErroriComponent', () => {
  let component: TopicErroriComponent;
  let fixture: ComponentFixture<TopicErroriComponent>;
  let componentRef: ComponentRef<TopicErroriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicErroriComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicErroriComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('hasPrev', true);
    componentRef.setInput('hasNext', false);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main h2 heading', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('Errori comuni da evitare');
  });

  it('should render one error card per errore from constant', () => {
    const erroreCards = fixture.nativeElement.querySelectorAll(
      '.rounded-xl.border.border-gray-100.p-5',
    );
    expect(erroreCards.length).toBe(ERRORI_ORIENTAMENTO.length);
  });

  it('should render each error title', () => {
    ERRORI_ORIENTAMENTO.forEach(e => {
      expect(fixture.nativeElement.textContent).toContain(e.titolo);
    });
  });

  it('should render a CardStatus solution for each error', () => {
    const statusCards = fixture.debugElement.queryAll(By.directive(CardStatusComponent));
    expect(statusCards.length).toBeGreaterThanOrEqual(ERRORI_ORIENTAMENTO.length);
  });

  it('should render the completion CTA section', () => {
    expect(fixture.nativeElement.textContent).toContain('Hai completato la guida');
  });

  it('should render the login CTA button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const loginBtn = buttons.find(b => b.componentInstance.label === 'Accedi con il tuo ateneo');
    expect(loginBtn).not.toBeUndefined();
  });

  it('should render the "Rileggi un argomento" button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const rereadBtn = buttons.find(b => b.componentInstance.label === 'Rileggi un argomento');
    expect(rereadBtn).not.toBeUndefined();
  });

  it('should render the app-orientation-nav component', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav).not.toBeNull();
  });

  it('should pass hasPrev=true to orientation-nav', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav.componentInstance.hasPrev()).toBe(true);
  });

  it('should pass hasNext=false to orientation-nav', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav.componentInstance.hasNext()).toBe(false);
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
});
