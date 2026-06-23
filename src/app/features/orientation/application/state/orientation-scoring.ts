import { AreaId, CostTier, University, UniversityCourse } from '@types';
import { SavedAnswer } from './orientation.state';
import { UNIVERSITY_ORIENTATION_INFO, UNIVERSITIES } from '@constants';

/** Simple deterministic string hash (djb2 variant), used as a PRNG seed */
function hashAnswers(answers: SavedAnswer[]): number {
  const key = answers
    .map(a => `${a.questionId}:${a.value}`)
    .sort((a, b) => a.localeCompare(b))
    .join('|');

  let hash = 5381;
  for (const char of key) {
    hash = (hash * 33) ^ char.codePointAt(0)!;
  }
  return hash >>> 0; // force unsigned
}

/** Mulberry32 - small, fast, deterministic PRNG seeded from a number */
function createSeededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = Math.trunc(state);
    state = Math.trunc(state + 0x6d2b79f5);
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher-Yates shuffle using a seeded PRNG, so the result is reproducible for the same seed */
function seededShuffle<T>(items: T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

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

export interface AreaScoreResult {
  areaId: AreaId;
  label: string;
  percentage: number;
}

export interface UniversitySuggestion {
  university: University;
  matchReason: string;
  tuitionRange: string;
  relevantCourses: string[];
}

export interface AwarenessTip {
  titolo: string;
  testo: string;
}

export interface BudgetTip {
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
  budgetTips: BudgetTip[];
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

// Indicative living cost range per geographic area (rent + food + transport)
const MONTHLY_LIVING_COST_RANGE: Record<GeoArea, { min: number; max: number; label: string }> = {
  nord: { min: 750, max: 1050, label: '750–1.050 €/mese (affitto + vitto + trasporti)' },
  centro: { min: 600, max: 900, label: '600–900 €/mese (affitto + vitto + trasporti)' },
  sud: { min: 450, max: 700, label: '450–700 €/mese (affitto + vitto + trasporti)' },
};

// Approximate midpoint of each monthly budget bracket the student selected
const BUDGET_BRACKET_MIDPOINT: Record<string, number> = {
  'less-400': 300,
  '400-700': 550,
  '700-1000': 850,
  'more-1000': 1200,
};

function findAnswerValue(answers: SavedAnswer[], questionId: string): string | undefined {
  return answers.find(a => a.questionId === questionId)?.value;
}

function findAnswerLabel(answers: SavedAnswer[], questionId: string): string | null {
  return answers.find(a => a.questionId === questionId)?.label ?? null;
}

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

/**
 * Splits candidates into two groups - those strong in the dominant area and
 * the rest - so the dominant area can be given priority in the final order.
 * A candidate counts as "dominant" if its strongAreas includes the student's
 * #1 area, regardless of whether it also covers secondary areas.
 */
function partitionByDominantArea(
  candidates: UniversityCandidate[],
  dominantAreaId: AreaId,
): { dominant: UniversityCandidate[]; secondary: UniversityCandidate[] } {
  const dominant: UniversityCandidate[] = [];
  const secondary: UniversityCandidate[] = [];

  for (const candidate of candidates) {
    if (candidate.info.strongAreas.includes(dominantAreaId)) {
      dominant.push(candidate);
    } else {
      secondary.push(candidate);
    }
  }

  return { dominant, secondary };
}

/** Filters a university's courses down to only those matching the student's top areas */
function filterRelevantCourses(courses: UniversityCourse[], targetAreaIds: Set<AreaId>): string[] {
  return courses.filter(course => targetAreaIds.has(course.area)).map(course => course.name);
}

function buildUniversitySuggestions(
  answers: SavedAnswer[],
  topAreas: AreaScoreResult[],
  preferredGeoArea: GeoArea | null,
  acceptableCostTiers: CostTier[],
): UniversitySuggestion[] {
  const targetAreaIds = new Set(topAreas.map(a => a.areaId));
  const candidates = buildUniversityCandidates(targetAreaIds, acceptableCostTiers);

  // Shuffle deterministically before splitting by geo preference, so within
  // each group (geo-matched / others) the order varies by answer profile
  // instead of always reflecting the static declaration order in the constants file.
  const seed = hashAnswers(answers);
  const random = createSeededRandom(seed);
  const shuffled = seededShuffle(candidates, random);

  // Give priority to the student's #1 area: universities strong in the
  // dominant area come first, universities matching only secondary areas
  // come after. Geo preference is then applied *within* each group, so it
  // can reorder candidates of the same area-priority tier but never lets a
  // secondary-area university (even if geo-matched) outrank a dominant-area one.
  const { dominant, secondary } = partitionByDominantArea(shuffled, topAreas[0].areaId);
  const orderedDominant = orderCandidatesByGeoPreference(dominant, preferredGeoArea);
  const orderedSecondary = orderCandidatesByGeoPreference(secondary, preferredGeoArea);
  const ordered = [...orderedDominant, ...orderedSecondary];

  const dominantLabel = AREA_LABELS[topAreas[0].areaId];

  return ordered.slice(0, 5).map(({ university, info }) => {
    const relevantCourses = filterRelevantCourses(info.courses, targetAreaIds);
    return {
      university,
      matchReason: info.notes ?? `Forte nell'area ${dominantLabel}.`,
      tuitionRange: info.tuitionRange,
      relevantCourses: relevantCourses.length > 0 ? relevantCourses : info.courses.map(c => c.name),
    };
  });
}

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

/**
 * Compares the student's stated monthly budget bracket against the real cost
 * of living in their preferred geographic area, then gives a tailored tip.
 * Falls back to a generic savings-oriented tip when geographic preference
 * hasn't been given, since there's no concrete range to compare against.
 */
function buildBudgetTips(
  answers: SavedAnswer[],
  preferredGeoArea: GeoArea | null,
  acceptableCostTiers: CostTier[],
): BudgetTip[] {
  const tips: BudgetTip[] = [];

  const budgetValue = findAnswerValue(answers, 'budget-monthly');
  const availabilityValue = findAnswerValue(answers, 'budget-availability');

  if (!preferredGeoArea || !budgetValue) {
    tips.push({
      titolo: 'Stima i costi prima di scegliere la città',
      testo:
        "Una volta scelta l'area geografica, potremo confrontare il tuo budget con i costi reali di vita e darti un quadro più preciso.",
    });
    return tips;
  }

  const studentBudget = BUDGET_BRACKET_MIDPOINT[budgetValue] ?? 0;
  const livingCost = MONTHLY_LIVING_COST_RANGE[preferredGeoArea];

  if (studentBudget < livingCost.min) {
    tips.push({
      titolo: 'Il tuo budget potrebbe essere insufficiente per questa zona',
      testo: `Nella zona che hai scelto si spendono in media ${livingCost.label}. Valuta soluzioni come stanza condivisa, residenze universitarie o, se possibile, una borsa di studio DSU per coprire la differenza.`,
    });
  } else if (studentBudget <= livingCost.max) {
    tips.push({
      titolo: 'Il tuo budget è nella media per questa zona',
      testo: `Con la disponibilità indicata dovresti riuscire a coprire le spese base (${livingCost.label}), ma con margini ridotti. Tieni un fondo per spese impreviste come libri o materiale didattico.`,
    });
  } else {
    tips.push({
      titolo: 'Hai un buon margine di disponibilità',
      testo: `Il tuo budget è superiore alla media della zona (${livingCost.label}). Potresti permetterti una sistemazione più comoda o atenei con tasse leggermente più alte se offrono un corso più adatto a te.`,
    });
  }

  if (availabilityValue === 'support') {
    tips.push({
      titolo: 'Valuta le borse di studio DSU',
      testo:
        "Hai indicato di avere bisogno di supporto esterno: verifica subito i requisiti ISEE per la borsa di studio regionale, spesso copre anche l'alloggio in residenza universitaria.",
    });
  }

  if (acceptableCostTiers.length === 1 && acceptableCostTiers[0] === 'basso') {
    tips.push({
      titolo: 'Considera anche gli atenei statali con ISEE basso',
      testo:
        "Con un ISEE contenuto, molti atenei statali azzerano le tasse universitarie. Controlla sempre il simulatore tasse del sito dell'ateneo prima di scartare un'opzione per il costo.",
    });
  }

  return tips;
}

/**
 * Computes the full orientation result from the list of saved answers.
 * Pure function - no side effects, easy to test and to call from the state service.
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
    answers,
    topAreas,
    preferredGeoArea,
    acceptableCostTiers,
  );
  const awarenessTips = buildAwarenessTips(answers);
  const budgetTips = buildBudgetTips(answers, preferredGeoArea, acceptableCostTiers);

  const estimatedMonthlyBudget = preferredGeoArea
    ? MONTHLY_LIVING_COST_RANGE[preferredGeoArea].label
    : null;

  return {
    topAreas,
    dominantArea,
    suggestedUniversities,
    awarenessTips,
    estimatedMonthlyBudget,
    geoPreferenceLabel,
    budgetTips,
  };
}
