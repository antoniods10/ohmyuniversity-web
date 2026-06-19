import { Component, signal, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopicCorsoComponent } from '../components/topics/topic-corso/topic-corso.component';
import { TopicComeFunzionaComponent } from '../components/topics/topic-come-funziona/topic-come-funziona.component';
import { TopicErroriComponent } from '../components/topics/topic-errori/topic-errori.component';
import { TopicQuizComponent } from '../components/topics/topic-quiz/topic-quiz.component';
import { TopicSbocchiComponent } from '../components/topics/topic-sbocchi/topic-sbocchi.component';
import { TopicVitaComponent } from '../components/topics/topic-vita/topic-vita.component';
import { TopicBudgetComponent } from '../components/topics/topic-budget/topic-budget.component';
import { TopicCostiGeograficiComponent } from '../components/topics/topic-costi-geografici/topic-aree-geografiche.component';
import { OrientationSummaryComponent } from '../components/orientation-summary/orientation-summary.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CardNavComponent } from '@ui/custom-card/card-variants.component';
import { OrientationStateService } from '@orientation/application/state/orientation.state';
import { ORIENTATION_TOPICS } from '@constants';
import { TopicId } from '@types';
import { LucideClipboardList } from '@lucide/angular';

@Component({
  selector: 'app-orientation-page',
  standalone: true,
  imports: [
    RouterModule,
    TopicCorsoComponent,
    TopicQuizComponent,
    TopicComeFunzionaComponent,
    TopicVitaComponent,
    TopicSbocchiComponent,
    TopicErroriComponent,
    TopicBudgetComponent,
    TopicCostiGeograficiComponent,
    OrientationSummaryComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomTextComponent,
    CardNavComponent,
  ],
  templateUrl: './orientation.page.html',
})
export class OrientationPage {
  private readonly state = inject(OrientationStateService);

  readonly activeTopic = signal<TopicId | null>(null);
  readonly showSummary = signal<boolean>(false);
  readonly topics = ORIENTATION_TOPICS;
  readonly activeIndex = computed(() => this.topics.findIndex(t => t.id === this.activeTopic()));
  readonly hasPrev = computed(() => this.activeIndex() > 0);
  readonly hasNext = computed(() => this.activeIndex() < this.topics.length - 1);
  readonly answeredCount = this.state.answeredCount;
  readonly totalCount = this.state.totalQuestions;

  readonly iconSummary = LucideClipboardList;

  open(id: TopicId): void {
    this.showSummary.set(false);
    this.activeTopic.set(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  close(): void {
    this.activeTopic.set(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openSummary(): void {
    this.activeTopic.set(null);
    this.showSummary.set(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeSummary(): void {
    this.showSummary.set(false);
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
