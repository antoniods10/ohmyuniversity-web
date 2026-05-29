import { TeamMember, TeamValue } from '@types';

export const ABOUT_ORG_STATS = [
  { value: '6', label: 'Contributori attivi' },
  { value: '100%', label: 'Open source' },
  { value: '1', label: 'Progetto attivo' },
  { value: '50+', label: 'Atenei supportati' },
] as const;

export const ABOUT_TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Luca',
    initials: 'L',
    role: 'Product Owner & Founder',
    bio: "Ha avuto l'idea di OhMyUniversity dopo anni di frustrazione con i portali universitari. Coordina la visione del prodotto e il rapporto con la community open source.",
  },
  {
    name: 'Francesco',
    initials: 'F',
    role: 'Full Stack Developer',
    bio: "Appassionato di architetture pulite e codice manutenibile. Lavora sul backend e sull'integrazione con i sistemi SSO degli atenei italiani.",
  },
  {
    name: 'Luca',
    initials: 'L',
    role: 'Frontend Developer',
    bio: "Specializzato in Angular e UX. Si assicura che ogni interazione sia fluida e accessibile, con un occhio di riguardo per l'esperienza mobile.",
  },
  {
    name: 'Vittorio',
    initials: 'V',
    role: 'Backend Developer',
    bio: "Esperto di API Gateway e sistemi distribuiti. Progetta l'infrastruttura che permette a OhMyUniversity di scalare su decine di atenei.",
  },
  {
    name: 'Antonio',
    initials: 'A',
    role: 'DevOps & Infrastructure',
    bio: 'Gestisce pipeline CI/CD, deployment e monitoring. Garantisce il 98% di uptime che promettiamo agli studenti.',
  },
  {
    name: 'Alessio',
    initials: 'Al',
    role: 'UI/UX Designer',
    bio: 'Trasforma i requisiti in interfacce intuitive. Ha ridisegnato il modo in cui gli studenti interagiscono con i dati universitari.',
  },
];

export const ABOUT_VALUES: TeamValue[] = [
  {
    title: 'Open source di default',
    description:
      'Il codice è pubblico, la community è aperta. Chiunque può contribuire, segnalare problemi o proporre nuove funzionalità.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  {
    title: 'Privacy prima di tutto',
    description:
      'Non vendiamo dati. Non tracciamo comportamenti per pubblicità. Le tue informazioni universitarie restano tue.',
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  },
  {
    title: 'Studenti al centro',
    description:
      "Ogni decisione di prodotto parte dall'esperienza reale degli studenti. Siamo stati studenti anche noi - sappiamo cosa non funziona.",
    icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  },
];
