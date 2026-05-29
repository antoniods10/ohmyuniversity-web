import { Component } from '@angular/core';
import { HOME_FEATURES } from '@constants';
import { Feature } from '@types';

@Component({
  selector: 'app-home-features',
  standalone: true,
  templateUrl: './home-features.component.html',
})
export class HomeFeaturesComponent {
  readonly features: Feature[] = HOME_FEATURES;
}
