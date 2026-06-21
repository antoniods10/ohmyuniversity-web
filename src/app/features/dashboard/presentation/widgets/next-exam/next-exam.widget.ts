import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { WidgetSize } from '@shared/types';
import { LucideDynamicIcon, LucideCalendarCheck, LucideClock, LucideMapPin } from '@lucide/angular';

interface NextExamData {
  examName: string;
  date: string;
  time: string;
  room: string;
  enrolled: boolean;
}

const MOCK_NEXT_EXAM: NextExamData = {
  examName: 'Analisi Matematica II',
  date: '15 Luglio 2026',
  time: '09:00',
  room: 'Aula Magna B',
  enrolled: true,
};

@Component({
  selector: 'app-next-exam-widget',
  standalone: true,
  imports: [CustomTextComponent, CustomBadgeComponent, LucideDynamicIcon],
  templateUrl: './next-exam.widget.html',
})
export class NextExamWidgetComponent {
  @Input() size: WidgetSize = 'small';

  readonly data = MOCK_NEXT_EXAM;
  readonly lucideCalendar = LucideCalendarCheck;
  readonly lucideClock = LucideClock;
  readonly lucideMapPin = LucideMapPin;
}
