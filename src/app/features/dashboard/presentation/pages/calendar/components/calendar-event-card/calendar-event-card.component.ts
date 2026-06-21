import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { LucideDynamicIcon } from '@lucide/angular';
import type { CalendarEvent } from '@shared/types/dashboard/calendar.types';
import {
  calendarEventDurationLabel,
  calendarEventTimeRange,
  calendarEventTypeIcon,
  calendarEventTypeVariant,
} from '@shared/utils/calendar.utils';
import { getLabelColorClass } from '@shared/utils/orientation.utils';

@Component({
  selector: 'app-calendar-event-card',
  standalone: true,
  imports: [CustomCardComponent, CustomBadgeComponent, CustomTextComponent, LucideDynamicIcon],
  templateUrl: './calendar-event-card.component.html',
  styleUrls: ['./calendar-event-card.component.css'],
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

  readonly titleColorClass = computed(() => getLabelColorClass(this.variant()));

  onCardClick(): void {
    this.cardClick.emit();
  }
}
