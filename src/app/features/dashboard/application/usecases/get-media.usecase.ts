import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../domain/repositories/carriera.repository';
import { MediaResponse } from '../../domain/models/media.model';

@Injectable()
export class GetMediaUseCase {
  private readonly repo = inject(CarrieraRepository);
  execute(): Observable<MediaResponse> {
    return this.repo.getMedia();
  }
}
