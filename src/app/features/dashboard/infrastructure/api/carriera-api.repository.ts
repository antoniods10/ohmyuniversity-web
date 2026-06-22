import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../domain/repositories/carriera.repository';
import { TasseResponse } from '../../domain/models/tasse.model';
import { API } from '@constants';

@Injectable()
export class CarrieraApiRepository extends CarrieraRepository {
  private readonly http = inject(HttpClient);

  getTasse(): Observable<TasseResponse> {
    return this.http.get<TasseResponse>(API.carriera.tasse);
  }
}
