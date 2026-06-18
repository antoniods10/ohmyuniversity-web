import {
  AreaCorso,
  AutovalutazioneItem,
  CfuDataPoint,
  Consiglio,
  ConsiglioCorso,
  Differenza,
  Errore,
  SboccoArea,
  SboccoDataPoint,
  SessioneInfo,
  TempoSlice,
  TestIngresso,
  TipoEsame,
  TopicModel,
  VitaFuorisedeItem,
  AccessType,
  CittaTop,
  AreaGeoInfo,
} from '@types';

export const ORIENTATION_TOPICS: TopicModel[] = [
  {
    id: 'corso',
    title: 'Scegli il corso adatto a te',
    subtitle: 'Materie, aree, sedi - come orientarsi',
    questions: [
      {
        id: 'corso-area',
        topicId: 'corso',
        text: 'Quale area di studio ti attira di più?',
        type: 'single-select',
        required: true,
        options: [
          { value: 'umanistica', label: '📚 Umanistica' },
          { value: 'scientifica', label: '🔬 Scientifica' },
          { value: 'ingegneria', label: '💻 Ingegneria & Informatica' },
          { value: 'economica', label: '⚖️ Economica & Giuridica' },
          { value: 'sanitaria', label: '🏥 Sanitaria' },
          { value: 'artistica', label: '🎨 Artistica & del Design' },
        ],
      },
    ],
  },
  {
    id: 'quiz',
    title: "Accesso all'università",
    subtitle: "TOLC, test d'ingresso e modalità di accesso",
    questions: [
      {
        id: 'quiz-access-type',
        topicId: 'quiz',
        text: 'Hai già in mente se affrontare un corso a numero chiuso o preferiresti uno ad accesso libero?',
        type: 'single-select',
        required: true,
        options: [
          { value: 'restricted', label: 'Voglio provare un corso a numero chiuso' },
          { value: 'free', label: 'Preferisco un corso ad accesso libero' },
          { value: 'undecided', label: 'Non ho ancora deciso' },
        ],
      },
      {
        id: 'quiz-tolc-done',
        topicId: 'quiz',
        text: 'Hai già sostenuto un TOLC?',
        type: 'single-select',
        required: false,
        options: [
          { value: 'yes', label: "Sì, l'ho già sostenuto" },
          { value: 'no-planning', label: 'No, ma ho intenzione di farlo' },
          { value: 'no-unsure', label: 'Non ancora, devo capire quale fare' },
        ],
      },
      {
        id: 'quiz-tolc-type',
        topicId: 'quiz',
        text: 'Quale TOLC hai sostenuto o stai pianificando?',
        type: 'single-select',
        required: false,
        options: [
          { value: 'tolc-med', label: 'TOLC-MED - Medicina e professioni sanitarie' },
          { value: 'tolc-i', label: 'TOLC-I - Ingegneria' },
          { value: 'tolc-e', label: 'TOLC-E - Economia' },
          { value: 'tolc-s', label: 'TOLC-S - Scienze' },
          { value: 'tolc-su', label: 'TOLC-SU - Scienze Umane' },
          { value: 'tolc-f', label: 'TOLC-F - Farmacia' },
        ],
      },
    ],
  },
  {
    id: 'come-funziona',
    title: "Come funziona l'università",
    subtitle: 'CFU, esami, sessioni e autonomia',
    questions: [
      {
        id: 'come-funziona-study-style',
        topicId: 'come-funziona',
        text: 'Come preferisci organizzare il tuo studio?',
        type: 'single-select',
        required: true,
        options: [
          { value: 'continuous', label: 'Seguo le lezioni e studio subito dopo' },
          { value: 'binge', label: 'Studio tutto prima degli esami' },
          { value: 'unsure', label: 'Non lo so ancora, devo capire come funziona' },
        ],
      },
      {
        id: 'come-funziona-esami',
        topicId: 'come-funziona',
        text: 'Che tipo di esame preferisci?',
        type: 'single-select',
        required: false,
        options: [
          { value: 'oral', label: 'Orale - mi esprimo meglio a voce' },
          { value: 'written', label: 'Scritto - preferisco ragionare sul foglio' },
          { value: 'mixed', label: 'Misto - dipende dalla materia' },
        ],
      },
      {
        id: 'come-funziona-autonomy',
        topicId: 'come-funziona',
        text: "Come ti senti rispetto all'autonomia che richiede l'università?",
        type: 'single-select',
        required: false,
        options: [
          { value: 'ready', label: 'Mi sento pronto/a a gestirmi da solo' },
          { value: 'nervous', label: 'Ho qualche preoccupazione ma voglio provarci' },
          { value: 'unsure', label: 'Ho bisogno di capire meglio cosa mi aspetta' },
        ],
      },
    ],
  },
  {
    id: 'vita',
    title: 'Orari e impegno',
    subtitle: 'Come si struttura la settimana, studio individuale e lavoro',
    questions: [
      {
        id: 'vita-study-hours',
        topicId: 'vita',
        text: 'Quante ore al giorno pensi di poter dedicare allo studio individuale, oltre alle lezioni?',
        type: 'single-select',
        required: true,
        options: [
          { value: 'less-2', label: 'Meno di 2 ore' },
          { value: '2-4', label: '2–4 ore' },
          { value: 'more-4', label: 'Più di 4 ore' },
          { value: 'unsure', label: 'Non ci ho ancora pensato' },
        ],
      },
      {
        id: 'vita-work',
        topicId: 'vita',
        text: 'Pensi di lavorare mentre studi?',
        type: 'single-select',
        required: false,
        options: [
          { value: 'yes', label: 'Sì, ho già un lavoro part-time' },
          { value: 'maybe', label: 'Forse, dipende dalle esigenze' },
          { value: 'no', label: 'No, voglio concentrarmi solo sullo studio' },
        ],
      },
    ],
  },
  {
    id: 'sbocchi',
    title: 'Sbocchi lavorativi',
    subtitle: 'Occupazione e stipendi per area di studio',
    questions: [
      {
        id: 'sbocchi-career-priority',
        topicId: 'sbocchi',
        text: 'Cosa conta di più per te nel lavoro che vorresti fare?',
        type: 'single-select',
        required: true,
        options: [
          { value: 'stability', label: 'La stabilità e la sicurezza economica' },
          { value: 'growth', label: 'La possibilità di crescere e fare carriera' },
          { value: 'passion', label: 'Fare qualcosa che mi appassiona davvero' },
          { value: 'impact', label: "L'impatto sociale o ambientale del mio lavoro" },
        ],
      },
      {
        id: 'sbocchi-work-context',
        topicId: 'sbocchi',
        text: 'In che tipo di ambiente ti immagini a lavorare?',
        type: 'single-select',
        required: false,
        options: [
          { value: 'big-company', label: 'Grande azienda o multinazionale' },
          { value: 'startup', label: 'Piccola impresa o startup' },
          { value: 'public', label: 'Settore pubblico o enti statali' },
          { value: 'freelance', label: 'Libera professione o lavoro autonomo' },
        ],
      },
    ],
  },
  {
    id: 'borse-studio',
    title: 'Budget e costi reali',
    subtitle: 'Costi universitari, vita da studente e gestione del budget',
    questions: [
      {
        id: 'budget-availability',
        topicId: 'borse-studio',
        text: 'Come descriveresti la tua disponibilità economica per gli anni universitari?',
        type: 'single-select',
        required: true,
        options: [
          { value: 'good', label: 'Ho una buona disponibilità, posso coprire le spese' },
          {
            value: 'limited',
            label: 'Ho una disponibilità limitata, dovrò gestirmi con attenzione',
          },
          { value: 'support', label: 'Avrò bisogno di supporto esterno (borse, lavoro, famiglia)' },
          { value: 'unsure', label: 'Non ho ancora fatto i conti' },
        ],
      },
      {
        id: 'budget-monthly',
        topicId: 'borse-studio',
        text: "Hai già un'idea di quanto budget mensile potresti avere a disposizione da studente?",
        type: 'single-select',
        required: false,
        options: [
          { value: 'less-400', label: 'Meno di 400 €/mese' },
          { value: '400-700', label: 'Tra 400 e 700 €/mese' },
          { value: '700-1000', label: 'Tra 700 e 1.000 €/mese' },
          { value: 'more-1000', label: 'Più di 1.000 €/mese' },
        ],
      },
    ],
  },
  {
    id: 'costi-geografici',
    title: 'Dove studiare in Italia',
    subtitle: 'Aree geografiche, qualità della vita e costi per regione',
    questions: [
      {
        id: 'geo-area-preference',
        topicId: 'costi-geografici',
        text: 'Hai già in mente in quale area geografica vorresti studiare?',
        type: 'single-select',
        required: true,
        options: [
          { value: 'nord', label: 'Nord - grandi città, più opportunità' },
          { value: 'centro', label: 'Centro - equilibrio tra costi e servizi' },
          { value: 'sud', label: 'Sud e Isole - costi bassi, vita più tranquilla' },
          { value: 'no-pref', label: 'Non ho preferenze geografiche' },
        ],
      },
      {
        id: 'geo-city-priority',
        topicId: 'costi-geografici',
        text: 'Cosa conta di più per te nella scelta della città universitaria?',
        type: 'single-select',
        required: false,
        options: [
          { value: 'proximity', label: 'La vicinanza a casa' },
          { value: 'job-market', label: 'Le opportunità lavorative nella zona' },
          { value: 'cost', label: 'Il costo della vita' },
          { value: 'social-life', label: 'La vivacità culturale e sociale' },
        ],
      },
    ],
  },
  {
    id: 'errori',
    title: 'Errori comuni da evitare',
    subtitle: 'Le trappole in cui cadono quasi tutti',
    questions: [
      {
        id: 'errori-confronto',
        topicId: 'errori',
        text: 'Hai già parlato con studenti universitari del corso che ti interessa?',
        type: 'yes-no',
        required: false,
      },
    ],
  },
];

