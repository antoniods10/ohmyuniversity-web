import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HOME_STATS } from '@constants';
import { Stat } from '@types';
import { CardStatComponent } from '@ui/custom-card/card-variants.component';

@Component({
  selector: 'app-home-stats',
  standalone: true,
  imports: [CommonModule, CardStatComponent],
  templateUrl: './home-stats.component.html',
})
export class HomeStatsComponent {
  readonly stats: Stat[] = HOME_STATS;
}
