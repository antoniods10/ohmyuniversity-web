export interface PrenotazioneRequest {
  password: string;
}

export interface PrenotazioneResponse {
  prenotazioni: Prenotazione[];
}

export interface Prenotazione {
  adCod: string;
  adDes: string;
  dataPrenotazione: string;
  dataEsame: string;
  aula: string | null;
  stato: string;
}
