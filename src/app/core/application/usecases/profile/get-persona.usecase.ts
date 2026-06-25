import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileRepository } from '../../../domain/repositories/profile.repository';
import { PersonaResponse } from '../../../domain/models/career/persona.model';

@Injectable()
export class GetPersonaUseCase {
  private readonly repo = inject(ProfileRepository);
  execute(): Observable<PersonaResponse> {
    return this.repo.getPersona();
  }
}
