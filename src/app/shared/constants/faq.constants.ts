import { FaqCategory } from '@types';

// Student / Classic FAQ
export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: 'Accesso e autenticazione',
    items: [
      {
        title: 'Come accedo a OhMyUniversity?',
        description:
          'Accedi tramite il sistema SSO del tuo ateneo. Dalla pagina di login, cerca il nome della tua università, clicca su "Accedi" e verrai reindirizzato al portale istituzionale. Dopo aver inserito le tue credenziali universitarie, tornerai automaticamente su OhMyUniversity con la sessione attiva.',
      },
      {
        title: 'OhMyUniversity memorizza la mia password universitaria?',
        description:
          'No. Le tue credenziali universitarie non transitano mai per i nostri server. Il login avviene direttamente sul portale del tuo ateneo tramite protocollo SSO sicuro. OhMyUniversity riceve solo un token di autenticazione anonimo che conferma che sei un utente valido.',
      },
      {
        title: 'Il mio ateneo è supportato?',
        description:
          'Attualmente supportiamo oltre 50 atenei italiani. Puoi verificare se il tuo ateneo è nella lista direttamente dalla pagina di login cercando il nome. Se non lo trovi, puoi segnalarcelo tramite la pagina dei contatti - stiamo lavorando continuamente per aggiungere nuovi atenei.',
      },
      {
        title: "Cosa succede quando mi laureo o termino il mio rapporto con l'ateneo?",
        description:
          "L'accesso a OhMyUniversity è legato al tuo account istituzionale. Quando l'ateneo disattiva le tue credenziali (tipicamente qualche mese dopo la laurea o la fine del contratto), l'accesso a OhMyUniversity si disattiverà automaticamente. I tuoi dati vengono conservati per 12 mesi prima di essere eliminati definitivamente.",
      },
      {
        title: 'Posso accedere da più dispositivi contemporaneamente?',
        description:
          'Sì. Puoi accedere da browser desktop, app mobile e qualsiasi altro dispositivo contemporaneamente. Le sessioni sono indipendenti e puoi effettuare il logout da uno specifico dispositivo dalle impostazioni del tuo profilo.',
      },
    ],
  },
  {
    title: 'Funzionalità e dati',
    items: [
      {
        title: 'Da dove provengono i miei dati accademici?',
        description:
          "I dati accademici (esami, voti, piano di studi, CFU) vengono recuperati direttamente dal sistema gestionale del tuo ateneo tramite le API ufficiali messe a disposizione dall'istituzione. OhMyUniversity non modifica né integra questi dati - li visualizza così come sono nei sistemi dell'ateneo.",
      },
      {
        title: 'Con quale frequenza si aggiornano i dati?',
        description:
          "La frequenza di aggiornamento dipende dall'integrazione con il tuo ateneo. Nella maggior parte dei casi i dati vengono sincronizzati entro poche ore dalla registrazione di un voto o di una variazione al piano di studi. In caso di ritardi anomali, puoi forzare l'aggiornamento manuale dalle impostazioni della tua dashboard.",
      },
      {
        title: 'I dati su OhMyUniversity sono ufficiali?',
        description:
          'I dati hanno natura informativa. OhMyUniversity è uno strumento di visualizzazione - in caso di discrepanze con il portale ufficiale del tuo ateneo, fa sempre fede il dato presente nei sistemi istituzionali. Non usare OhMyUniversity come fonte primaria per documenti ufficiali (ad esempio la carriera per la domanda di laurea).',
      },
      {
        title: 'Come viene calcolata la media ponderata?',
        description:
          'La media ponderata viene calcolata moltiplicando il voto di ogni esame per i CFU corrispondenti, sommando tutti i prodotti e dividendo per il totale dei CFU. Il calcolo segue lo standard italiano (voti da 18 a 30, con eventuale lode). Puoi vedere il dettaglio del calcolo espandendo la sezione "Media" nella tua dashboard.',
      },
      {
        title: 'Posso esportare i miei dati?',
        description:
          'Sì. Dalle impostazioni del profilo puoi esportare il riepilogo della tua carriera in formato PDF o CSV. La funzione di esportazione è disponibile per tutti gli utenti accademici registrati.',
      },
    ],
  },
  {
    title: 'Privacy e sicurezza',
    items: [
      {
        title: 'I miei dati vengono venduti o condivisi con terzi?',
        description:
          'No. OhMyUniversity non vende dati a terzi e non condivide informazioni personali con inserzionisti o piattaforme di marketing. I dati vengono utilizzati esclusivamente per fornire il servizio. Per i dettagli completi consulta la nostra Privacy Policy.',
      },
      {
        title: 'Come posso richiedere la cancellazione dei miei dati?',
        description:
          "Puoi richiedere la cancellazione dei tuoi dati in qualsiasi momento scrivendo a privacy@ohmyuniversity.it. Risponderemo entro 30 giorni. Nota che la cancellazione dell'account non è possibile finché hai una sessione SSO attiva con il tuo ateneo - dovrai prima effettuare il logout.",
      },
      {
        title: 'OhMyUniversity utilizza cookie?',
        description:
          "Utilizziamo un numero minimo di cookie tecnici necessari al funzionamento del servizio: il cookie di sessione (per mantenerti autenticato), un token di sicurezza CSRF e un cookie per le preferenze dell'interfaccia (tema, lingua). Non utilizziamo cookie pubblicitari o di profilazione. Per i dettagli consulta la nostra Cookie Policy.",
      },
    ],
  },
  {
    title: 'Supporto',
    items: [
      {
        title: 'Come posso segnalare un problema o un bug?',
        description:
          'Puoi segnalare problemi aprendo una issue su GitHub (il progetto è open source) oppure scrivendo a hello@ohmyuniversity.it. Per i bug ti chiediamo di includere il browser utilizzato, i passi per riprodurre il problema e uno screenshot se possibile.',
      },
      {
        title: "OhMyUniversity ha un'app mobile?",
        description:
          "Sì, l'app è disponibile su App Store (iOS) e Google Play (Android). L'app offre le stesse funzionalità della versione web, con l'aggiunta delle notifiche push per scadenze e risultati degli esami.",
      },
      {
        title: 'Come posso contribuire al progetto?',
        description:
          'OhMyUniversity è open source. Puoi contribuire con codice, design, documentazione o semplicemente segnalando bug su GitHub. Visita la pagina Chi Siamo per scoprire come entrare nella community di OhMyOpenSource!',
      },
    ],
  },
];

