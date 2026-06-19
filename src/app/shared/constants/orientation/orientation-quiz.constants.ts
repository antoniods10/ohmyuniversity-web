import { TolcTest, AccessType, Consiglio } from '@types';

/** Example TOLC entrance tests grouped by subject area */
export const TOLC_TESTS: TolcTest[] = [
  {
    ateneo: 'Vari atenei',
    corso: 'Medicina e Chirurgia',
    tipo: 'TOLC-MED',
    argomenti: ['Biologia', 'Chimica', 'Fisica e Matematica', 'Ragionamento logico', 'Comprensione del testo'],
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

/** The 3 university access types: free, nationally restricted, locally restricted */
export const ACCESS_TYPES: AccessType[] = [
  {
    id: 'free',
    title: 'Accesso libero',
    description: 'Puoi iscriverti senza superare alcun test selettivo. In alcuni casi è previsto un TOLC orientativo - non sbarramento, ma il risultato può influenzare il tuo piano di studi o darti crediti aggiuntivi.',
    examples: ['Lettere e Filosofia', 'Scienze Politiche', 'Sociologia', 'Economia (molti atenei)', 'Giurisprudenza', 'Comunicazione'],
    note: 'Accesso libero non significa corso facile. Il carico didattico può essere elevato quanto un corso a numero chiuso.',
  },
  {
    id: 'national-restricted',
    title: 'Programmato nazionale',
    description: 'I posti sono stabiliti a livello nazionale dal MIUR. Il test di ammissione è unico per tutti gli atenei italiani e si sostiene in una data fissa. La graduatoria è nazionale.',
    examples: ['Medicina e Chirurgia', 'Odontoiatria', 'Medicina Veterinaria', 'Architettura (AUIC)'],
    note: 'Per Medicina il test si chiama TOLC-MED dal 2023. Si può tentare più volte - la graduatoria considera il punteggio migliore.',
  },
  {
    id: 'local-restricted',
    title: 'Programmato locale',
    description: 'Ogni ateneo fissa autonomamente i propri posti e le modalità di ammissione. Il test può variare da università a università - verifica sempre il bando del singolo ateneo.',
    examples: ['Infermieristica', 'Fisioterapia', 'Farmacia (alcuni atenei)', 'Ingegneria (alcuni atenei)', 'Psicologia (alcuni atenei)', 'Scienze della Formazione Primaria'],
    note: 'Per i corsi a programmazione locale puoi candidarti a più atenei contemporaneamente.',
  },
];

/** Practical tips for navigating university access deadlines and tests */
export const ACCESS_TIPS: Consiglio[] = [
  {
    titolo: 'Controlla il bando ogni anno',
    testo: "Le modalità di accesso cambiano ogni anno accademico. Un corso che era libero può diventare programmato. Verifica sempre il sito ufficiale dell'ateneo e il portale universitaly.it.",
  },
  {
    titolo: 'Le scadenze sono rigide',
    testo: 'Per i corsi programmati, perdere la scadenza di iscrizione al test significa aspettare un anno. Segna tutte le date sul calendario con largo anticipo - alcune scadenze cadono in primavera per corsi che iniziano in ottobre.',
  },
  {
    titolo: 'Iscriviti al TOLC il prima possibile',
    testo: "I TOLC si prenotano sul sito CISIA e i posti nelle sessioni si esauriscono. Non aspettare l'estate - le sessioni primaverili ti danno tempo di ritentare se il risultato non ti soddisfa.",
  },
  {
    titolo: 'Studia il piano di studi prima di iscriverti',
    testo: 'Per i corsi a numero chiuso, verifica il piano di studi completo prima di sostenere il test. È frustrante prepararsi mesi per un test e poi scoprire che il corso non è quello che immaginavi.',
  },
];
