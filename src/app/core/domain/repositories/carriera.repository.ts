import { Observable } from 'rxjs';
import { LibrettoResponse } from '../../../features/dashboard/domain/models/libretto.model';
import { MediaResponse } from '../../../features/dashboard/domain/models/media.model';
import { PianoStudioResponse } from '../../../features/dashboard/domain/models/piano.model';
import {
  PrenotazioneRequest,
  PrenotazioneResponse,
} from '../../../features/dashboard/domain/models/prenotazioni.model';
import { BadgeResponse } from '../../../features/dashboard/domain/models/badge.model';
import { SuggerimentiResponse } from '../../../features/dashboard/domain/models/suggerimenti.model';
import { TasseResponse } from '../../../features/dashboard/domain/models/tasse.model';
import {
  AppelliLibrettoResponse,
  PrenotazioniLibrettoResponse,
} from '../../../features/dashboard/domain/models/appelli.model';
import { StoricoEsamiResponse } from '../../../features/dashboard/domain/models/storico-esami.model';
import { QuestionariResponse } from '../../../features/dashboard/domain/models/questionari.model';
import { ProfiloResponse } from '../../../features/dashboard/domain/models/profilo.model';
import { CarrieraInfoResponse } from '../../../features/dashboard/domain/models/carriera-info.model';

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
