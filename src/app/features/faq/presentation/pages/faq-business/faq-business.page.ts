import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaqHeroComponent } from '../../components/faq-hero/faq-hero.component';
import { FaqListComponent, FaqCategory } from '../../components/faq-list/faq-list.component';

@Component({
  selector: 'app-faq-business-page',
  standalone: true,
  imports: [RouterLink, FaqHeroComponent, FaqListComponent],
  templateUrl: './faq-business.page.html',
})
export class FaqBusinessPage {
  readonly categories: FaqCategory[] = [
    {
      title: "Cos'è OhMyUniversity per le organizzazioni",
      items: [
        {
          question: 'Cosa offre OhMyUniversity ad aziende e collettivi studenteschi?',
          answer:
            'OhMyUniversity permette ad aziende e collettivi studenteschi di raggiungere direttamente una base di studenti universitari attivi. Le organizzazioni possono pubblicare opportunità (stage, lavoro, eventi, bandi), creare un profilo verificato e interagire con gli studenti tramite la piattaforma. A differenza dei classici portali di recruiting, qui gli studenti sono già in contesto accademico - hanno appena consultato il loro piano di studi o i voti.',
        },
        {
          question:
            'Qual è la differenza tra un account Azienda e un account Collettivo studentesco?',
          answer:
            'Gli account Azienda sono pensati per enti privati o pubblici che cercano stagisti, tirocinanti o neolaureati. Gli account Collettivo sono pensati per associazioni studentesche, gruppi culturali o sportivi che vogliono raggiungere studenti dello stesso ateneo o di atenei specifici per eventi, attività o campagne. I piani hanno prezzi e funzionalità differenti - consulta la pagina Piani e prezzi per i dettagli.',
        },
        {
          question: 'OhMyUniversity è adatto anche a piccole realtà o startup?',
          answer:
            "Assolutamente sì. Abbiamo piani scalabili che partono da realtà molto piccole. Una startup di 3 persone che cerca il primo stagista può usare OhMyUniversity esattamente come una multinazionale. Il valore sta nella qualità e nella pertinenza dell'audience - studenti in attivo percorso universitario - non nella quantità di budget disponibile.",
        },
      ],
    },
    {
      title: 'Accesso e registrazione',
      items: [
        {
          question: 'Come si crea un account per la nostra organizzazione?',
          answer:
            'Il processo di onboarding per le organizzazioni non è self-service: dopo aver compilato il modulo di contatto nella sezione Business, il nostro team commerciale vi contatterà entro 2 giorni lavorativi per una chiamata conoscitiva. Successivamente invieremo le credenziali di accesso e le istruzioni per completare il profilo.',
        },
        {
          question: "Quanti utenti possono accedere all'account della nostra organizzazione?",
          answer:
            'Dipende dal piano scelto. Il piano Base prevede 1 utente amministratore. I piani Professional e Enterprise permettono rispettivamente 3 e utenti illimitati, con possibilità di assegnare ruoli differenti (admin, editor, viewer). I dettagli sono disponibili nella pagina Piani e prezzi.',
        },
        {
          question: 'Possiamo provare la piattaforma prima di sottoscrivere un piano?',
          answer:
            'Sì. Offriamo un periodo di prova gratuito di 14 giorni con accesso completo alle funzionalità del piano Professional. Non è richiesta una carta di credito per attivare la prova. Al termine dei 14 giorni potete scegliere se sottoscrivere un piano o terminare senza costi.',
        },
      ],
    },
    {
      title: 'Visibilità e interazione con gli studenti',
      items: [
        {
          question: 'Come funziona la visibilità delle opportunità pubblicate?',
          answer:
            'Le opportunità pubblicate dalla vostra organizzazione vengono mostrate agli studenti nella sezione "Opportunità" della loro dashboard, con targeting basato su ateneo, corso di laurea e anno. Potete impostare criteri di targeting al momento della pubblicazione. Le opportunità più rilevanti per il profilo dello studente vengono messe in evidenza.',
        },
        {
          question: 'Gli studenti possono candidarsi direttamente su OhMyUniversity?',
          answer:
            'Dipende dalla configurazione che scegliete. Potete raccogliere candidature direttamente tramite la piattaforma (gli studenti inviano CV e lettera di presentazione) oppure reindirizzare gli studenti verso il vostro portale di selezione esterno. Entrambe le modalità sono disponibili in tutti i piani.',
        },
        {
          question: 'Possiamo vedere le statistiche sulle visualizzazioni e le candidature?',
          answer:
            'Sì. La dashboard organizzazione include analytics dettagliate: visualizzazioni per opportunità, tasso di click, candidature ricevute, distribuzione per ateneo e corso. I dati sono aggiornati in tempo reale e possono essere esportati in CSV.',
        },
        {
          question: 'Possiamo contattare direttamente gli studenti?',
          answer:
            'No, non è possibile contattare gli studenti in modo non sollecitato. OhMyUniversity tutela la privacy degli studenti: le comunicazioni dirette avvengono solo se lo studente ha espressamente manifestato interesse per la vostra organizzazione (cliccando su "Sono interessato" o inviando una candidatura). Questo approccio aumenta la qualità dei contatti che ricevete.',
        },
      ],
    },
    {
      title: 'Piani, prezzi e fatturazione',
      items: [
        {
          question: 'Quali sono i piani disponibili e i relativi prezzi?',
          answer:
            'I prezzi aggiornati sono disponibili nella pagina Piani e prezzi. In generale offriamo tre livelli: Base (per realtà piccole con esigenze limitate), Professional (per organizzazioni che vogliono targeting avanzato e analytics) e Enterprise (per grandi aziende con esigenze personalizzate). Tutti i piani sono fatturati annualmente, con possibilità di fatturazione mensile a un costo leggermente superiore.',
        },
        {
          question: 'Come avviene la fatturazione?',
          answer:
            "La fatturazione avviene tramite carta di credito o bonifico bancario. Le fatture vengono emesse mensilmente o annualmente in base al piano scelto e inviate all'indirizzo email del referente amministrativo. Per le aziende italiane le fatture vengono emesse con IVA al 22% e trasmesse tramite Sistema di Interscambio (SDI).",
        },
        {
          question: 'Possiamo disdire in qualsiasi momento?',
          answer:
            "Per i piani con fatturazione mensile puoi disdire in qualsiasi momento - l'accesso rimane attivo fino alla fine del periodo già pagato. Per i piani annuali la disdetta è possibile con 30 giorni di preavviso prima del rinnovo. Non è previsto rimborso pro-rata per i piani annuali in caso di disdetta anticipata, salvo casi straordinari valutati dal nostro team.",
        },
        {
          question: 'Esistono sconti per collettivi studenteschi o organizzazioni no-profit?',
          answer:
            'Sì. I collettivi studenteschi e le organizzazioni no-profit iscritte al RUNTS (Registro Unico del Terzo Settore) o equivalente beneficiano di uno sconto del 40% su tutti i piani. Per attivare lo sconto è sufficiente fornire documentazione durante il processo di onboarding.',
        },
      ],
    },
    {
      title: 'Supporto e assistenza',
      items: [
        {
          question: 'Che tipo di supporto è incluso nel mio piano?',
          answer:
            "Il piano Base include supporto via email con risposta entro 3 giorni lavorativi. Il piano Professional include supporto via email con risposta entro 1 giorno lavorativo e accesso a una chat dedicata durante l'orario di ufficio. Il piano Enterprise include un account manager dedicato, supporto prioritario e sessioni periodiche di review.",
        },
        {
          question: 'Come posso contattare il team commerciale?',
          answer:
            'Puoi contattarci compilando il modulo nella pagina "Contatta il team commerciale" oppure scrivendo direttamente a business@ohmyuniversity.it. Per richieste urgenti o Enterprise ti invitiamo a specificarlo nell\'oggetto della mail - risponderemo entro poche ore.',
        },
      ],
    },
  ];
}
