import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeesRepository } from '../../../domain/repositories/fees.repository';
import { FeeStatusResponse } from '../../../domain/models/career/fees-status.model';

@Injectable()
export class GetFeesStatusUseCase {
  private readonly repo = inject(FeesRepository);
  execute(): Observable<FeeStatusResponse> {
    return this.repo.getStatus();
  }
}
