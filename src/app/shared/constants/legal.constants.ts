import { LegalCookieTable, LegalLabeledItem, LegalListItem, LegalTableRow } from '@shared/types';

export const LEGAL_CONTACT_EMAIL = 'privacy@ohmyuniversity.it';

export const LEGAL_UPDATE = {
  cookiePolicy: '7 maggio 2025',
  privacyPolicy: '7 maggio 2025',
  termsConditions: '7 maggio 2025',
};

// cookie-policy
export const COOKIE_POLICY_INTRO = {
  legalBasis:
    "Questa policy è redatta ai sensi dell'art. 122 del D.Lgs. 196/2003, del Provvedimento del Garante dell'8 maggio 2014 e delle Linee Guida cookie del 10 giugno 2021, nonché del GDPR UE 2016/679.",
  whatAreCookies:
    "I cookie sono piccoli file di testo che un sito web invia al browser dell'utente durante la navigazione. Vengono memorizzati sul dispositivo e restituiti al sito nelle visite successive, permettendo di riconoscere il browser e ricordare determinate informazioni.",
  minimization:
    'OhMyUniversity utilizza un numero limitato di cookie, selezionati in base al principio di minimizzazione dei dati. Non utilizziamo cookie di profilazione commerciale né cediamo dati a reti pubblicitarie di terze parti.',
};

export const COOKIE_TECHNICAL_INTRO =
  "Questi cookie sono indispensabili per il funzionamento della piattaforma. Non richiedono il consenso dell'utente ai sensi dell'art. 122 comma 1 D.Lgs. 196/2003.";

export const COOKIE_TECHNICAL_TABLE: LegalCookieTable[] = [
  {
    name: 'omu_session',
    purpose:
      "Mantiene la sessione autenticata dell'utente dopo il login SSO, evitando di richiedere nuovamente le credenziali ad ogni pagina",
    duration: 'Sessione (eliminato alla chiusura del browser o al logout)',
  },
  {
    name: 'omu_csrf',
    purpose:
      'Token di sicurezza per la protezione contro attacchi Cross-Site Request Forgery (CSRF)',
    duration: 'Sessione',
  },
  {
    name: 'omu_prefs',
    purpose:
      "Memorizza le preferenze dell'interfaccia selezionate dall'utente (tema chiaro/scuro, lingua)",
    duration: '12 mesi',
  },
];

export const COOKIE_ANALYTICS_INTRO =
  "Utilizziamo cookie analitici in forma aggregata e anonimizzata per capire come gli utenti interagiscono con la piattaforma e migliorarne l'usabilità. L'indirizzo IP viene anonimizzato prima di qualsiasi elaborazione. Questi cookie non consentono l'identificazione del singolo utente.";

export const COOKIE_ANALYTICS_TABLE: LegalCookieTable[] = [
  {
    name: 'omu_analytics',
    purpose:
      'Raccoglie dati anonimi su pagine visitate, durata della sessione e percorsi di navigazione per analisi aggregate interne',
    duration: '6 mesi',
  },
];

export const COOKIE_NOT_USED: string[] = [
  'Cookie di profilazione o targeting pubblicitario',
  'Cookie di social network (Facebook Pixel, LinkedIn Insight Tag, ecc.)',
  'Cookie di terze parti per remarketing o retargeting',
  'Fingerprinting del dispositivo o tecniche di tracciamento alternative',
];

export const COOKIE_MANAGEMENT_TEXT = {
  consentExplanation:
    'I cookie tecnici strettamente necessari (sessione, CSRF, preferenze) non richiedono consenso e non possono essere disabilitati senza compromettere il funzionamento della piattaforma. I cookie analitici anonimizzati sono attivi per impostazione predefinita, ma puoi disattivarli in qualsiasi momento dalle impostazioni del tuo account.',
  browserIntro:
    'Puoi inoltre gestire o eliminare i cookie direttamente dalle impostazioni del tuo browser. Di seguito i link alle istruzioni per i browser più comuni:',
  sessionWarning:
    "Nota: disabilitare i cookie tecnici di sessione impedirà l'accesso alle funzionalità autenticate della piattaforma.",
};

export const COOKIE_BROWSER_LINKS: LegalListItem[] = [
  { label: 'Google Chrome', href: 'https://support.google.com/chrome/answer/95647' },
  {
    label: 'Mozilla Firefox',
    href: 'https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox',
  },
  { label: 'Apple Safari', href: 'https://support.apple.com/it-it/guide/safari/sfri11471/mac' },
  {
    label: 'Microsoft Edge',
    href: 'https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge',
  },
];

