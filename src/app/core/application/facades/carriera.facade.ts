import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '@shared/types/dashboard/career.types';
import { CarrieraInfoResponse } from 'src/app/core/domain/models/career/carriera-info.model';
import { ProfiloResponse } from 'src/app/core/domain/models/career/profilo.model';
import { QuestionariResponse } from 'src/app/core/domain/models/career/questionari.model';
import { StoricoEsamiResponse } from 'src/app/core/domain/models/career/storico-esami.model';
import { SuggerimentiResponse } from 'src/app/core/domain/models/career/suggerimenti.model';
import { BadgeResponse } from 'src/app/core/domain/models/career/badge.model';
import { MediaResponse } from 'src/app/core/domain/models/career/media.model';
import { PianoStudioResponse } from 'src/app/core/domain/models/career/piano.model';
import {
  PrenotazioneRequest,
  PrenotazioneResponse,
} from 'src/app/core/domain/models/career/prenotazioni.model';
import { TasseResponse } from 'src/app/core/domain/models/career/tasse.model';
import {
  AppelliLibrettoResponse,
  PrenotazioniLibrettoResponse,
} from 'src/app/core/domain/models/career/appelli.model';
import { GetAppelliPrenotabiliUseCase } from '../usecases/career/get-appelli-prenotabili.usecase';
import { GetBadgeUseCase } from '../usecases/career/get-badge.usecase';
import { GetEsamiSuggeриtiUseCase } from '../usecases/career/get-esami-suggeriti.usecase';
import { GetLibrettoUseCase } from '../usecases/career/get-libretto.usecase';
import { GetMediaUseCase } from '../usecases/career/get-media.usecase';
import { GetPianoUseCase } from '../usecases/career/get-piano.usecase';
import { GetPrenotazioniUseCase } from '../usecases/career/get-prenotazioni.usecase';
import { GetTasseUseCase } from '../usecases/fees/get-tasse.usecase';
import { GetCarrieraInfoUseCase } from '../usecases/career/get-carriera-info.usecase';
import { GetFotoUseCase } from '../usecases/career/get-foto.usecase';
import { GetPrenotazioniLibrettoUseCase } from '../usecases/career/get-prenotazioni-libretto.usecase';
import { GetProfiloUseCase } from '../usecases/career/get-profilo.usecase';
import { GetQuestionariUseCase } from '../usecases/career/get-questionari.usecase';
import { GetStoricoEsamiUseCase } from '../usecases/career/get-storico-esami.usecase';

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
  private readonly getCarrieraInfoUseCase = inject(GetCarrieraInfoUseCase);
  private readonly getFotoUseCase = inject(GetFotoUseCase);

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

  getCarrieraInfo(): Observable<CarrieraInfoResponse> {
    return this.getCarrieraInfoUseCase.execute();
  }

  getFoto(): Observable<Blob> {
    return this.getFotoUseCase.execute();
  }
}
