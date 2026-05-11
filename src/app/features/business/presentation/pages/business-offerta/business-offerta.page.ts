import { Component } from '@angular/core';
import { BusinessCtaComponent } from '../../components/business-cta/business-cta.component';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';

interface OfferCard {
  emoji: string;
  title: string;
  description: string;
}

interface Differentiator {
  title: string;
  description: string;
}

@Component({
  selector: 'app-business-offerta-page',
  standalone: true,
  imports: [BusinessHeroComponent, BusinessCtaComponent],
  templateUrl: './business-offerta.page.html',
})
export class BusinessOffertaPage {
  readonly offers: OfferCard[] = [
    {
      emoji: '🎯',
      title: 'Visibilità mirata sugli studenti giusti',
      description:
        'Raggiungi studenti filtrati per ateneo, facoltà, corso di laurea e anno. Non sprechi budget su chi non è il tuo target - ogni impression conta.',
    },
    {
      emoji: '📋',
      title: 'Pubblicazione di opportunità',
      description:
        'Stage, tirocini, lavoro part-time, graduate program, eventi aziendali. Pubblica qualsiasi tipo di opportunità con un editor semplice e professionale.',
    },
    {
      emoji: '📬',
      title: 'Raccolta candidature integrata',
      description:
        "Gli studenti si candidano direttamente in-app. Ricevi CV, lettere di presentazione e portfolio in un'unica dashboard - niente email sparse.",
    },
    {
      emoji: '📊',
      title: 'Analytics in tempo reale',
      description:
        'Visualizzazioni, click, candidature ricevute, tasso di conversione. Sai esattamente quanto sta funzionando ogni opportunità pubblicata.',
    },
    {
      emoji: '✅',
      title: 'Profilo verificato e credibile',
      description:
        "Il badge di verifica OhMyUniversity comunica agli studenti che sei un'organizzazione reale e affidabile. Niente profili fasulli o spam.",
    },
    {
      emoji: '🔗',
      title: 'Integrazione con i tuoi sistemi',
      description:
        'Puoi reindirizzare le candidature verso il tuo ATS o portale HR esistente. OhMyUniversity si adatta al tuo flusso, non il contrario.',
    },
  ];

  readonly differentiators: Differentiator[] = [
    {
      title: 'Audience in contesto accademico',
      description:
        'Quando uno studente vede la tua opportunità su OhMyUniversity è appena entrato in app per controllare i suoi voti o il piano di studi. Non sta navigando distrattamente - è in una mindset universitaria attiva.',
    },
    {
      title: 'Zero pubblicità, zero rumore',
      description:
        'OhMyUniversity non ha banner, pop-up o feed infiniti. Le tue opportunità sono presentate in modo pulito e professionale, senza competere con altre distrazioni.',
    },
    {
      title: 'Dati accademici reali',
      description:
        "Grazie all'integrazione con i portali universitari, sappiamo con precisione in quale anno è lo studente, quale corso frequenta e quanti CFU ha maturato. Il targeting è basato su dati reali, non dichiarazioni.",
    },
  ];
}
