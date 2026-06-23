import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../domain/repositories/carriera.repository';
import { TasseResponse } from '../../domain/models/tasse.model';
import { LibrettoResponse } from '../../domain/models/libretto.model';
import { MediaResponse } from '../../domain/models/media.model';
import { PianoStudioResponse } from '../../domain/models/piano.model';
import { PrenotazioneRequest, PrenotazioneResponse } from '../../domain/models/prenotazioni.model';
import { BadgeResponse } from '../../domain/models/badge.model';
import { SuggerimentiResponse } from '../../domain/models/suggerimenti.model';
import { API } from '@constants';
import {
  AppelliLibrettoResponse,
  PrenotazioniLibrettoResponse,
} from '../../domain/models/appelli.model';
import { StoricoEsamiResponse } from '../../domain/models/storico-esami.model';
import { QuestionariResponse } from '../../domain/models/questionari.model';
import { ProfiloResponse } from '../../domain/models/profilo.model';
import { CarrieraInfoResponse } from '../../domain/models/carriera-info.model';

@Injectable()
export class CarrieraApiRepository extends CarrieraRepository {
  private readonly http = inject(HttpClient);

  getTasse(): Observable<TasseResponse> {
    return this.http.get<TasseResponse>(API.carriera.tasse);
  }

  getLibretto(): Observable<LibrettoResponse> {
    return this.http.get<LibrettoResponse>(API.carriera.libretto);
  }

  getMedia(): Observable<MediaResponse> {
    return this.http.get<MediaResponse>(API.carriera.medie);
  }

  getPiano(): Observable<PianoStudioResponse> {
    return this.http.get<PianoStudioResponse>(API.carriera.piano);
  }

  getPrenotazioni(request: PrenotazioneRequest): Observable<PrenotazioneResponse> {
    return this.http.post<PrenotazioneResponse>(API.carriera.prenotazioni, request);
  }

  getBadge(): Observable<BadgeResponse> {
    return this.http.get<BadgeResponse>(API.carriera.badge);
  }

  getEsamiSuggeriti(): Observable<SuggerimentiResponse> {
    return this.http.get<SuggerimentiResponse>(API.carriera.esamiSuggeriti);
  }

  getAppelliPrenotabili(): Observable<AppelliLibrettoResponse> {
    return this.http.get<AppelliLibrettoResponse>(API.carriera.appelliPrenotabili);
  }

  getPrenotazioniLibretto(): Observable<PrenotazioniLibrettoResponse> {
    return this.http.get<PrenotazioniLibrettoResponse>(API.carriera.prenotazioniLibretto);
  }

  getStoricoEsami(): Observable<StoricoEsamiResponse> {
    return this.http.get<StoricoEsamiResponse>(API.carriera.storicoEsami);
  }

  getQuestionari(): Observable<QuestionariResponse> {
    return this.http.get<QuestionariResponse>(API.carriera.questionari);
  }

  getProfilo(): Observable<ProfiloResponse> {
    return this.http.get<ProfiloResponse>(API.carriera.profilo);
  }

  getCarrieraInfo(): Observable<CarrieraInfoResponse> {
    return this.http.get<CarrieraInfoResponse>(API.carriera.info);
  }

  getFoto(): Observable<Blob> {
    return this.http.get(API.carriera.foto, { responseType: 'blob' });
  }
}
