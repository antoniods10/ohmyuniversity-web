export interface TempoSlice {
  label: string;
  percent: number;
  color: string;
}

export interface Consiglio {
  titolo: string;
  testo: string;
}

export interface VitaFuorisedeItem {
  voce: string;
  importo: string;
}

export interface SboccoArea {
  area: string;
  occupazione1anno: number;
  stipendioMedio: string;
}

export interface TestIngresso {
  ateneo: string;
  corso: string;
  tipo: string;
  argomenti: string[];
  link: string;
}

export interface AutovalutazioneItem {
  domanda: string;
  rilevante: string;
}

export interface Errore {
  titolo: string;
  perche: string;
  soluzione: string;
  emoji: string;
}

export interface ConsiglioCorso {
  titolo: string;
  testo: string;
}

export interface AreaCorso {
  label: string;
  emoji: string;
  esempi: string;
}

export interface SessioneInfo {
  label: string;
  periodo: string;
  note: string;
}

export interface TipoEsame {
  tipo: string;
  descrizione: string;
  icon: string;
}

export interface Differenza {
  aspetto: string;
  scuola: string;
  universita: string;
}

export interface SboccoDataPoint {
  area: string;
  occupazione: number;
  colore: string;
}

export interface CfuDataPoint {
  anno: string;
  cfu: number;
  oreStudio: number;
}