// Business FAQ
export const FAQ_BUSINESS_CATEGORIES: FaqCategory[] = [
  {
    title: "Cos'è OhMyUniversity per le organizzazioni",
    items: [
      {
        title: 'Cosa offre OhMyUniversity ad aziende e collettivi studenteschi?',
        description:
          'OhMyUniversity permette ad aziende e collettivi studenteschi di raggiungere direttamente una base di studenti universitari attivi. Le organizzazioni possono pubblicare opportunità (stage, lavoro, eventi, bandi), creare un profilo verificato e interagire con gli studenti tramite la piattaforma. A differenza dei classici portali di recruiting, qui gli studenti sono già in contesto accademico - hanno appena consultato il loro piano di studi o i voti.',
      },
      {
        title: 'Qual è la differenza tra un account Azienda e un account Collettivo studentesco?',
        description:
          'Gli account Azienda sono pensati per enti privati o pubblici che cercano stagisti, tirocinanti o neolaureati. Gli account Collettivo sono pensati per associazioni studentesche, gruppi culturali o sportivi che vogliono raggiungere studenti dello stesso ateneo o di atenei specifici per eventi, attività o campagne. I piani hanno prezzi e funzionalità differenti - consulta la pagina Piani e prezzi per i dettagli.',
      },
      {
        title: 'OhMyUniversity è adatto anche a piccole realtà o startup?',
        description:
          "Assolutamente sì. Abbiamo piani scalabili che partono da realtà molto piccole. Una startup di 3 persone che cerca il primo stagista può usare OhMyUniversity esattamente come una multinazionale. Il valore sta nella qualità e nella pertinenza dell'audience - studenti in attivo percorso universitario - non nella quantità di budget disponibile.",
      },
    ],
  },
  {
    title: 'Accesso e registrazione',
    items: [
      {
        title: 'Come si crea un account per la nostra organizzazione?',
        description:
          'Il processo di onboarding per le organizzazioni non è self-service: dopo aver compilato il modulo di contatto nella sezione Business, il nostro team commerciale vi contatterà entro 2 giorni lavorativi per una chiamata conoscitiva. Successivamente invieremo le credenziali di accesso e le istruzioni per completare il profilo.',
      },
      {
        title: "Quanti utenti possono accedere all'account della nostra organizzazione?",
        description:
          'Dipende dal piano scelto. Il piano Base prevede 1 utente amministratore. I piani Professional e Enterprise permettono rispettivamente 3 e utenti illimitati, con possibilità di assegnare ruoli differenti (admin, editor, viewer). I dettagli sono disponibili nella pagina Piani e prezzi.',
      },
      {
        title: 'Possiamo provare la piattaforma prima di sottoscrivere un piano?',
        description:
          'Sì. Offriamo un periodo di prova gratuito di 14 giorni con accesso completo alle funzionalità del piano Professional. Non è richiesta una carta di credito per attivare la prova. Al termine dei 14 giorni potete scegliere se sottoscrivere un piano o terminare senza costi.',
      },
    ],
  },
  {
    title: 'Visibilità e interazione con gli studenti',
    items: [
      {
        title: 'Come funziona la visibilità delle opportunità pubblicate?',
        description:
          'Le opportunità pubblicate dalla vostra organizzazione vengono mostrate agli studenti nella sezione "Opportunità" della loro dashboard, con targeting basato su ateneo, corso di laurea e anno. Potete impostare criteri di targeting al momento della pubblicazione. Le opportunità più rilevanti per il profilo dello studente vengono messe in evidenza.',
      },
      {
        title: 'Gli studenti possono candidarsi direttamente su OhMyUniversity?',
        description:
          'Dipende dalla configurazione che scegliete. Potete raccogliere candidature direttamente tramite la piattaforma (gli studenti inviano CV e lettera di presentazione) oppure reindirizzare gli studenti verso il vostro portale di selezione esterno. Entrambe le modalità sono disponibili in tutti i piani.',
      },
      {
        title: 'Possiamo vedere le statistiche sulle visualizzazioni e le candidature?',
        description:
          'Sì. La dashboard organizzazione include analytics dettagliate: visualizzazioni per opportunità, tasso di click, candidature ricevute, distribuzione per ateneo e corso. I dati sono aggiornati in tempo reale e possono essere esportati in CSV.',
      },
      {
        title: 'Possiamo contattare direttamente gli studenti?',
        description:
          'No, non è possibile contattare gli studenti in modo non sollecitato. OhMyUniversity tutela la privacy degli studenti: le comunicazioni dirette avvengono solo se lo studente ha espressamente manifestato interesse per la vostra organizzazione (cliccando su "Sono interessato" o inviando una candidatura). Questo approccio aumenta la qualità dei contatti che ricevete.',
      },
    ],
  },
  {
    title: 'Piani, prezzi e fatturazione',
    items: [
      {
        title: 'Quali sono i piani disponibili e i relativi prezzi?',
        description:
          'I prezzi aggiornati sono disponibili nella pagina Piani e prezzi. In generale offriamo tre livelli: Base (per realtà piccole con esigenze limitate), Professional (per organizzazioni che vogliono targeting avanzato e analytics) e Enterprise (per grandi aziende con esigenze personalizzate). Tutti i piani sono fatturati annualmente, con possibilità di fatturazione mensile a un costo leggermente superiore.',
      },
      {
        title: 'Come avviene la fatturazione?',
        description:
          "La fatturazione avviene tramite carta di credito o bonifico bancario. Le fatture vengono emesse mensilmente o annualmente in base al piano scelto e inviate all'indirizzo email del referente amministrativo. Per le aziende italiane le fatture vengono emesse con IVA al 22% e trasmesse tramite Sistema di Interscambio (SDI).",
      },
      {
        title: 'Possiamo disdire in qualsiasi momento?',
        description:
          "Per i piani con fatturazione mensile puoi disdire in qualsiasi momento - l'accesso rimane attivo fino alla fine del periodo già pagato. Per i piani annuali la disdetta è possibile con 30 giorni di preavviso prima del rinnovo. Non è previsto rimborso pro-rata per i piani annuali in caso di disdetta anticipata, salvo casi straordinari valutati dal nostro team.",
      },
      {
        title: 'Esistono sconti per collettivi studenteschi o organizzazioni no-profit?',
        description:
          'Sì. I collettivi studenteschi e le organizzazioni no-profit iscritte al RUNTS (Registro Unico del Terzo Settore) o equivalente beneficiano di uno sconto del 40% su tutti i piani. Per attivare lo sconto è sufficiente fornire documentazione durante il processo di onboarding.',
      },
    ],
  },
  {
    title: 'Supporto e assistenza',
    items: [
      {
        title: 'Che tipo di supporto è incluso nel mio piano?',
        description:
          "Il piano Base include supporto via email con risposta entro 3 giorni lavorativi. Il piano Professional include supporto via email con risposta entro 1 giorno lavorativo e accesso a una chat dedicata durante l'orario di ufficio. Il piano Enterprise include un account manager dedicato, supporto prioritario e sessioni periodiche di review.",
      },
      {
        title: 'Come posso contattare il team commerciale?',
        description:
          'Puoi contattarci compilando il modulo nella pagina "Contatta il team commerciale" oppure scrivendo direttamente a business@ohmyuniversity.it. Per richieste urgenti o Enterprise ti invitiamo a specificarlo nell\'oggetto della mail - risponderemo entro poche ore.',
      },
    ],
  },
];
