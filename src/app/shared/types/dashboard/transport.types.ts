export interface TransportCompany {
  id: string;
  name: string;
  type: 'bus' | 'train' | 'mixed';
  coverage: string;
  description: string;
  website: string;
  scheduleUrl?: string;
  appUrl?: string;
  color: string;
}

export interface TransportRoute {
  id: string;
  from: string;
  to: string;
  duration: string;
  changes: number;
  type: 'bus' | 'train' | 'mixed';
  departures: string[];
}
