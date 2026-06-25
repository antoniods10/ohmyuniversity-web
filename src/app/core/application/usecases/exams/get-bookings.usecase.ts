import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamsRepository } from '../../../domain/repositories/exams.repository';
import { BookingsResponse } from '../../../domain/models/career/sessions.model';

@Injectable()
export class GetBookingsUseCase {
  private readonly repo = inject(ExamsRepository);
  execute(): Observable<BookingsResponse> {
    return this.repo.getBookings();
  }
}
