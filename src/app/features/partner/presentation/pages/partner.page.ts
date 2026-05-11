import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PartnerBenefit {
  emoji: string;
  title: string;
  description: string;
}

interface PartnerLink {
  label: string;
  description: string;
  path: string;
  icon: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

@Component({
  selector: 'app-partner-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './partner.page.html',
})
export class PartnerPage {
  readonly benefits: PartnerBenefit[] = [
    {
      emoji: '🎯',
      title: 'Audience universitaria reale',
      description:
        '120.000+ studenti attivi su 50+ atenei italiani. Non follower passivi - utenti che usano OhMyUniversity ogni settimana per la loro carriera universitaria.',
    },
    {
      emoji: '📊',
      title: 'Dati accademici verificati',
      description:
        'Sappiamo in quale corso è iscritto ogni studente, quanti CFU ha, in quale anno è. Il targeting si basa su dati reali, non dichiarazioni.',
    },
    {
      emoji: '💡',
      title: 'Contesto ad alta attenzione',
      description:
        'Raggiungi gli studenti mentre gestiscono la loro carriera - non mentre guardano meme. Il contesto fa la differenza sulla qualità dei contatti.',
    },
    {
      emoji: '🤝',
      title: 'Onboarding assistito',
      description:
        'Non sei solo. Il nostro team ti accompagna dalla prima email alla prima opportunità pubblicata. Nessuna competenza tecnica richiesta.',
    },
  ];

  readonly partnerLinks: PartnerLink[] = [
    {
      label: 'Cosa offriamo alle aziende',
      description: 'Scopri tutte le funzionalità disponibili per le aziende partner',
      path: '/business/offerta',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    },
    {
      label: 'Per i collettivi studenteschi',
      description: 'Associazioni, gruppi sportivi, liste studentesche - con sconto del 40%',
      path: '/business/collettivi',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      label: 'Come funziona la visibilità',
      description: 'Targeting, analytics e come le opportunità vengono mostrate agli studenti',
      path: '/business/visibilita',
      icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    },
    {
      label: 'Piani e prezzi',
      description: 'Da 9,90€/mese. 14 giorni di prova gratuita senza carta di credito',
      path: '/business/prezzi',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      label: 'Come creare un profilo',
      description: 'Il processo di onboarding guidato, passo dopo passo',
      path: '/business/contatti',
      icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
    },
    {
      label: 'FAQ Business',
      description: 'Domande frequenti su piani, fatturazione e funzionamento',
      path: '/business/faq',
      icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ];

  readonly testimonials: Testimonial[] = [
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

  readonly stats = [
    { value: '120k+', label: 'Studenti attivi' },
    { value: '50+', label: 'Atenei italiani' },
    { value: '78%', label: 'Retention settimanale' },
    { value: '4.8★', label: 'Rating medio app' },
  ];
}
