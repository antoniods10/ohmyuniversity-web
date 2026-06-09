import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HOME_STEPS } from '@constants';
import { Step } from '@types';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';

@Component({
  selector: 'app-home-how-it-works',
  standalone: true,
  imports: [CommonModule, CustomCardComponent],
  templateUrl: './home-how-it-works.component.html',
})
export class HomeHowItWorksComponent {
  readonly steps: Step[] = HOME_STEPS;
}
