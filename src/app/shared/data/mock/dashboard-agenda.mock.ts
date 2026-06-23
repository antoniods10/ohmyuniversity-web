export interface AgendaEvent {
  title: string;
  time: string;
  type: 'lezione' | 'esame' | 'scadenza' | 'altro';
  location?: string;
}

export const MOCK_TODAY_EVENTS: AgendaEvent[] = [
  { title: 'Fisica II', time: '08:30 - 10:30', type: 'lezione', location: 'Aula 3B' },
  {
    title: 'Analisi Matematica II',
    time: '11:00 - 13:00',
    type: 'lezione',
    location: 'Aula Magna',
  },
  { title: 'Consegna relazione', time: '23:59', type: 'scadenza' },
];

export const MOCK_MONTHLY_EVENTS: Record<number, AgendaEvent[]> = {
  3: [{ title: 'Fisica II', time: '08:30', type: 'lezione' }],
  5: [{ title: 'Analisi II', time: '11:00', type: 'lezione' }],
  10: [{ title: 'Esame Programmazione', time: '09:00', type: 'esame' }],
  15: [{ title: 'Scadenza piano studi', time: '23:59', type: 'scadenza' }],
  22: [{ title: 'Fisica II', time: '08:30', type: 'lezione' }],
  28: [{ title: 'Esame Algoritmi', time: '14:00', type: 'esame' }],
};

export const EVENT_TYPE_COLOR: Record<AgendaEvent['type'], string> = {
  lezione: 'var(--color-schedules-dark)',
  esame: 'var(--color-exams-dark)',
  scadenza: 'var(--color-secretariat-dark)',
  altro: 'var(--color-neutral-400)',
};
