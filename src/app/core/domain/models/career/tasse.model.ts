export interface VoceTassa {
  fattId: number;
  tassaId: number;
  tassaCod: string;
  tassaDes: string;
  voceId: number;
  voceCod: string;
  voceDes: string;
  importoVoce: string;
  dataScadenza: string;
  dataPagTollerataMax: string;
}

export interface Addebito {
  aaId: number;
  tassaDes: string;
  tassaCod: string;
  tipoTaxCod: string;
  voceDes: string;
  importoVoce: number;
  scadenzaAddebito: string;
  scadutoFlg: number;
  fattId: number;
  scadFattura: string;
  fattScadutaFlg: number;
  importoFattura: string;
  dataEmissione: string;
  pagatoFlg: number;
  dataPagamento: string;
  importoPag: number;
  annullataFlg: number;
  rataDes: string;
  iuv: string;
  codiceAvviso: string;
}

export interface TasseResponse {
  semaforo: string;
  importoDovuto: string;
  tasseScadute: VoceTassa[];
  tasseDovute: VoceTassa[];
  addebiti: Addebito[];
}