// ============================================================================
// topic-vita.component.ts
// ============================================================================

export const VITA_TEMPO_SLICES: TempoSlice[] = [
  { label: 'Lezioni', percent: 30, color: '#3b82f6' },
  { label: 'Studio individuale', percent: 35, color: '#60a5fa' },
  { label: 'Tempo libero / sport', percent: 20, color: '#bfdbfe' },
  { label: 'Lavori domestici / commissioni', percent: 10, color: '#dbeafe' },
  { label: 'Altro', percent: 5, color: '#e5e7eb' },
];

export const VITA_CONSIGLI_ORARI: Consiglio[] = [
  {
    titolo: 'Gli orari non sono come al liceo',
    testo:
      'Le lezioni non coprono tutta la mattina. Potresti avere 2 ore di lezione alle 9 e poi niente fino alle 15. Questi "buchi" vanno riempiti con lo studio - non sono tempo libero.',
  },
  {
    titolo: 'Lezioni spezzate su più giorni',
    testo:
      'Un corso da 9 CFU può avere 3 ore di lezione distribuite su 3 giorni diversi. Impara a leggere il piano orario e costruisci una routine settimanale stabile.',
  },
];

export const VITA_CONSIGLI_STUDIO: Consiglio[] = [
  {
    titolo: 'Studia subito dopo la lezione',
    testo:
      'Le ricerche cognitive mostrano che ripassare entro 24h dalla lezione aumenta la ritenzione a lungo termine del 60%. Non aspettare la sessione.',
  },
  {
    titolo: "Non studiare solo prima dell'esame",
    testo:
      'Il "binge studying" funziona per superare l\'esame, ma non per ricordarlo. Se vuoi costruire competenze reali (e reggere una laurea magistrale), studia in modo distribuito.',
  },
];

