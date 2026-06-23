import { IconLink, LinkBase } from '@shared/types';

/** Single navigation/footer link entry */
export interface FooterLink extends LinkBase {
  external?: boolean;
  fragment?: string;
}

/** Partner university displayed in the footer logo grid */
export interface UniversityFooter {
  name: string;
  logo: string;
}

/** Social media link with brand icon */
export type SocialLink = IconLink;

/** Donation/support platform link */
export type SupportLink = IconLink;
