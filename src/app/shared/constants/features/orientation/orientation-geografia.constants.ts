import { CittaTop, AreaGeoInfo, Consiglio } from '@types';

/** Geographic area cost overview interface */
export interface GeographicAreaCost {
  area: string;
  affittoCamera: string;
  costoVita: string;
  esempiCitta: string;
  noteAggiuntive: string;
}

/** Average rent and cost of living for Nord, Centro, Sud e Isole */
export const GEOGRAPHIC_AREA_COSTS: GeographicAreaCost[] = [
  {
    area: 'Nord',
    affittoCamera: '450-700 €/mese',
    costoVita: 'Alto',
    esempiCitta: 'Milano, Torino, Bologna, Padova',
    noteAggiuntive:
      "Milano è la città più cara d'Italia per gli studenti. Bologna e Padova sono più accessibili ma restano sopra la media.",
  },
  {
    area: 'Centro',
    affittoCamera: '350-550 €/mese',
    costoVita: 'Medio',
    esempiCitta: 'Roma, Firenze, Pisa, Perugia',
    noteAggiuntive:
      'Roma ha costi simili al Nord nelle zone universitarie. Perugia e Pisa offrono un buon rapporto qualità-prezzo.',
  },
  {
    area: 'Sud e Isole',
    affittoCamera: '200-400 €/mese',
    costoVita: 'Basso',
    esempiCitta: 'Napoli, Bari, Catania, Palermo, Salerno',
    noteAggiuntive:
      "Il costo della vita significativamente più basso può compensare una minor reputazione dell'ateneo in alcuni settori.",
  },
];

/** 6 standout Italian university cities, each best for a specific category */
export const TOP_CITIES: CittaTop[] = [
  {
    citta: 'Bologna',
    area: 'Nord',
    categoria: 'Migliore per vita universitaria',
    motivo:
      'Studentesca per eccellenza, una delle città con la più alta percentuale di studenti in Italia. Servizi, locali, cultura e ateneo di altissimo livello.',
    badge: 'Top assoluto',
    stats: [
      '100.000+ studenti universitari',
      'Affitto medio 500-650 €/mese',
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
      'Affitto medio 700-950 €/mese',
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
      'Affitto medio 400-550 €/mese',
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
      'Affitto medio 250-380 €/mese',
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
      'Affitto medio 350-500 €/mese',
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
      'Affitto medio 200-320 €/mese',
      'Hub ferroviario per tutto il Sud',
      '50.000+ studenti universitari',
    ],
  },
];

/** Comparative ratings (1-5) for Nord, Centro, Sud across 4 life dimensions */
export const GEOGRAPHIC_AREA_INFO: AreaGeoInfo[] = [
  {
    area: 'Nord',
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

/** Practical tips for choosing the right city to study in */
export const GEO_TIPS: Consiglio[] = [
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
