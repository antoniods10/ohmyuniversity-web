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
  TopicMeta,
  VitaFuorisedeItem,
} from '@types';

// orientation.page.ts
export const ORIENTATION_TOPICS: TopicMeta[] = [
  {
    id: 'corso',
    title: 'Scegli il corso adatto a te',
    subtitle: 'Materie, aree, sedi - come orientarsi',
  },
  {
    id: 'quiz',
    title: 'Quiz e Autovalutazione',
    subtitle: "TOLC, test d'ingresso e autovalutazione",
  },
  {
    id: 'come-funziona',
    title: "Come funziona l'università",
    subtitle: 'CFU, esami, sessioni e autonomia',
  },
  {
    id: 'vita',
    title: 'Vita universitaria concreta',
    subtitle: 'Orari, studio, fuori sede e costi reali',
  },
  {
    id: 'sbocchi',
    title: 'Sbocchi lavorativi reali',
    subtitle: 'Occupazione e stipendi per area di studio',
  },
  {
    id: 'errori',
    title: 'Errori comuni da evitare',
    subtitle: 'Le trappole in cui cadono quasi tutti',
  },
];

// topic-vita.component.ts
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

// topic-sbocchi.component.ts
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

// topic-quiz.component.ts
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

export const QUIZ_CONSIGLI: Consiglio[] = [
  {
    titolo: 'Inizia almeno 3 mesi prima',
    testo:
      'I test TOLC si possono ripetere una volta al mese. Inizia a fare simulazioni con largo anticipo: il tempo è il tuo alleato principale.',
  },
  {
    titolo: 'Usa CISIA per le simulazioni ufficiali',
    testo:
      'Il consorzio CISIA mette a disposizione simulazioni gratuite dei TOLC sul loro sito ufficiale. Sono identiche al test reale per struttura e difficoltà.',
  },
  {
    titolo: 'Non trascurare la logica',
    testo:
      'La sezione di ragionamento logico è spesso quella che fa la differenza. Molti studenti la sottovalutano perché non è una materia scolastica classica - allenati con esercizi specifici.',
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

// topic-errori.component.ts
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

// topic-corso.component.ts
export const CORSO_AREE: AreaCorso[] = [
  { label: 'Umanistica', emoji: '📚', esempi: 'Lettere, Filosofia, Storia, Lingue' },
  { label: 'Scientifica', emoji: '🔬', esempi: 'Biologia, Chimica, Fisica, Matematica' },
  {
    label: 'Ingegneria & Informatica',
    emoji: '💻',
    esempi: 'Informatica, Elettronica, Meccanica',
  },
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

// topic-come-funziona.component.ts
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
  {
    label: 'Sessione invernale',
    periodo: 'Gennaio – Febbraio',
    note: 'Esami del primo semestre',
  },
  { label: 'Sessione estiva', periodo: 'Giugno – Luglio', note: 'Esami del secondo semestre' },
  { label: 'Sessione autunnale', periodo: 'Settembre', note: 'Recupero e straordinari' },
];

// sbocchi-chart.component.ts
export const SBOCCHI_CHART_DEFAULT_DATA: SboccoDataPoint[] = [
  { area: 'Ingegneria & Informatica', occupazione: 85, colore: '#3b82f6' },
  { area: 'Economia & Management', occupazione: 72, colore: '#60a5fa' },
  { area: 'Sanitaria & Medicina', occupazione: 78, colore: '#2563eb' },
  { area: 'Scientifica', occupazione: 65, colore: '#93c5fd' },
  { area: 'Giuridica', occupazione: 52, colore: '#bfdbfe' },
  { area: 'Umanistica & Sociale', occupazione: 48, colore: '#dbeafe' },
];

// cfu-chart.component.ts
export const CFU_CHART_DEFAULT_DATA: CfuDataPoint[] = [
  { anno: '1° Anno', cfu: 60, oreStudio: 25 },
  { anno: '2° Anno', cfu: 60, oreStudio: 28 },
  { anno: '3° Anno', cfu: 60, oreStudio: 22 },
];
