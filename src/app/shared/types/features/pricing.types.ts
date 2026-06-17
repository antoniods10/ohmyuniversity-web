import { LinkBase } from '@shared/types';

/** Pricing audience: organizations or institutions */
export type PricingAudience = 'organizations' | 'institutions';

/** Single feature entry in a pricing plan */
export interface PricingFeature {
  label: string;
  included: boolean | string;
}

/** Full pricing plan definition with CTA and features list */
export interface PricingPlan extends LinkBase {
  name: string;
  badge?: string;
  price: string;
  priceDetail: string;
  description: string;
  highlighted: boolean;
  features: PricingFeature[];
}
