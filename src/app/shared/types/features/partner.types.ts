import { IconContentBase, LinkBase, Icon } from '@shared/types';

/** Partner benefit card */
export type PartnerBenefit = IconContentBase;

/** Partner navigation link with icon and description */
export interface PartnerLink extends LinkBase {
  description: string;
  icon: Icon;
}

/** Testimonial card */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}
