import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { LucideCircleCheck } from '@lucide/angular';
import { ERRORI_ORIENTAMENTO } from '@constants';

@Component({
  selector: 'app-topic-errori',
  standalone: true,
  imports: [
    CommonModule,
    OrientationNavComponent,
    CustomTextComponent,
    CustomButtonComponent,
    CardStatusComponent,
  ],
  templateUrl: './topic-errori.component.html',
})
export class TopicErroriComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  readonly iconCheck = LucideCircleCheck;
  readonly errori = ERRORI_ORIENTAMENTO;
}
