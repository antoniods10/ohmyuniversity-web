import {
  LucideBookOpen,
  LucideBell,
  LucideChartNoAxesColumn,
  LucideUsers,
  LucideLock,
  LucideCalendarDays,
} from '@lucide/angular';
import { Feature, Review, Stat, StepHome } from '@types';

// home-stats.component.ts
export const HOME_STATS: Stat[] = [
  { value: '50+', label: 'Atenei italiani supportati' },
  { value: '120k+', label: 'Studenti attivi' },
  { value: '4.8★', label: 'Valutazione media' },
  { value: '98%', label: 'Uptime garantito' },
];

// home-reviews.component.ts
export const HOME_REVIEWS: Review[] = [
  {
    name: 'Giulia Marchetti',
    university: 'Università di Bologna',
    text: "Finalmente un'app che aggrega tutto in un posto. Non devo più entrare in dieci portali diversi per trovare quello che mi serve.",
    rating: 5,
  },
  {
    name: 'Lorenzo Esposito',
    university: 'Politecnico di Milano',
    text: 'Il calcolo automatico della media mi ha salvato la vita. Sapevo sempre esattamente cosa mi serviva per raggiungere i miei obiettivi.',
    rating: 5,
  },
  {
    name: 'Sara Conti',
    university: 'Università di Roma La Sapienza',
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
    icon: LucideBookOpen,
    variant: 'primary',
    title: 'Gestione esami',
    description:
      "Tieni traccia di tutti i tuoi esami, voti e crediti in un'unico posto. Calcolo automatico della media ponderata.",
  },
  {
    icon: LucideCalendarDays,
    variant: 'secondary',
    title: 'Piano di studi',
    description:
      'Visualizza e organizza il tuo piano di studi. Scopri i prerequisiti e pianifica il percorso più efficiente.',
  },
  {
    icon: LucideBell,
    variant: 'tertiary',
    title: 'Notifiche in tempo reale',
    description:
      'Ricevi avvisi su scadenze, risultati degli esami e comunicazioni del tuo ateneo istantaneamente.',
  },
  {
    icon: LucideChartNoAxesColumn,
    variant: 'info',
    title: 'Statistiche personali',
    description:
      'Dashboard con grafici e analytics sulla tua carriera universitaria. Confronta i tuoi progressi nel tempo.',
  },
  {
    icon: LucideUsers,
    variant: 'success',
    title: 'Community studentesca',
    description:
      'Connettiti con altri studenti del tuo corso. Condividi appunti, esperienze e consigli utili.',
  },
  {
    icon: LucideLock,
    variant: 'warning',
    title: 'Accesso SSO universitario',
    description:
      'Login sicuro con le credenziali del tuo ateneo. Nessuna nuova password da ricordare.',
  },
];
