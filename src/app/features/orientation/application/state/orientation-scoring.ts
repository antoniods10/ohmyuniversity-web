import { AreaId, CostTier, University } from '@types';
import { SavedAnswer } from './orientation.state';
import { UNIVERSITY_ORIENTATION_INFO, UNIVERSITIES } from '@constants';

// ============================================================================
// Weight tables — how much each answer pushes towards each study area
// ============================================================================

/**
 * Per-question weight tables. Each key is "questionId:value" and maps to a
 * partial score addition per area. Questions not listed here don't affect
 * area scoring (e.g. logistics/awareness questions).
 *
 * Weights are intentionally uneven: the core 'corso-area' question carries
 * by far the most weight since it's a direct, explicit signal. Other answers
 * act as secondary nudges that can shift a close call between two areas.
 */
const AREA_WEIGHTS: Record<string, Partial<Record<AreaId, number>>> = {
  // --- corso: direct, dominant signal ---
  'corso-area:umanistica': { umanistica: 10 },
  'corso-area:scientifica': { scientifica: 10 },
  'corso-area:ingegneria': { ingegneria: 10 },
  'corso-area:economica': { economica: 10 },
  'corso-area:sanitaria': { sanitaria: 10 },
  'corso-area:artistica': { artistica: 10 },

  // --- quiz: access type doesn't push areas, TOLC type is a secondary signal ---
  'quiz-tolc-type:tolc-med': { sanitaria: 4 },
  'quiz-tolc-type:tolc-i': { ingegneria: 4 },
  'quiz-tolc-type:tolc-e': { economica: 4 },
  'quiz-tolc-type:tolc-s': { scientifica: 4 },
  'quiz-tolc-type:tolc-su': { umanistica: 4 },
  'quiz-tolc-type:tolc-f': { sanitaria: 3 },

  // --- come-funziona: study/exam style nudges ---
  'come-funziona-esami:oral': { umanistica: 2, economica: 1 },
  'come-funziona-esami:written': { ingegneria: 2, scientifica: 2, economica: 1 },

  // --- sbocchi: career priority is a meaningful secondary signal ---
  'sbocchi-career-priority:stability': { sanitaria: 2, ingegneria: 1, economica: 1 },
  'sbocchi-career-priority:growth': { economica: 2, ingegneria: 2 },
  'sbocchi-career-priority:passion': { umanistica: 2, artistica: 2 },
  'sbocchi-career-priority:impact': { sanitaria: 2, umanistica: 1 },

  'sbocchi-work-context:big-company': { ingegneria: 1, economica: 1 },
  'sbocchi-work-context:startup': { ingegneria: 1, economica: 1 },
  'sbocchi-work-context:public': { umanistica: 1, sanitaria: 1 },
  'sbocchi-work-context:freelance': { artistica: 2, umanistica: 1 },
};

// ============================================================================
// Awareness scoring — for the topic-errori questions
// ============================================================================

/** Maps each answer of the 4 awareness questions to a +1/0/-1 awareness point */
const AWARENESS_POINTS: Record<string, number> = {
  'errori-confidence:very-sure': 2,
  'errori-confidence:fairly-sure': 1,
  'errori-confidence:unsure': 0,
  'errori-confidence:confused': -1,

  'errori-info-source:teachers': 1,
  'errori-info-source:internet': 0,
  'errori-info-source:family': 0,
  'errori-info-source:friends': -1,
  'errori-info-source:alone': 0,

  'errori-talked-to-students:yes': 2,
  'errori-talked-to-students:no': -1,

  'errori-study-plan-check:thoroughly': 2,
  'errori-study-plan-check:briefly': 0,
  'errori-study-plan-check:no': -1,
};

// ============================================================================
// Result types
// ============================================================================

export interface AreaScoreResult {
  areaId: AreaId;
  label: string;
  percentage: number;
}

export interface UniversitySuggestion {
  university: University;
  matchReason: string;
}

export interface AwarenessTip {
  titolo: string;
  testo: string;
}

export interface OrientationResult {
  topAreas: AreaScoreResult[];
  dominantArea: AreaScoreResult;
  suggestedUniversities: UniversitySuggestion[];
  awarenessTips: AwarenessTip[];
  estimatedMonthlyBudget: string | null;
  geoPreferenceLabel: string | null;
}

type GeoArea = 'nord' | 'centro' | 'sud';

const AREA_LABELS: Record<AreaId, string> = {
  umanistica: 'Umanistica',
  scientifica: 'Scientifica',
  ingegneria: 'Ingegneria & Informatica',
  economica: 'Economica & Giuridica',
  sanitaria: 'Sanitaria',
  artistica: 'Artistica & del Design',
};

const ALL_AREAS: AreaId[] = [
  'umanistica',
  'scientifica',
  'ingegneria',
  'economica',
  'sanitaria',
  'artistica',
];

