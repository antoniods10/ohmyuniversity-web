import { Injectable, computed, signal } from '@angular/core';
import { TopicId } from '../domain/models/topic.model';
import { QuizAnswer } from '../domain/models/quiz-answer.model';
import { AreaId, AreaScore, OrientationResult } from '../domain/models/orientation-result.model';

// ---------------------------------------------------------------------------
// Tabella pesi: ogni risposta (questionId + value) incrementa il punteggio
// di una o più aree. I pesi sono additivi e verranno normalizzati su 100.
// ---------------------------------------------------------------------------

type WeightMap = Partial<Record<AreaId, number>>;
type AnswerWeights = Record<string, WeightMap>; // key: `${questionId}:${value}`

const ANSWER_WEIGHTS: AnswerWeights = {
  // --- corso-area: l'utente sceglie l'area che lo attira ---
  'corso-area:umanistica':   { umanistica: 5 },
  'corso-area:scientifica':  { scientifica: 5 },
  'corso-area:ingegneria':   { ingegneria: 5 },
  'corso-area:economica':    { economica: 5 },
  'corso-area:sanitaria':    { sanitaria: 5 },
  'corso-area:artistica':    { artistica: 5 },

  // --- quiz-corso-in-mente: ha già un corso in mente ---
  // neutro sulle aree, influenza solo la completezza
  'quiz-corso-in-mente:si':  {},
  'quiz-corso-in-mente:no':  {},

  // --- come-funziona-esami: preferenza tipo esame ---
  // orale → umanistica/giuridica; scritto → ingegneria/economica
  'come-funziona-esami:orale':   { umanistica: 2, economica: 1 },
  'come-funziona-esami:scritto': { ingegneria: 2, economica: 2, scientifica: 1 },
  'come-funziona-esami:misto':   {},

  // --- vita-fuorisede: disposto ad andare fuori sede ---
  // fuori sede apre atenei più specializzati (ingegneria, medicina)
  'vita-fuorisede:si':      { ingegneria: 1, sanitaria: 1, scientifica: 1 },
  'vita-fuorisede:no':      {},
  'vita-fuorisede:forse':   {},

  // --- sbocchi-stipendio: importanza dello stipendio atteso (scala 1-5) ---
  // peso alto → aree con stipendi più elevati
  'sbocchi-stipendio:1':    { umanistica: 1, artistica: 1 },
  'sbocchi-stipendio:2':    { umanistica: 1, artistica: 1 },
  'sbocchi-stipendio:3':    { economica: 1, scientifica: 1 },
  'sbocchi-stipendio:4':    { ingegneria: 2, economica: 2, sanitaria: 1 },
  'sbocchi-stipendio:5':    { ingegneria: 3, sanitaria: 2, economica: 2 },

  // --- errori-confronto: ha già parlato con studenti universitari ---
  // neutro sulle aree
  'errori-confronto:si':    {},
  'errori-confronto:no':    {},

  // --- borse-isee: fascia ISEE familiare ---
  // non influenza l'area consigliata, serve solo per il campo fasciaIsee nel risultato
  'borse-isee:sotto-15k':   {},
  'borse-isee:15-30k':      {},
  'borse-isee:sopra-30k':   {},
  'borse-isee:non-so':      {},

  // --- costi-trasferimento: disposto a trasferirsi per studiare ---
  // simile a vita-fuorisede, rinforza aree con atenei specializzati
  'costi-trasferimento:si':       { ingegneria: 1, sanitaria: 1, scientifica: 1 },
  'costi-trasferimento:no':       {},
  'costi-trasferimento:dipende':  {},
};

// ---------------------------------------------------------------------------
// Metadati delle aree — usati per costruire AreaScore nel risultato
// ---------------------------------------------------------------------------

