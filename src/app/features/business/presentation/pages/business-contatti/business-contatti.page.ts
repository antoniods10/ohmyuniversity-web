import { Component } from '@angular/core';
import { LucideArrowRight, LucideDynamicIcon, LucideGift } from '@lucide/angular';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { GithubIconComponent } from '@shared/icons';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import {
  BUSINESS_USER_TYPES,
  BUSINESS_CONTACT_CHANNELS,
  BUSINESS_GITHUB_CHANNEL,
  BUSINESS_ONBOARDING_STEPS,
} from '@constants';

@Component({
  selector: 'app-business-contatti-page',
  standalone: true,
  imports: [
    BusinessHeroComponent,
    CustomCardComponent,
    CustomButtonComponent,
    CustomBadgeComponent,
    CardStatusComponent,
    GithubIconComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './business-contatti.page.html',
})
export class BusinessContattiPage {
  readonly iconArrowRight = LucideArrowRight;
  readonly iconGift = LucideGift;
  readonly allContactChannels = [
    ...BUSINESS_CONTACT_CHANNELS,
    { ...BUSINESS_GITHUB_CHANNEL, icon: null },
  ];

  readonly userTypes = BUSINESS_USER_TYPES;
  readonly contactChannels = BUSINESS_CONTACT_CHANNELS;
  readonly githubChannel = BUSINESS_GITHUB_CHANNEL;
  readonly onboardingSteps = BUSINESS_ONBOARDING_STEPS;
}
