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
  emoji: string;
  title: string;
  description: string;
}

export interface Differentiator {
  title: string;
  description: string;
}

export interface UserTypeBusiness {
  emoji: string;
  title: string;
  description: string;
  action: string;
  actionLink: string;
  isExternal: boolean;
  highlight: boolean;
}

export interface ContactChannel {
  emoji: string;
  title: string;
  description: string;
  value: string;
  href: string;
}

export interface UseCase {
  emoji: string;
  title: string;
  description: string;
}
