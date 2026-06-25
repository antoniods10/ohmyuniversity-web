export interface RecommendedExam {
  adCod: string;
  adDes: string;
  cfu: number;
  annoCorso: number;
  score: number;
}

export interface RecommendationsResponse {
  esami: RecommendedExam[];
}
