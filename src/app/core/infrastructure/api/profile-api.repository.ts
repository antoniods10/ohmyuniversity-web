import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '@constants';
import { ProfileRepository } from '../../domain/repositories/profile.repository';
import { PersonaResponse } from 'src/app/core/domain/models/career/persona.model';
import { CareerInfoResponse } from 'src/app/core/domain/models/career/career-info.model';
import { BadgeResponse } from 'src/app/core/domain/models/career/badge.model';

@Injectable()
export class ProfileApiRepository extends ProfileRepository {
  private readonly http = inject(HttpClient);

  getPersona(): Observable<PersonaResponse> {
    return this.http.get<PersonaResponse>(API.profile.persona);
  }

  getInfo(): Observable<CareerInfoResponse> {
    return this.http.get<CareerInfoResponse>(API.profile.info);
  }

  getAvatar(): Observable<Blob> {
    return this.http.get(API.profile.avatar, { responseType: 'blob' });
  }

  getBadge(): Observable<BadgeResponse> {
    return this.http.get<BadgeResponse>(API.profile.badge);
  }
}
