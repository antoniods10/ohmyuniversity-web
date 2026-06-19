import { WidgetDefinition, WidgetSize } from '@shared/types';

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

export const WIDGET_COLUMNS: Record<WidgetSize, number> = {
  small: 2,
  medium: 3,
  large: 6,
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
