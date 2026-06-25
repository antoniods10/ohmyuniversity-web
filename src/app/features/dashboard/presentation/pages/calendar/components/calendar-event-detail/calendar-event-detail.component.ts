import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { CustomModalComponent } from '@ui/custom-modal/custom-modal.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { LucideDynamicIcon, LucidePencil, LucideTrash2 } from '@lucide/angular';
import type { CalendarEvent } from '@shared/types/dashboard/dashboard-agenda.types';
import {
  calendarEventDurationLabel,
  calendarEventTimeRange,
  calendarEventTypeIcon,
  calendarEventTypeVariant,
  type CalendarEventVariant,
} from '@shared/utils/calendar.utils';
import { getLabelColorClass } from '@shared/utils/orientation.utils';

function formatDateLabel(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`;
}

@Component({
  selector: 'app-calendar-event-detail',
  standalone: true,
  imports: [CustomModalComponent, CustomButtonComponent, CustomTextComponent, LucideDynamicIcon],
  templateUrl: './calendar-event-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarEventDetailComponent {
  readonly isOpen = input<boolean>(false);
  readonly event = input<CalendarEvent | null>(null);

  readonly edit = output<CalendarEvent>();
  readonly deleted = output<string>();
  readonly closed = output<void>();

  private readonly modal = viewChild.required(CustomModalComponent);

  readonly iconEdit = LucidePencil;
  readonly iconDelete = LucideTrash2;

  readonly isConfirmingDelete = signal(false);

  readonly variant = computed<CalendarEventVariant>(() => {
    const current = this.event();
    return current ? calendarEventTypeVariant(current.type) : 'warning';
  });

  readonly icon = computed(() => {
    const current = this.event();
    return current ? calendarEventTypeIcon(current.type) : null;
  });

  readonly iconColorClass = computed(() => getLabelColorClass(this.variant()));

  readonly dateLabel = computed(() => {
    const current = this.event();
    return current ? formatDateLabel(current.startDate) : '';
  });

  readonly timeRangeLabel = computed(() => {
    const current = this.event();
    return current ? calendarEventTimeRange(current) : '';
  });

  readonly durationLabel = computed(() => {
    const current = this.event();
    const label = current ? calendarEventDurationLabel(current) : '';
    return label || 'Non indicata';
  });

  readonly locationLabel = computed(() => this.event()?.location ?? 'Non indicato');

  readonly descriptionLabel = computed(() => {
    const description = this.event()?.description?.trim();
    return description || 'Nessuna descrizione disponibile.';
  });

  constructor() {
    effect(() => {
      // Reset the confirmation state every time a different event is shown
      this.event();
      this.isConfirmingDelete.set(false);
    });

    effect(() => {
      if (this.isOpen()) {
        this.modal().open();
      } else {
        this.modal().close();
      }
    });
  }

  onEditClick(): void {
    const current = this.event();
    if (current) this.edit.emit(current);
  }

  onDeleteClick(): void {
    this.isConfirmingDelete.set(true);
  }

  onConfirmDelete(): void {
    const current = this.event();
    if (current?.id) this.deleted.emit(current.id);
  }

  onCancelDelete(): void {
    this.isConfirmingDelete.set(false);
  }

  onClose(): void {
    this.isConfirmingDelete.set(false);
    this.closed.emit();
  }
}