export const VITA_FUORISEDE: VitaFuorisedeItem[] = [
  { voce: 'Affitto camera singola (media nazionale)', importo: '400–600 €/mese' },
  { voce: 'Spesa alimentare', importo: '150–250 €/mese' },
  { voce: 'Utenze (quota parte)', importo: '50–80 €/mese' },
  { voce: 'Trasporti', importo: '30–60 €/mese' },
  { voce: 'Totale stimato', importo: '630–990 €/mese' },
];

// ============================================================================
// topic-sbocchi.component.ts
// ============================================================================

export const SBOCCHI_AREE: SboccoArea[] = [
  { area: 'Ingegneria & Informatica', occupazione1anno: 85, stipendioMedio: '1.450–1.800 €' },
  { area: 'Economia & Management', occupazione1anno: 72, stipendioMedio: '1.200–1.500 €' },
  { area: 'Sanitaria & Medicina', occupazione1anno: 78, stipendioMedio: '1.400–2.100 €' },
  { area: 'Scientifica', occupazione1anno: 65, stipendioMedio: '1.200–1.600 €' },
  { area: 'Giuridica', occupazione1anno: 52, stipendioMedio: '1.000–1.400 €' },
  { area: 'Umanistica & Sociale', occupazione1anno: 48, stipendioMedio: '950–1.250 €' },
];

export const SBOCCHI_CONSIGLI: Consiglio[] = [
  {
    titolo: 'I dati sono indicativi - il contesto conta',
    testo:
      'Un laureato in Lettere con esperienze, lingue e soft skills può guadagnare più di un laureato in Ingegneria senza iniziativa. I dati danno una media, non un destino.',
  },
  {
    titolo: 'Controlla AlmaLaurea prima di scegliere',
    testo:
      'AlmaLaurea è il database ufficiale italiano sugli esiti occupazionali dei laureati. Prima di iscriverti, cerca il tuo corso specifico: vedrai stipendi reali e tassi di occupazione per ateneo.',
  },
  {
    titolo: 'Magistrale vs Triennale nel mercato del lavoro',
    testo:
      'In molti settori tecnici la magistrale è quasi obbligatoria per accedere a posizioni senior. In altri (comunicazione, design, commerciale) la triennale con esperienze pratiche basta e avanza.',
  },
];

// ============================================================================
// topic-quiz.component.ts
// ============================================================================

export const QUIZ_TESTS_ESMPIO: TestIngresso[] = [
  {
    ateneo: 'Vari atenei',
    corso: 'Medicina e Chirurgia',
    tipo: 'TOLC-MED',
    argomenti: [
      'Biologia',
      'Chimica',
      'Fisica e Matematica',
      'Ragionamento logico',
      'Comprensione del testo',
    ],
    link: '#',
  },
  {
    ateneo: 'Vari atenei',
    corso: 'Ingegneria',
    tipo: 'TOLC-I',
    argomenti: ['Matematica', 'Logica', 'Scienze', 'Comprensione verbale'],
    link: '#',
  },
  {
    ateneo: 'Vari atenei',
    corso: 'Economia',
    tipo: 'TOLC-E',
    argomenti: ['Matematica', 'Comprensione verbale', 'Logica', 'Inglese'],
    link: '#',
  },
  {
    ateneo: 'Vari atenei',
    corso: 'Scienze (bio, chim, farm)',
    tipo: 'TOLC-S',
    argomenti: ['Biologia', 'Chimica', 'Matematica e Fisica', 'Ragionamento logico'],
    link: '#',
  },
];

export const QUIZ_AUTOVALUTAZIONE: AutovalutazioneItem[] = [
  {
    domanda: 'Ti piace risolvere problemi matematici?',
    rilevante: 'Ingegneria, Economia, Scienze',
  },
  {
    domanda: 'Ti appassiona il funzionamento del corpo umano?',
    rilevante: 'Medicina, Biologia, Farmacia',
  },
  {
    domanda: 'Ti piace scrivere e analizzare testi?',
    rilevante: 'Lettere, Giurisprudenza, Comunicazione',
  },
  { domanda: 'Ami costruire o progettare cose?', rilevante: 'Ingegneria, Architettura, Design' },
  {
    domanda: 'Ti interessano le dinamiche sociali ed economiche?',
    rilevante: 'Economia, Sociologia, Scienze Politiche',
  },
];

