import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CfuChartComponent } from '../../charts/cfu-chart/cfu-chart.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { LucideTriangleAlert } from '@lucide/angular';
import {
  COME_FUNZIONA_DIFFERENZE,
  COME_FUNZIONA_TIPI_ESAME,
  COME_FUNZIONA_SESSIONI,
} from '@constants';

@Component({
  selector: 'app-topic-come-funziona',
  standalone: true,
  imports: [
    CommonModule,
    OrientationNavComponent,
    CfuChartComponent,
    CustomTextComponent,
    CustomBadgeComponent,
    CardStatusComponent,
  ],
  templateUrl: './topic-come-funziona.component.html',
})
export class TopicComeFunzionaComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  readonly iconWarn = LucideTriangleAlert;
  readonly differenze = COME_FUNZIONA_DIFFERENZE;
  readonly tipiEsame = COME_FUNZIONA_TIPI_ESAME;
  readonly sessioniInfo = COME_FUNZIONA_SESSIONI;
}
