export type ScholarshipStatus = 'open' | 'closing' | 'closed' | 'awarded' | 'not-awarded';
export type FeeStatus = 'paid' | 'pending' | 'overdue';
export type BandoStatus = 'open' | 'closing' | 'closed';

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  status: ScholarshipStatus;
  description: string;
  requirements: string[];
  url: string;
}

export interface FormModule {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  updatedAt: string;
}

export interface Bando {
  id: string;
  title: string;
  description: string;
  category: string;
  deadline: string;
  status: BandoStatus;
  amount?: string;
  url: string;
  publishedAt: string;
}

export interface Fee {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  paidAt?: string;
  status: FeeStatus;
  payUrl?: string;
  receipt?: string;
}
