import { Component, input, output } from '@angular/core';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { SbocchiChartComponent } from '../../charts/sbocchi-chart/sbocchi-chart.component';
import { SBOCCHI_AREE, SBOCCHI_CONSIGLI } from '@constants';

export interface SboccoArea {
  area: string;
  occupazione1anno: number;
  stipendioMedio: string;
}

@Component({
  selector: 'app-topic-sbocchi',
  standalone: true,
  imports: [OrientationNavComponent, SbocchiChartComponent],
  templateUrl: './topic-sbocchi.component.html',
})
export class TopicSbocchiComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  readonly aree = SBOCCHI_AREE;
  readonly consigli = SBOCCHI_CONSIGLI;
}
