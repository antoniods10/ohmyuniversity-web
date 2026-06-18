import { Injectable, signal, computed } from '@angular/core';
import { ORIENTATION_TOPICS } from '@constants';
import { TopicId } from '@types';

export interface SavedAnswer {
  questionId: string;
  topicId: TopicId;
  value: string;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class OrientationStateService {
  // Map: questionId → SavedAnswer
  private readonly _answers = signal<Map<string, SavedAnswer>>(new Map());

  readonly answers = computed(() => Array.from(this._answers().values()));

  readonly totalQuestions = computed(() =>
    ORIENTATION_TOPICS.reduce((sum, t) => sum + t.questions.length, 0),
  );

  readonly answeredCount = computed(() => this._answers().size);

  readonly isComplete = computed(() => this.answeredCount() === this.totalQuestions());

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
    return topic.questions.every(q => this._answers().has(q.id));
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
