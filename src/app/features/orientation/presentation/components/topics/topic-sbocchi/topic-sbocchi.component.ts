import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { SbocchiChartComponent } from '../../charts/sbocchi-chart/sbocchi-chart.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { LucideInfo } from '@lucide/angular';
import { SBOCCHI_AREE, SBOCCHI_CONSIGLI } from '@constants';

@Component({
  selector: 'app-topic-sbocchi',
  standalone: true,
  imports: [
    CommonModule,
    OrientationNavComponent,
    SbocchiChartComponent,
    CustomTextComponent,
    CustomBadgeComponent,
    CardStatusComponent,
  ],
  templateUrl: './topic-sbocchi.component.html',
})
export class TopicSbocchiComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  readonly iconInfo = LucideInfo;
  readonly aree = SBOCCHI_AREE;
  readonly consigli = SBOCCHI_CONSIGLI;

  occupazioneVariant(val: number): 'success' | 'warning' | 'error' {
    if (val >= 75) return 'success';
    if (val >= 55) return 'warning';
    return 'error';
  }
}
