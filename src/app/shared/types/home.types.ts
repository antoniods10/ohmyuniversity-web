import { StatTrend } from '@ui/custom-card/card-variants.component';
import { CardVariant } from '@ui/custom-card/custom-card.component';

export interface Stat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  trend?: StatTrend;
}

export interface Review {
  name: string;
  university: string;
  text: string;
  rating?: number;
  avatarSrc?: string;
  verified?: boolean;
}

export interface StepHome {
  number: number;
  title: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: any;
  variant?: CardVariant;
}
