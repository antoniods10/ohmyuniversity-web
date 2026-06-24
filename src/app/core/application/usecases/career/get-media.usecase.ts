import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../../../core/domain/repositories/carriera.repository';
import { MediaResponse } from '../../../../core/domain/models/career/media.model';

@Injectable()
export class GetMediaUseCase {
  private readonly repo = inject(CarrieraRepository);
  execute(): Observable<MediaResponse> {
    return this.repo.getMedia();
  }
}
