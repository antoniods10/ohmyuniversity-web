import { CareerArea, CareerChartDataPoint, Consiglio } from '@types';

/** Employment outcome data (occupation rate + salary) for 6 macro study areas */
export const CAREER_AREAS: CareerArea[] = [
  { area: 'Ingegneria & Informatica', occupazione1anno: 85, stipendioMedio: '1.450-1.800 €' },
  { area: 'Economia & Management', occupazione1anno: 72, stipendioMedio: '1.200-1.500 €' },
  { area: 'Sanitaria & Medicina', occupazione1anno: 78, stipendioMedio: '1.400-2.100 €' },
  { area: 'Scientifica', occupazione1anno: 65, stipendioMedio: '1.200-1.600 €' },
  { area: 'Giuridica', occupazione1anno: 52, stipendioMedio: '1.000-1.400 €' },
  { area: 'Umanistica & Sociale', occupazione1anno: 48, stipendioMedio: '950-1.250 €' },
];

/** Practical tips on interpreting employment statistics */
export const CAREER_TIPS: Consiglio[] = [
  {
    titolo: 'I dati sono indicativi - il contesto conta',
    testo:
      'Un laureato in Lettere con esperienze, lingue e soft skills può guadagnare più di un laureato in Ingegneria senza iniziativa. I dati danno una media, non un destino.',
  },
  {
    titolo: 'Controlla AlmaLaurea prima di scegliere',
    testo:
      'AlmaLaurea è il database ufficiale italiano sugli esiti occupazionali dei laureati. Prima di iscriverti, cerca il tuo corso specifico: vedrai stipendi reali e tassi di occupazione per ateneo.',
  },
  {
    titolo: 'Magistrale vs Triennale nel mercato del lavoro',
    testo:
      'In molti settori tecnici la magistrale è quasi obbligatoria per accedere a posizioni senior. In altri (comunicazione, design, commerciale) la triennale con esperienze pratiche basta e avanza.',
  },
];

/** Default data for the career outlook bar chart */
export const SBOCCHI_CHART_DEFAULT_DATA: CareerChartDataPoint[] = [
  { area: 'Ingegneria & Informatica', occupazione: 85, colore: '#3b82f6' },
  { area: 'Economia & Management', occupazione: 72, colore: '#60a5fa' },
  { area: 'Sanitaria & Medicina', occupazione: 78, colore: '#2563eb' },
  { area: 'Scientifica', occupazione: 65, colore: '#93c5fd' },
  { area: 'Giuridica', occupazione: 52, colore: '#bfdbfe' },
  { area: 'Umanistica & Sociale', occupazione: 48, colore: '#dbeafe' },
];
