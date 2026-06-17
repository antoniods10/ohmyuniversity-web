import { Identifiable } from '@shared/types';

/** Mode of public transport operated (bus, train, or both) */
export type TransportType = 'bus' | 'train' | 'mixed';

/** Public transport company with coverage area, branding and useful links */
export interface TransportCompany extends Identifiable {
  type: TransportType;
  coverage: string;
  description: string;
  website: string;
  scheduleUrl?: string;
  appUrl?: string;
  color: string;
}

/** Single route between two stops, with duration, changes and departure times */
export interface TransportRoute {
  id: string;
  from: string;
  to: string;
  duration: string;
  changes: number;
  type: TransportType;
  departures: string[];
}
