import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';
import {
  BUSINESS_USER_TYPES,
  BUSINESS_CONTACT_CHANNELS,
  BUSINESS_ONBOARDING_STEPS,
} from '@constants';

@Component({
  selector: 'app-business-contatti-page',
  standalone: true,
  imports: [RouterLink, BusinessHeroComponent],
  templateUrl: './business-contatti.page.html',
})
export class BusinessContattiPage {
  readonly userTypes = BUSINESS_USER_TYPES;
  readonly contactChannels = BUSINESS_CONTACT_CHANNELS;
  readonly onboardingSteps = BUSINESS_ONBOARDING_STEPS;
}
