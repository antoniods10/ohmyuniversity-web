import { UniversityOrientationInfo } from '@types';

/**
 * Orientation enrichment for ~35 well-known Italian universities, covering
 * all 6 study areas across Nord, Centro and Sud. Universities not listed here
 * simply won't be suggested by the orientation result - the core University
 * list is unaffected.
 *
 * `courses` lists specific degree programs tagged by area, so the result page
 * can show only the courses relevant to the student's dominant/secondary areas.
 */
export const UNIVERSITY_ORIENTATION_INFO: UniversityOrientationInfo[] = [
  // --- Ingegneria & Scientifica (Nord) ---
  {
    universityId: 'polimi',
    strongAreas: ['ingegneria', 'scientifica'],
    costTier: 'medio',
    tuitionRange: "900–4.000 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Informatica' },
      { area: 'ingegneria', name: 'Ingegneria Gestionale' },
      { area: 'ingegneria', name: 'Ingegneria Meccanica' },
      { area: 'artistica', name: 'Design del Prodotto' },
    ],
    notes:
      'Uno dei migliori politecnici a livello internazionale, fortissimo network con le aziende del Nord Italia.',
  },
  {
    universityId: 'polito',
    strongAreas: ['ingegneria', 'scientifica'],
    costTier: 'medio',
    tuitionRange: "900–3.700 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Informatica' },
      { area: 'ingegneria', name: 'Ingegneria Aerospaziale' },
      { area: 'ingegneria', name: 'Ingegneria Civile' },
    ],
    notes: 'Eccellenza tecnica con costi più accessibili di Milano e ottimi laboratori.',
  },
  {
    universityId: 'unimi',
    strongAreas: ['scientifica', 'sanitaria', 'umanistica'],
    costTier: 'medio',
    tuitionRange: "900–3.800 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'scientifica', name: 'Biotecnologie' },
      { area: 'scientifica', name: 'Scienze Biologiche' },
      { area: 'umanistica', name: 'Lettere' },
    ],
    notes: 'Ateneo generalista di altissimo livello, forte in ricerca scientifica e area medica.',
  },
  {
    universityId: 'unimib',
    strongAreas: ['scientifica', 'economica'],
    costTier: 'medio',
    tuitionRange: "900–3.000 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'scientifica', name: 'Scienze Statistiche' },
      { area: 'economica', name: 'Economia e Commercio' },
      { area: 'scientifica', name: 'Informatica' },
    ],
    notes: 'Ateneo giovane e dinamico, buon rapporto qualità-prezzo per Milano.',
  },
  {
    universityId: 'unipd',
    strongAreas: ['scientifica', 'sanitaria', 'ingegneria'],
    costTier: 'medio',
    tuitionRange: "900–3.300 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'sanitaria', name: 'Medicina Veterinaria' },
      { area: 'ingegneria', name: "Ingegneria dell'Informazione" },
    ],
    notes: 'Uno dei più antichi atenei al mondo, eccellente in medicina e scienze.',
  },
  {
    universityId: 'unibo',
    strongAreas: ['umanistica', 'economica', 'sanitaria', 'scientifica', 'artistica'],
    costTier: 'medio',
    tuitionRange: "900–3.500 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'umanistica', name: 'Lettere' },
      { area: 'economica', name: 'Economia e Commercio' },
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'scientifica', name: 'Fisica' },
      { area: 'artistica', name: 'DAMS - Discipline delle Arti, Musica e Spettacolo' },
      { area: 'artistica', name: 'Beni Culturali' },
    ],
    notes:
      "L'ateneo più antico del mondo occidentale, città studentesca per eccellenza, offerta completa su quasi tutte le aree, incluso il celebre DAMS.",
  },
  {
    universityId: 'unige',
    strongAreas: ['ingegneria', 'scientifica'],
    costTier: 'medio',
    tuitionRange: "700–2.800 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Navale' },
      { area: 'ingegneria', name: 'Ingegneria Elettronica' },
      { area: 'scientifica', name: 'Chimica' },
    ],
    notes:
      'Buona tradizione tecnico-scientifica, costi della vita più accessibili rispetto a Milano e Torino.',
  },
  {
    universityId: 'unibs',
    strongAreas: ['ingegneria', 'sanitaria'],
    costTier: 'basso',
    tuitionRange: "500–2.500 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Meccanica' },
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
    ],
    notes: 'Ateneo di medie dimensioni con ottimo rapporto qualità-prezzo.',
  },

  // --- Economica & Giuridica ---
  {
    universityId: 'unibocconi',
    strongAreas: ['economica'],
    costTier: 'alto',
    tuitionRange: "3.500–14.000 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'economica', name: 'Economia e Management' },
      { area: 'economica', name: 'Economics and Finance' },
      { area: 'economica', name: 'Giurisprudenza' },
    ],
    notes:
      'Il punto di riferimento italiano per economia e management, network internazionale fortissimo ma costi elevati.',
  },
  {
    universityId: 'luiss',
    strongAreas: ['economica', 'umanistica'],
    costTier: 'alto',
    tuitionRange: '8.000–13.000 €/anno',
    courses: [
      { area: 'economica', name: 'Economia e Management' },
      { area: 'economica', name: 'Giurisprudenza' },
      { area: 'umanistica', name: 'Scienze Politiche' },
    ],
    notes:
      'Ateneo privato di prestigio a Roma, forte in economia, giurisprudenza e scienze politiche.',
  },
  {
    universityId: 'unicatt',
    strongAreas: ['umanistica', 'economica', 'sanitaria'],
    costTier: 'alto',
    tuitionRange: "2.500–9.000 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'umanistica', name: 'Lettere e Filosofia' },
      { area: 'economica', name: 'Economia e Management' },
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
    ],
    notes: 'Il più grande ateneo privato italiano, offerta ampia con un buon prestigio percepito.',
  },
  {
    universityId: 'liuc',
    strongAreas: ['economica', 'ingegneria'],
    costTier: 'alto',
    tuitionRange: '6.000–9.000 €/anno',
    courses: [
      { area: 'economica', name: 'Economia Aziendale' },
      { area: 'ingegneria', name: 'Ingegneria Gestionale' },
    ],
    notes:
      'Ateneo privato di piccole dimensioni, molto orientato al mondo del lavoro e alle aziende del territorio.',
  },

  // --- Sanitaria ---
  {
    universityId: 'unicampus',
    strongAreas: ['sanitaria'],
    costTier: 'alto',
    tuitionRange: '8.000–12.000 €/anno',
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'sanitaria', name: 'Infermieristica' },
    ],
    notes:
      'Ateneo privato specializzato in area medica, struttura clinica annessa di alto livello.',
  },
  {
    universityId: 'unicamillus',
    strongAreas: ['sanitaria'],
    costTier: 'alto',
    tuitionRange: '7.000–11.000 €/anno',
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'sanitaria', name: 'Odontoiatria' },
    ],
    notes: 'Ateneo privato internazionale specializzato in medicina e professioni sanitarie.',
  },
  {
    universityId: 'unisr',
    strongAreas: ['sanitaria', 'umanistica'],
    costTier: 'alto',
    tuitionRange: "4.000–10.000 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'umanistica', name: 'Psicologia' },
    ],
    notes:
      'Vita-Salute San Raffaele, eccellenza in medicina e psicologia con forte impronta di ricerca.',
  },

  // --- Centro Italia ---
  {
    universityId: 'unifi',
    strongAreas: ['umanistica', 'artistica', 'scientifica'],
    costTier: 'medio',
    tuitionRange: "600–2.700 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'umanistica', name: 'Lettere' },
      { area: 'artistica', name: 'Design' },
      { area: 'artistica', name: "Storia dell'Arte" },
      { area: 'scientifica', name: 'Scienze Naturali' },
    ],
    notes:
      'Firenze è la culla del Rinascimento, città a fortissima vocazione artistica e culturale, ottima offerta umanistica e nelle belle arti.',
  },
  {
    universityId: 'sns',
    strongAreas: ['umanistica', 'scientifica'],
    costTier: 'basso',
    tuitionRange: 'Gratuito per gli ammessi (borsa di merito)',
    courses: [
      { area: 'umanistica', name: 'Lettere' },
      { area: 'scientifica', name: 'Fisica' },
      { area: 'scientifica', name: 'Matematica' },
    ],
    notes:
      'Scuola Normale Superiore, eccellenza accademica assoluta, accesso molto selettivo ma costi contenuti grazie alle borse di merito.',
  },
  {
    universityId: 'sssup',
    strongAreas: ['ingegneria', 'scientifica'],
    costTier: 'basso',
    tuitionRange: 'Gratuito per gli ammessi (borsa di merito)',
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Biomedica' },
      { area: 'scientifica', name: 'Scienze Agrarie' },
    ],
    notes:
      "Scuola Sant'Anna, eccellenza in ingegneria e scienze applicate, fortemente orientata alla ricerca.",
  },
  {
    universityId: 'unisi',
    strongAreas: ['sanitaria', 'umanistica'],
    costTier: 'basso',
    tuitionRange: "700–2.200 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'umanistica', name: 'Lettere' },
    ],
    notes: 'Ateneo storico toscano con ottima tradizione medica e costi della vita contenuti.',
  },
  {
    universityId: 'uniroma1',
    strongAreas: ['umanistica', 'scientifica', 'sanitaria', 'ingegneria'],
    costTier: 'medio',
    tuitionRange: "900–3.000 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'umanistica', name: 'Lettere e Filosofia' },
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'ingegneria', name: 'Ingegneria Informatica' },
      { area: 'scientifica', name: 'Fisica' },
    ],
    notes:
      "La Sapienza, uno degli atenei più grandi d'Europa, offerta completissima su tutte le aree.",
  },
  {
    universityId: 'uniroma2',
    strongAreas: ['ingegneria', 'economica', 'sanitaria'],
    costTier: 'medio',
    tuitionRange: "900–2.900 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Informatica' },
      { area: 'economica', name: 'Economia e Finanza' },
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
    ],
    notes: 'Tor Vergata, campus moderno con forte impronta scientifico-tecnologica.',
  },
  {
    universityId: 'uniroma3',
    strongAreas: ['umanistica', 'artistica'],
    costTier: 'medio',
    tuitionRange: "700–2.500 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'umanistica', name: 'Lettere' },
      { area: 'artistica', name: 'Design del Prodotto Industriale' },
      { area: 'artistica', name: 'Scienze dei Beni Culturali' },
    ],
    notes:
      'Ateneo romano con buona offerta umanistica e di design, costi più contenuti rispetto ad altri atenei capitolini.',
  },

  // --- Sud Italia ---
  {
    universityId: 'unina',
    strongAreas: ['ingegneria', 'umanistica', 'sanitaria', 'scientifica'],
    costTier: 'basso',
    tuitionRange: "300–2.000 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Civile' },
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'umanistica', name: 'Lettere' },
      { area: 'scientifica', name: 'Chimica' },
    ],
    notes: 'Federico II, ateneo storico con offerta completa e costi della vita molto contenuti.',
  },
  {
    universityId: 'unisob',
    strongAreas: ['umanistica'],
    costTier: 'medio',
    tuitionRange: '2.000–4.000 €/anno',
    courses: [
      { area: 'umanistica', name: 'Scienze della Formazione Primaria' },
      { area: 'umanistica', name: 'Lettere' },
    ],
    notes:
      'Suor Orsola Benincasa, ateneo privato napoletano con forte impronta umanistica e pedagogica.',
  },
  {
    universityId: 'uniba',
    strongAreas: ['umanistica', 'sanitaria', 'economica'],
    costTier: 'basso',
    tuitionRange: "300–1.800 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'economica', name: 'Economia Aziendale' },
      { area: 'umanistica', name: 'Lettere' },
    ],
    notes:
      'Ateneo pugliese di buona tradizione, ottimo rapporto qualità-prezzo per chi resta al Sud.',
  },
  {
    universityId: 'poliba',
    strongAreas: ['ingegneria'],
    costTier: 'basso',
    tuitionRange: "300–1.800 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Civile' },
      { area: 'ingegneria', name: 'Ingegneria Informatica' },
    ],
    notes:
      'Politecnico di Bari, riferimento tecnico del Sud Italia con costi della vita molto accessibili.',
  },
  {
    universityId: 'unipa',
    strongAreas: ['umanistica', 'sanitaria', 'scientifica'],
    costTier: 'basso',
    tuitionRange: "300–1.700 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'scientifica', name: 'Scienze Biologiche' },
      { area: 'umanistica', name: 'Lettere' },
    ],
    notes:
      'Ateneo siciliano con ampia offerta formativa e costi della vita tra i più bassi in Italia.',
  },
  {
    universityId: 'unict',
    strongAreas: ['scientifica', 'ingegneria', 'sanitaria'],
    costTier: 'basso',
    tuitionRange: "300–1.700 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'scientifica', name: 'Matematica' },
      { area: 'ingegneria', name: 'Ingegneria Informatica' },
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
    ],
    notes: 'Buona tradizione scientifica, costi accessibili e città universitaria vivace.',
  },
  {
    universityId: 'unical',
    strongAreas: ['umanistica', 'scientifica', 'ingegneria'],
    costTier: 'basso',
    tuitionRange: "300–1.600 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Informatica' },
      { area: 'scientifica', name: 'Biologia' },
      { area: 'umanistica', name: 'Lettere' },
    ],
    notes: 'Campus unico e moderno, tra i più economici per vivere e studiare in Italia.',
  },

  // --- Artistica & Design ---
  {
    universityId: 'unive',
    strongAreas: ['artistica', 'umanistica', 'economica'],
    costTier: 'medio',
    tuitionRange: "900–3.000 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'economica', name: 'Economia e Gestione delle Arti e delle Attività Culturali' },
      { area: 'umanistica', name: 'Lingue e Culture Orientali' },
      { area: 'artistica', name: 'Conservazione dei Beni Culturali' },
    ],
    notes:
      "Ca' Foscari, forte vocazione internazionale e ottima offerta umanistico-economica in una città unica al mondo per chi ama arte e cultura.",
  },
  {
    universityId: 'iuav',
    strongAreas: ['artistica'],
    costTier: 'medio',
    tuitionRange: "900–2.800 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'artistica', name: 'Architettura' },
      { area: 'artistica', name: 'Design della Moda' },
      { area: 'artistica', name: 'Arti Visive e Moda' },
      { area: 'artistica', name: 'Pianificazione del Territorio' },
    ],
    notes:
      "Ateneo interamente dedicato ad architettura, design e arti visive a Venezia, il riferimento italiano per chi punta a quest'area.",
  },
  {
    universityId: 'unito',
    strongAreas: ['artistica', 'umanistica', 'scientifica'],
    costTier: 'medio',
    tuitionRange: "900–3.000 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'artistica', name: 'Beni Culturali' },
      { area: 'artistica', name: 'DAMS - Cinema e Media' },
      { area: 'umanistica', name: 'Lettere' },
    ],
    notes:
      'Città con forte tradizione cinematografica e artistica, ottimo polo umanistico-culturale.',
  },

  // --- Telematiche (per chi ha budget limitato o serve flessibilità) ---
  {
    universityId: 'uniecampus',
    strongAreas: ['economica', 'umanistica', 'sanitaria'],
    costTier: 'basso',
    tuitionRange: '2.000–3.000 €/anno',
    courses: [
      { area: 'economica', name: 'Economia Aziendale' },
      { area: 'umanistica', name: 'Scienze della Formazione Primaria' },
      { area: 'sanitaria', name: 'Infermieristica' },
    ],
    notes:
      'Ateneo telematico tra i più conosciuti, utile per chi ha vincoli economici o organizzativi importanti.',
  },
  {
    universityId: 'unipegaso',
    strongAreas: ['umanistica', 'economica', 'sanitaria'],
    costTier: 'basso',
    tuitionRange: '1.800–2.800 €/anno',
    courses: [
      { area: 'umanistica', name: 'Scienze della Comunicazione' },
      { area: 'economica', name: 'Economia e Management' },
    ],
    notes:
      'Università telematica con ampia offerta e costi contenuti, comoda per chi lavora durante gli studi.',
  },

  // --- Nord - nuovi atenei generalisti ---
  {
    universityId: 'unipv', // Università di Pavia
    strongAreas: ['sanitaria', 'scientifica', 'umanistica'],
    costTier: 'medio',
    tuitionRange: "900–2.900 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'scientifica', name: 'Fisica' },
      { area: 'umanistica', name: 'Lettere' },
    ],
    notes:
      "Ateneo storico tra i più antichi d'Italia, ottima reputazione in area medica e scientifica, città a misura di studente.",
  },
  {
    universityId: 'unitn', // Università di Trento
    strongAreas: ['economica', 'scientifica', 'ingegneria'],
    costTier: 'medio',
    tuitionRange: "700–3.000 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'economica', name: 'Economia e Management' },
      { area: 'scientifica', name: 'Scienze Cognitive' },
      { area: 'ingegneria', name: 'Ingegneria Industriale' },
    ],
    notes:
      'Costantemente ai primi posti nelle classifiche italiane per qualità della didattica e servizi agli studenti.',
  },
  {
    universityId: 'univr', // Università di Verona
    strongAreas: ['sanitaria', 'economica', 'umanistica'],
    costTier: 'medio',
    tuitionRange: "700–2.800 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'economica', name: 'Economia Aziendale' },
      { area: 'umanistica', name: 'Lingue e Letterature Straniere' },
    ],
    notes:
      'Città universitaria vivace con buon equilibrio tra qualità della vita e offerta formativa.',
  },
  {
    universityId: 'unipr', // Università di Parma
    strongAreas: ['sanitaria', 'scientifica', 'economica'],
    costTier: 'basso',
    tuitionRange: "600–2.500 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'scientifica', name: 'Scienze Gastronomiche' },
      { area: 'economica', name: 'Economia' },
    ],
    notes:
      'Tradizione di eccellenza in ambito alimentare e medico, costi della vita contenuti per il Nord Italia.',
  },
  {
    universityId: 'unimore', // Università di Modena e Reggio Emilia
    strongAreas: ['ingegneria', 'sanitaria', 'economica'],
    costTier: 'basso',
    tuitionRange: "600–2.600 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Meccanica' },
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'economica', name: 'Economia Aziendale' },
    ],
    notes:
      "Forte legame con il distretto industriale dell'Emilia, ottimo per chi punta a un rapido inserimento lavorativo.",
  },
  {
    universityId: 'unibg', // Università di Bergamo
    strongAreas: ['economica', 'umanistica'],
    costTier: 'medio',
    tuitionRange: "700–2.700 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'economica', name: 'Economia e Management' },
      { area: 'umanistica', name: 'Lingue Moderne' },
    ],
    notes:
      'Ateneo di medie dimensioni con forte vocazione internazionale e buon collegamento con Milano.',
  },
  {
    universityId: 'unica', // Università di Cagliari
    strongAreas: ['sanitaria', 'ingegneria', 'umanistica'],
    costTier: 'basso',
    tuitionRange: "300–1.800 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'ingegneria', name: 'Ingegneria Civile' },
      { area: 'umanistica', name: 'Lettere' },
    ],
    notes: 'Ateneo storico sardo con costi della vita molto contenuti e buona offerta generalista.',
  },
  {
    universityId: 'uniss', // Università di Sassari
    strongAreas: ['sanitaria', 'umanistica'],
    costTier: 'basso',
    tuitionRange: "300–1.700 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'sanitaria', name: 'Medicina Veterinaria' },
      { area: 'umanistica', name: 'Lettere' },
    ],
    notes:
      "Ateneo sardo con solida tradizione medico-veterinaria, costi della vita tra i più bassi d'Italia.",
  },
  {
    universityId: 'units', // Università di Trieste
    strongAreas: ['scientifica', 'sanitaria', 'ingegneria'],
    costTier: 'basso',
    tuitionRange: "600–2.400 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'scientifica', name: 'Fisica' },
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'ingegneria', name: 'Ingegneria Navale' },
    ],
    notes:
      'Forte vocazione scientifica grazie alla presenza di centri di ricerca internazionali in città.',
  },
  {
    universityId: 'uniud', // Università di Udine
    strongAreas: ['sanitaria', 'scientifica', 'economica'],
    costTier: 'basso',
    tuitionRange: "600–2.300 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'scientifica', name: 'Scienze Agrarie' },
      { area: 'economica', name: 'Economia Aziendale' },
    ],
    notes: 'Ateneo di medie dimensioni con buona tradizione agraria e medica, costi accessibili.',
  },

  // --- Centro - nuovi atenei generalisti ---
  {
    universityId: 'unipi', // Università di Pisa
    strongAreas: ['ingegneria', 'sanitaria', 'scientifica'],
    costTier: 'medio',
    tuitionRange: "700–2.900 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Aerospaziale' },
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'scientifica', name: 'Informatica' },
    ],
    notes:
      'Ateneo di altissimo livello con forte tradizione in ingegneria e informatica, città studentesca per eccellenza in Toscana.',
  },
  {
    universityId: 'unipg', // Università di Perugia
    strongAreas: ['sanitaria', 'umanistica', 'economica'],
    costTier: 'basso',
    tuitionRange: "500–2.200 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'umanistica', name: 'Lettere' },
      { area: 'economica', name: 'Economia' },
    ],
    notes:
      'Costi della vita molto contenuti per il Centro Italia, ateneo generalista con buona reputazione.',
  },
  {
    universityId: 'univpm', // Università Politecnica delle Marche
    strongAreas: ['ingegneria', 'economica', 'sanitaria'],
    costTier: 'basso',
    tuitionRange: "500–2.300 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Edile' },
      { area: 'economica', name: 'Economia e Commercio' },
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
    ],
    notes:
      'Buon equilibrio tra ingegneria, economia e medicina in una regione con costi della vita accessibili.',
  },
  {
    universityId: 'unicas', // Università di Cassino e del Lazio Meridionale
    strongAreas: ['ingegneria', 'economica'],
    costTier: 'basso',
    tuitionRange: "300–1.900 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Meccanica' },
      { area: 'economica', name: 'Economia Aziendale' },
    ],
    notes:
      'Ateneo di medie dimensioni con costi della vita molto bassi e buon collegamento con Roma.',
  },
  {
    universityId: 'univaq', // Università dell'Aquila
    strongAreas: ['ingegneria', 'scientifica', 'sanitaria'],
    costTier: 'basso',
    tuitionRange: "300–2.000 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Informatica' },
      { area: 'scientifica', name: 'Fisica' },
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
    ],
    notes:
      'Forte tradizione in fisica e informatica grazie alla presenza del Gran Sasso Science Institute in zona.',
  },

  // --- Sud - nuovi atenei generalisti ---
  {
    universityId: 'unisa', // Università di Salerno
    strongAreas: ['umanistica', 'ingegneria', 'economica'],
    costTier: 'basso',
    tuitionRange: "300–1.900 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'umanistica', name: 'Lettere' },
      { area: 'ingegneria', name: 'Ingegneria Civile' },
      { area: 'economica', name: 'Economia e Management' },
    ],
    notes:
      'Campus moderno e funzionale, buona offerta generalista con costi della vita molto accessibili.',
  },
  {
    universityId: 'unisalento', // Università del Salento
    strongAreas: ['umanistica', 'scientifica', 'ingegneria'],
    costTier: 'basso',
    tuitionRange: "300–1.800 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'umanistica', name: 'Lettere' },
      { area: 'scientifica', name: 'Scienze e Tecnologie Fisiche' },
      { area: 'ingegneria', name: 'Ingegneria Industriale' },
    ],
    notes: "Ateneo pugliese con buona qualità della vita, costi tra i più bassi d'Italia.",
  },
  {
    universityId: 'unime', // Università di Messina
    strongAreas: ['sanitaria', 'umanistica', 'economica'],
    costTier: 'basso',
    tuitionRange: "300–1.700 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'umanistica', name: 'Lettere' },
      { area: 'economica', name: 'Economia' },
    ],
    notes: 'Ateneo siciliano generalista con costi della vita molto contenuti.',
  },
  {
    universityId: 'unicz', // Università Magna Graecia di Catanzaro
    strongAreas: ['sanitaria'],
    costTier: 'basso',
    tuitionRange: "300–1.700 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'sanitaria', name: 'Odontoiatria' },
    ],
    notes:
      'Ateneo specializzato in area medico-sanitaria con strutture clinico-universitarie moderne.',
  },
  {
    universityId: 'unirc', // Università Mediterranea di Reggio Calabria
    strongAreas: ['ingegneria', 'economica'],
    costTier: 'basso',
    tuitionRange: "300–1.600 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Civile' },
      { area: 'economica', name: 'Economia Aziendale' },
    ],
    notes: "Ateneo calabrese con costi della vita tra i più bassi d'Italia.",
  },
  {
    universityId: 'unibas', // Università della Basilicata
    strongAreas: ['ingegneria', 'umanistica'],
    costTier: 'basso',
    tuitionRange: "300–1.600 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'ingegneria', name: 'Ingegneria Civile e Ambientale' },
      { area: 'umanistica', name: 'Lettere' },
    ],
    notes:
      'Piccolo ateneo regionale con costi della vita molto contenuti, ideale per chi cerca un ambiente più tranquillo.',
  },
  {
    universityId: 'unimol', // Università del Molise
    strongAreas: ['economica', 'umanistica', 'ingegneria'],
    costTier: 'basso',
    tuitionRange: "300–1.500 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'economica', name: 'Economia' },
      { area: 'umanistica', name: 'Scienze della Comunicazione' },
      { area: 'ingegneria', name: 'Informatica' },
    ],
    notes:
      "Tra gli atenei più economici d'Italia, piccola realtà universitaria a misura di studente.",
  },
  {
    universityId: 'unicampania', // Università della Campania "Luigi Vanvitelli"
    strongAreas: ['sanitaria', 'ingegneria', 'umanistica'],
    costTier: 'basso',
    tuitionRange: "300–1.900 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'ingegneria', name: 'Ingegneria Civile' },
      { area: 'umanistica', name: 'Lettere' },
    ],
    notes:
      'Ateneo campano con sedi diffuse sul territorio e buona offerta generalista a costi contenuti.',
  },
  {
    universityId: 'unifg', // Università di Foggia
    strongAreas: ['sanitaria', 'economica'],
    costTier: 'basso',
    tuitionRange: "300–1.600 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'economica', name: 'Economia' },
    ],
    notes: 'Piccolo ateneo pugliese con costi della vita molto accessibili.',
  },
  {
    universityId: 'uniparthenope', // Università di Napoli Parthenope
    strongAreas: ['economica', 'scientifica'],
    costTier: 'basso',
    tuitionRange: "300–1.800 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'economica', name: 'Economia Aziendale' },
      { area: 'scientifica', name: 'Scienze Nautiche' },
    ],
    notes: 'Ateneo napoletano con buona specializzazione in ambito economico e marittimo.',
  },

  // --- Generaliste Centro-Nord aggiuntive ---
  {
    universityId: 'unife', // Università di Ferrara
    strongAreas: ['sanitaria', 'umanistica'],
    costTier: 'basso',
    tuitionRange: "600–2.300 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'umanistica', name: 'Lettere' },
    ],
    notes: 'Piccolo ateneo emiliano con buona qualità della vita e costi accessibili.',
  },
  {
    universityId: 'unicam', // Università di Camerino
    strongAreas: ['scientifica', 'sanitaria'],
    costTier: 'basso',
    tuitionRange: "300–1.700 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'scientifica', name: 'Chimica' },
      { area: 'sanitaria', name: 'Farmacia' },
    ],
    notes:
      'Ateneo specializzato in scienze chimico-farmaceutiche, piccola realtà a costi molto bassi.',
  },
  {
    universityId: 'unimc', // Università di Macerata
    strongAreas: ['umanistica', 'economica'],
    costTier: 'basso',
    tuitionRange: "300–1.700 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'umanistica', name: 'Giurisprudenza' },
      { area: 'economica', name: 'Economia' },
    ],
    notes: 'Ateneo umanistico-giuridico di tradizione, costi della vita molto contenuti.',
  },
  {
    universityId: 'uniurb', // Università di Urbino "Carlo Bo"
    strongAreas: ['umanistica', 'scientifica'],
    costTier: 'basso',
    tuitionRange: "300–1.700 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'umanistica', name: 'Scienze della Comunicazione' },
      { area: 'scientifica', name: 'Biotecnologie' },
    ],
    notes:
      'Città patrimonio UNESCO con ottima tradizione umanistica, costi della vita molto accessibili.',
  },
  {
    universityId: 'unipmn', // Università del Piemonte Orientale
    strongAreas: ['sanitaria', 'economica'],
    costTier: 'basso',
    tuitionRange: "500–2.200 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'economica', name: 'Economia' },
    ],
    notes: 'Ateneo piemontese diffuso su più sedi, costi della vita contenuti.',
  },
  {
    universityId: 'uninsubria', // Università dell'Insubria
    strongAreas: ['sanitaria', 'scientifica', 'economica'],
    costTier: 'medio',
    tuitionRange: "700–2.600 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'scientifica', name: 'Scienze Biologiche' },
      { area: 'economica', name: 'Economia' },
    ],
    notes: 'Ateneo lombardo diffuso tra Varese e Como, buona offerta generalista.',
  },
  {
    universityId: 'unitus', // Università della Tuscia
    strongAreas: ['scientifica', 'economica'],
    costTier: 'basso',
    tuitionRange: "300–1.800 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'scientifica', name: 'Scienze Agrarie e Forestali' },
      { area: 'economica', name: 'Economia' },
    ],
    notes: 'Ateneo specializzato in scienze agrarie e ambientali, piccola realtà a Viterbo.',
  },
  {
    universityId: 'unich', // Università "Gabriele d\'Annunzio" di Chieti-Pescara
    strongAreas: ['sanitaria', 'economica', 'umanistica'],
    costTier: 'basso',
    tuitionRange: "300–2.000 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'sanitaria', name: 'Medicina e Chirurgia' },
      { area: 'economica', name: 'Economia' },
      { area: 'umanistica', name: 'Lettere' },
    ],
    notes: 'Ateneo abruzzese generalista con buona offerta medico-sanitaria e costi accessibili.',
  },
  {
    universityId: 'unite', // Università di Teramo
    strongAreas: ['economica', 'umanistica'],
    costTier: 'basso',
    tuitionRange: "300–1.700 €/anno (a seconda dell'ISEE)",
    courses: [
      { area: 'economica', name: 'Economia' },
      { area: 'umanistica', name: 'Scienze della Comunicazione' },
    ],
    notes: 'Piccolo ateneo abruzzese con costi della vita molto contenuti.',
  },

  // --- Private/internazionali aggiuntive ---
  {
    universityId: 'iulm', // Libera Università di Lingue e Comunicazione IULM
    strongAreas: ['umanistica', 'economica'],
    costTier: 'alto',
    tuitionRange: '6.000–9.000 €/anno',
    courses: [
      { area: 'umanistica', name: 'Scienze della Comunicazione' },
      { area: 'economica', name: "Marketing e Comunicazione d'Impresa" },
    ],
    notes: 'Ateneo privato milanese specializzato in comunicazione, media e lingue straniere.',
  },
  {
    universityId: 'lumsa', // LUMSA
    strongAreas: ['umanistica', 'economica'],
    costTier: 'medio',
    tuitionRange: '2.500–5.000 €/anno',
    courses: [
      { area: 'umanistica', name: 'Scienze della Formazione Primaria' },
      { area: 'economica', name: 'Economia' },
    ],
    notes:
      'Ateneo privato romano con forte tradizione pedagogica e giuridica, costi più contenuti di altri privati.',
  },
  {
    universityId: 'unibz', // Libera Università di Bolzano
    strongAreas: ['economica', 'ingegneria', 'umanistica'],
    costTier: 'medio',
    tuitionRange: '1.000–2.500 €/anno',
    courses: [
      { area: 'economica', name: 'Economia e Management' },
      { area: 'ingegneria', name: 'Ingegneria Industriale Meccanica' },
      { area: 'umanistica', name: 'Scienze della Formazione' },
    ],
    notes: 'Ateneo trilingue (italiano, tedesco, inglese) con didattica fortemente internazionale.',
  },
  {
    universityId: 'unisg', // Università di Scienze Gastronomiche
    strongAreas: ['scientifica', 'economica'],
    costTier: 'alto',
    tuitionRange: '8.000–12.000 €/anno',
    courses: [{ area: 'scientifica', name: 'Scienze Gastronomiche' }],
    notes:
      'Unico ateneo italiano interamente dedicato alle scienze gastronomiche, format altamente specializzato.',
  },
];
