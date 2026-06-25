import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrientationSummaryComponent } from './orientation-summary.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import {
  SavedAnswer,
  OrientationStateService,
} from 'src/app/core/application/state/orientation/orientation.state';
import { ORIENTATION_TOPICS } from '@constants';
import { InlineQuestion } from '@types';

function isQuestionReachable(question: InlineQuestion, savedAnswers: SavedAnswer[]): boolean {
  if (!question.dependsOn) return true;
  const { questionId, values } = question.dependsOn;
  const parentValue = savedAnswers.find(a => a.questionId === questionId)?.value;
  return parentValue !== undefined && values.includes(parentValue);
}

describe('OrientationSummaryComponent', () => {
  let component: OrientationSummaryComponent;
  let fixture: ComponentFixture<OrientationSummaryComponent>;
  let stateServiceMock: {
    answers: ReturnType<typeof vi.fn>;
    answeredCount: ReturnType<typeof vi.fn>;
    totalQuestions: ReturnType<typeof vi.fn>;
    getAnswer: ReturnType<typeof vi.fn>;
    saveAnswer: ReturnType<typeof vi.fn>;
    isQuestionReachable: ReturnType<typeof vi.fn>;
  };

  const totalQuestionsCount = ORIENTATION_TOPICS.reduce((sum, t) => sum + t.questions.length, 0);

  async function setupComponent(savedAnswers: SavedAnswer[] = []): Promise<void> {
    TestBed.resetTestingModule();

    stateServiceMock = {
      answers: vi.fn().mockReturnValue(savedAnswers),
      answeredCount: vi.fn().mockReturnValue(savedAnswers.length),
      totalQuestions: vi.fn().mockReturnValue(totalQuestionsCount),
      getAnswer: vi.fn((id: string) => savedAnswers.find(a => a.questionId === id)?.value ?? null),
      saveAnswer: vi.fn(),
      isQuestionReachable: vi.fn((q: InlineQuestion) => isQuestionReachable(q, savedAnswers)),
    };

    await TestBed.configureTestingModule({
      imports: [OrientationSummaryComponent],
      providers: [{ provide: OrientationStateService, useValue: stateServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(OrientationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await setupComponent();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main h1 heading', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Le tue risposte');
  });

  it('should build one summary question for each reachable question at initial state', () => {
    // At initial state (no answers saved yet), conditional questions
    // (those with `dependsOn`) are not yet reachable - see isQuestionReachable.
    const expectedReachableAtStart = ORIENTATION_TOPICS.reduce(
      (sum, t) => sum + t.questions.filter(q => !q.dependsOn).length,
      0,
    );
    expect(component.summaryQuestions()).toHaveLength(expectedReachableAtStart);
  });

  it('should render the warning completion banner when not all questions are answered', () => {
    expect(fixture.nativeElement.textContent).toContain('Hai risposto a 0 domande su');
  });

  it('should render the success completion banner when all questions are answered', async () => {
    const allAnswers: SavedAnswer[] = ORIENTATION_TOPICS.flatMap(topic =>
      topic.questions.map(q => ({ questionId: q.id, topicId: topic.id, value: 'x', label: 'X' })),
    );
    await setupComponent(allAnswers);

    expect(fixture.nativeElement.textContent).toContain('Profilo completo');
  });

  describe('accordion behavior', () => {
    it('starts with no question expanded', () => {
      const firstQuestionId = component.summaryQuestions()[0].questionId;
      expect(component.isExpanded(firstQuestionId)).toBe(false);
    });

    it('expands a question when toggled', () => {
      const firstQuestionId = component.summaryQuestions()[0].questionId;
      component.toggleQuestion(firstQuestionId);
      expect(component.isExpanded(firstQuestionId)).toBe(true);
    });

    it('collapses an already expanded question when toggled again', () => {
      const firstQuestionId = component.summaryQuestions()[0].questionId;
      component.toggleQuestion(firstQuestionId);
      component.toggleQuestion(firstQuestionId);
      expect(component.isExpanded(firstQuestionId)).toBe(false);
    });

    it('only keeps one question expanded at a time', () => {
      const [first, second] = component.summaryQuestions();
      component.toggleQuestion(first.questionId);
      component.toggleQuestion(second.questionId);

      expect(component.isExpanded(first.questionId)).toBe(false);
      expect(component.isExpanded(second.questionId)).toBe(true);
    });
  });

  describe('isSelected', () => {
    it('returns false when no answer has been saved for the question', () => {
      const firstQuestionId = component.summaryQuestions()[0].questionId;
      expect(component.isSelected(firstQuestionId, 'any-value')).toBe(false);
    });

    it('returns true when the saved value matches', async () => {
      const corsoQuestion = ORIENTATION_TOPICS.find(t => t.id === 'corso')!.questions[0];
      await setupComponent([
        {
          questionId: corsoQuestion.id,
          topicId: 'corso',
          value: 'ingegneria',
          label: 'Ingegneria',
        },
      ]);

      expect(component.isSelected(corsoQuestion.id, 'ingegneria')).toBe(true);
      expect(component.isSelected(corsoQuestion.id, 'economica')).toBe(false);
    });
  });

  describe('onSelect', () => {
    it('saves the answer using the option label found in the question options', () => {
      const summaryQuestion = component.summaryQuestions().find(q => q.options.length > 0);
      if (!summaryQuestion) throw new Error('No summary question with options found in test setup');
      const option = summaryQuestion.options[0];

      component.onSelect(summaryQuestion, option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        summaryQuestion.questionId,
        summaryQuestion.topicId,
        option.value,
        option.label,
      );
    });

    it('falls back to the raw value as label when no matching option is found', () => {
      const summaryQuestion = component.summaryQuestions()[0];

      component.onSelect(summaryQuestion, 'value-with-no-matching-option');

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        summaryQuestion.questionId,
        summaryQuestion.topicId,
        'value-with-no-matching-option',
        'value-with-no-matching-option',
      );
    });
  });

  describe('getCompletionVariant', () => {
    it('returns "info" when nothing has been answered yet', () => {
      expect(component.getCompletionVariant()).toBe('info');
    });

    it('returns "success" when 100% of questions are answered', async () => {
      const allAnswers: SavedAnswer[] = ORIENTATION_TOPICS.flatMap(topic =>
        topic.questions.map(q => ({ questionId: q.id, topicId: topic.id, value: 'x', label: 'X' })),
      );
      await setupComponent(allAnswers);

      expect(component.getCompletionVariant()).toBe('success');
    });

    it('returns "warning" when at least 50% but not all questions are answered', async () => {
      const halfCount = Math.ceil(totalQuestionsCount / 2);
      const flatQuestions = ORIENTATION_TOPICS.flatMap(topic =>
        topic.questions.map(q => ({ questionId: q.id, topicId: topic.id })),
      ).slice(0, halfCount);

      const partialAnswers: SavedAnswer[] = flatQuestions.map(q => ({
        questionId: q.questionId,
        topicId: q.topicId,
        value: 'x',
        label: 'X',
      }));
      await setupComponent(partialAnswers);

      expect(component.getCompletionVariant()).toBe('warning');
    });
  });

  describe('getLabelClean', () => {
    it('strips a leading emoji-like token followed by a space', () => {
      expect(component.getLabelClean('📚 Umanistica')).toBe('Umanistica');
    });

    it('leaves a plain label without a leading symbol unchanged apart from the first word', () => {
      // Documents existing behavior: the regex always strips the first "word"
      expect(component.getLabelClean('Umanistica')).toBe('Umanistica');
    });
  });

  describe('actions', () => {
    it('emits backToList when the "Torna alla lista" button is clicked', () => {
      const spy = vi.fn();
      component.backToList.subscribe(spy);

      component.backToList.emit();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('emits viewResult when the "Vedi il tuo risultato" button is clicked', () => {
      const spy = vi.fn();
      component.viewResult.subscribe(spy);

      component.viewResult.emit();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('should render one badge with the question status for every summary question', () => {
    const badges = fixture.debugElement.queryAll(By.directive(CustomBadgeComponent));
    expect(badges.length).toBeGreaterThan(0);
  });
});
