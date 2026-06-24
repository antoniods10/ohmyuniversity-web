export interface RigaLibretto {
  adsceId: number;
  adCod: string;
  adDes: string;
  annoCorso: number;
  stato: string;
  statoDes: string;
  peso: number;
  tipoInsCod: string;
  tipoInsDes: string;
  voto: number | null;
  lode: boolean;
  dataEsame: string | null;
  superata: boolean;
  numAppelliPrenotabili: number;
}

export interface LibrettoResponse {
  righe: RigaLibretto[];
}
