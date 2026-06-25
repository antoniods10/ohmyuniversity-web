import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ElementRef,
  inject,
  afterNextRender,
  viewChild,
} from '@angular/core';
import { AgendaEventCardComponent } from '../agenda-event-card/agenda-event-card.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import type { CalendarEvent, CalendarEventLayout, PositionedEventLayout } from '@shared/types';
import {
  CALENDAR_TIMELINE,
  calendarEventHeight,
  calendarEventTop,
  calendarHourLabel,
  calendarHourTop,
  calendarTimelineHours,
  calendarTimelineTotalHeight,
  calendarHourTop as hourTopFn,
} from '@shared/utils/calendar.utils';
import { LANE_GAP_PX } from '@shared/constants';

@Component({
  selector: 'app-agenda-timeline',
  standalone: true,
  imports: [AgendaEventCardComponent, CustomTextComponent],
  templateUrl: './agenda-timeline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaTimelineComponent {
  private readonly el = inject(ElementRef);

  readonly eventLayouts = input.required<CalendarEventLayout[]>();
  readonly eventSelected = output<CalendarEvent>();

  readonly hours = calendarTimelineHours();
  readonly leftGutter = CALENDAR_TIMELINE.leftGutter;
  readonly totalHeight = calendarTimelineTotalHeight();
  readonly hourTop = calendarHourTop;
  readonly hourLabel = calendarHourLabel;

  readonly scrollContainer = viewChild.required<ElementRef>('scrollContainer');

  readonly currentTimePx = computed(() => {
    const now = new Date();
    return hourTopFn(now.getHours()) + (now.getMinutes() / 60) * CALENDAR_TIMELINE.hourHeight;
  });

  constructor() {
    afterNextRender(() => {
      const container = this.scrollContainer().nativeElement;
      const now = new Date();
      const top =
        hourTopFn(now.getHours()) + (now.getMinutes() / 60) * CALENDAR_TIMELINE.hourHeight;
      container.scrollTop = Math.max(0, top - container.clientHeight / 3);
    });
  }

  readonly positionedEvents = computed<PositionedEventLayout[]>(() =>
    this.eventLayouts().map(layout => {
      const top = calendarEventTop(layout.event);
      const height = calendarEventHeight(layout.event);
      const { lane, laneCount } = layout;

      const totalGapPx = LANE_GAP_PX * (laneCount - 1);
      const widthExpr = `calc((100% - ${totalGapPx}px) / ${laneCount})`;
      const laneOffset = `(100% - ${totalGapPx}px) / ${laneCount} + ${LANE_GAP_PX}px`;
      const leftExpr = lane === 0 ? '0px' : `calc(${lane} * (${laneOffset}))`;

      return { layout, top, height, widthExpr, leftExpr, compact: height < 72 };
    }),
  );

  onEventClick(event: CalendarEvent): void {
    this.eventSelected.emit(event);
  }
}
