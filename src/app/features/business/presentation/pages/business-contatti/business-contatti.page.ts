import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';

interface UserType {
  emoji: string;
  title: string;
  description: string;
  action: string;
  actionLink: string;
  isExternal: boolean;
  highlight: boolean;
}

interface ContactChannel {
  emoji: string;
  title: string;
  description: string;
  value: string;
  href: string;
}

@Component({
  selector: 'app-business-contatti-page',
  standalone: true,
  imports: [RouterLink, BusinessHeroComponent],
  templateUrl: './business-contatti.page.html',
})
export class BusinessContattiPage {
  readonly userTypes: UserType[] = [
    {
      emoji: '🎓',
      title: 'Studente o Dottorando',
      description:
        'Non devi creare nessun account. Accedi direttamente con le credenziali del tuo ateneo tramite SSO. OhMyUniversity legge i tuoi dati accademici in automatico - nessuna registrazione, nessun form da compilare.',
      action: 'Vai al login',
      actionLink: '/login',
      isExternal: false,
      highlight: false,
    },
    {
      emoji: '🏫',
      title: 'Docente o Staff tecnico-amministrativo',
      description:
        'Come per gli studenti, accedi con le credenziali istituzionali del tuo ateneo tramite SSO. Il tuo ruolo (docente, ricercatore, staff) viene riconosciuto automaticamente dal sistema del tuo ateneo.',
      action: 'Vai al login',
      actionLink: '/login',
      isExternal: false,
      highlight: false,
    },
    {
      emoji: '🏢',
      title: 'Azienda',
      description:
        'Le aziende non possono registrarsi in autonomia. Il processo è assistito dal nostro team commerciale: ci contatti, facciamo una breve chiamata conoscitiva, e attiviamo il tuo account con 14 giorni di prova gratuita.',
      action: 'Contattaci per iniziare',
      actionLink: 'mailto:business@ohmyuniversity.it?subject=Richiesta%20account%20azienda',
      isExternal: true,
      highlight: true,
    },
    {
      emoji: '🤝',
      title: 'Collettivo studentesco',
      description:
        'Come per le aziende, i collettivi accedono tramite un account dedicato creato dal nostro team. I collettivi universitari documentati ricevono il 40% di sconto su tutti i piani. Contattaci per iniziare.',
      action: 'Contattaci per iniziare',
      actionLink: 'mailto:business@ohmyuniversity.it?subject=Richiesta%20account%20collettivo',
      isExternal: true,
      highlight: true,
    },
  ];

  readonly contactChannels: ContactChannel[] = [
    {
      emoji: '📧',
      title: 'Email commerciale',
      description:
        'Per richieste di account azienda o collettivo. Risposta entro 2 giorni lavorativi.',
      value: 'business@ohmyuniversity.it',
      href: 'mailto:business@ohmyuniversity.it',
    },
    {
      emoji: '💬',
      title: 'Email supporto generale',
      description: 'Per domande tecniche, bug report o feedback sul prodotto.',
      value: 'hello@ohmyuniversity.it',
      href: 'mailto:hello@ohmyuniversity.it',
    },
    {
      emoji: '🐙',
      title: 'GitHub',
      description: 'Per segnalare bug, proporre feature o contribuire al codice open source.',
      value: 'github.com/ohmyopensource',
      href: 'https://github.com/ohmyopensource',
    },
  ];

  readonly onboardingSteps = [
    'Ci invii una email con il nome della tua organizzazione e una breve descrizione',
    'Il nostro team ti contatta entro 2 giorni lavorativi per una chiamata conoscitiva',
    'Scegliamo insieme il piano più adatto alle tue esigenze',
    'Attiviamo i 14 giorni di prova gratuita e ti inviamo le credenziali',
    'Compili il profilo pubblico della tua organizzazione e pubblichi la prima opportunità',
  ];
}
