export interface Tentativo {
  applistaId: number;
  dataOraTurno: string;
  dataInizioIscr: string;
  dataFineIscr: string;
  tipoIscrCod: string;
  domandeEsame: string;
  posizApp: number;
  superato: boolean;
  ritirato: boolean;
  assente: boolean;
  futuro: boolean;
  votoEsa: number | null;
  tipoGiudCod: string;
  tipoGiudizioDes: string;
}

export interface EsameConStorico {
  adCod: string;
  adDes: string;
  adsceId: number;
  cfu: number;
  tentativi: Tentativo[];
}

export interface StoricoEsamiResponse {
  esami: EsameConStorico[];
}
