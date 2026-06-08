import {
  LucideCodeXml,
  LucideUsers,
  LucideShield,
  LucideHeart,
  LucideZap,
  LucideGlobe,
} from '@lucide/angular';
import { TeamMember, TeamValue } from '@types';

export const ABOUT_ORG_STATS = [
  { value: '4', label: 'Contributori attivi' },
  { value: '100%', label: 'Open source' },
  { value: '1', label: 'Progetto attivo' },
  { value: '50+', label: 'Atenei supportati' },
] as const;

export const ABOUT_TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Luca',
    initials: 'L',
    avatarSrc: 'https://www.github.com/Luxauram.png',
    role: 'Product Owner & Founder',
    bio: "Ha avuto l'idea di OhMyUniversity dopo anni di frustrazione con i portali universitari. Coordina la visione del prodotto e il rapporto con la community open source.",
  },
  {
    name: 'Vittorio',
    initials: 'V',
    avatarSrc: 'https://www.github.com/VittorioDiPalma.png',
    role: 'Backend Developer',
    bio: "Esperto di API Gateway e sistemi distribuiti. Progetta l'infrastruttura che permette a OhMyUniversity di scalare su decine di atenei.",
  },
  {
    name: 'Alessio',
    initials: 'Al',
    avatarSrc: 'https://www.github.com/alessiodlm.png',
    role: 'UI/UX Designer',
    bio: 'Trasforma i requisiti in interfacce intuitive. Ha ridisegnato il modo in cui gli studenti interagiscono con i dati universitari.',
  },
  {
    name: 'Antonio',
    initials: 'A',
    avatarSrc: 'https://www.github.com/antoniods10.png',
    role: 'DevOps & Infrastructure',
    bio: 'Gestisce pipeline CI/CD, deployment e monitoring. Garantisce il 98% di uptime che promettiamo agli studenti.',
  },
];

export const ABOUT_VALUES: TeamValue[] = [
  {
    icon: LucideCodeXml,
    variant: 'primary',
    title: 'Open Source',
    description:
      'Tutto il codice è pubblico. Crediamo nella trasparenza e nella collaborazione aperta.',
  },
  {
    icon: LucideUsers,
    variant: 'secondary',
    title: 'Community first',
    description:
      'Le decisioni di prodotto nascono dalla community. Gli studenti guidano lo sviluppo.',
  },
  {
    icon: LucideShield,
    variant: 'success',
    title: 'Privacy by design',
    description: 'I tuoi dati universitari rimangono tuoi. Zero tracking, zero vendita di dati.',
  },
  {
    icon: LucideHeart,
    variant: 'tertiary',
    title: 'Accessibilità',
    description:
      'Strumenti utili devono essere accessibili a tutti, indipendentemente dalle capacità.',
  },
  {
    icon: LucideZap,
    variant: 'warning',
    title: 'Semplicità',
    description: 'Interfacce pulite e intuitive. Se serve un manuale, abbiamo fallito.',
  },
  {
    icon: LucideGlobe,
    variant: 'info',
    title: 'Impatto reale',
    description: 'Costruiamo solo cose che risolvono problemi reali per studenti reali.',
  },
];