const AREA_META: Record<AreaId, { label: string; emoji: string }> = {
  umanistica:  { label: 'Umanistica',              emoji: '📚' },
  scientifica: { label: 'Scientifica',             emoji: '🔬' },
  ingegneria:  { label: 'Ingegneria & Informatica', emoji: '💻' },
  economica:   { label: 'Economica & Giuridica',   emoji: '⚖️' },
  sanitaria:   { label: 'Sanitaria',               emoji: '🏥' },
  artistica:   { label: 'Artistica & del Design',  emoji: '🎨' },
};

// ---------------------------------------------------------------------------
// Topic obbligatori per la validazione (devono avere almeno una risposta)
// ---------------------------------------------------------------------------

const REQUIRED_TOPICS: TopicId[] = [
  'corso',
  'vita',
  'sbocchi',
  'borse-studio',
  'costi-geografici',
];

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

@Injectable({ providedIn: 'root' })
export class OrientationStateService {
  // --- State ---
  readonly answers = signal<QuizAnswer[]>([]);
  readonly completedTopics = signal<Set<TopicId>>(new Set());
  readonly userMode = signal<'flow' | 'standalone'>('flow');

  // --- Derived ---
  readonly missingTopics = computed<TopicId[]>(() => {
    const answered = new Set(this.answers().map(a => a.topicId));
    return REQUIRED_TOPICS.filter(id => !answered.has(id));
  });

  readonly isReadyToSubmit = computed<boolean>(() => this.missingTopics().length === 0);

  // --- Mutations ---

  setAnswer(answer: QuizAnswer): void {
    this.answers.update(current => {
      const filtered = current.filter(a => a.questionId !== answer.questionId);
      return [...filtered, answer];
    });
  }

  markTopicComplete(topicId: TopicId): void {
    this.completedTopics.update(current => {
      const next = new Set(current);
      next.add(topicId);
      return next;
    });
  }

  setUserMode(mode: 'flow' | 'standalone'): void {
    this.userMode.set(mode);
  }

  reset(): void {
    this.answers.set([]);
    this.completedTopics.set(new Set());
    this.userMode.set('flow');
  }

  // --- Scoring ---

  computeResult(): OrientationResult | null {
    if (!this.isReadyToSubmit()) return null;

    const scores: Record<AreaId, number> = {
      umanistica: 0,
      scientifica: 0,
      ingegneria: 0,
      economica: 0,
      sanitaria: 0,
      artistica: 0,
    };

    // Accumula i pesi per ogni risposta data
    for (const answer of this.answers()) {
      const key = `${answer.questionId}:${answer.value}`;
      const weights = ANSWER_WEIGHTS[key];
      if (!weights) continue;
      for (const [areaId, weight] of Object.entries(weights) as [AreaId, number][]) {
        scores[areaId] += weight;
      }
    }

    // Normalizza su 100
    const total = Object.values(scores).reduce((sum, s) => sum + s, 0);
    const normalized: Record<AreaId, number> = { ...scores };
    if (total > 0) {
      for (const areaId of Object.keys(scores) as AreaId[]) {
        normalized[areaId] = Math.round((scores[areaId] / total) * 100);
      }
    }

    // Costruisce AreaScore[] ordinato per score desc
    const topAreas: AreaScore[] = (Object.keys(normalized) as AreaId[])
      .map(areaId => ({
        areaId,
        label: AREA_META[areaId].label,
        emoji: AREA_META[areaId].emoji,
        score: normalized[areaId],
      }))
      .sort((a, b) => b.score - a.score);

    // Estrae campi contestuali dalle risposte
    const fuoriSedeAnswer = this.answers().find(
      a => a.questionId === 'vita-fuorisede' || a.questionId === 'costi-trasferimento',
    );
    const fuoriSede = fuoriSedeAnswer?.value === 'si';

    const iseeAnswer = this.answers().find(a => a.questionId === 'borse-isee');
    const fasciaIsee = iseeAnswer?.value ?? null;

    return {
      topAreas,
      dominantArea: topAreas[0],
      fuoriSede,
      fasciaIsee,
      completedAt: new Date(),
    };
  }
}
