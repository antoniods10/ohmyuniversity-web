import { Component, input, output } from '@angular/core';
import { CfuChartComponent } from '../../charts/cfu-chart/cfu-chart.component';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import {
  COME_FUNZIONA_DIFFERENZE,
  COME_FUNZIONA_TIPI_ESAME,
  COME_FUNZIONA_SESSIONI,
} from '@constants';

@Component({
  selector: 'app-topic-come-funziona',
  standalone: true,
  imports: [OrientationNavComponent, CfuChartComponent],
  templateUrl: './topic-come-funziona.component.html',
})
export class TopicComeFunzionaComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  readonly differenze = COME_FUNZIONA_DIFFERENZE;
  readonly tipiEsame = COME_FUNZIONA_TIPI_ESAME;
  readonly sessioniInfo = COME_FUNZIONA_SESSIONI;
}
