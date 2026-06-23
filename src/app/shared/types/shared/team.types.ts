import { CardVariant } from '@ui/custom-card/custom-card.component';
import { PersonBase, ContentBase, Icon } from '@shared/types';

/** Team member profile */
export interface TeamMember extends PersonBase {
  initials: string;
  avatarSrc?: string;
  bio: string;
}

/** Value card displayed in the team section */
export interface TeamValue extends ContentBase {
  icon: Icon;
  variant: CardVariant;
}