// ============================================================================
// topic-errori.component.ts
// ============================================================================

export const ERRORI_ORIENTAMENTO: Errore[] = [
  {
    emoji: '👗',
    titolo: 'Scegliere per moda',
    perche:
      'Psicologia, Marketing, Criminologia - ogni anno ci sono corsi "di tendenza" che attirano migliaia di iscritti. La domanda è: ti piace davvero quella materia, o stai seguendo un trend?',
    soluzione:
      'Fai una settimana di lezioni aperte (molti atenei le offrono) prima di iscriverti. Se le lezioni ti annoiano già al primo giorno, cambia rotta.',
  },
  {
    emoji: '👫',
    titolo: 'Seguire gli amici',
    perche:
      "Iscriversi dove va il gruppo di amici sembra rassicurante. Ma dopo 6 mesi, se il corso non ti piace, l'amicizia non basta come motivazione per alzarsi la mattina e studiare.",
    soluzione:
      'Valuta separatamente cosa vorresti fare tu. Puoi sempre restare in contatto con gli amici anche studiando in città diverse.',
  },
  {
    emoji: '➗',
    titolo: 'Sottovalutare matematica e teoria',
    perche:
      'Molti si iscrivono a Economia, Informatica o Ingegneria pensando "non mi piaceva al liceo ma ora sarà diverso". Di solito non è diverso - anzi, il livello sale.',
    soluzione:
      'Prima di iscriverti, guarda i programmi del primo anno. Se vedi Analisi Matematica, Fisica o Statistica, assicurati di avere le basi - o preparati a costruirle prima.',
  },
  {
    emoji: '📋',
    titolo: 'Non informarsi sugli esami',
    perche:
      'Scoprire a novembre che il tuo corso ha 8 esami scritti nel primo semestre, tutti con propedeuticità obbligatorie, è un brutto momento per sapere una cosa del genere.',
    soluzione:
      'Prima di iscriverti, leggi il piano di studi completo. Cerca le recensioni degli esami su Studentville, UniWiki o nei gruppi Telegram del corso. Chiedi agli studenti del secondo anno.',
  },
  {
    emoji: '📍',
    titolo: 'Ignorare il fattore sede',
    perche:
      'Scegliere un corso solo perché è "il migliore in classifica" senza considerare i costi di vita, la lontananza dalla famiglia e la qualità dei servizi locali è un errore comune.',
    soluzione:
      'Valuta il costo totale (affitto + vitto + trasporti) e chiediti se reggi mentalmente la distanza. Un ateneo leggermente meno quotato ma più accessibile può darti un risultato migliore.',
  },
  {
    emoji: '⏳',
    titolo: 'Non considerare i tempi reali di laurea',
    perche:
      'In Italia la media effettiva di completamento di una triennale è 4,2 anni, non 3. Fuori corso si ritrovano studenti motivati che semplicemente non hanno gestito bene il carico.',
    soluzione:
      "Pianifica da subito. Già dal secondo semestre del primo anno dovresti avere un'idea di quanti esami stai riuscendo a sostenere a sessione. Aggiusta il ritmo prima che diventi un problema cronico.",
  },
];

// ============================================================================
// topic-corso.component.ts
// ============================================================================

export const CORSO_AREE: AreaCorso[] = [
  { label: 'Umanistica', emoji: '📚', esempi: 'Lettere, Filosofia, Storia, Lingue' },
  { label: 'Scientifica', emoji: '🔬', esempi: 'Biologia, Chimica, Fisica, Matematica' },
  { label: 'Ingegneria & Informatica', emoji: '💻', esempi: 'Informatica, Elettronica, Meccanica' },
  { label: 'Economica & Giuridica', emoji: '⚖️', esempi: 'Economia, Giurisprudenza, Management' },
  { label: 'Sanitaria', emoji: '🏥', esempi: 'Medicina, Infermieristica, Farmacia' },
  {
    label: 'Artistica & del Design',
    emoji: '🎨',
    esempi: 'Architettura, Design, DAMS, Belle Arti',
  },
];

export const CORSO_CONSIGLI: ConsiglioCorso[] = [
  {
    titolo: 'Parti dalle materie che ami davvero',
    testo:
      'Non scegliere un corso perché "sbocca bene" se le materie ti annoiano. La motivazione intrinseca è il fattore numero uno nel completare gli studi nei tempi.',
  },
  {
    titolo: 'Considera la sede geografica',
    testo:
      'Studiare lontano da casa ha costi e benefici reali: indipendenza, rete di contatti più ampia, ma anche affitto, distanza dalla famiglia e maggiore autogestione richiesta.',
  },
  {
    titolo: 'Triennale vs magistrale',
    testo:
      'La triennale da sola apre già molte porte. Non è obbligatorio proseguire con la magistrale - dipende dal settore. Valuta entrambe le opzioni prima di scegliere il percorso.',
  },
  {
    titolo: 'Open day e visite in ateneo',
    testo:
      'Prima di iscriverti, vai a un open day. Parla con gli studenti del corso che ti interessa, non solo con i professori. Loro ti diranno la verità su carichi, esami e organizzazione.',
  },
];

