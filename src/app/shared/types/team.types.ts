import { CardVariant } from '@ui/custom-card/custom-card.component';

export interface TeamMember {
  name: string;
  initials: string;
  avatarSrc?: string;
  role: string;
  bio: string;
}

export interface TeamValue {
  icon: any;
  variant: CardVariant;
  title: string;
  description: string;
}
