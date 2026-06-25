export interface Refund {
  fattId: number;
  feeDes: string;
  refundAmount: string;
  refundDate: string;
  refundStatus: string;
}

export interface RefundResponse {
  refunds: Refund[];
}
