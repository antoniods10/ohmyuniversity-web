import { CardVariant } from '@ui/custom-card/custom-card.component';

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface TargetingOption {
  label: string;
  description: string;
  available: 'tutti' | 'professional' | 'enterprise';
}

export interface AnalyticsMetric {
  icon: any;
  label: string;
  desc: string;
  variant: CardVariant;
}

export interface OnboardingStep {
  number: number;
  title: string;
  description: string;
  duration: string;
}

export interface Requirement {
  label: string;
  forType: 'azienda' | 'collettivo' | 'entrambi';
}

export interface OfferCard {
  icon: any;
  title: string;
  description: string;
}

export interface Differentiator {
  icon: any;
  title: string;
  description: string;
}

export interface UserTypeBusiness {
  icon: any;
  title: string;
  description: string;
  action: string;
  actionLink: string;
  isExternal: boolean;
  highlight: boolean;
}

export interface ContactChannel {
  icon: any;
  title: string;
  description: string;
  value: string;
  href: string;
}

export interface UseCase {
  icon: any;
  title: string;
  description: string;
}
