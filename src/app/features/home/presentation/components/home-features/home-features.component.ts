import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HOME_FEATURES } from '@constants';
import { Feature } from '@types';
import { CardSimpleComponent } from '@ui/custom-card/card-variants.component';

@Component({
  selector: 'app-home-features',
  standalone: true,
  imports: [CommonModule, CardSimpleComponent],
  templateUrl: './home-features.component.html',
})
export class HomeFeaturesComponent {
  readonly features: Feature[] = HOME_FEATURES;
}
