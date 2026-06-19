import { UniversityOrientationInfo } from '@types';

/**
 * Orientation enrichment for ~40 well-known Italian universities, covering
 * all 6 study areas across Nord, Centro and Sud. Universities not listed here
 * simply won't be suggested by the orientation result — the core University
 * list is unaffected.
 */
export const UNIVERSITY_ORIENTATION_INFO: UniversityOrientationInfo[] = [
  {
    universityId: 'polimi',
    strongAreas: ['ingegneria', 'scientifica'],
    costTier: 'medio',
    notes:
      'Uno dei migliori politecnici a livello internazionale, fortissimo network con le aziende del Nord Italia.',
  },
  {
    universityId: 'polito',
    strongAreas: ['ingegneria', 'scientifica'],
    costTier: 'medio',
    notes: 'Eccellenza tecnica con costi più accessibili di Milano e ottimi laboratori.',
  },
  {
    universityId: 'unimi',
    strongAreas: ['scientifica', 'sanitaria', 'umanistica'],
    costTier: 'medio',
    notes: 'Ateneo generalista di altissimo livello, forte in ricerca scientifica e area medica.',
  },
  {
    universityId: 'unimib',
    strongAreas: ['scientifica', 'economica'],
    costTier: 'medio',
    notes: 'Ateneo giovane e dinamico, buon rapporto qualità-prezzo per Milano.',
  },
  {
    universityId: 'unipd',
    strongAreas: ['scientifica', 'sanitaria', 'ingegneria'],
    costTier: 'medio',
    notes: 'Uno dei più antichi atenei al mondo, eccellente in medicina e scienze.',
  },
  {
    universityId: 'unibo',
    strongAreas: ['umanistica', 'economica', 'sanitaria', 'scientifica'],
    costTier: 'medio',
    notes:
      "L'ateneo più antico del mondo occidentale, città studentesca per eccellenza, offerta completa su quasi tutte le aree.",
  },
  {
    universityId: 'unige',
    strongAreas: ['ingegneria', 'scientifica'],
    costTier: 'medio',
    notes:
      'Buona tradizione tecnico-scientifica, costi della vita più accessibili rispetto a Milano e Torino.',
  },
  {
    universityId: 'unibs',
    strongAreas: ['ingegneria', 'sanitaria'],
    costTier: 'basso',
    notes: 'Ateneo di medie dimensioni con ottimo rapporto qualità-prezzo.',
  },

  // --- Economica & Giuridica ---
  {
    universityId: 'unibocconi',
    strongAreas: ['economica'],
    costTier: 'alto',
    notes:
      'Il punto di riferimento italiano per economia e management, network internazionale fortissimo ma costi elevati.',
  },
  {
    universityId: 'luiss',
    strongAreas: ['economica', 'umanistica'],
    costTier: 'alto',
    notes:
      'Ateneo privato di prestigio a Roma, forte in economia, giurisprudenza e scienze politiche.',
  },
  {
    universityId: 'unicatt',
    strongAreas: ['umanistica', 'economica', 'sanitaria'],
    costTier: 'alto',
    notes: 'Il più grande ateneo privato italiano, offerta ampia con un buon prestigio percepito.',
  },
  {
    universityId: 'liuc',
    strongAreas: ['economica', 'ingegneria'],
    costTier: 'alto',
    notes:
      'Ateneo privato di piccole dimensioni, molto orientato al mondo del lavoro e alle aziende del territorio.',
  },

  // --- Sanitaria ---
  {
    universityId: 'unicampus',
    strongAreas: ['sanitaria'],
    costTier: 'alto',
    notes:
      'Ateneo privato specializzato in area medica, struttura clinica annessa di alto livello.',
  },
  {
    universityId: 'unicamillus',
    strongAreas: ['sanitaria'],
    costTier: 'alto',
    notes: 'Ateneo privato internazionale specializzato in medicina e professioni sanitarie.',
  },
  {
    universityId: 'unisr',
    strongAreas: ['sanitaria', 'umanistica'],
    costTier: 'alto',
    notes:
      'Vita-Salute San Raffaele, eccellenza in medicina e psicologia con forte impronta di ricerca.',
  },

  // --- Centro Italia ---
  {
    universityId: 'unifi',
    strongAreas: ['umanistica', 'artistica', 'scientifica'],
    costTier: 'medio',
    notes:
      'Città a forte vocazione artistica e culturale, ottima offerta umanistica e nelle belle arti.',
  },
  {
    universityId: 'sns',
    strongAreas: ['umanistica', 'scientifica'],
    costTier: 'basso',
    notes:
      'Scuola Normale Superiore, eccellenza accademica assoluta, accesso molto selettivo ma costi contenuti grazie alle borse di merito.',
  },
  {
    universityId: 'sssup',
    strongAreas: ['ingegneria', 'scientifica'],
    costTier: 'basso',
    notes:
      "Scuola Sant'Anna, eccellenza in ingegneria e scienze applicate, fortemente orientata alla ricerca.",
  },
  {
    universityId: 'unisi',
    strongAreas: ['sanitaria', 'umanistica'],
    costTier: 'basso',
    notes: 'Ateneo storico toscano con ottima tradizione medica e costi della vita contenuti.',
  },
  {
    universityId: 'uniroma1',
    strongAreas: ['umanistica', 'scientifica', 'sanitaria', 'ingegneria'],
    costTier: 'medio',
    notes:
      "La Sapienza, uno degli atenei più grandi d'Europa, offerta completissima su tutte le aree.",
  },
  {
    universityId: 'uniroma2',
    strongAreas: ['ingegneria', 'economica', 'sanitaria'],
    costTier: 'medio',
    notes: 'Tor Vergata, campus moderno con forte impronta scientifico-tecnologica.',
  },
  {
    universityId: 'uniroma3',
    strongAreas: ['umanistica', 'artistica'],
    costTier: 'medio',
    notes:
      'Ateneo romano con buona offerta umanistica e di design, costi più contenuti rispetto ad altri atenei capitolini.',
  },

  // --- Sud Italia ---
  {
    universityId: 'unina',
    strongAreas: ['ingegneria', 'umanistica', 'sanitaria', 'scientifica'],
    costTier: 'basso',
    notes: 'Federico II, ateneo storico con offerta completa e costi della vita molto contenuti.',
  },
  {
    universityId: 'unisob',
    strongAreas: ['umanistica'],
    costTier: 'medio',
    notes:
      'Suor Orsola Benincasa, ateneo privato napoletano con forte impronta umanistica e pedagogica.',
  },
  {
    universityId: 'uniba',
    strongAreas: ['umanistica', 'sanitaria', 'economica'],
    costTier: 'basso',
    notes:
      'Ateneo pugliese di buona tradizione, ottimo rapporto qualità-prezzo per chi resta al Sud.',
  },
  {
    universityId: 'poliba',
    strongAreas: ['ingegneria'],
    costTier: 'basso',
    notes:
      'Politecnico di Bari, riferimento tecnico del Sud Italia con costi della vita molto accessibili.',
  },
  {
    universityId: 'unipa',
    strongAreas: ['umanistica', 'sanitaria', 'scientifica'],
    costTier: 'basso',
    notes:
      'Ateneo siciliano con ampia offerta formativa e costi della vita tra i più bassi in Italia.',
  },
  {
    universityId: 'unict',
    strongAreas: ['scientifica', 'ingegneria', 'sanitaria'],
    costTier: 'basso',
    notes: 'Buona tradizione scientifica, costi accessibili e città universitaria vivace.',
  },
  {
    universityId: 'unical',
    strongAreas: ['umanistica', 'scientifica', 'ingegneria'],
    costTier: 'basso',
    notes: 'Campus unico e moderno, tra i più economici per vivere e studiare in Italia.',
  },

  // --- Artistica & Design ---
  {
    universityId: 'unive',
    strongAreas: ['artistica', 'umanistica', 'economica'],
    costTier: 'medio',
    notes:
      "Ca' Foscari, forte vocazione internazionale e ottima offerta umanistico-economica in una città unica.",
  },
  {
    universityId: 'iuav',
    strongAreas: ['artistica'],
    costTier: 'medio',
    notes: "Ateneo specializzato in architettura e design, riferimento per chi punta a quest'area.",
  },

  // --- Telematiche (per chi ha budget limitato o serve flessibilità) ---
  {
    universityId: 'uniecampus',
    strongAreas: ['economica', 'umanistica', 'sanitaria'],
    costTier: 'basso',
    notes:
      'Ateneo telematico tra i più conosciuti, utile per chi ha vincoli economici o organizzativi importanti.',
  },
  {
    universityId: 'unipegaso',
    strongAreas: ['umanistica', 'economica', 'sanitaria'],
    costTier: 'basso',
    notes:
      'Università telematica con ampia offerta e costi contenuti, comoda per chi lavora durante gli studi.',
  },
];
