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
    title: 'Vita universitaria concreta',
    subtitle: 'Orari, studio, fuori sede e costi reali',
    questions: [
      {
        id: 'vita-fuorisede',
        topicId: 'vita',
        text: 'Saresti disposto ad andare a studiare fuori dalla tua città?',
        type: 'yes-no-maybe',
        required: true,
        options: [
          { value: 'si', label: 'Sì, sono aperto a trasferirmi' },
          { value: 'forse', label: 'Forse, dipende dal corso e dai costi' },
          { value: 'no', label: 'No, preferisco restare vicino a casa' },
        ],
      },
    ],
  },
  {
    id: 'sbocchi',
    title: 'Sbocchi lavorativi reali',
    subtitle: 'Occupazione e stipendi per area di studio',
    questions: [
      {
        id: 'sbocchi-stipendio',
        topicId: 'sbocchi',
        text: 'Quanto è importante per te lo stipendio atteso dopo la laurea?',
        type: 'scale',
        required: true,
        scaleMin: 1,
        scaleMax: 5,
        options: [
          { value: '1', label: 'Per niente - conta solo la passione' },
          { value: '2', label: 'Poco importante' },
          { value: '3', label: 'Abbastanza importante' },
          { value: '4', label: 'Molto importante' },
          { value: '5', label: 'Fondamentale - è il criterio principale' },
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
  {
    id: 'borse-studio',
    title: 'Borse di studio e supporto economico',
    subtitle: 'DSU, ISEE, esoneri e residenze universitarie',
    questions: [
      {
        id: 'borse-isee',
        topicId: 'borse-studio',
        text: "Hai un'idea della fascia ISEE del tuo nucleo familiare?",
        type: 'single-select',
        required: true,
        options: [
          { value: 'sotto-15k', label: 'Sotto i 15.000 € - fascia bassa' },
          { value: '15-30k', label: 'Tra 15.000 e 30.000 €' },
          { value: 'sopra-30k', label: 'Sopra i 30.000 €' },
          { value: 'non-so', label: 'Non lo so ancora' },
        ],
      },
    ],
  },
  {
    id: 'costi-geografici',
    title: 'Costi reali per area geografica',
    subtitle: 'Confronto Nord, Centro e Sud - affitti e qualità della vita',
    questions: [
      {
        id: 'costi-trasferimento',
        topicId: 'costi-geografici',
        text: 'Sei disposto a trasferirti anche in una città lontana per il corso giusto?',
        type: 'yes-no-maybe',
        required: true,
        options: [
          { value: 'si', label: 'Sì, se il corso lo vale' },
          { value: 'dipende', label: 'Dipende dai costi e dalla distanza' },
          { value: 'no', label: 'No, resto nella mia area geografica' },
        ],
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

// ============================================================================
// cfu-chart.component.ts
// ============================================================================

export const CFU_CHART_DEFAULT_DATA: CfuDataPoint[] = [
  { anno: '1° Anno', cfu: 60, oreStudio: 25 },
  { anno: '2° Anno', cfu: 60, oreStudio: 28 },
  { anno: '3° Anno', cfu: 60, oreStudio: 22 },
];
