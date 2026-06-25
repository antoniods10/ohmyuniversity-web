export interface SurveyExam {
  adCod: string;
  adDes: string;
  adsceId: number;
  annoCorso: number;
  cfu: number;
  statoLink: number;
}

export interface SurveysResponse {
  daCompilare: SurveyExam[];
  compilati: SurveyExam[];
}
