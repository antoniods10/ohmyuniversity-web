import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { LucideInfo, LucideCircleCheck } from '@lucide/angular';
import { CORSO_AREE, CORSO_CONSIGLI } from '@constants';

@Component({
  selector: 'app-topic-corso',
  standalone: true,
  imports: [CommonModule, OrientationNavComponent, CustomTextComponent, CardStatusComponent],
  templateUrl: './topic-corso.component.html',
})
export class TopicCorsoComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  readonly iconInfo = LucideInfo;
  readonly iconCheck = LucideCircleCheck;
  readonly aree = CORSO_AREE;
  readonly consigli = CORSO_CONSIGLI;
}
