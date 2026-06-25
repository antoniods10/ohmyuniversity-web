import { Observable } from 'rxjs';
import { FeeStatusResponse } from '../models/career/fees-status.model';
import { InvoiceResponse } from '../models/career/invoice.model';
import { RefundResponse } from '../models/career/refund.model';

export abstract class FeesRepository {
  abstract getStatus(): Observable<FeeStatusResponse>;
  abstract getInvoices(): Observable<InvoiceResponse>;
  abstract getRefunds(): Observable<RefundResponse>;
}