// ============================================================================
// Geographic + budget helpers
// ============================================================================

const NORTH_CITIES = new Set([
  'Milano',
  'Torino',
  'Bologna',
  'Padova',
  'Genova',
  'Brescia',
  'Bergamo',
  'Venezia',
  'Parma',
  'Ferrara',
  'Modena',
  'Trieste',
]);

const CENTER_CITIES = new Set([
  'Roma',
  'Firenze',
  'Pisa',
  'Perugia',
  'Urbino',
  'Siena',
  'Ancona',
  'Macerata',
]);

// Everything else defaults to South/Islands for this simplified mapping
function getCityArea(city: string): GeoArea {
  if (NORTH_CITIES.has(city)) return 'nord';
  if (CENTER_CITIES.has(city)) return 'centro';
  return 'sud';
}

const BUDGET_COST_TIERS: Record<string, CostTier[]> = {
  'less-400': ['basso'],
  '400-700': ['basso', 'medio'],
  '700-1000': ['medio', 'alto'],
  'more-1000': ['basso', 'medio', 'alto'],
};
const DEFAULT_COST_TIERS: CostTier[] = ['basso', 'medio', 'alto'];

function budgetToCostTiers(value: string | null): CostTier[] {
  if (!value) return DEFAULT_COST_TIERS;
  return BUDGET_COST_TIERS[value] ?? DEFAULT_COST_TIERS;
}

const GEO_PREFERENCE_VALUES = new Set<string>(['nord', 'centro', 'sud']);

function geoPreferenceToArea(value: string | null): GeoArea | null {
  if (value && GEO_PREFERENCE_VALUES.has(value)) return value as GeoArea;
  return null;
}

const MONTHLY_BUDGET_ESTIMATES: Record<GeoArea, string> = {
  nord: '750–1.050 €/mese (affitto + vitto + trasporti)',
  centro: '600–900 €/mese (affitto + vitto + trasporti)',
  sud: '450–700 €/mese (affitto + vitto + trasporti)',
};

function findAnswerValue(answers: SavedAnswer[], questionId: string): string | undefined {
  return answers.find(a => a.questionId === questionId)?.value;
}

function findAnswerLabel(answers: SavedAnswer[], questionId: string): string | null {
  return answers.find(a => a.questionId === questionId)?.label ?? null;
}

// ============================================================================
// Step 1 — Area scoring
// ============================================================================

/** Computes raw area scores from the weight table, then converts to percentages */
function computeAreaScores(answers: SavedAnswer[]): AreaScoreResult[] {
  const scores: Record<AreaId, number> = {
    umanistica: 0,
    scientifica: 0,
    ingegneria: 0,
    economica: 0,
    sanitaria: 0,
    artistica: 0,
  };

  for (const answer of answers) {
    const key = `${answer.questionId}:${answer.value}`;
    const weights = AREA_WEIGHTS[key];
    if (!weights) continue;
    for (const [areaId, weight] of Object.entries(weights) as [AreaId, number][]) {
      scores[areaId] += weight;
    }
  }

  const total = Object.values(scores).reduce((sum, s) => sum + s, 0);
  const percentages: Record<AreaId, number> = { ...scores };
  if (total > 0) {
    for (const areaId of ALL_AREAS) {
      percentages[areaId] = Math.round((scores[areaId] / total) * 100);
    }
  }

  return ALL_AREAS.map(areaId => ({
    areaId,
    label: AREA_LABELS[areaId],
    percentage: percentages[areaId],
  })).sort((a, b) => b.percentage - a.percentage);
}

// ============================================================================
// Step 2 — University suggestions
// ============================================================================

interface UniversityCandidate {
  university: University;
  info: (typeof UNIVERSITY_ORIENTATION_INFO)[number];
}

function isAreaMatch(infoAreas: AreaId[], targetAreas: Set<AreaId>): boolean {
  return infoAreas.some(area => targetAreas.has(area));
}

function buildUniversityCandidates(
  targetAreaIds: Set<AreaId>,
  acceptableCostTiers: CostTier[],
): UniversityCandidate[] {
  const candidates: UniversityCandidate[] = [];

  for (const info of UNIVERSITY_ORIENTATION_INFO) {
    if (!isAreaMatch(info.strongAreas, targetAreaIds)) continue;
    if (!acceptableCostTiers.includes(info.costTier)) continue;

    const university = UNIVERSITIES.find(u => u.id === info.universityId);
    if (university) candidates.push({ university, info });
  }

  return candidates;
}

