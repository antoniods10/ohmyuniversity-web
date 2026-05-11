import { Component } from '@angular/core';

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-home-stats',
  standalone: true,
  templateUrl: './home-stats.component.html',
})
export class HomeStatsComponent {
  readonly stats: Stat[] = [
    { value: '50+', label: 'Atenei italiani supportati' },
    { value: '120k+', label: 'Studenti attivi' },
    { value: '4.8★', label: 'Valutazione media' },
    { value: '98%', label: 'Uptime garantito' },
  ];
}
