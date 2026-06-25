import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TopicQuizComponent } from './topic-quiz.component';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { OrientationStateService } from 'src/app/core/application/state/orientation/orientation.state';
import { ToastService } from '@ui/custom-toast/toast.service';
import { TOLC_TESTS, ACCESS_TIPS } from '@constants';

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function (): void {};
}

describe('TopicQuizComponent', () => {
  let component: TopicQuizComponent;
  let fixture: ComponentFixture<TopicQuizComponent>;
  let stateServiceMock: {
    getAnswer: ReturnType<typeof vi.fn>;
    saveAnswer: ReturnType<typeof vi.fn>;
    clearAnswer: ReturnType<typeof vi.fn>;
  };
  let toastServiceMock: { success: ReturnType<typeof vi.fn> };

  async function setupComponent(answers: Record<string, string | null> = {}): Promise<void> {
    TestBed.resetTestingModule();

    stateServiceMock = {
      getAnswer: vi.fn((id: string) => answers[id] ?? null),
      saveAnswer: vi.fn(),
      clearAnswer: vi.fn(),
    };
    toastServiceMock = { success: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [TopicQuizComponent],
      providers: [
        { provide: OrientationStateService, useValue: stateServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicQuizComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('hasPrev', true);
    fixture.componentRef.setInput('hasNext', true);
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
    expect(h2.textContent).toContain("Accesso all'università");
  });

  it('should render the TOLC section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('I TOLC');
  });

  it('should render one test card per TOLC_TESTS entry', () => {
    const testCards = fixture.nativeElement.querySelectorAll(
      '.rounded-xl.border.border-gray-100.bg-gray-50.p-4',
    );
    expect(testCards.length).toBeGreaterThanOrEqual(TOLC_TESTS.length);
  });

  it('should render one CardStatus per tip from ACCESS_TIPS', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatusComponent));
    expect(cards.length).toBeGreaterThanOrEqual(ACCESS_TIPS.length);
  });

  it('should render the 3 access type cards', () => {
    expect(component.accessTypes).toHaveLength(3);
  });

  it('should render the app-orientation-nav component', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav).not.toBeNull();
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

  describe('showTolcType conditional question', () => {
    it('is hidden by default', () => {
      expect(component.showTolcType()).toBe(false);
    });

    it('becomes visible when question 2 answer is "yes"', async () => {
      await setupComponent({ [component.questionTolcDone.id]: 'yes' });
      expect(component.showTolcType()).toBe(true);
    });

    it('becomes visible when question 2 answer is "no-planning"', async () => {
      await setupComponent({ [component.questionTolcDone.id]: 'no-planning' });
      expect(component.showTolcType()).toBe(true);
    });

    it('stays hidden when question 2 answer is "no-unsure"', async () => {
      await setupComponent({ [component.questionTolcDone.id]: 'no-unsure' });
      expect(component.showTolcType()).toBe(false);
    });
  });

  describe('isSelected', () => {
    it('returns true only when current matches value', () => {
      expect(component.isSelected('free', 'free')).toBe(true);
      expect(component.isSelected('free', 'national-restricted')).toBe(false);
      expect(component.isSelected(null, 'free')).toBe(false);
    });
  });

  describe('onSelectAccessType', () => {
    it('saves the answer with the correct topicId and label', () => {
      const option = component.questionAccessType.options![0];

      component.onSelectAccessType(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionAccessType.id,
        'quiz',
        option.value,
        option.label,
      );
    });

    it('does nothing when re-selecting the already-saved value', async () => {
      const option = component.questionAccessType.options![0];
      await setupComponent({ [component.questionAccessType.id]: option.value });

      component.onSelectAccessType(option.value);

      expect(stateServiceMock.saveAnswer).not.toHaveBeenCalled();
    });
  });

  describe('onSelectTolcDone', () => {
    it('saves the answer and clears the dependent TOLC type answer', () => {
      const option = component.questionTolcDone.options![0];

      component.onSelectTolcDone(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionTolcDone.id,
        'quiz',
        option.value,
        option.label,
      );
      expect(stateServiceMock.clearAnswer).toHaveBeenCalledWith(component.questionTolcType.id);
    });

    it('does nothing when re-selecting the already-saved value', async () => {
      const option = component.questionTolcDone.options![0];
      await setupComponent({ [component.questionTolcDone.id]: option.value });

      component.onSelectTolcDone(option.value);

      expect(stateServiceMock.saveAnswer).not.toHaveBeenCalled();
      expect(stateServiceMock.clearAnswer).not.toHaveBeenCalled();
    });
  });

  describe('onSelectTolcType', () => {
    it('saves the answer with the correct topicId and label', () => {
      const option = component.questionTolcType.options![0];

      component.onSelectTolcType(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionTolcType.id,
        'quiz',
        option.value,
        option.label,
      );
    });
  });

  describe('scrollToQuestion', () => {
    it('does not throw when called', () => {
      expect(() => component.scrollToQuestion()).not.toThrow();
    });

    it('calls scrollIntoView on the question element rendered by the template', () => {
      const el = document.getElementById('domanda-quiz');
      expect(el).not.toBeNull();

      const scrollSpy = vi.spyOn(el!, 'scrollIntoView').mockImplementation(() => {});

      component.scrollToQuestion();

      expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    });
  });
});
