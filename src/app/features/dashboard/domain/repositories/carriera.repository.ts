import { Observable } from 'rxjs';
import { TasseResponse } from '../models/tasse.model';

export abstract class CarrieraRepository {
  abstract getTasse(): Observable<TasseResponse>;
}
