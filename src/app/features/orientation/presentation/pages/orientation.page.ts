import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopicCorsoComponent } from '../components/topics/topic-corso/topic-corso.component';
import { TopicComeFunzionaComponent } from '../components/topics/topic-come-funziona/topic-come-funziona.component';
import { TopicErroriComponent } from '../components/topics/topic-errori/topic-errori.component';
import { TopicQuizComponent } from '../components/topics/topic-quiz/topic-quiz.component';
import { TopicSbocchiComponent } from '../components/topics/topic-sbocchi/topic-sbocchi.component';
import { TopicVitaComponent } from '../components/topics/topic-vita/topic-vita.component';
import { ORIENTATION_TOPICS } from '@constants';
import { TopicId } from '@types';

@Component({
  selector: 'app-orientation-page',
  standalone: true,
  imports: [
    RouterLink,
    TopicCorsoComponent,
    TopicQuizComponent,
    TopicComeFunzionaComponent,
    TopicVitaComponent,
    TopicSbocchiComponent,
    TopicErroriComponent,
  ],
  templateUrl: './orientation.page.html',
})
export class OrientationPage {
  readonly activeTopic = signal<TopicId | null>(null);

  readonly topics = ORIENTATION_TOPICS;

  readonly activeIndex = computed(() => this.topics.findIndex(t => t.id === this.activeTopic()));

  readonly hasPrev = computed(() => this.activeIndex() > 0);
  readonly hasNext = computed(() => this.activeIndex() < this.topics.length - 1);

  open(id: TopicId): void {
    this.activeTopic.set(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  close(): void {
    this.activeTopic.set(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prev(): void {
    const i = this.activeIndex();
    if (i > 0) {
      this.activeTopic.set(this.topics[i - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  next(): void {
    const i = this.activeIndex();
    if (i < this.topics.length - 1) {
      this.activeTopic.set(this.topics[i + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
