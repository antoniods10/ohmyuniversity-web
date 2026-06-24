import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '@constants';
import { CarrieraInfoResponse } from 'src/app/features/dashboard/domain/models/carriera-info.model';
import { ProfiloResponse } from 'src/app/features/dashboard/domain/models/profilo.model';
import { QuestionariResponse } from 'src/app/features/dashboard/domain/models/questionari.model';
import { StoricoEsamiResponse } from 'src/app/features/dashboard/domain/models/storico-esami.model';
import { SuggerimentiResponse } from 'src/app/features/dashboard/domain/models/suggerimenti.model';
import { BadgeResponse } from 'src/app/features/dashboard/domain/models/badge.model';
import {
  PrenotazioneRequest,
  PrenotazioneResponse,
} from 'src/app/features/dashboard/domain/models/prenotazioni.model';
import { CarrieraRepository } from '../../domain/repositories/carriera.repository';
import { TasseResponse } from 'src/app/features/dashboard/domain/models/tasse.model';
import { LibrettoResponse } from 'src/app/features/dashboard/domain/models/libretto.model';
import { MediaResponse } from 'src/app/features/dashboard/domain/models/media.model';
import { PianoStudioResponse } from 'src/app/features/dashboard/domain/models/piano.model';
import {
  AppelliLibrettoResponse,
  PrenotazioniLibrettoResponse,
} from 'src/app/features/dashboard/domain/models/appelli.model';

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