export const LEGAL_RELATED_DOCS: LegalListItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy', isExternal: false },
  { label: 'Termini & Condizioni', href: '/termini-condizioni', isExternal: false },
];

// privacy-policy
export const PRIVACY_INTRO = {
  legalBasis:
    'Questa informativa è redatta ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003 (Codice Privacy), come modificato dal D.Lgs. 101/2018.',
  controllerName: 'OhMyOpenSource!',
  controllerDescription:
    'organizzazione no-profit che sviluppa e gestisce la piattaforma OhMyUniversity.',
};

export const PRIVACY_ACADEMIC_USERS = {
  ssoExplanation:
    "L'autenticazione avviene esclusivamente tramite il sistema SSO (Single Sign-On) dell'ateneo di appartenenza dell'utente. Le credenziali inserite vengono trasmesse direttamente al portale istituzionale, senza transitare per i nostri server.",
  dataIntro: "I dati che riceviamo dall'ateneo a seguito di un'autenticazione riuscita sono:",
  dataList: [
    "Identificativo anonimo dell'utente (token SSO)",
    "Nome e cognome (per la personalizzazione dell'interfaccia)",
    'Indirizzo email istituzionale',
    "Ruolo nell'ateneo (studente, docente, staff tecnico-amministrativo)",
    "Dati accademici resi disponibili dall'ateneo (piano di studi, esami, CFU)",
  ] as string[],
};

export const PRIVACY_ORG_USERS_INTRO =
  "Per le organizzazioni che sottoscrivono un piano a pagamento, raccogliamo i dati necessari alla gestione del contratto e dell'accesso:";

export const PRIVACY_ORG_USERS_LIST: string[] = [
  'Ragione sociale e partita IVA (o codice fiscale per i collettivi)',
  'Dati del referente (nome, cognome, email, telefono)',
  'Credenziali di accesso alla piattaforma (email + password hashata)',
  'Dati di fatturazione',
];

export const PRIVACY_ANONYMOUS_USERS =
  'Per i visitatori non autenticati raccogliamo esclusivamente i dati tecnici minimi necessari al funzionamento del sito: indirizzo IP (in forma anonimizzata), tipo di browser e sistema operativo, pagine visitate e durata della sessione.';

export const PRIVACY_PURPOSES_TABLE: LegalTableRow[] = [
  {
    label: 'Autenticazione e gestione della sessione',
    value: 'Art. 6(1)(b) - esecuzione del contratto',
  },
  {
    label: 'Erogazione dei servizi della piattaforma',
    value: 'Art. 6(1)(b) - esecuzione del contratto',
  },
  { label: 'Sicurezza e prevenzione delle frodi', value: 'Art. 6(1)(f) - legittimo interesse' },
  { label: 'Adempimenti fiscali e contabili (aziende)', value: 'Art. 6(1)(c) - obbligo legale' },
  {
    label: 'Comunicazioni di servizio (notifiche, aggiornamenti)',
    value: 'Art. 6(1)(b) - esecuzione del contratto',
  },
  { label: "Analisi aggregate anonime sull'utilizzo", value: 'Art. 6(1)(f) - legittimo interesse' },
];

export const PRIVACY_PURPOSES_NOTE =
  'OhMyUniversity non tratta dati per finalità di marketing, profilazione commerciale o pubblicità comportamentale. I dati non vengono mai venduti a terzi.';

export const PRIVACY_RETENTION_INTRO =
  'I dati sono conservati per il tempo strettamente necessario alle finalità del trattamento:';

export const PRIVACY_RETENTION_LIST: LegalLabeledItem[] = [
  {
    label: 'Dati di sessione',
    text: 'eliminati alla scadenza della sessione o al logout esplicito',
  },
  {
    label: 'Dati account utenti accademici',
    text: "per la durata del rapporto con l'ateneo + 12 mesi",
  },
  {
    label: 'Dati account aziende/collettivi',
    text: 'per la durata del contratto + 10 anni (obblighi fiscali)',
  },
  { label: 'Log di sicurezza', text: '90 giorni' },
];

export const PRIVACY_RIGHTS_INTRO = 'Ai sensi degli artt. 15–22 GDPR, hai il diritto di:';

