import { Component } from '@angular/core';
import { BusinessCtaComponent } from '../../components/business-cta/business-cta.component';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';

interface UseCase {
  emoji: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-business-collettivi-page',
  standalone: true,
  imports: [BusinessHeroComponent, BusinessCtaComponent],
  templateUrl: './business-collettivi.page.html',
})
export class BusinessCollettiviPage {
  readonly useCases: UseCase[] = [
    {
      emoji: '🎭',
      title: 'Associazioni culturali e ricreative',
      description:
        'Promuovi eventi, spettacoli, mostre e attività culturali agli studenti del tuo ateneo o di atenei vicini. Raggiungi chi è già interessato alla vita universitaria extracurriculare.',
    },
    {
      emoji: '♟️',
      title: 'Gruppi sportivi universitari',
      description:
        'Cerca nuovi atleti e appassionati tra gli studenti. Pubblica le tue sessioni di allenamento, i tornei e le selezioni per entrare nella squadra.',
    },
    {
      emoji: '🗳️',
      title: 'Liste e rappresentanze studentesche',
      description:
        'Comunica con la tua base elettorale, promuovi le tue proposte e raggiungi studenti per le campagne elettorali universitarie in modo diretto e trasparente.',
    },
    {
      emoji: '📣',
      title: 'Gruppi di attivismo e volontariato',
      description:
        "Mobilita studenti per cause sociali, campagne di sensibilizzazione e progetti di volontariato. L'audience universitaria è tra le più reattive e coinvolgibili.",
    },
    {
      emoji: '💼',
      title: 'Startup e team in cerca di co-founder',
      description:
        'Stai costruendo qualcosa e cerchi collaboratori universitari? Pubblica la tua call, descrivi il progetto e attira persone motivate e con skill specifiche.',
    },
    {
      emoji: '🎓',
      title: 'Alumni e community post-laurea',
      description:
        'Mantieni vivo il legame con il tuo ateneo. Organizza eventi, mentorship e networking tra ex studenti e studenti attivi.',
    },
  ];

  readonly vantaggi = [
    'Piano Starter da 9,90€/mese - pensato per realtà piccole con budget limitato',
    'Sconto del 40% per collettivi studenteschi e organizzazioni no-profit documentate',
    'Targeting per ateneo specifico - parla solo agli studenti della tua università',
    'Nessuna competenza tecnica richiesta - pubblica un evento in meno di 5 minuti',
    '14 giorni di prova gratuita senza carta di credito',
  ];
}
