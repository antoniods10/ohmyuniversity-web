import {
  LucideTarget,
  LucideChartColumn,
  LucideLightbulb,
  LucideHandshake,
  LucideBuilding2,
  LucideUsers,
  LucideEye,
  LucideEuro,
  LucideUserPlus,
  LucideCircleQuestionMark,
} from '@lucide/angular';
import { PartnerBenefit, PartnerLink, Testimonial } from '@shared/types';

export const PARTNER_BENEFITS: PartnerBenefit[] = [
  {
    icon: LucideTarget,
    title: 'Audience universitaria reale',
    description:
      '120.000+ studenti attivi su 50+ atenei italiani. Non follower passivi - utenti che usano OhMyUniversity ogni settimana per la loro carriera universitaria.',
  },
  {
    icon: LucideChartColumn,
    title: 'Dati accademici verificati',
    description:
      'Sappiamo in quale corso è iscritto ogni studente, quanti CFU ha, in quale anno è. Il targeting si basa su dati reali, non dichiarazioni.',
  },
  {
    icon: LucideLightbulb,
    title: 'Contesto ad alta attenzione',
    description:
      'Raggiungi gli studenti mentre gestiscono la loro carriera - non mentre guardano meme. Il contesto fa la differenza sulla qualità dei contatti.',
  },
  {
    icon: LucideHandshake,
    title: 'Onboarding assistito',
    description:
      'Non sei solo. Il nostro team ti accompagna dalla prima email alla prima opportunità pubblicata. Nessuna competenza tecnica richiesta.',
  },
];

export const PARTNER_LINKS: PartnerLink[] = [
  {
    label: 'Cosa offriamo alle aziende',
    description: 'Scopri tutte le funzionalità disponibili per le aziende partner',
    url: '/business/offerta',
    icon: LucideBuilding2,
  },
  {
    label: 'Per i collettivi studenteschi',
    description: 'Associazioni, gruppi sportivi, liste studentesche - con sconto del 40%',
    url: '/business/collettivi',
    icon: LucideUsers,
  },
  {
    label: 'Come funziona la visibilità',
    description: 'Targeting, analytics e come le opportunità vengono mostrate agli studenti',
    url: '/business/visibilita',
    icon: LucideEye,
  },
  {
    label: 'Piani e prezzi',
    description: 'Da 9,90€/mese. 14 giorni di prova gratuita senza carta di credito',
    url: '/business/prezzi',
    icon: LucideEuro,
  },
  {
    label: 'Come creare un profilo',
    description: 'Il processo di onboarding guidato, passo dopo passo',
    url: '/business/contatti',
    icon: LucideUserPlus,
  },
  {
    label: 'FAQ Business',
    description: 'Domande frequenti su piani, fatturazione e funzionamento',
    url: '/business/faq',
    icon: LucideCircleQuestionMark,
  },
];

export const PARTNER_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Abbiamo trovato 3 stagisti in meno di due settimane. Il targeting per corso di laurea è stato determinante - zero candidature fuori target.',
    name: 'Giulia F.',
    role: 'HR Manager - startup tecnologica',
    initials: 'GF',
  },
  {
    quote:
      'Come collettivo universitario avevamo sempre difficoltà a comunicare con gli studenti fuori dal passaparola. OhMyUniversity ha cambiato le cose.',
    name: 'Marco T.',
    role: 'Presidente - associazione studentesca',
    initials: 'MT',
  },
];

export const PARTNER_STATS = [
  { value: '120k+', label: 'Studenti attivi' },
  { value: '50+', label: 'Atenei italiani' },
  { value: '78%', label: 'Retention settimanale' },
  { value: '4.8★', label: 'Rating medio app' },
];
