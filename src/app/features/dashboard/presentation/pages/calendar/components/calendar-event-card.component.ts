import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { LucideDynamicIcon } from '@lucide/angular';
import type { CalendarEvent } from '@shared/types/dashboard/calendar.types';
import {
  calendarEventDurationLabel,
  calendarEventTimeRange,
  calendarEventTypeIcon,
  calendarEventTypeVariant,
} from '@shared/utils/calendar.utils';
import {
  getIconBgClass,
  getIconColorClass,
  getLabelColorClass,
} from '@shared/utils/orientation.utils';

@Component({
  selector: 'app-calendar-event-card',
  standalone: true,
  imports: [CustomCardComponent, CustomBadgeComponent, LucideDynamicIcon],
  templateUrl: './calendar-event-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarEventCardComponent {
  readonly event = input.required<CalendarEvent>();
  readonly compact = input<boolean>(false);

  readonly cardClick = output<void>();

  readonly variant = computed(() => calendarEventTypeVariant(this.event().type));
  readonly icon = computed(() => calendarEventTypeIcon(this.event().type));
  readonly timeRange = computed(() => calendarEventTimeRange(this.event()));
  readonly durationLabel = computed(() => calendarEventDurationLabel(this.event()));

  readonly iconBgClass = computed(() => getIconBgClass(this.variant(), true));
  readonly iconColorClass = computed(() => getIconColorClass(this.variant(), true));
  readonly titleColorClass = computed(() => getLabelColorClass(this.variant()));

  onCardClick(): void {
    this.cardClick.emit();
  }
}
