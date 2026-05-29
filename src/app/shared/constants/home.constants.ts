import { Feature, Review, Stat, StepHome } from '@types';

// home-stats.component.ts
export const HOME_STATS: Stat[] = [
  { value: '50+', label: 'Atenei italiani supportati' },
  { value: '120k+', label: 'Studenti attivi' },
  { value: '4.8★', label: 'Valutazione media' },
  { value: '98%', label: 'Uptime garantito' },
];

// home-reviews.component.ts
export const STAR_ARRAY = [1, 2, 3, 4, 5];

export const HOME_REVIEWS: Review[] = [
  {
    name: 'Giulia Marchetti',
    university: 'Università di Bologna',
    initials: 'GM',
    text: "Finalmente un'app che aggrega tutto in un posto. Non devo più entrare in dieci portali diversi per trovare quello che mi serve.",
    rating: 5,
  },
  {
    name: 'Lorenzo Esposito',
    university: 'Politecnico di Milano',
    initials: 'LE',
    text: 'Il calcolo automatico della media mi ha salvato la vita. Sapevo sempre esattamente cosa mi serviva per raggiungere i miei obiettivi.',
    rating: 5,
  },
  {
    name: 'Sara Conti',
    university: 'Università di Roma La Sapienza',
    initials: 'SC',
    text: 'Le notifiche in tempo reale sono comodissime. Ho smesso di perdere le scadenze delle domande di laurea.',
    rating: 5,
  },
];

// home-how-it-works.component.ts
export const HOME_STEPS: StepHome[] = [
  {
    number: 1,
    title: 'Scegli il tuo ateneo',
    description: 'Cerca la tua università tra i 50+ atenei supportati.',
  },
  {
    number: 2,
    title: 'Accedi con le tue credenziali',
    description: 'Login sicuro SSO - usiamo le credenziali del tuo ateneo, senza nuove password.',
  },
  {
    number: 3,
    title: 'Hai tutto sotto controllo',
    description: 'La tua dashboard è pronta con esami, piano di studi e statistiche aggiornate.',
  },
];

// home-features.component.ts
export const HOME_FEATURES: Feature[] = [
  {
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    title: 'Gestione esami',
    description:
      "Tieni traccia di tutti i tuoi esami, voti e crediti in un'unico posto. Calcolo automatico della media ponderata.",
  },
  {
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    title: 'Piano di studi',
    description:
      'Visualizza e organizza il tuo piano di studi. Scopri i prerequisiti e pianifica il percorso più efficiente.',
  },
  {
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    title: 'Notifiche in tempo reale',
    description:
      'Ricevi avvisi su scadenze, risultati degli esami e comunicazioni del tuo ateneo istantaneamente.',
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Statistiche personali',
    description:
      'Dashboard con grafici e analytics sulla tua carriera universitaria. Confronta i tuoi progressi nel tempo.',
  },
  {
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    title: 'Community studentesca',
    description:
      'Connettiti con altri studenti del tuo corso. Condividi appunti, esperienze e consigli utili.',
  },
  {
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    title: 'Accesso SSO universitario',
    description:
      'Login sicuro con le credenziali del tuo ateneo. Nessuna nuova password da ricordare.',
  },
];
