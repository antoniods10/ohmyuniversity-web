export interface QuestionarioEsame {
  adCod: string;
  adDes: string;
  adsceId: number;
  annoCorso: number;
  cfu: number;
  statoLink: number;
}

export interface QuestionariResponse {
  daCompilare: QuestionarioEsame[];
  compilati: QuestionarioEsame[];
}