// ============================================================================
// topic-come-funziona.component.ts
// ============================================================================

export const COME_FUNZIONA_DIFFERENZE: Differenza[] = [
  {
    aspetto: 'Frequenza',
    scuola: 'Obbligatoria, controllata ogni giorno',
    universita: 'Spesso facoltativa - sei tu a scegliere',
  },
  {
    aspetto: 'Verifiche',
    scuola: "Continue, distribuite durante l'anno",
    universita: "Concentrate nelle sessioni d'esame",
  },
  {
    aspetto: 'Supporto',
    scuola: 'Prof. seguono ogni studente individualmente',
    universita: 'Autonomia totale - chiedi tu se hai bisogno',
  },
  {
    aspetto: 'Ritmo',
    scuola: "Scandito dall'istituto, poco flessibile",
    universita: 'Gestisci tu il piano e i tempi',
  },
];

export const COME_FUNZIONA_TIPI_ESAME: TipoEsame[] = [
  {
    tipo: 'Scritto',
    descrizione:
      'Svolto in aula in un tempo definito. Può essere a risposta aperta, a scelta multipla o misto.',
    icon: '✍️',
  },
  {
    tipo: 'Orale',
    descrizione:
      'Colloquio con il docente. Valuta la comprensione profonda degli argomenti, non solo la memorizzazione.',
    icon: '🎤',
  },
  {
    tipo: 'Scritto + Orale',
    descrizione:
      "Prima si supera lo scritto (spesso con voto minimo), poi si sostiene l'orale per definire il voto finale.",
    icon: '📋',
  },
  {
    tipo: 'Progetto / Elaborato',
    descrizione:
      'Comune nei corsi tecnici e del design. Si consegna un elaborato e spesso lo si discute davanti alla commissione.',
    icon: '📁',
  },
];

export const COME_FUNZIONA_SESSIONI: SessioneInfo[] = [
  { label: 'Sessione invernale', periodo: 'Gennaio – Febbraio', note: 'Esami del primo semestre' },
  { label: 'Sessione estiva', periodo: 'Giugno – Luglio', note: 'Esami del secondo semestre' },
  { label: 'Sessione autunnale', periodo: 'Settembre', note: 'Recupero e straordinari' },
];

export const COME_FUNZIONA_TIPS: Consiglio[] = [
  {
    titolo: 'Costruisci una routine fin dal primo mese',
    testo:
      "I primi 30 giorni definiscono le abitudini per il resto dell'anno. Stabilisci subito orari fissi di studio - anche 2 ore al giorno dopo le lezioni fanno una differenza enorme a sessione.",
  },
  {
    titolo: 'Non aspettare la sessione per studiare',
    testo:
      "Chi studia in modo distribuito durante il semestre arriva agli esami con il 70% del materiale già consolidato. Chi aspetta l'ultima settimana parte già in svantaggio.",
  },
  {
    titolo: 'Chiedi aiuto prima che sia tardi',
    testo:
      'I ricevimenti dei professori esistono per questo. Se non capisci un argomento a ottobre, non aspettare gennaio per scoprirlo. La maggior parte degli studenti non usa mai i ricevimenti - tu fallo.',
  },
];

// ============================================================================
// topic-borse-studio.component.ts
// ============================================================================

export interface BorsaTipo {
  titolo: string;
  ente: string;
  requisiti: string;
  importoIndicativo: string;
  nota: string;
}

export interface BorsaFaq {
  domanda: string;
  risposta: string;
}

export const BORSE_TIPI: BorsaTipo[] = [
  {
    titolo: 'Borsa di studio DSU regionale',
    ente: 'ADISU / DSU regionale',
    requisiti:
      'ISEE sotto soglia (varia per regione, solitamente sotto 24–26k €) + requisiti di merito dopo il primo anno',
    importoIndicativo: '2.000–5.500 €/anno (+ posto letto in residenza)',
    nota: 'La borsa copre anche la mensa e spesso il vitto. Va richiesta ogni anno entro luglio–agosto, prima ancora di iscriversi.',
  },
  {
    titolo: 'Esonero totale o parziale dalle tasse',
    ente: 'Ateneo direttamente',
    requisiti: "ISEE sotto soglia definita dall'ateneo (spesso 20–30k €)",
    importoIndicativo: 'Risparmio da 500 a 3.000 €/anno',
    nota: 'Molti atenei azzerano le tasse per ISEE sotto i 13k €. Controlla il regolamento tasse del tuo ateneo specifico.',
  },
  {
    titolo: 'Borsa per merito',
    ente: 'Ateneo, fondazioni bancarie, privati',
    requisiti: 'Voto di maturità elevato (solitamente 100/100) o media universitaria alta',
    importoIndicativo: '500–3.000 €/anno',
    nota: "Alcune fondazioni (es. Cariplo, CRT, Monte dei Paschi) erogano borse indipendenti dall'ISEE.",
  },
  {
    titolo: 'Posto in residenza universitaria',
    ente: 'ADISU / DSU regionale',
    requisiti: 'Stessa soglia ISEE della borsa DSU + residenza fuori comune sede ateneo',
    importoIndicativo: '80–200 €/mese (vs 400–600 € del mercato libero)',
    nota: 'I posti sono limitati e molto richiesti. Presentare domanda il prima possibile aumenta le probabilità.',
  },
];

