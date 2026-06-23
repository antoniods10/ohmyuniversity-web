export interface EsameSuggerito {
  adCod: string;
  adDes: string;
  cfu: number;
  annoCorso: number;
  score: number;
}

export interface SuggerimentiResponse {
  esami: EsameSuggerito[];
}
