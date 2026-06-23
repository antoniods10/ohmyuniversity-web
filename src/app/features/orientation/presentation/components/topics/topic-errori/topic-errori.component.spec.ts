import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TopicErroriComponent } from './topic-errori.component';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { OrientationStateService } from '@orientation/application/state/orientation.state';
import { ToastService } from '@ui/custom-toast/toast.service';
import { COMMON_MISTAKES } from '@constants';

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function (): void {};
}

describe('TopicErroriComponent', () => {
  let component: TopicErroriComponent;
  let fixture: ComponentFixture<TopicErroriComponent>;
  let stateServiceMock: { getAnswer: ReturnType<typeof vi.fn>; saveAnswer: ReturnType<typeof vi.fn> };
  let toastServiceMock: { success: ReturnType<typeof vi.fn> };

  async function setupComponent(answers: Record<string, string | null> = {}): Promise<void> {
    TestBed.resetTestingModule();

    stateServiceMock = {
      getAnswer: vi.fn((id: string) => answers[id] ?? null),
      saveAnswer: vi.fn(),
    };
    toastServiceMock = { success: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [TopicErroriComponent],
      providers: [
        { provide: OrientationStateService, useValue: stateServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicErroriComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('hasPrev', true);
    fixture.componentRef.setInput('hasNext', false);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await setupComponent();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main h2 heading', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('Errori comuni da evitare');
  });

  it('should render one error card per mistake from COMMON_MISTAKES', () => {
    COMMON_MISTAKES.forEach(e => {
      expect(fixture.nativeElement.textContent).toContain(e.titolo);
    });
  });

  it('should render a CardStatus solution for each error', () => {
    const statusCards = fixture.debugElement.queryAll(By.directive(CardStatusComponent));
    expect(statusCards.length).toBeGreaterThanOrEqual(COMMON_MISTAKES.length);
  });

  it('should render the completion CTA section', () => {
    expect(fixture.nativeElement.textContent).toContain('Hai completato la guida');
  });

  it('should render the "Rileggi un argomento" button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const rereadBtn = buttons.find(b => b.componentInstance.label === 'Rileggi un argomento');
    expect(rereadBtn).not.toBeUndefined();
  });

  it('should render the "Vai al riepilogo" button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const summaryBtn = buttons.find(b => b.componentInstance.label === 'Vai al riepilogo');
    expect(summaryBtn).not.toBeUndefined();
  });

  it('should render the app-orientation-nav component', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav).not.toBeNull();
  });

  it('should pass hasPrev=true and hasNext=false to orientation-nav', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav.componentInstance.hasPrev()).toBe(true);
    expect(nav.componentInstance.hasNext()).toBe(false);
  });

  it('should emit prev/next/backToList when orientation-nav emits them', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));

    const prevSpy = vi.fn();
    const nextSpy = vi.fn();
    const backSpy = vi.fn();
    component.prev.subscribe(prevSpy);
    component.next.subscribe(nextSpy);
    component.backToList.subscribe(backSpy);

    nav.componentInstance.prev.emit();
    nav.componentInstance.next.emit();
    nav.componentInstance.backToList.emit();

    expect(prevSpy).toHaveBeenCalledTimes(1);
    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(backSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit goToSummary when the "Vai al riepilogo" button is clicked', () => {
    const summarySpy = vi.fn();
    component.goToSummary.subscribe(summarySpy);

    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const summaryBtn = buttons.find(b => b.componentInstance.label === 'Vai al riepilogo');
    summaryBtn!.componentInstance.clicked.emit();

    expect(summarySpy).toHaveBeenCalledTimes(1);
  });

  describe('getErrorIcon', () => {
    it('returns a known icon for a recognized mistake title', () => {
      expect(component.getErrorIcon('Scegliere per moda')).toBeTruthy();
    });

    it('falls back to the default icon for an unrecognized title', () => {
      expect(component.getErrorIcon('Titolo Inesistente')).toBeTruthy();
    });
  });

  describe('signals reflect saved answers', () => {
    it('return null when no answer has been saved', () => {
      expect(component.selectedConfidence()).toBeNull();
      expect(component.selectedInfoSource()).toBeNull();
      expect(component.selectedTalkedTo()).toBeNull();
      expect(component.selectedStudyPlan()).toBeNull();
    });

    it('reflect the value already saved at creation time', async () => {
      await setupComponent({ [component.questionConfidence.id]: 'very-sure' });
      expect(component.selectedConfidence()).toBe('very-sure');
    });
  });

  describe('the 4 onSelect handlers', () => {
    it('save the confidence answer with the correct topicId', () => {
      const option = component.questionConfidence.options![0];
      component.onSelectConfidence(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionConfidence.id,
        'errori',
        option.value,
        option.label,
      );
    });

    it('save the info source answer with the correct topicId', () => {
      const option = component.questionInfoSource.options![0];
      component.onSelectInfoSource(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionInfoSource.id,
        'errori',
        option.value,
        option.label,
      );
    });

    it('save the talked-to-students answer with the correct topicId', () => {
      const option = component.questionTalkedTo.options![0];
      component.onSelectTalkedTo(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionTalkedTo.id,
        'errori',
        option.value,
        option.label,
      );
    });

    it('save the study plan check answer with the correct topicId', () => {
      const option = component.questionStudyPlan.options![0];
      component.onSelectStudyPlan(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionStudyPlan.id,
        'errori',
        option.value,
        option.label,
      );
    });

    it('do nothing when re-selecting an already-saved value', async () => {
      const option = component.questionConfidence.options![0];
      await setupComponent({ [component.questionConfidence.id]: option.value });

      component.onSelectConfidence(option.value);

      expect(stateServiceMock.saveAnswer).not.toHaveBeenCalled();
    });
  });

  describe('scrollToQuestion', () => {
    it('does not throw when called', () => {
      expect(() => component.scrollToQuestion()).not.toThrow();
    });

    it('calls scrollIntoView on the question element rendered by the template', () => {
      const el = document.getElementById('domanda-errori');
      expect(el).not.toBeNull();

      const scrollSpy = vi.spyOn(el!, 'scrollIntoView').mockImplementation(() => {});

      component.scrollToQuestion();

      expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    });
  });
});
