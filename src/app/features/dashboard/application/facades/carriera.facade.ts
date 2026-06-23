import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TasseResponse } from '../../domain/models/tasse.model';
import { MediaResponse } from '../../domain/models/media.model';
import { PianoStudioResponse } from '../../domain/models/piano.model';
import { PrenotazioneRequest, PrenotazioneResponse } from '../../domain/models/prenotazioni.model';
import { BadgeResponse } from '../../domain/models/badge.model';
import { SuggerimentiResponse } from '../../domain/models/suggerimenti.model';
import { GetTasseUseCase } from '../usecases/get-tasse.usecase';
import { GetBadgeUseCase } from '../usecases/get-badge.usecase';
import { GetEsamiSuggeриtiUseCase } from '../usecases/get-esami-suggeriti.usecase';
import { GetLibrettoUseCase } from '../usecases/get-libretto.usecase';
import { GetMediaUseCase } from '../usecases/get-media.usecase';
import { GetPianoUseCase } from '../usecases/get-piano.usecase';
import { GetPrenotazioniUseCase } from '../usecases/get-prenotazioni.usecase';
import { Exam } from '@shared/types/dashboard/career.types';
import { GetAppelliPrenotabiliUseCase } from '../usecases/get-appelli-prenotabili.usecase';
import {
  AppelliLibrettoResponse,
  PrenotazioniLibrettoResponse,
} from '../../domain/models/appelli.model';
import { GetPrenotazioniLibrettoUseCase } from '../usecases/get-prenotazioni-libretto.usecase';
import { StoricoEsamiResponse } from '../../domain/models/storico-esami.model';
import { GetStoricoEsamiUseCase } from '../usecases/get-storico-esami.usecase';
import { QuestionariResponse } from '../../domain/models/questionari.model';
import { GetQuestionariUseCase } from '../usecases/get-questionari.usecase';
import { ProfiloResponse } from '../../domain/models/profilo.model';
import { GetProfiloUseCase } from '../usecases/get-profilo.usecase';

@Injectable()
export class CarrieraFacade {
  private readonly getTasseUseCase = inject(GetTasseUseCase);
  private readonly getLibrettoUseCase = inject(GetLibrettoUseCase);
  private readonly getMediaUseCase = inject(GetMediaUseCase);
  private readonly getPianoUseCase = inject(GetPianoUseCase);
  private readonly getPrenotazioniUseCase = inject(GetPrenotazioniUseCase);
  private readonly getBadgeUseCase = inject(GetBadgeUseCase);
  private readonly getEsamiSuggeриtiUseCase = inject(GetEsamiSuggeриtiUseCase);
  private readonly getAppelliPrenotabiliUseCase = inject(GetAppelliPrenotabiliUseCase);
  private readonly getPrenotazioniLibrettoUseCase = inject(GetPrenotazioniLibrettoUseCase);
  private readonly getStoricoEsamiUseCase = inject(GetStoricoEsamiUseCase);
  private readonly getQuestionariUseCase = inject(GetQuestionariUseCase);
  private readonly getProfiloUseCase = inject(GetProfiloUseCase);

  getTasse(): Observable<TasseResponse> {
    return this.getTasseUseCase.execute();
  }

  getLibretto(): Observable<Exam[]> {
    return this.getLibrettoUseCase.execute();
  }

  getMedia(): Observable<MediaResponse> {
    return this.getMediaUseCase.execute();
  }

  getPiano(): Observable<PianoStudioResponse> {
    return this.getPianoUseCase.execute();
  }

  getPrenotazioni(request: PrenotazioneRequest): Observable<PrenotazioneResponse> {
    return this.getPrenotazioniUseCase.execute(request);
  }

  getBadge(): Observable<BadgeResponse> {
    return this.getBadgeUseCase.execute();
  }

  getEsamiSuggeriti(): Observable<SuggerimentiResponse> {
    return this.getEsamiSuggeриtiUseCase.execute();
  }

  getAppelliPrenotabili(): Observable<AppelliLibrettoResponse> {
    return this.getAppelliPrenotabiliUseCase.execute();
  }

  getPrenotazioniLibretto(): Observable<PrenotazioniLibrettoResponse> {
    return this.getPrenotazioniLibrettoUseCase.execute();
  }

  getStoricoEsami(): Observable<StoricoEsamiResponse> {
    return this.getStoricoEsamiUseCase.execute();
  }

  getQuestionari(): Observable<QuestionariResponse> {
    return this.getQuestionariUseCase.execute();
  }

  getProfilo(): Observable<ProfiloResponse> {
    return this.getProfiloUseCase.execute();
  }
}
