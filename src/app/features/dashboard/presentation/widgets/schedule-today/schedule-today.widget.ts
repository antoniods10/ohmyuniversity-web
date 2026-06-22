import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { LucideDynamicIcon, LucideClock, LucideMapPin, LucideCalendarClock } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';

interface LessonItem {
  name: string;
  time: string;
  room: string;
  ongoing: boolean;
}

const MOCK_SCHEDULE: LessonItem[] = [
  { name: 'Fisica II', time: '08:30 - 10:30', room: 'Aula 3B', ongoing: true },
  { name: 'Analisi Matematica II', time: '11:00 - 13:00', room: 'Aula Magna', ongoing: false },
  { name: 'Programmazione', time: '14:00 - 16:00', room: 'Lab Informatica', ongoing: false },
];

@Component({
  selector: 'app-schedule-today-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomBadgeComponent,
    LucideDynamicIcon,
    DashboardWidgetCardComponent,
  ],
  templateUrl: './schedule-today.widget.html',
})
export class ScheduleTodayWidgetComponent {
  @Input() size: WidgetSize = 'medium';
  readonly lessons = MOCK_SCHEDULE;
  readonly lucideClock = LucideClock;
  readonly lucideMapPin = LucideMapPin;
  readonly lucideSchedule = LucideCalendarClock;

  get nextLesson(): LessonItem | undefined {
    return this.lessons.find(l => l.ongoing) ?? this.lessons[0];
  }
}
