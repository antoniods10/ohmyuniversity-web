export interface Invoice {
  fattId: number;
  academicYear: number;
  description: string;
  amount: number;
  paidAmount: number;
  issueDate: string;
  deadline: string;
  paymentDate: string | null;
  pagopaPaymentDate: string | null;
  paidFlg: number;
  cancelledFlg: number;
  iuv: string;
  noticeCode: string;
  collectedFrom: string;
  pagopaAvviso: number;
}

export interface InvoiceResponse {
  invoices: Invoice[];
}