export const PRIVACY_RIGHTS_LIST: LegalLabeledItem[] = [
  { label: 'Accesso', text: 'ottenere copia dei dati che trattiamo su di te' },
  { label: 'Rettifica', text: 'correggere dati inesatti o incompleti' },
  {
    label: 'Cancellazione',
    text: 'richiedere la cancellazione dei tuoi dati ("diritto all\'oblio")',
  },
  {
    label: 'Portabilità',
    text: 'ricevere i tuoi dati in formato strutturato e leggibile da macchina',
  },
  { label: 'Opposizione', text: 'opporti al trattamento basato su legittimo interesse' },
  {
    label: 'Reclamo',
    text: 'presentare reclamo al Garante per la Protezione dei Dati Personali (garante.it)',
  },
];

export const PRIVACY_RIGHTS_FOOTNOTE =
  'Risponderemo entro 30 giorni dalla ricezione della richiesta.';

export const PRIVACY_SECURITY_TEXT =
  'Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali da accessi non autorizzati, perdita, distruzione o divulgazione. Tra le misure adottate: crittografia dei dati in transito (TLS 1.3), hashing delle password con algoritmi moderni (bcrypt/Argon2), accesso ai sistemi limitato al personale autorizzato, e monitoraggio continuo delle anomalie di sicurezza.';

export const PRIVACY_CHANGES_TEXT =
  "Ci riserviamo il diritto di aggiornare questa informativa. In caso di modifiche sostanziali, gli utenti registrati saranno notificati via email almeno 15 giorni prima dell'entrata in vigore delle modifiche. La versione aggiornata sarà sempre disponibile a questo indirizzo.";

export const PRIVACY_RELATED_DOCS: LegalListItem[] = [
  { label: 'Cookie Policy', href: '/cookie-policy', isExternal: false },
  { label: 'Termini & Condizioni', href: '/termini-condizioni', isExternal: false },
];

// terms-conditions
export const TERMS_INTRO_WARNING =
  "Leggere attentamente prima di utilizzare la piattaforma. L'accesso e l'utilizzo di OhMyUniversity implicano l'accettazione integrale dei presenti termini.";

export const TERMS_DEFINITIONS: LegalLabeledItem[] = [
  { label: 'Piattaforma', text: 'il sito web e le applicazioni mobili OhMyUniversity' },
  {
    label: 'Gestore',
    text: 'OhMyOpenSource!, organizzazione no-profit che sviluppa e gestisce la Piattaforma',
  },
  {
    label: 'Utente accademico',
    text: 'studente, dottorando, docente o personale tecnico-amministrativo che accede tramite SSO del proprio ateneo',
  },
  {
    label: 'Organizzazione',
    text: 'azienda o collettivo studentesco titolare di un piano a pagamento',
  },
  {
    label: 'SSO',
    text: "sistema di autenticazione Single Sign-On gestito dall'ateneo di appartenenza",
  },
  {
    label: 'Contenuti',
    text: 'tutti i dati, testi, grafici, interfacce e funzionalità disponibili sulla Piattaforma',
  },
];

export const TERMS_SERVICE_DESCRIPTION = {
  paragraph1:
    "OhMyUniversity è una piattaforma open source che aggrega e visualizza i dati accademici provenienti dai portali istituzionali degli atenei italiani convenzionati. Il servizio consente agli utenti accademici di consultare in un'unica interfaccia informazioni su esami, piano di studi, CFU, scadenze e statistiche personali.",
  paragraph2:
    'Il servizio è gratuito per gli utenti accademici (studenti, dottorandi, docenti, staff). Le Organizzazioni (aziende e collettivi studenteschi) accedono a funzionalità aggiuntive tramite piani a pagamento disciplinati da un contratto separato.',
  natureTitle: 'Natura del servizio',
  natureText:
    'OhMyUniversity è uno strumento di aggregazione e visualizzazione. Non è un portale universitario ufficiale e non ha potere di modificare dati accademici, risultati di esami o qualsiasi informazione presente nei sistemi degli atenei. In caso di discrepanze, fa sempre fede il portale ufficiale del proprio ateneo.',
};

export const TERMS_ACCESS = {
  academicText:
    "L'accesso avviene esclusivamente tramite il sistema SSO dell'ateneo di appartenenza. L'utente è responsabile della sicurezza delle proprie credenziali istituzionali. OhMyUniversity non ha accesso né memorizza tali credenziali.",
  academicTermination:
    "Il diritto di accesso è subordinato al mantenimento di un rapporto attivo con l'ateneo convenzionato. La cessazione del rapporto (ad es. conclusione degli studi, fine del contratto di docenza) comporta la disattivazione automatica dell'accesso entro i termini previsti dall'accordo con l'ateneo.",
  orgTextBeforeEmail:
    "Le Organizzazioni accedono tramite credenziali proprie create al momento della stipula del contratto. Il referente designato è responsabile della corretta gestione degli accessi all'interno della propria organizzazione. Ogni accesso non autorizzato deve essere segnalato tempestivamente a",
};

