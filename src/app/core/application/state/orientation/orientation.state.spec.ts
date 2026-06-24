import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { OrientationStateService } from './orientation.state';
import { ORIENTATION_TOPICS } from '@constants';

describe('OrientationStateService', () => {
  let service: OrientationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrientationStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('starts with no saved answers', () => {
      expect(service.answers()).toEqual([]);
      expect(service.answeredCount()).toBe(0);
    });

    it('computes totalQuestions as the count of reachable questions at initial state', () => {
      // At initial state (no answers saved yet), conditional questions
      // (those with `dependsOn`) are not yet reachable - see isQuestionReachable.
      const expectedReachableAtStart = ORIENTATION_TOPICS.reduce(
        (sum, t) => sum + t.questions.filter(q => !q.dependsOn).length,
        0,
      );
      expect(service.totalQuestions()).toBe(expectedReachableAtStart);
    });

    it('is not complete when no answers are saved', () => {
      expect(service.isComplete()).toBe(false);
    });

    it('returns a null result when not complete', () => {
      expect(service.result()).toBeNull();
    });
  });

  describe('getAnswer', () => {
    it('returns null for a question with no saved answer', () => {
      expect(service.getAnswer('corso-area')).toBeNull();
    });

    it('returns the saved value after saveAnswer is called', () => {
      service.saveAnswer('corso-area', 'corso', 'ingegneria', 'Ingegneria & Informatica');
      expect(service.getAnswer('corso-area')).toBe('ingegneria');
    });
  });

  describe('saveAnswer', () => {
    it('increments answeredCount when a new answer is saved', () => {
      service.saveAnswer('corso-area', 'corso', 'ingegneria', 'Ingegneria & Informatica');
      expect(service.answeredCount()).toBe(1);
    });

    it('does not increment answeredCount when overwriting an existing answer', () => {
      service.saveAnswer('corso-area', 'corso', 'ingegneria', 'Ingegneria & Informatica');
      service.saveAnswer('corso-area', 'corso', 'economica', 'Economica & Giuridica');

      expect(service.answeredCount()).toBe(1);
      expect(service.getAnswer('corso-area')).toBe('economica');
    });

    it('stores the full SavedAnswer shape (questionId, topicId, value, label)', () => {
      service.saveAnswer('corso-area', 'corso', 'ingegneria', 'Ingegneria & Informatica');
      const saved = service.answers()[0];

      expect(saved).toEqual({
        questionId: 'corso-area',
        topicId: 'corso',
        value: 'ingegneria',
        label: 'Ingegneria & Informatica',
      });
    });

    it('keeps multiple distinct answers independently', () => {
      service.saveAnswer('corso-area', 'corso', 'ingegneria', 'Ingegneria & Informatica');
      service.saveAnswer('budget-monthly', 'borse-studio', '400-700', 'Tra 400 e 700 €/mese');

      expect(service.answeredCount()).toBe(2);
      expect(service.getAnswer('corso-area')).toBe('ingegneria');
      expect(service.getAnswer('budget-monthly')).toBe('400-700');
    });
  });

  describe('clearAnswer', () => {
    it('removes a previously saved answer', () => {
      service.saveAnswer('corso-area', 'corso', 'ingegneria', 'Ingegneria & Informatica');
      service.clearAnswer('corso-area');

      expect(service.getAnswer('corso-area')).toBeNull();
      expect(service.answeredCount()).toBe(0);
    });

    it('does nothing when clearing a question that was never answered', () => {
      expect(() => service.clearAnswer('not-a-real-question')).not.toThrow();
      expect(service.answeredCount()).toBe(0);
    });

    it('does not affect other saved answers', () => {
      service.saveAnswer('corso-area', 'corso', 'ingegneria', 'Ingegneria & Informatica');
      service.saveAnswer('budget-monthly', 'borse-studio', '400-700', 'Tra 400 e 700 €/mese');

      service.clearAnswer('corso-area');

      expect(service.getAnswer('corso-area')).toBeNull();
      expect(service.getAnswer('budget-monthly')).toBe('400-700');
      expect(service.answeredCount()).toBe(1);
    });
  });

  describe('getTopicAnswers', () => {
    it('returns only the answers belonging to the given topic', () => {
      service.saveAnswer('corso-area', 'corso', 'ingegneria', 'Ingegneria & Informatica');
      service.saveAnswer('budget-monthly', 'borse-studio', '400-700', 'Tra 400 e 700 €/mese');

      const corsoAnswers = service.getTopicAnswers('corso');

      expect(corsoAnswers).toHaveLength(1);
      expect(corsoAnswers[0].questionId).toBe('corso-area');
    });

    it('returns an empty array when no answers belong to the topic', () => {
      expect(service.getTopicAnswers('vita')).toEqual([]);
    });
  });

  describe('isTopicComplete', () => {
    it('returns false when no question of the topic has been answered', () => {
      expect(service.isTopicComplete('corso')).toBe(false);
    });

    it('returns true once every question of the topic has been answered', () => {
      const corsoTopic = ORIENTATION_TOPICS.find(t => t.id === 'corso')!;
      corsoTopic.questions.forEach(q => {
        service.saveAnswer(q.id, 'corso', 'some-value', 'Some Label');
      });

      expect(service.isTopicComplete('corso')).toBe(true);
    });

    it('returns false when only some questions of a multi-question topic are answered', () => {
      const erroriTopic = ORIENTATION_TOPICS.find(t => t.id === 'errori')!;
      service.saveAnswer(erroriTopic.questions[0].id, 'errori', 'some-value', 'Some Label');

      expect(service.isTopicComplete('errori')).toBe(false);
    });

    it('returns false for a topicId that does not exist', () => {
      // @ts-expect-error testing an invalid topicId on purpose
      expect(service.isTopicComplete('not-a-real-topic')).toBe(false);
    });
  });

  describe('reset', () => {
    it('clears all saved answers', () => {
      service.saveAnswer('corso-area', 'corso', 'ingegneria', 'Ingegneria & Informatica');
      service.saveAnswer('budget-monthly', 'borse-studio', '400-700', 'Tra 400 e 700 €/mese');

      service.reset();

      expect(service.answers()).toEqual([]);
      expect(service.answeredCount()).toBe(0);
    });
  });

  describe('isComplete / result integration', () => {
    it('becomes complete once every question across all topics is answered', () => {
      ORIENTATION_TOPICS.forEach(topic => {
        topic.questions.forEach(q => {
          service.saveAnswer(q.id, topic.id, 'some-value', 'Some Label');
        });
      });

      expect(service.isComplete()).toBe(true);
    });

    it('keeps result null until every question is answered, then returns a real result', () => {
      service.saveAnswer('corso-area', 'corso', 'ingegneria', 'Ingegneria & Informatica');
      expect(service.result()).toBeNull();

      // Complete every remaining question
      ORIENTATION_TOPICS.forEach(topic => {
        topic.questions.forEach(q => {
          if (service.getAnswer(q.id) === null) {
            service.saveAnswer(q.id, topic.id, 'some-value', 'Some Label');
          }
        });
      });

      expect(service.isComplete()).toBe(true);
      expect(service.result()).not.toBeNull();
      expect(service.result()!.dominantArea.areaId).toBe('ingegneria');
    });

    it('recomputes the result when an answer changes after completion', () => {
      ORIENTATION_TOPICS.forEach(topic => {
        topic.questions.forEach(q => {
          service.saveAnswer(q.id, topic.id, 'some-value', 'Some Label');
        });
      });

      const firstResult = service.result();
      expect(firstResult).not.toBeNull();

      service.saveAnswer('corso-area', 'corso', 'artistica', 'Artistica & del Design');

      const secondResult = service.result();
      expect(secondResult).not.toBeNull();
      expect(secondResult!.dominantArea.areaId).toBe('artistica');
    });
  });
});