export const BORSE_FAQ: BorsaFaq[] = [
  {
    domanda: 'Non so il mio ISEE - devo aspettare per iscrivermi?',
    risposta:
      "No. Puoi iscriverti e poi presentare l'ISEE entro le scadenze dell'ateneo (solitamente entro dicembre del primo anno). Tuttavia per la borsa DSU la domanda va fatta prima dell'iscrizione - controlla le date del tuo ente regionale.",
  },
  {
    domanda: 'Ho già perso la scadenza per la borsa DSU - cosa posso fare?',
    risposta:
      "Alcuni enti regionali aprono una seconda finestra (graduatoria supplementare) tra settembre e ottobre. Controlla il sito dell'ADISU della tua regione. Puoi comunque richiedere l'esonero tasse direttamente all'ateneo.",
  },
  {
    domanda: 'La borsa si rinnova automaticamente ogni anno?',
    risposta:
      "No. Va richiesta ogni anno entro le scadenze. Dal secondo anno in poi sono richiesti requisiti di merito: solitamente un numero minimo di CFU acquisiti nell'anno precedente.",
  },
];

// ============================================================================
// topic-costi-geografici.component.ts
// ============================================================================

export interface CostoAreaGeografica {
  area: string;
  affittoCamera: string;
  costoVita: string;
  esempiCitta: string;
  noteAggiuntive: string;
}

export interface ConsiglioGeografico {
  titolo: string;
  testo: string;
}

export const COSTI_AREE_GEOGRAFICHE: CostoAreaGeografica[] = [
  {
    area: 'Nord',
    affittoCamera: '450–700 €/mese',
    costoVita: 'Alto',
    esempiCitta: 'Milano, Torino, Bologna, Padova',
    noteAggiuntive:
      "Milano è la città più cara d'Italia per gli studenti. Bologna e Padova sono più accessibili ma restano sopra la media.",
  },
  {
    area: 'Centro',
    affittoCamera: '350–550 €/mese',
    costoVita: 'Medio',
    esempiCitta: 'Roma, Firenze, Pisa, Perugia',
    noteAggiuntive:
      'Roma ha costi simili al Nord nelle zone universitarie. Perugia e Pisa offrono un buon rapporto qualità-prezzo.',
  },
  {
    area: 'Sud e Isole',
    affittoCamera: '200–400 €/mese',
    costoVita: 'Basso',
    esempiCitta: 'Napoli, Bari, Catania, Palermo, Salerno',
    noteAggiuntive:
      "Il costo della vita significativamente più basso può compensare una minor reputazione dell'ateneo in alcuni settori.",
  },
];

export const CONSIGLI_GEOGRAFICI: ConsiglioGeografico[] = [
  {
    titolo: 'Il ranking non è tutto',
    testo:
      'Un ateneo del Sud con ottimi docenti nel tuo settore può darti una formazione migliore di un ateneo del Nord dove sei uno tra migliaia. Studia i singoli dipartimenti, non solo la classifica generale.',
  },
  {
    titolo: 'Calcola il costo totale triennale',
    testo:
      'Moltiplica il costo mensile stimato per 36 mesi (o più, realisticamente). La differenza tra studiare a Milano e studiare a Bari può superare i 30.000 € in tre anni - una cifra che vale la pena considerare.',
  },
  {
    titolo: "I servizi contano quanto l'ateneo",
    testo:
      'Trasporti pubblici efficienti, mense universitarie, biblioteche attrezzate, servizi DSU attivi: queste cose influenzano concretamente la qualità della tua vita da studente.',
  },
  {
    titolo: 'Nord per il network, Sud per il risparmio',
    testo:
      'Studiare in grandi hub del Nord costruisce un network professionale più ampio, soprattutto in ambito aziendale e tech. Studiare al Sud con borsa DSU può invece significare laurearsi praticamente senza debiti.',
  },
];

// ============================================================================
// topic-quiz.component.ts (English versions)
// ============================================================================

export const ACCESS_TYPES: AccessType[] = [
  {
    id: 'free',
    title: 'Accesso libero',
    description:
      'Puoi iscriverti senza superare alcun test selettivo. In alcuni casi è previsto un TOLC orientativo - non sbarramento, ma il risultato può influenzare il tuo piano di studi o darti crediti aggiuntivi.',
    examples: [
      'Lettere e Filosofia',
      'Scienze Politiche',
      'Sociologia',
      'Economia (molti atenei)',
      'Giurisprudenza',
      'Comunicazione',
    ],
    note: 'Accesso libero non significa corso facile. Il carico didattico può essere elevato quanto un corso a numero chiuso.',
  },
  {
    id: 'national-restricted',
    title: 'Programmato nazionale',
    description:
      'I posti sono stabiliti a livello nazionale dal MIUR. Il test di ammissione è unico per tutti gli atenei italiani e si sostiene in una data fissa. La graduatoria è nazionale.',
    examples: [
      'Medicina e Chirurgia',
      'Odontoiatria',
      'Medicina Veterinaria',
      'Architettura (AUIC)',
    ],
    note: 'Per Medicina il test si chiama TOLC-MED dal 2023. Si può tentare più volte - la graduatoria considera il punteggio migliore.',
  },
  {
    id: 'local-restricted',
    title: 'Programmato locale',
    description:
      'Ogni ateneo fissa autonomamente i propri posti e le modalità di ammissione. Il test può variare da università a università - verifica sempre il bando del singolo ateneo.',
    examples: [
      'Infermieristica',
      'Fisioterapia',
      'Farmacia (alcuni atenei)',
      'Ingegneria (alcuni atenei)',
      'Psicologia (alcuni atenei)',
      'Scienze della Formazione Primaria',
    ],
    note: 'Per i corsi a programmazione locale puoi candidarti a più atenei contemporaneamente.',
  },
];

