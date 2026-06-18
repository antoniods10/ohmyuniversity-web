/**
 * @file career-stats.component.ts
 * @description Displays the four key academic statistics (arithmetic
 * average, weighted average, graduation base, earned CFU) as app-card-stat
 * cards, plus an explanatory info note about how the metrics are computed.
 */

import { Component, input } from '@angular/core';
import { LucideCalculator, LucideScale, LucideGraduationCap, LucideAward } from '@lucide/angular';
import { CardStatComponent, CardStatusComponent } from '@ui/custom-card/card-variants.component';

@Component({
  selector: 'app-career-stats',
  standalone: true,
  imports: [CardStatComponent, CardStatusComponent],
  templateUrl: './career-stats.component.html',
})
export class CareerStatsComponent {
  readonly iconCalculator = LucideCalculator;
  readonly iconScale = LucideScale;
  readonly iconGraduation = LucideGraduationCap;
  readonly iconAward = LucideAward;

  readonly arithmeticAverage = input.required<number>();
  readonly weightedAverage = input.required<number>();
  readonly graduationBase = input.required<number>();
  readonly earnedCfu = input.required<number>();
  readonly totalCfu = input.required<number>();
  readonly cfuProgress = input.required<number>();
}
