import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopicCorsoComponent } from '../components/topics/topic-corso/topic-corso.component';
import { TopicComeFunzionaComponent } from '../components/topics/topic-come-funziona/topic-come-funziona.component';
import { TopicErroriComponent } from '../components/topics/topic-errori/topic-errori.component';
import { TopicQuizComponent } from '../components/topics/topic-quiz/topic-quiz.component';
import { TopicSbocchiComponent } from '../components/topics/topic-sbocchi/topic-sbocchi.component';
import { TopicVitaComponent } from '../components/topics/topic-vita/topic-vita.component';

export type TopicId = 'corso' | 'quiz' | 'come-funziona' | 'vita' | 'sbocchi' | 'errori';

interface TopicMeta {
  id: TopicId;
  title: string;
  subtitle: string;
}

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

  readonly topics: TopicMeta[] = [
    {
      id: 'corso',
      title: 'Scegli il corso adatto a te',
      subtitle: 'Materie, aree, sedi - come orientarsi',
    },
    {
      id: 'quiz',
      title: 'Quiz e Autovalutazione',
      subtitle: "TOLC, test d'ingresso e autovalutazione",
    },
    {
      id: 'come-funziona',
      title: "Come funziona l'università",
      subtitle: 'CFU, esami, sessioni e autonomia',
    },
    {
      id: 'vita',
      title: 'Vita universitaria concreta',
      subtitle: 'Orari, studio, fuori sede e costi reali',
    },
    {
      id: 'sbocchi',
      title: 'Sbocchi lavorativi reali',
      subtitle: 'Occupazione e stipendi per area di studio',
    },
    {
      id: 'errori',
      title: 'Errori comuni da evitare',
      subtitle: 'Le trappole in cui cadono quasi tutti',
    },
  ];

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