export const ACCESS_TIPS: Consiglio[] = [
  {
    titolo: 'Controlla il bando ogni anno',
    testo:
      "Le modalità di accesso cambiano ogni anno accademico. Un corso che era libero può diventare programmato. Verifica sempre il sito ufficiale dell'ateneo e il portale universitaly.it.",
  },
  {
    titolo: 'Le scadenze sono rigide',
    testo:
      'Per i corsi programmati, perdere la scadenza di iscrizione al test significa aspettare un anno. Segna tutte le date sul calendario con largo anticipo - alcune scadenze cadono in primavera per corsi che iniziano in ottobre.',
  },
  {
    titolo: 'Iscriviti al TOLC il prima possibile',
    testo:
      "I TOLC si prenotano sul sito CISIA e i posti nelle sessioni si esauriscono. Non aspettare l'estate - le sessioni primaverili ti danno tempo di ritentare se il risultato non ti soddisfa.",
  },
  {
    titolo: 'Studia il piano di studi prima di iscriverti',
    testo:
      'Per i corsi a numero chiuso, verifica il piano di studi completo prima di sostenere il test. È frustrante prepararsi mesi per un test e poi scoprire che il corso non è quello che immaginavi.',
  },
];

// ============================================================================
// sbocchi-chart.component.ts
// ============================================================================

export const SBOCCHI_CHART_DEFAULT_DATA: SboccoDataPoint[] = [
  { area: 'Ingegneria & Informatica', occupazione: 85, colore: '#3b82f6' },
  { area: 'Economia & Management', occupazione: 72, colore: '#60a5fa' },
  { area: 'Sanitaria & Medicina', occupazione: 78, colore: '#2563eb' },
  { area: 'Scientifica', occupazione: 65, colore: '#93c5fd' },
  { area: 'Giuridica', occupazione: 52, colore: '#bfdbfe' },
  { area: 'Umanistica & Sociale', occupazione: 48, colore: '#dbeafe' },
];

export const CFU_CHART_DEFAULT_DATA: CfuDataPoint[] = [
  { anno: '1° Anno', cfu: 60, oreStudio: 25 },
  { anno: '2° Anno', cfu: 60, oreStudio: 28 },
  { anno: '3° Anno', cfu: 60, oreStudio: 22 },
];

export const VITA_SCHEDULE_TIPS = [
  {
    titolo: 'I "buchi" tra le lezioni non sono tempo libero',
    testo:
      'Potresti avere 2 ore di lezione alle 9 e niente fino alle 15. Questi intervalli vanno riempiti con lo studio; chi li usa bene arriva a sessione con settimane di vantaggio.',
  },
  {
    titolo: 'Costruisci una routine settimanale fissa',
    testo:
      'Studia sempre negli stessi orari, anche quando non ne hai voglia. La routine elimina la fatica decisionale, non devi decidere se studiare, lo fai e basta.',
  },
  {
    titolo: 'Il weekend non è una pausa, è un recupero',
    testo:
      'Usare il sabato mattina per consolidare la settimana appena passata riduce drasticamente il panico pre-esame. Anche solo 3 ore cambiano tutto.',
  },
];
export const BUDGET_TIPS = [
  {
    titolo: 'Tieni traccia delle spese dal primo mese',
    testo:
      "Usa un foglio o un'app per annotare ogni uscita. Chi sa dove vanno i soldi può tagliare il superfluo, chi non lo sa finisce i soldi senza capire perché.",
  },
  {
    titolo: 'Separa le spese fisse da quelle variabili',
    testo:
      'Affitto, utenze e abbonamenti sono fissi : devi averli coperti prima di tutto. Le spese variabili (cibo fuori, svago) sono quelle su cui puoi agire.',
  },
  {
    titolo: 'Chiedi sempre lo sconto studenti',
    testo:
      'Trasporti, musei, software, cinema, palestre : moltissimi servizi hanno tariffe agevolate per gli universitari. Basta avere il badge o il certificato di iscrizione.',
  },
];

// ============================================================================
// topic-aree-geografiche constants
// ============================================================================

