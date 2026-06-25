import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CareerRepository } from '../../../domain/repositories/career.repository';
import { RecommendationsResponse } from '../../../domain/models/career/recommendations.model';

@Injectable()
export class GetRecommendationsUseCase {
  private readonly repo = inject(CareerRepository);
  execute(): Observable<RecommendationsResponse> {
    return this.repo.getRecommendations();
  }
}
