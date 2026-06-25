import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamsRepository } from '../../../domain/repositories/exams.repository';
import {
  LegacyBookingRequest,
  LegacyBookingsResponse,
} from '../../../domain/models/career/legacy-bookings.model';

@Injectable()
export class GetLegacyBookingsUseCase {
  private readonly repo = inject(ExamsRepository);
  execute(request: LegacyBookingRequest): Observable<LegacyBookingsResponse> {
    return this.repo.getLegacyBookings(request);
  }
}
