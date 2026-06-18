import { Component, input, output } from '@angular/core';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';

@Component({
  selector: 'app-topic-costi-geografici',
  standalone: true,
  imports: [OrientationNavComponent, CustomTextComponent, CustomBadgeComponent],
  template: `
    <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <app-custom-badge label="Macro-area 8 di 8" variant="primary" shape="pill" size="xs" />
      <h2 appText variant="h2" class="mt-4">Costi per area geografica</h2>
      <div class="mt-3">
        <p appText variant="body-sm" color="muted">Questa sezione è in lavorazione.</p>
      </div>
    </div>
    <app-orientation-nav
      [hasPrev]="hasPrev()"
      [hasNext]="hasNext()"
      (prev)="prev.emit()"
      (next)="next.emit()"
      (backToList)="backToList.emit()" />
  `,
})
export class TopicCostiGeograficiComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();
}
