import { WidgetDefinition, WidgetSizeConfig, WidgetSize } from '@shared/types';

export const MOTIVATIONAL_QUOTES: string[] = [
  'Ogni esame superato è un passo in più verso il tuo futuro.',
  'La costanza batte il talento quando il talento non si impegna.',
  'Non studiare per il voto, studia per te stesso.',
  'Un giorno alla volta. Un esame alla volta.',
  'Il successo è la somma di piccoli sforzi ripetuti ogni giorno.',
  'Anche il percorso più lungo inizia con un singolo passo.',
  'Sii curioso, non ansioso.',
  'Le difficoltà di oggi sono le competenze di domani.',
  'Ogni nota sul libretto racconta la tua storia.',
  'Studia come se dovessi vivere per sempre, vivi come se dovessi morire domani.',
];

export const GRID_COLS = 3;
export const GRID_ROWS = 10;

export const WIDGET_SIZE_CONFIG: Record<WidgetSize, WidgetSizeConfig> = {
  small: {
    cols: 1,
    rows: 1,
    label: 'Piccolo',
    description: '1 × 1 — compatto, ideale per info rapide',
  },
  medium: {
    cols: 2,
    rows: 2,
    label: 'Medio',
    description: '2 × 2 — bilanciato, mostra più dettagli',
  },
  large: {
    cols: 3,
    rows: 3,
    label: 'Grande',
    description: '3 × 3 — espanso, massimo dettaglio',
  },
};

export const AVAILABLE_WIDGETS: WidgetDefinition[] = [
  {
    id: 'next-exam',
    label: 'Prossimo appello',
    description: 'Mostra il prossimo appello a cui sei iscritto.',
    icon: 'calendar-check',
    availableSizes: ['small', 'medium'],
    defaultSize: 'small',
  },
  {
    id: 'grade-average',
    label: 'Media voti',
    description: 'Media aritmetica e ponderata aggiornata.',
    icon: 'bar-chart-2',
    availableSizes: ['small', 'medium'],
    defaultSize: 'small',
  },
  {
    id: 'messages',
    label: 'Messaggi recenti',
    description: 'Ultimi messaggi ricevuti dalla segreteria.',
    icon: 'mail',
    availableSizes: ['medium', 'large'],
    defaultSize: 'medium',
  },
  {
    id: 'schedule-today',
    label: 'Orario di oggi',
    description: "Le lezioni di oggi in un colpo d'occhio.",
    icon: 'clock',
    availableSizes: ['medium', 'large'],
    defaultSize: 'medium',
  },
  {
    id: 'cfu-progress',
    label: 'Avanzamento CFU',
    description: 'Quanti CFU hai accumulato sul totale.',
    icon: 'graduation-cap',
    availableSizes: ['small', 'medium', 'large'],
    defaultSize: 'medium',
  },
];
