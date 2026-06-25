import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '@constants';
import { FeesRepository } from '../../domain/repositories/fees.repository';
import { FeeStatusResponse } from '../../domain/models/career/fees-status.model';
import { InvoiceResponse } from '../../domain/models/career/invoice.model';
import { RefundResponse } from '../../domain/models/career/refund.model';

@Injectable()
export class FeesApiRepository extends FeesRepository {
  private readonly http = inject(HttpClient);

  getStatus(): Observable<FeeStatusResponse> {
    return this.http.get<FeeStatusResponse>(API.fees.status);
  }

  getInvoices(): Observable<InvoiceResponse> {
    return this.http.get<InvoiceResponse>(API.fees.invoices);
  }

  getRefunds(): Observable<RefundResponse> {
    return this.http.get<RefundResponse>(API.fees.refunds);
  }
}
