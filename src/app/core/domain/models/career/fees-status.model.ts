export interface FeeItem {
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

export interface Charge {
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

export interface FeeStatusResponse {
  semaforo: string;
  importoDovuto: string;
  tasseScadute: FeeItem[];
  tasseDovute: FeeItem[];
  addebiti: Charge[];
}
