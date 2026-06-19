import {
  SchoolVsUniversityDifference,
  ExamType,
  ExamSession,
  Consiglio,
  CfuDataPoint,
} from '@types';

/** Key differences between high school and university across 4 dimensions */
export const UNIVERSITY_VS_SCHOOL_DIFFERENCES: SchoolVsUniversityDifference[] = [
  {
    aspetto: 'Frequenza',
    scuola: 'Obbligatoria, controllata ogni giorno',
    universita: 'Spesso facoltativa - sei tu a scegliere',
  },
  {
    aspetto: 'Verifiche',
    scuola: "Continue, distribuite durante l'anno",
    universita: "Concentrate nelle sessioni d'esame",
  },
  {
    aspetto: 'Supporto',
    scuola: 'Prof. seguono ogni studente individualmente',
    universita: 'Autonomia totale - chiedi tu se hai bisogno',
  },
  {
    aspetto: 'Ritmo',
    scuola: "Scandito dall'istituto, poco flessibile",
    universita: 'Gestisci tu il piano e i tempi',
  },
];

/** The 4 main exam formats used at university */
export const EXAM_TYPES: ExamType[] = [
  {
    tipo: 'Scritto',
    descrizione:
      'Svolto in aula in un tempo definito. Può essere a risposta aperta, a scelta multipla o misto.',
  },
  {
    tipo: 'Orale',
    descrizione:
      'Colloquio con il docente. Valuta la comprensione profonda degli argomenti, non solo la memorizzazione.',
  },
  {
    tipo: 'Scritto + Orale',
    descrizione:
      "Prima si supera lo scritto (spesso con voto minimo), poi si sostiene l'orale per definire il voto finale.",
  },
  {
    tipo: 'Progetto / Elaborato',
    descrizione:
      'Comune nei corsi tecnici e del design. Si consegna un elaborato e spesso lo si discute davanti alla commissione.',
  },
];

/** The 3 exam session periods across the academic year */
export const EXAM_SESSIONS: ExamSession[] = [
  { label: 'Sessione invernale', periodo: 'Gennaio - Febbraio', note: 'Esami del primo semestre' },
  { label: 'Sessione estiva', periodo: 'Giugno - Luglio', note: 'Esami del secondo semestre' },
  { label: 'Sessione autunnale', periodo: 'Settembre', note: 'Recupero e straordinari' },
];

/** Practical tips for adapting to university's self-directed pace */
export const COME_FUNZIONA_TIPS: Consiglio[] = [
  {
    titolo: 'Costruisci una routine fin dal primo mese',
    testo:
      "I primi 30 giorni definiscono le abitudini per il resto dell'anno. Stabilisci subito orari fissi di studio, anche 2 ore al giorno dopo le lezioni fanno una differenza enorme a sessione.",
  },
  {
    titolo: 'Non aspettare la sessione per studiare',
    testo:
      "Chi studia in modo distribuito durante il semestre arriva agli esami con il 70% del materiale già consolidato. Chi aspetta l'ultima settimana parte già in svantaggio.",
  },
  {
    titolo: 'Chiedi aiuto prima che sia tardi',
    testo:
      'I ricevimenti dei professori esistono per questo. Se non capisci un argomento a ottobre, non aspettare gennaio per scoprirlo. La maggior parte degli studenti non usa mai i ricevimenti, tu fallo.',
  },
];

/** Default data for the CFU vs weekly study hours bar chart */
export const CFU_CHART_DEFAULT_DATA: CfuDataPoint[] = [
  { anno: '1° Anno', cfu: 60, oreStudio: 25 },
  { anno: '2° Anno', cfu: 60, oreStudio: 28 },
  { anno: '3° Anno', cfu: 60, oreStudio: 22 },
];
