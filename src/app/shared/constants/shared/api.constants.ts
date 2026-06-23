import { environment } from '@environments/environment';

const BASE = environment.apiUrl;

export const API = {
  auth: {
    login: `${BASE}/v1/auth/login`,
    refresh: `${BASE}/v1/auth/refresh`,
    logout: `${BASE}/v1/auth/logout`,
    switchCarriera: `${BASE}/v1/auth/switch-carriera`,
  },
  carriera: {
    tasse: `${BASE}/v1/carriera/tasse`,
    libretto: `${BASE}/v1/carriera/libretto`,
    medie: `${BASE}/v1/carriera/medie`,
    piano: `${BASE}/v1/carriera/piano`,
    prenotazioni: `${BASE}/v1/carriera/prenotazioni`,
    badge: `${BASE}/v1/carriera/badge`,
    esamiSuggeriti: `${BASE}/v1/carriera/esami-suggeriti`,
    appelliPrenotabili: `${BASE}/v1/carriera/appelli-prenotabili`,
    prenotazioniLibretto: `${BASE}/v1/carriera/prenotazioni-libretto`,
    storicoEsami: `${BASE}/v1/carriera/storico-esami`,
    questionari: `${BASE}/v1/carriera/questionari`,
    profilo: `${BASE}/v1/carriera/profilo`,
    info: `${BASE}/v1/carriera/info`,
    foto: `${BASE}/v1/carriera/foto`,
  },
} as const;
