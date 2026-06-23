export interface AppelloLibretto {
  appId: number;
  appelloId: number;
  cdsId: number;
  adId: number;
  adCod: string;
  adDes: string;
  adsceId: number;
  dataInizioApp: string;
  dataInizioIscr: string;
  dataFineIscr: string;
  oraEsa: string;
  stato: string;
  statoDes: string;
  docente: string;
  note: string;
  numIscritti: number;
  tipoIscrCod: string;
  desApp: string;
}

export interface AppelliLibrettoResponse {
  appelli: AppelloLibretto[];
}

export interface IscrizioneAppello {
  applistaId: number;
  cdsId: number;
  adId: number;
  appId: number;
  adStuCod: string;
  adStuDes: string;
  adsceId: number;
  dataOraTurno: string;
  dataInizioIscr: string;
  dataFineIscr: string;
  aulaDes: string;
  tipoIscrCod: string;
}

export interface PrenotazioniLibrettoResponse {
  prenotazioni: IscrizioneAppello[];
}
