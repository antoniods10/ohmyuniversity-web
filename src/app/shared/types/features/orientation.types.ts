/** A generic title + body tip, reused across multiple topics */
export interface Consiglio {
  titolo: string;
  testo: string;
}

/** A single monthly living cost line item (rent, food, transport, etc.) */
export interface LivingCostItem {
  voce: string;
  importo: string;
}

/** Employment outcome data for a study area (occupation rate, salary) */
export interface CareerArea {
  area: string;
  occupazione1anno: number;
  stipendioMedio: string;
}

/** Data point for the career outlook bar chart */
export interface CareerChartDataPoint {
  area: string;
  occupazione: number;
  colore: string;
}

/** A TOLC entrance test with its subject areas and reference university */
export interface TolcTest {
  ateneo: string;
  corso: string;
  tipo: string;
  argomenti: string[];
  link: string;
}

/** A university access type (free, nationally restricted, locally restricted) */
export interface AccessType {
  id: string;
  title: string;
  description: string;
  examples: string[];
  note: string;
}

/** A common orientation mistake with its cause and a practical fix */
export interface CommonMistake {
  titolo: string;
  perche: string;
  soluzione: string;
}

/** Full detail version of a study area, used in the expandable accordion */
export interface ExtendedStudyArea {
  value: string;
  label: string;
  icon: any;
  iconVariant: string;
  descrizione: string;
  facolta: string[];
}

/** A single row comparing high school vs university on one aspect */
export interface SchoolVsUniversityDifference {
  aspetto: string;
  scuola: string;
  universita: string;
}

/** A type of university exam (written, oral, mixed, project) */
export interface ExamType {
  tipo: string;
  descrizione: string;
}

/** An exam session period (winter, summer, autumn) */
export interface ExamSession {
  label: string;
  periodo: string;
  note: string;
}

/** Data point for the CFU vs study hours bar chart */
export interface CfuDataPoint {
  anno: string;
  cfu: number;
  oreStudio: number;
}

/** A standout city for a specific category (career, savings, academics, etc.) */
export interface CittaTop {
  citta: string;
  area: 'Nord' | 'Centro' | 'Sud';
  categoria: string;
  motivo: string;
  badge: string;
  stats: string[];
}

/** Comparative ratings for a macro geographic area (Nord, Centro, Sud) */
export interface AreaGeoInfo {
  area: string;
  variant: string;
  voti: { aspetto: string; voto: number; descrizione: string }[];
}

/** Identifier for each of the 8 orientation topics */
export type TopicId =
  | 'corso'
  | 'quiz'
  | 'come-funziona'
  | 'vita'
  | 'sbocchi'
  | 'errori'
  | 'borse-studio'
  | 'costi-geografici';

/** Supported inline question input types */
export type QuestionType = 'single-select' | 'yes-no' | 'scale' | 'yes-no-maybe';

/** A single selectable answer for an inline question */
export interface InlineOption {
  value: string;
  label: string;
}

/** An inline question shown at the end of a topic, tied to a specific topic */
export interface InlineQuestion {
  id: string;
  topicId: TopicId;
  text: string;
  type: QuestionType;
  required: boolean;
  options?: InlineOption[];
  scaleMin?: number;
  scaleMax?: number;
}

/** A full orientation topic: title, subtitle and its inline questions */
export interface TopicModel {
  id: TopicId;
  title: string;
  subtitle: string;
  questions: InlineQuestion[];
}
