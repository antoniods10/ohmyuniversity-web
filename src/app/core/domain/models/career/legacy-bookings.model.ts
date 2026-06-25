export interface LegacyBookingRequest {
  password: string;
}

export interface LegacyBooking {
  applistaId: number;
  adId: number;
  adStuCod: string;
  adStuDes: string;
  adsceId: number;
  cdsId: number;
  appId: number;
  appLogId: number;
  stuId: number;
  dataIns: string;
  dataEsa: string;
  dataRifEsitoStu: string;
  pesoAd: number;
  posizApp: number;
  esito: LegacyBookingResult | null;
  presaVisione: string;
  statoAdsce: string;
  esitoPubblicato: boolean;
  domandeEsame: string;
}

export interface LegacyBookingResult {
  votoEsa: number | null;
  superato: boolean;
  assente: boolean;
  ritirato: boolean;
  tipoGiudCod: string;
  tipoGiudizioDes: string;
}

export interface LegacyBookingsResponse {
  prenotazioni: LegacyBooking[];
}
