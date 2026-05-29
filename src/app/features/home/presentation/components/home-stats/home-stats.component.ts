import { Component } from '@angular/core';
import { HOME_STATS } from '@constants';
import { Stat } from '@types';

@Component({
  selector: 'app-home-stats',
  standalone: true,
  templateUrl: './home-stats.component.html',
})
export class HomeStatsComponent {
  readonly stats: Stat[] = HOME_STATS;
}
