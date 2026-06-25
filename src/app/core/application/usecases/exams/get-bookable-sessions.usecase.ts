import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamsRepository } from '../../../domain/repositories/exams.repository';
import { BookableSessionsResponse } from '../../../domain/models/career/sessions.model';

@Injectable()
export class GetBookableSessionsUseCase {
  private readonly repo = inject(ExamsRepository);
  execute(): Observable<BookableSessionsResponse> {
    return this.repo.getBookableSessions();
  }
}
