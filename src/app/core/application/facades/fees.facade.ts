import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeeStatusResponse } from 'src/app/core/domain/models/career/fees-status.model';
import { GetFeesStatusUseCase } from '../usecases/fees/get-fees-status.usecase';

@Injectable()
export class FeesFacade {
  private readonly getFeesStatusUseCase = inject(GetFeesStatusUseCase);

  getStatus(): Observable<FeeStatusResponse> {
    return this.getFeesStatusUseCase.execute();
  }
}
