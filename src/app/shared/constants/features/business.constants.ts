import {
  LucideTarget,
  LucideClipboardList,
  LucideInbox,
  LucideChartColumn,
  LucideBadgeCheck,
  LucideLink2,
  LucideDrama,
  LucideTrophy,
  LucideVote,
  LucideMegaphone,
  LucideBriefcase,
  LucideGraduationCap,
  LucideEye,
  LucideMousePointerClick,
  LucideTrendingUp,
  LucideSchool,
  LucideBuilding2,
  LucideHandshake,
  LucideMail,
  LucideMessageCircle,
} from '@lucide/angular';
import {
  AnalyticsMetric,
  ContactChannel,
  Differentiator,
  OfferCard,
  OnboardingStep,
  Requirement,
  Step,
  TargetingOption,
  UseCase,
  UserTypeBusiness,
} from '@types';

// business-visibilita.page.ts
export const BUSINESS_VISIBILITA_STEPS: Step[] = [
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

export const BUSINESS_TARGETING_OPTIONS: TargetingOption[] = [
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

export const PLAN_LABELS: Record<string, string> = {
  tutti: 'Tutti i piani',
  professional: 'Professional+',
  enterprise: 'Enterprise',
};

export const PLAN_COLORS: Record<string, string> = {
  tutti: 'bg-green-100 text-green-700',
  professional: 'bg-blue-100 text-blue-700',
  enterprise: 'bg-purple-100 text-purple-700',
};

export const BUSINESS_ANALYTICS_METRICS: AnalyticsMetric[] = [
  {
    icon: LucideEye,
    label: 'Visualizzazioni',
    desc: 'Quanti studenti hanno visto la tua opportunità',
    variant: 'info',
  },
  {
    icon: LucideMousePointerClick,
    label: 'Click sul profilo',
    desc: 'Quanti hanno cliccato per saperne di più',
    variant: 'secondary',
  },
  {
    icon: LucideInbox,
    label: 'Candidature ricevute',
    desc: 'Quanti hanno inviato la loro candidatura',
    variant: 'success',
  },
  {
    icon: LucideTrendingUp,
    label: 'Tasso di conversione',
    desc: 'Rapporto tra visualizzazioni e candidature',
    variant: 'tertiary',
  },
];

// business-registrazione.page.ts
export const BUSINESS_REGISTRAZIONE_STEPS: OnboardingStep[] = [
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

export const BUSINESS_REGISTRAZIONE_REQUIREMENTS: Requirement[] = [
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

export const BUSINESS_REGISTRAZIONE_FAQ = [
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

// business-offerta.page.ts
export const BUSINESS_OFFERS: OfferCard[] = [
  {
    icon: LucideTarget,
    title: 'Visibilità mirata sugli studenti giusti',
    description:
      'Raggiungi studenti filtrati per ateneo, facoltà, corso di laurea e anno. Non sprechi budget su chi non è il tuo target - ogni impression conta.',
  },
  {
    icon: LucideClipboardList,
    title: 'Pubblicazione di opportunità',
    description:
      'Stage, tirocini, lavoro part-time, graduate program, eventi aziendali. Pubblica qualsiasi tipo di opportunità con un editor semplice e professionale.',
  },
  {
    icon: LucideInbox,
    title: 'Raccolta candidature integrata',
    description:
      "Gli studenti si candidano direttamente in-app. Ricevi CV, lettere di presentazione e portfolio in un'unica dashboard - niente email sparse.",
  },
  {
    icon: LucideChartColumn,
    title: 'Analytics in tempo reale',
    description:
      'Visualizzazioni, click, candidature ricevute, tasso di conversione. Sai esattamente quanto sta funzionando ogni opportunità pubblicata.',
  },
  {
    icon: LucideBadgeCheck,
    title: 'Profilo verificato e credibile',
    description:
      "Il badge di verifica OhMyUniversity comunica agli studenti che sei un'organizzazione reale e affidabile. Niente profili fasulli o spam.",
  },
  {
    icon: LucideLink2,
    title: 'Integrazione con i tuoi sistemi',
    description:
      'Puoi reindirizzare le candidature verso il tuo ATS o portale HR esistente. OhMyUniversity si adatta al tuo flusso, non il contrario.',
  },
];

export const BUSINESS_DIFFERENTIATORS: Differentiator[] = [
  {
    icon: LucideBadgeCheck,
    title: 'Audience in contesto accademico',
    description:
      'Quando uno studente vede la tua opportunità su OhMyUniversity è appena entrato in app per controllare i suoi voti o il piano di studi. Non sta navigando distrattamente - è in una mindset universitaria attiva.',
  },
  {
    icon: LucideBadgeCheck,
    title: 'Zero pubblicità, zero rumore',
    description:
      'OhMyUniversity non ha banner, pop-up o feed infiniti. Le tue opportunità sono presentate in modo pulito e professionale, senza competere con altre distrazioni.',
  },
  {
    icon: LucideBadgeCheck,
    title: 'Dati accademici reali',
    description:
      "Grazie all'integrazione con i portali universitari, sappiamo con precisione in quale anno è lo studente, quale corso frequenta e quanti CFU ha maturato. Il targeting è basato su dati reali, non dichiarazioni.",
  },
];

// business-contatti.page.ts
export const BUSINESS_USER_TYPES: UserTypeBusiness[] = [
  {
    icon: LucideGraduationCap,
    title: 'Studente o Dottorando',
    description:
      'Non devi creare nessun account. Accedi direttamente con le credenziali del tuo ateneo tramite SSO. OhMyUniversity legge i tuoi dati accademici in automatico - nessuna registrazione, nessun form da compilare.',
    action: 'Vai al login',
    actionLink: '/login',
    isExternal: false,
    highlight: false,
  },
  {
    icon: LucideSchool,
    title: 'Docente o Staff tecnico-amministrativo',
    description:
      'Come per gli studenti, accedi con le credenziali istituzionali del tuo ateneo tramite SSO. Il tuo ruolo (docente, ricercatore, staff) viene riconosciuto automaticamente dal sistema del tuo ateneo.',
    action: 'Vai al login',
    actionLink: '/login',
    isExternal: false,
    highlight: false,
  },
  {
    icon: LucideBuilding2,
    title: 'Azienda',
    description:
      'Le aziende non possono registrarsi in autonomia. Il processo è assistito dal nostro team commerciale: ci contatti, facciamo una breve chiamata conoscitiva, e attiviamo il tuo account con 14 giorni di prova gratuita.',
    action: 'Contattaci per iniziare',
    actionLink: '/contatti?tab=organization',
    isExternal: false,
    highlight: true,
  },
  {
    icon: LucideHandshake,
    title: 'Collettivo studentesco',
    description:
      'Come per le aziende, i collettivi accedono tramite un account dedicato creato dal nostro team. I collettivi universitari documentati ricevono il 40% di sconto su tutti i piani. Contattaci per iniziare.',
    action: 'Contattaci per iniziare',
    actionLink: '/contatti?tab=organization',
    isExternal: false,
    highlight: true,
  },
];

export const BUSINESS_CONTACT_CHANNELS: ContactChannel[] = [
  {
    icon: LucideMail,
    title: 'Email commerciale',
    description:
      'Per richieste di account azienda o collettivo. Risposta entro 2 giorni lavorativi.',
    value: 'business@ohmyuniversity.it',
    href: 'mailto:business@ohmyuniversity.it',
  },
  {
    icon: LucideMessageCircle,
    title: 'Email supporto generale',
    description: 'Per domande tecniche, bug report o feedback sul prodotto.',
    value: 'hello@ohmyuniversity.it',
    href: 'mailto:hello@ohmyuniversity.it',
  },
];

export const BUSINESS_GITHUB_CHANNEL = {
  title: 'GitHub',
  description: 'Per segnalare bug, proporre feature o contribuire al codice open source.',
  value: 'github.com/ohmyopensource',
  href: 'https://github.com/ohmyopensource',
};

export const BUSINESS_ONBOARDING_STEPS: string[] = [
  'Ci invii una email con il nome della tua organizzazione e una breve descrizione',
  'Il nostro team ti contatta entro 2 giorni lavorativi per una chiamata conoscitiva',
  'Scegliamo insieme il piano più adatto alle tue esigenze',
  'Attiviamo i 14 giorni di prova gratuita e ti inviamo le credenziali',
  'Compili il profilo pubblico della tua organizzazione e pubblichi la prima opportunità',
];

// business-collettivi.page.ts
export const USE_CASES: UseCase[] = [
  {
    icon: LucideDrama,
    title: 'Associazioni culturali e ricreative',
    description:
      'Promuovi eventi, spettacoli, mostre e attività culturali agli studenti del tuo ateneo o di atenei vicini. Raggiungi chi è già interessato alla vita universitaria extracurriculare.',
  },
  {
    icon: LucideTrophy,
    title: 'Gruppi sportivi universitari',
    description:
      'Cerca nuovi atleti e appassionati tra gli studenti. Pubblica le tue sessioni di allenamento, i tornei e le selezioni per entrare nella squadra.',
  },
  {
    icon: LucideVote,
    title: 'Liste e rappresentanze studentesche',
    description:
      'Comunica con la tua base elettorale, promuovi le tue proposte e raggiungi studenti per le campagne elettorali universitarie in modo diretto e trasparente.',
  },
  {
    icon: LucideMegaphone,
    title: 'Gruppi di attivismo e volontariato',
    description:
      "Mobilita studenti per cause sociali, campagne di sensibilizzazione e progetti di volontariato. L'audience universitaria è tra le più reattive e coinvolgibili.",
  },
  {
    icon: LucideBriefcase,
    title: 'Startup e team in cerca di co-founder',
    description:
      'Stai costruendo qualcosa e cerchi collaboratori universitari? Pubblica la tua call, descrivi il progetto e attira persone motivate e con skill specifiche.',
  },
  {
    icon: LucideGraduationCap,
    title: 'Alumni e community post-laurea',
    description:
      'Mantieni vivo il legame con il tuo ateneo. Organizza eventi, mentorship e networking tra ex studenti e studenti attivi.',
  },
];

export const VANTAGGI: string[] = [
  'Piano Starter da 9,90€/mese - pensato per realtà piccole con budget limitato',
  'Sconto del 40% per collettivi studenteschi e organizzazioni no-profit documentate',
  'Targeting per ateneo specifico - parla solo agli studenti della tua università',
  'Nessuna competenza tecnica richiesta - pubblica un evento in meno di 5 minuti',
  '14 giorni di prova gratuita senza carta di credito',
];
