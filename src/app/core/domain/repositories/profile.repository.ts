import { Observable } from 'rxjs';
import { PersonaResponse } from '../models/career/persona.model';
import { CareerInfoResponse } from '../models/career/career-info.model';
import { BadgeResponse } from '../models/career/badge.model';

export abstract class ProfileRepository {
  abstract getPersona(): Observable<PersonaResponse>;
  abstract getInfo(): Observable<CareerInfoResponse>;
  abstract getAvatar(): Observable<Blob>;
  abstract getBadge(): Observable<BadgeResponse>;
}
