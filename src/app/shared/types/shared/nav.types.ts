/**
 * Represents a single navigation/footer link entry.
 */
export interface FooterLink {
  label: string;
  path: string;
  external?: boolean;
  fragment?: string;
}

/**
 * Represents a partner university displayed in the footer logo grid.
 */
export interface UniversityFooter {
  name: string;
  logo: string;
}

/**
 * Represents a social media link with its brand icon path data.
 */
export interface SocialLink {
  label: string;
  url: string;
  iconComponent: any;
  colorForce: string;
}

/**
 * Represents a donation/support platform link with a brand color class.
 */
export interface SupportLink {
  label: string;
  url: string;
  iconComponent: any;
  colorForce: string;
}