export const TERMS_USER_OBLIGATIONS: string[] = [
  'Utilizzare la Piattaforma esclusivamente per finalità lecite e conformi ai presenti Termini',
  'Non tentare di accedere a dati o sezioni della Piattaforma per i quali non si dispone di autorizzazione',
  'Non utilizzare strumenti automatizzati (bot, scraper) per estrarre dati dalla Piattaforma senza autorizzazione scritta',
  "Non compiere azioni che possano compromettere la sicurezza, l'integrità o la disponibilità della Piattaforma",
  'Non condividere le proprie credenziali di accesso con terzi',
  'Segnalare tempestivamente eventuali vulnerabilità di sicurezza al team tramite responsible disclosure',
];

export const TERMS_AVAILABILITY = {
  paragraph1:
    'Il Gestore si impegna a garantire la massima disponibilità della Piattaforma, compatibilmente con le esigenze di manutenzione ordinaria e straordinaria. Non viene garantito un livello minimo di uptime contrattuale per gli utenti accademici gratuiti.',
  paragraph2:
    "La disponibilità dei dati accademici dipende dall'integrazione con i sistemi degli atenei convenzionati. Il Gestore non è responsabile per interruzioni, ritardi o inesattezze nei dati derivanti da malfunzionamenti dei sistemi istituzionali terzi.",
  warning:
    "Importante: i dati visualizzati su OhMyUniversity hanno natura informativa. In caso di discordanza con i sistemi ufficiali dell'ateneo, prevalgono sempre i dati presenti nel portale istituzionale.",
};

export const TERMS_IP = {
  paragraph1:
    "Il codice sorgente di OhMyUniversity è rilasciato con licenza open source (MIT License) e disponibile pubblicamente su GitHub. I contenuti dell'interfaccia, il design e i testi originali sono di proprietà di OhMyOpenSource! e non possono essere riprodotti senza autorizzazione scritta, salvo quanto consentito dalla licenza open source applicabile.",
  paragraph2:
    'I dati accademici visualizzati sulla Piattaforma rimangono di proprietà degli atenei convenzionati e degli utenti a cui si riferiscono. OhMyUniversity non rivendica alcun diritto su tali dati.',
};

export const TERMS_PAID_PLANS = {
  paragraph1:
    "Le condizioni economiche, la durata e i livelli di servizio dei piani a pagamento per Organizzazioni sono disciplinati dal contratto specifico stipulato tra il Gestore e l'Organizzazione. In caso di conflitto tra i presenti Termini e il contratto specifico, prevale quest'ultimo limitatamente alle materie da esso disciplinate.",
  paragraph2:
    "Il mancato pagamento delle somme dovute può comportare la sospensione o la disattivazione dell'accesso dell'Organizzazione, previa comunicazione con preavviso di 15 giorni.",
};

export const TERMS_LIABILITY =
  "Nei limiti consentiti dalla legge applicabile, il Gestore non è responsabile per danni indiretti, incidentali o consequenziali derivanti dall'utilizzo o dall'impossibilità di utilizzo della Piattaforma, inclusa la perdita di dati, interruzioni del servizio o errori nei dati accademici visualizzati.";

export const TERMS_CHANGES =
  "Il Gestore si riserva il diritto di modificare i presenti Termini in qualsiasi momento. Le modifiche sostanziali saranno comunicate agli utenti registrati con almeno 15 giorni di preavviso tramite email o notifica in-app. Il proseguimento dell'utilizzo della Piattaforma successivamente alla data di entrata in vigore delle modifiche costituisce accettazione dei nuovi Termini.";

export const TERMS_JURISDICTION =
  "I presenti Termini sono disciplinati dalla legge italiana. Per qualsiasi controversia derivante dall'interpretazione o dall'esecuzione dei presenti Termini, le parti concordano sulla competenza esclusiva del Foro di Roma, salvo diversa disposizione inderogabile di legge a tutela dei consumatori.";

export const TERMS_RELATED_DOCS: LegalListItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy', isExternal: false },
  { label: 'Cookie Policy', href: '/cookie-policy', isExternal: false },
];
