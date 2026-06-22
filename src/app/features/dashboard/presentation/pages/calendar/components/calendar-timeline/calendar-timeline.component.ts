import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CalendarEventCardComponent } from '../calendar-event-card/calendar-event-card.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import type { CalendarEvent, CalendarEventLayout } from '@shared/types/dashboard/calendar.types';
import {
  CALENDAR_TIMELINE,
  calendarEventHeight,
  calendarEventTop,
  calendarHourLabel,
  calendarHourTop,
  calendarTimelineHours,
  calendarTimelineTotalHeight,
} from '@shared/utils/calendar.utils';

interface PositionedEventLayout {
  layout: CalendarEventLayout;
  top: number;
  height: number;
  widthExpr: string;
  leftExpr: string;
  compact: boolean;
}

const LANE_GAP_PX = 8;

@Component({
  selector: 'app-calendar-timeline',
  standalone: true,
  imports: [CalendarEventCardComponent, CustomTextComponent],
  templateUrl: './calendar-timeline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarTimelineComponent {
  readonly eventLayouts = input.required<CalendarEventLayout[]>();

  readonly eventSelected = output<CalendarEvent>();

  readonly hours = calendarTimelineHours();
  readonly leftGutter = CALENDAR_TIMELINE.leftGutter;
  readonly totalHeight = calendarTimelineTotalHeight();

  readonly hourTop = calendarHourTop;
  readonly hourLabel = calendarHourLabel;

  readonly positionedEvents = computed<PositionedEventLayout[]>(() =>
    this.eventLayouts().map(layout => {
      const top = calendarEventTop(layout.event);
      const height = calendarEventHeight(layout.event);
      const { lane, laneCount } = layout;

      const totalGapPx = LANE_GAP_PX * (laneCount - 1);
      const widthExpr = `calc((100% - ${totalGapPx}px) / ${laneCount})`;
      const laneOffset = `(100% - ${totalGapPx}px) / ${laneCount} + ${LANE_GAP_PX}px`;
      const leftExpr = lane === 0 ? '0px' : `calc(${lane} * (${laneOffset}))`;

      return {
        layout,
        top,
        height,
        widthExpr,
        leftExpr,
        compact: height < 72,
      };
    }),
  );

  onEventClick(event: CalendarEvent): void {
    this.eventSelected.emit(event);
  }
}
