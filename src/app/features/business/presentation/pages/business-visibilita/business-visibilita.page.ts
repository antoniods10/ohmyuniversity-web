import { Component } from '@angular/core';
import { BusinessCtaComponent } from '../../components/business-cta/business-cta.component';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface TargetingOption {
  label: string;
  description: string;
  available: 'tutti' | 'professional' | 'enterprise';
}

@Component({
  selector: 'app-business-visibilita-page',
  standalone: true,
  imports: [BusinessHeroComponent, BusinessCtaComponent],
  templateUrl: './business-visibilita.page.html',
})
export class BusinessVisibilitaPage {
  readonly steps: Step[] = [
    {
      number: 1,
      title: "Crei e pubblichi un'opportunità",
      description:
        'Dal tuo pannello organizzazione compili il form: titolo, descrizione, requisiti, tipo di contratto e data di scadenza. Puoi anche allegare materiali aggiuntivi o un link esterno.',
    },
    {
      number: 2,
      title: 'Imposti i criteri di targeting',
      description:
        'Scegli a quali studenti mostrare la tua opportunità: per ateneo, facoltà, corso di laurea, anno accademico o combinazioni multiple. Più il targeting è preciso, maggiore è la qualità dei contatti.',
    },
    {
      number: 3,
      title: 'Gli studenti la vedono nel contesto giusto',
      description:
        'La tua opportunità appare nella sezione "Opportunità" della dashboard studenti, ordinata per rilevanza rispetto al profilo. Gli studenti più in target la vedono per primi.',
    },
    {
      number: 4,
      title: 'Ricevi candidature e misuri i risultati',
      description:
        'Le candidature arrivano nel tuo pannello in tempo reale. Le analytics ti mostrano visualizzazioni, click e conversioni per ogni opportunità pubblicata.',
    },
  ];

  readonly targetingOptions: TargetingOption[] = [
    {
      label: 'Ateneo specifico',
      description: 'Es. solo studenti UniMol o Sapienza',
      available: 'tutti',
    },
    {
      label: 'Più atenei contemporaneamente',
      description: 'Raggiungi studenti di più università in una sola campagna',
      available: 'tutti',
    },
    {
      label: 'Facoltà o dipartimento',
      description: 'Es. solo Ingegneria o Economia',
      available: 'professional',
    },
    {
      label: 'Corso di laurea specifico',
      description: 'Es. solo Informatica L-31 o Marketing LM-77',
      available: 'professional',
    },
    {
      label: 'Anno accademico',
      description: 'Es. solo studenti al 2° o 3° anno',
      available: 'professional',
    },
    {
      label: 'CFU maturati',
      description: 'Filtra per avanzamento nel percorso di studi',
      available: 'enterprise',
    },
    {
      label: 'Media voti',
      description: 'Raggiungi solo studenti con media superiore a una soglia',
      available: 'enterprise',
    },
    {
      label: 'Lingua di studio',
      description: 'Per corsi in lingua straniera o programmi internazionali',
      available: 'enterprise',
    },
  ];

  readonly planLabel: Record<string, string> = {
    tutti: 'Tutti i piani',
    professional: 'Professional+',
    enterprise: 'Enterprise',
  };

  readonly planColor: Record<string, string> = {
    tutti: 'bg-green-100 text-green-700',
    professional: 'bg-blue-100 text-blue-700',
    enterprise: 'bg-purple-100 text-purple-700',
  };
}
