import { ContentBase, Identifiable } from '@shared/types';

/** Possible states of a scholarship application/award lifecycle */
export type ScholarshipStatus = 'open' | 'closing' | 'closed' | 'awarded' | 'not-awarded';

/** Possible payment states of a fee */
export type FeeStatus = 'paid' | 'pending' | 'overdue';

/** Possible states of a bando (public call/grant) lifecycle */
export type BandoStatus = 'open' | 'closing' | 'closed';

/** Scholarship opportunity with funding details, eligibility and application deadline */
export interface Scholarship extends Identifiable {
  provider: string;
  amount: string;
  deadline: string;
  status: ScholarshipStatus;
  description: string;
  requirements: string[];
  url: string;
}

/** Downloadable form/document module belonging to an administrative category */
export interface FormModule extends Identifiable {
  description: string;
  category: string;
  url: string;
  updatedAt: string;
}

/** Public call or grant notice with funding details and application deadline */
export interface Bando extends ContentBase {
  id: string;
  category: string;
  deadline: string;
  status: BandoStatus;
  amount?: string;
  url: string;
  publishedAt: string;
}

/** Tuition or administrative fee with payment status and due date */
export interface Fee extends Identifiable {
  amount: number;
  dueDate: string;
  paidAt?: string;
  status: FeeStatus;
  payUrl?: string;
  receipt?: string;
}
