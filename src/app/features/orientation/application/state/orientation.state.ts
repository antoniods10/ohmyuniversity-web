import { Injectable, signal, computed } from '@angular/core';
import { ORIENTATION_TOPICS } from '@constants';
import { TopicId, InlineQuestion } from '@types';
import { computeOrientationResult, OrientationResult } from './orientation-scoring';

export interface SavedAnswer {
  questionId: string;
  topicId: TopicId;
  value: string;
  label: string;
}

/** Flat list of every inline question across all topics, computed once */
const ALL_QUESTIONS: InlineQuestion[] = ORIENTATION_TOPICS.flatMap(t => t.questions);

@Injectable({ providedIn: 'root' })
export class OrientationStateService {
  private readonly _answers = signal<Map<string, SavedAnswer>>(new Map());

  readonly answers = computed(() => Array.from(this._answers().values()));

  /**
   * Whether a question is currently reachable given the answers saved so far.
   * A question with no `dependsOn` is always reachable. A question that
   * depends on another one is reachable only if that other question was
   * answered with one of the expected values.
   */
  isQuestionReachable(question: InlineQuestion): boolean {
    if (!question.dependsOn) return true;
    const { questionId, values } = question.dependsOn;
    const parentValue = this._answers().get(questionId)?.value;
    return parentValue !== undefined && values.includes(parentValue);
  }

  /** Only the questions that are actually reachable given the current answers */
  readonly reachableQuestions = computed(() =>
    ALL_QUESTIONS.filter(q => this.isQuestionReachable(q)),
  );

  readonly totalQuestions = computed(() => this.reachableQuestions().length);

  /**
   * Count of saved answers that belong to a currently reachable question.
   * If a dependency answer changes and a follow-up question becomes
   * unreachable, its leftover saved answer (if any) is not counted here,
   * keeping the completion percentage consistent with what the user can see.
   */
  readonly answeredCount = computed(() => {
    const reachableIds = new Set(this.reachableQuestions().map(q => q.id));
    return this.answers().filter(a => reachableIds.has(a.questionId)).length;
  });

  readonly isComplete = computed(() => this.answeredCount() === this.totalQuestions());

  /** Computed orientation result - recalculated automatically whenever answers change */
  readonly result = computed<OrientationResult | null>(() => {
    if (!this.isComplete()) return null;
    return computeOrientationResult(this.answers());
  });

  getAnswer(questionId: string): string | null {
    return this._answers().get(questionId)?.value ?? null;
  }

  saveAnswer(questionId: string, topicId: TopicId, value: string, label: string): void {
    this._answers.update(map => {
      const next = new Map(map);
      next.set(questionId, { questionId, topicId, value, label });
      return next;
    });
  }

  getTopicAnswers(topicId: TopicId): SavedAnswer[] {
    return this.answers().filter(a => a.topicId === topicId);
  }

  isTopicComplete(topicId: TopicId): boolean {
    const topic = ORIENTATION_TOPICS.find(t => t.id === topicId);
    if (!topic) return false;
    return topic.questions
      .filter(q => this.isQuestionReachable(q))
      .every(q => this._answers().has(q.id));
  }

  clearAnswer(questionId: string): void {
    this._answers.update(map => {
      const next = new Map(map);
      next.delete(questionId);
      return next;
    });
  }

  reset(): void {
    this._answers.set(new Map());
  }
}
