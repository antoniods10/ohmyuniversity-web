import { Component } from '@angular/core';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';

interface OnboardingStep {
  number: number;
  title: string;
  description: string;
  duration: string;
}

interface Requirement {
  label: string;
  forType: 'azienda' | 'collettivo' | 'entrambi';
}

@Component({
  selector: 'app-business-registrazione-page',
  standalone: true,
  imports: [BusinessHeroComponent],
  templateUrl: './business-registrazione.page.html',
})
export class BusinessRegistrazionePage {
  readonly steps: OnboardingStep[] = [
    {
      number: 1,
      title: 'Compila il modulo di contatto',
      description:
        'Inviaci il nome della tua organizzazione, il tipo (azienda o collettivo), la tua email di riferimento e una breve descrizione di cosa fate. Nessun form complicato - bastano 2 minuti.',
      duration: '2 min',
    },
    {
      number: 2,
      title: 'Chiamata conoscitiva con il team',
      description:
        'Entro 2 giorni lavorativi ti contattiamo per una chiamata di 20-30 minuti. Capiamo le tue esigenze, ti mostriamo la piattaforma e ti aiutiamo a scegliere il piano giusto.',
      duration: '20-30 min',
    },
    {
      number: 3,
      title: 'Ricezione credenziali e attivazione prova',
      description:
        'Ti inviamo le credenziali di accesso e attiviamo i 14 giorni di prova gratuita. Nessuna carta di credito richiesta in questa fase.',
      duration: '24h',
    },
    {
      number: 4,
      title: 'Setup del profilo organizzazione',
      description:
        'Accedi, carica il logo, compila la descrizione e personalizza il profilo pubblico della tua organizzazione. Il nostro team è disponibile per assisterti in questa fase.',
      duration: '30 min',
    },
    {
      number: 5,
      title: 'Prima opportunità pubblicata',
      description:
        'Pubblica la tua prima opportunità, imposta il targeting e vai live. Gli studenti in target inizieranno a vedere il tuo annuncio entro pochi minuti.',
      duration: '5 min',
    },
  ];

  readonly requirements: Requirement[] = [
    { label: "Partita IVA o Codice Fiscale dell'organizzazione", forType: 'entrambi' },
    { label: 'Email aziendale (no Gmail/Outlook personali)', forType: 'azienda' },
    { label: "Referente nominativo con ruolo nell'azienda", forType: 'azienda' },
    {
      label: 'Email istituzionale universitaria o documento di affiliazione',
      forType: 'collettivo',
    },
    { label: "Nome e descrizione breve dell'organizzazione", forType: 'entrambi' },
    { label: 'Logo in alta risoluzione (consigliato)', forType: 'entrambi' },
  ];

  readonly faq = [
    {
      q: "Quanto tempo ci vuole dall'invio del modulo all'account attivo?",
      a: 'In media 3-4 giorni lavorativi dal primo contatto, inclusa la chiamata conoscitiva.',
    },
    {
      q: 'Posso iniziare a pubblicare subito durante la prova gratuita?',
      a: 'Sì. Appena ricevi le credenziali puoi iniziare subito - la prova include accesso completo al piano Professional.',
    },
    {
      q: 'Cosa succede alla fine dei 14 giorni di prova?',
      a: "Ti contatteremo per scegliere il piano. Se non vuoi procedere, l'account viene disattivato automaticamente senza addebiti.",
    },
    {
      q: "Posso cambiare piano dopo l'attivazione?",
      a: 'Sì, puoi fare upgrade o downgrade in qualsiasi momento dal tuo pannello organizzazione.',
    },
  ];
}