function orderCandidatesByGeoPreference(
  candidates: UniversityCandidate[],
  preferredGeoArea: GeoArea | null,
): UniversityCandidate[] {
  if (!preferredGeoArea) return candidates;

  const geoMatched: UniversityCandidate[] = [];
  const others: UniversityCandidate[] = [];

  for (const candidate of candidates) {
    if (getCityArea(candidate.university.city) === preferredGeoArea) {
      geoMatched.push(candidate);
    } else {
      others.push(candidate);
    }
  }

  return [...geoMatched, ...others];
}

function buildUniversitySuggestions(
  topAreas: AreaScoreResult[],
  preferredGeoArea: GeoArea | null,
  acceptableCostTiers: CostTier[],
): UniversitySuggestion[] {
  const targetAreaIds = new Set(topAreas.map(a => a.areaId));
  const candidates = buildUniversityCandidates(targetAreaIds, acceptableCostTiers);
  const ordered = orderCandidatesByGeoPreference(candidates, preferredGeoArea);
  const dominantLabel = AREA_LABELS[topAreas[0].areaId];

  return ordered.slice(0, 5).map(({ university, info }) => ({
    university,
    matchReason: info.notes ?? `Forte nell'area ${dominantLabel}.`,
  }));
}

// ============================================================================
// Step 3 — Awareness tips
// ============================================================================

function computeAwarenessScore(answers: SavedAnswer[]): number {
  let score = 0;
  for (const answer of answers) {
    const key = `${answer.questionId}:${answer.value}`;
    if (key in AWARENESS_POINTS) score += AWARENESS_POINTS[key];
  }
  return score;
}

function buildAwarenessTips(answers: SavedAnswer[]): AwarenessTip[] {
  const tips: AwarenessTip[] = [];

  const confidence = findAnswerValue(answers, 'errori-confidence');
  const talkedToStudents = findAnswerValue(answers, 'errori-talked-to-students');
  const studyPlanChecked = findAnswerValue(answers, 'errori-study-plan-check');
  const awarenessScore = computeAwarenessScore(answers);

  const isLowConfidence = confidence === 'confused' || confidence === 'unsure';

  tips.push(
    isLowConfidence
      ? {
          titolo: 'Prenditi del tempo prima di decidere',
          testo:
            'Sentirsi incerti a questo punto è normale. Prova a parlare con un orientatore scolastico o a fare un test di orientamento più approfondito prima della scadenza di iscrizione.',
        }
      : {
          titolo: 'Hai le idee abbastanza chiare',
          testo:
            'Ottimo punto di partenza. Usa questa sicurezza per approfondire i dettagli pratici: piano di studi, sbocchi, costi reali del corso che hai in mente.',
        },
  );

  if (talkedToStudents === 'no') {
    tips.push({
      titolo: 'Parla con chi sta già frequentando il corso',
      testo:
        'È il consiglio più sottovalutato e quello con il maggiore impatto. Cerca gruppi Telegram o pagine social del corso che ti interessa prima di iscriverti.',
    });
  }

  if (studyPlanChecked === 'no' || studyPlanChecked === 'briefly') {
    tips.push({
      titolo: 'Leggi il piano di studi completo',
      testo:
        "Prima di iscriverti, controlla nel dettaglio tutti gli esami del primo anno sul sito dell'ateneo. Eviterai sorprese a metà semestre.",
    });
  }

  if (awarenessScore >= 5) {
    tips.push({
      titolo: 'Sei già ben preparato/a',
      testo:
        "Ti sei informato/a più della media. Mantieni questo approccio anche dopo l'iscrizione: continuerà a darti un vantaggio.",
    });
  }

  return tips;
}

// ============================================================================
// Main scoring function
// ============================================================================

/**
 * Computes the full orientation result from the list of saved answers.
 * Pure function — no side effects, easy to test and to call from the state service.
 */
export function computeOrientationResult(answers: SavedAnswer[]): OrientationResult {
  const sortedAreas = computeAreaScores(answers);
  const topAreas = sortedAreas.slice(0, 3);
  const dominantArea = topAreas[0];

  const geoPreferenceLabel = findAnswerLabel(answers, 'geo-area-preference');
  const preferredGeoArea = geoPreferenceToArea(
    findAnswerValue(answers, 'geo-area-preference') ?? null,
  );
  const acceptableCostTiers = budgetToCostTiers(findAnswerValue(answers, 'budget-monthly') ?? null);

  const suggestedUniversities = buildUniversitySuggestions(
    topAreas,
    preferredGeoArea,
    acceptableCostTiers,
  );
  const awarenessTips = buildAwarenessTips(answers);

  const estimatedMonthlyBudget = preferredGeoArea
    ? MONTHLY_BUDGET_ESTIMATES[preferredGeoArea]
    : null;

  return {
    topAreas,
    dominantArea,
    suggestedUniversities,
    awarenessTips,
    estimatedMonthlyBudget,
    geoPreferenceLabel,
  };
}
