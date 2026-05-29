import { Component } from '@angular/core';
import { HOME_STEPS } from '@constants';
import { Step } from '@types';

@Component({
  selector: 'app-home-how-it-works',
  standalone: true,
  templateUrl: './home-how-it-works.component.html',
})
export class HomeHowItWorksComponent {
  readonly steps: Step[] = HOME_STEPS;
}
