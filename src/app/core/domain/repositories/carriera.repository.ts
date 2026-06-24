import { Observable } from 'rxjs';
import { LibrettoResponse } from '../models/career/libretto.model';
import { MediaResponse } from '../models/career/media.model';
import { PianoStudioResponse } from '../models/career/piano.model';
import { PrenotazioneRequest, PrenotazioneResponse } from '../models/career/prenotazioni.model';
import { BadgeResponse } from '../models/career/badge.model';
import { SuggerimentiResponse } from '../models/career/suggerimenti.model';
import { TasseResponse } from '../models/career/tasse.model';
import {
  AppelliLibrettoResponse,
  PrenotazioniLibrettoResponse,
} from '../models/career/appelli.model';
import { StoricoEsamiResponse } from '../models/career/storico-esami.model';
import { QuestionariResponse } from '../models/career/questionari.model';
import { ProfiloResponse } from '../models/career/profilo.model';
import { CarrieraInfoResponse } from '../models/career/carriera-info.model';

export abstract class CarrieraRepository {
  abstract getTasse(): Observable<TasseResponse>;
  abstract getLibretto(): Observable<LibrettoResponse>;
  abstract getMedia(): Observable<MediaResponse>;
  abstract getPiano(): Observable<PianoStudioResponse>;
  abstract getPrenotazioni(request: PrenotazioneRequest): Observable<PrenotazioneResponse>;
  abstract getBadge(): Observable<BadgeResponse>;
  abstract getEsamiSuggeriti(): Observable<SuggerimentiResponse>;
  abstract getAppelliPrenotabili(): Observable<AppelliLibrettoResponse>;
  abstract getPrenotazioniLibretto(): Observable<PrenotazioniLibrettoResponse>;
  abstract getStoricoEsami(): Observable<StoricoEsamiResponse>;
  abstract getQuestionari(): Observable<QuestionariResponse>;
  abstract getProfilo(): Observable<ProfiloResponse>;
  abstract getCarrieraInfo(): Observable<CarrieraInfoResponse>;
  abstract getFoto(): Observable<Blob>;
}
