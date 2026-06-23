import { Observable } from 'rxjs';
import { LibrettoResponse } from '../models/libretto.model';
import { MediaResponse } from '../models/media.model';
import { PianoStudioResponse } from '../models/piano.model';
import { PrenotazioneRequest, PrenotazioneResponse } from '../models/prenotazioni.model';
import { BadgeResponse } from '../models/badge.model';
import { SuggerimentiResponse } from '../models/suggerimenti.model';
import { TasseResponse } from '../models/tasse.model';
import { AppelliLibrettoResponse, PrenotazioniLibrettoResponse } from '../models/appelli.model';
import { StoricoEsamiResponse } from '../models/storico-esami.model';
import { QuestionariResponse } from '../models/questionari.model';
import { ProfiloResponse } from '../models/profilo.model';

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
}
