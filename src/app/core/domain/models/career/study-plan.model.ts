export interface StudyPlanRow {
  adsceId: number;
  adCod: string;
  adDes: string;
  annoCorso: number;
  cfu: number;
  tipoInsCod: string;
  tipoInsDes: string;
  obbligatorio: boolean;
  stato: string;
  statoDes: string;
  superata: boolean;
}

export interface StudyPlanResponse {
  righe: StudyPlanRow[];
}