export const CITTA_TOP: CittaTop[] = [
  {
    citta: 'Bologna',
    area: 'Nord',
    categoria: 'Migliore per vita universitaria',
    motivo:
      'Studentesca per eccellenza, una delle città con la più alta percentuale di studenti in Italia. Servizi, locali, cultura e ateneo di altissimo livello.',
    badge: 'Top assoluto',
    stats: [
      '100.000+ studenti universitari',
      'Affitto medio 500–650 €/mese',
      'Ateneo fondato nel 1088',
    ],
  },
  {
    citta: 'Milano',
    area: 'Nord',
    categoria: 'Migliore per networking e lavoro',
    motivo:
      'Hub economico italiano. Gli stage e le opportunità di lavoro durante gli studi sono incomparabili. Costi alti, ma il ritorno è spesso elevato.',
    badge: 'Carriera',
    stats: [
      '200+ aziende Fortune 500 presenti',
      'Affitto medio 700–950 €/mese',
      '85% laureati trova lavoro entro 1 anno',
    ],
  },
  {
    citta: 'Torino',
    area: 'Nord',
    categoria: 'Migliore per qualità/prezzo al Nord',
    motivo:
      'Ottimi atenei tecnici (Politecnico), costi più accessibili di Milano, città vivace con forte identità culturale e buoni trasporti pubblici.',
    badge: 'Qualità/prezzo',
    stats: [
      'Politecnico tra i top 200 al mondo',
      'Affitto medio 400–550 €/mese',
      '100.000+ studenti in città',
    ],
  },
  {
    citta: 'Napoli',
    area: 'Sud',
    categoria: 'Migliore per risparmio con cultura',
    motivo:
      "Costi tra i più bassi in Italia, università storiche, vita sociale intensa. Ideale per chi vuole un'esperienza universitaria autentica senza indebitarsi.",
    badge: 'Risparmio',
    stats: [
      'Affitto medio 250–380 €/mese',
      'Federico II: 80.000+ iscritti',
      'Pasto in mensa da 3 €',
    ],
  },
  {
    citta: 'Pisa',
    area: 'Centro',
    categoria: 'Migliore per eccellenza accademica',
    motivo:
      "Scuola Normale Superiore e Scuola Sant'Anna, due delle migliori istituzioni d'Italia. Città a misura di studente, costi contenuti, ambiente stimolante.",
    badge: 'Accademia',
    stats: [
      'Scuola Normale: 70+ premi Nobel tra alumni',
      'Affitto medio 350–500 €/mese',
      '1 studente ogni 3 abitanti',
    ],
  },
  {
    citta: 'Bari',
    area: 'Sud',
    categoria: 'Migliore per vivibilità al Sud',
    motivo:
      'Città moderna e dinamica, costi bassissimi, ateneo solido, ottimi collegamenti. Una delle mete emergenti per chi sceglie il Sud consapevolmente.',
    badge: 'Vivibilità',
    stats: [
      'Affitto medio 200–320 €/mese',
      'Hub ferroviario per tutto il Sud',
      '50.000+ studenti universitari',
    ],
  },
];

export const AREE_GEO_INFO: AreaGeoInfo[] = [
  {
    area: 'Nord',
    emoji: '🏙️',
    variant: 'primary',
    voti: [
      {
        aspetto: 'Opportunità lavoro',
        voto: 5,
        descrizione: 'Altissima concentrazione di aziende e stage',
      },
      {
        aspetto: 'Costo della vita',
        voto: 2,
        descrizione: "Tra i più alti d'Italia, soprattutto Milano",
      },
      { aspetto: 'Trasporti', voto: 5, descrizione: 'Reti metro, tram e treni efficienti' },
      { aspetto: 'Vita sociale', voto: 4, descrizione: 'Molta offerta culturale e di svago' },
    ],
  },
  {
    area: 'Centro',
    emoji: '🏛️',
    variant: 'warning',
    voti: [
      {
        aspetto: 'Opportunità lavoro',
        voto: 3,
        descrizione: 'Buone opportunità, forte presenza del pubblico',
      },
      {
        aspetto: 'Costo della vita',
        voto: 3,
        descrizione: 'Medio - Roma cara, altre città accessibili',
      },
      { aspetto: 'Trasporti', voto: 3, descrizione: 'Variabile - Roma complessa, Firenze ottima' },
      { aspetto: 'Vita sociale', voto: 5, descrizione: 'Arte, storia e cultura ovunque' },
    ],
  },
  {
    area: 'Sud e Isole',
    emoji: '🌊',
    variant: 'success',
    voti: [
      {
        aspetto: 'Opportunità lavoro',
        voto: 2,
        descrizione: 'Mercato più limitato, spesso si cerca altrove',
      },
      {
        aspetto: 'Costo della vita',
        voto: 5,
        descrizione: 'Tra i più bassi - affitti e cibo molto economici',
      },
      { aspetto: 'Trasporti', voto: 2, descrizione: "Meno sviluppati, spesso necessaria l'auto" },
      {
        aspetto: 'Vita sociale',
        voto: 4,
        descrizione: 'Comunità studentesche vivaci e accoglienti',
      },
    ],
  },
];

export const GEO_TIPS = [
  {
    titolo: 'Visita prima di scegliere',
    testo:
      'Un weekend nella città che ti interessa vale più di mille recensioni online. Gira il quartiere universitario, parla con gli studenti, siediti in un bar e osserva il ritmo della città.',
  },
  {
    titolo: 'Cerca il gruppo Telegram del corso',
    testo:
      'Quasi tutti i corsi hanno gruppi informali dove gli studenti condividono info su alloggi, costi reali e vita in città. Sono la fonte più onesta disponibile.',
  },
  {
    titolo: 'Il nord non è sempre la scelta migliore',
    testo:
      'Laurearsi al Sud senza debiti e con una buona media spesso vale più di laurearsi al Nord con 30.000 € di spese alle spalle. Fai i conti prima di decidere.',
  },
];
