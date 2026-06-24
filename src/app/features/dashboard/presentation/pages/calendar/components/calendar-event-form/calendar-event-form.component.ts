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
import { FormsModule } from '@angular/forms';
import { CustomModalComponent, type ModalType } from '@ui/custom-modal/custom-modal.component';
import { CustomInputComponent, type SelectOption } from '@ui/custom-input/custom-input.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import {
  LucideCheck,
  LucideChevronDown,
  LucideChevronUp,
  LucideDynamicIcon,
} from '@lucide/angular';
import type {
  CalendarEvent,
  CalendarEventType,
  CalendarFormEventType,
} from '@shared/types/dashboard/calendar.types';
import { stepTime } from '@shared/utils/calendar.utils';

const FORM_TYPE_OPTIONS: SelectOption[] = [
  { value: 'ESAME', label: 'Esame' },
  { value: 'PROMEMORIA', label: 'Promemoria' },
  { value: 'EVENTO', label: 'Evento' },
];

const FORM_TYPE_TO_EVENT_TYPE: Record<CalendarFormEventType, CalendarEventType> = {
  ESAME: 'EXAM',
  PROMEMORIA: 'REMINDER',
  EVENTO: 'PERSONAL',
};

const EVENT_TYPE_TO_FORM_TYPE: Record<CalendarEventType, CalendarFormEventType> = {
  EXAM: 'ESAME',
  REMINDER: 'PROMEMORIA',
  PERSONAL: 'EVENTO',
  DEADLINE: 'EVENTO',
  UNIVERSITY: 'EVENTO',
};

const DEFAULT_START_HOUR = 9;
const DEFAULT_DURATION_MINUTES = 60;

function addMinutesToTime(value: string, minutesToAdd: number): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return value;
  const totalMinutes = Number(match[1]) * 60 + Number(match[2]) + minutesToAdd;
  const hours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, '0');
  const minutes = (totalMinutes % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`;
}

type DateParseResult =
  | { ok: true; day: number; month: number; year: number }
  | { ok: false; message: string };

function parseDate(value: string): DateParseResult {
  const trimmed = value.trim();
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmed);
  if (!match) {
    return { ok: false, message: 'Completa la data nel formato gg/mm/aaaa.' };
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (month < 1 || month > 12) {
    return { ok: false, message: 'Il mese deve essere tra 01 e 12.' };
  }
  if (day < 1 || day > 31) {
    return { ok: false, message: 'Il giorno deve essere tra 01 e 31.' };
  }

  // Reject dates that overflow into the next month (e.g. 31/04 doesn't exist)
  const candidate = new Date(year, month - 1, day);
  if (candidate.getMonth() !== month - 1 || candidate.getDate() !== day) {
    return { ok: false, message: 'Quel mese non ha questo giorno.' };
  }

  return { ok: true, day, month, year };
}

type TimeParseResult =
  | { ok: true; hours: number; minutes: number }
  | { ok: false; message: string };

function parseTime(value: string): TimeParseResult {
  const trimmed = value.trim();
  const match = /^(\d{1,2}):(\d{2})$/.exec(trimmed);
  if (!match) {
    return { ok: false, message: "Completa l'orario nel formato hh:mm." };
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours > 23) {
    return { ok: false, message: 'Le ore devono essere tra 00 e 23.' };
  }
  if (minutes > 59) {
    return { ok: false, message: 'I minuti devono essere tra 00 e 59.' };
  }

  return { ok: true, hours, minutes };
}

/**
 * Auto-inserts "/" separators as the user types digits (gg/mm/aaaa), e.g. typing
 * "22062026" progressively becomes "22/06/2026". Strips any non-digit the user types
 * (including slashes they type themselves) and rebuilds the slashes from scratch, so the
 * result is stable whether typing forward or deleting characters with backspace.
 */
function autoFormatDateInput(value: string): string {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 8);
  const day = digitsOnly.slice(0, 2);
  const month = digitsOnly.slice(2, 4);
  const year = digitsOnly.slice(4, 8);

  let result = day;
  if (month) result += `/${month}`;
  if (year) result += `/${year}`;
  return result;
}

/**
 * Validates the date field as the user types, checking only the parts that are already
 * complete — never flags "incomplete" while the user is still mid-typing a segment. Returns
 * an empty string when there's nothing wrong yet (including "still typing, looks fine so far").
 *
 * Runs against the raw value (before autoFormatDateInput strips/truncates it), so it can
 * catch letters or excess digits that the formatter would otherwise silently discard.
 */
function validateDateLive(rawValue: string): string {
  if (rawValue === '') return '';

  if (/[^\d/]/.test(rawValue)) {
    return 'Usa solo numeri.';
  }

  const digitsOnly = rawValue.replace(/\D/g, '');
  if (digitsOnly.length > 8) {
    return 'Hai digitato troppe cifre.';
  }

  const dayDigits = digitsOnly.slice(0, 2);
  const monthDigits = digitsOnly.slice(2, 4);
  const yearDigits = digitsOnly.slice(4, 8);

  if (dayDigits.length === 2) {
    const day = Number(dayDigits);
    if (day < 1 || day > 31) return 'Il giorno deve essere tra 01 e 31.';
  }

  if (monthDigits.length === 2) {
    const month = Number(monthDigits);
    if (month < 1 || month > 12) return 'Il mese deve essere tra 01 e 12.';
  }

  if (yearDigits.length === 4) {
    const day = Number(dayDigits);
    const month = Number(monthDigits);
    const year = Number(yearDigits);
    const candidate = new Date(year, month - 1, day);
    if (candidate.getMonth() !== month - 1 || candidate.getDate() !== day) {
      return 'Quel mese non ha questo giorno.';
    }
  }

  return '';
}

/**
 * Validates the time field as the user types, same incremental approach as validateDateLive —
 * runs against the raw value to catch letters or excess digits before the formatter strips them.
 */
function validateTimeLive(rawValue: string): string {
  if (rawValue === '') return '';

  if (/[^\d:]/.test(rawValue)) {
    return 'Usa solo numeri.';
  }

  const digitsOnly = rawValue.replace(/\D/g, '');
  if (digitsOnly.length > 4) {
    return 'Hai digitato troppe cifre.';
  }

  const hourDigits = digitsOnly.slice(0, 2);
  const minuteDigits = digitsOnly.slice(2, 4);

  if (hourDigits.length === 2) {
    const hours = Number(hourDigits);
    if (hours > 23) return 'Le ore devono essere tra 00 e 23.';
  }

  if (minuteDigits.length === 2) {
    const minutes = Number(minuteDigits);
    if (minutes > 59) return 'I minuti devono essere tra 00 e 59.';
  }

  return '';
}

/** Same digit-grouping idea as autoFormatDateInput, but for hh:mm (4 digits, one separator) */
function autoFormatTimeInput(value: string): string {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
  const hours = digitsOnly.slice(0, 2);
  const minutes = digitsOnly.slice(2, 4);

  let result = hours;
  if (minutes) result += `:${minutes}`;
  return result;
}

@Component({
  selector: 'app-calendar-event-form',
  standalone: true,
  imports: [
    FormsModule,
    CustomModalComponent,
    CustomInputComponent,
    CustomButtonComponent,
    CustomTextComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './calendar-event-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarEventFormComponent {
  /** Whether the form sheet should be open */
  readonly isOpen = input<boolean>(false);

  /** Event being edited, or null when creating a new one */
  readonly event = input<CalendarEvent | null>(null);

  /** Day to default the start time on, when creating a new event */
  readonly defaultDate = input<Date>(new Date());

  readonly created = output<Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>>();
  readonly updated = output<{ id: string; partial: Partial<CalendarEvent> }>();
  readonly cancelled = output<void>();

  private readonly modal = viewChild.required(CustomModalComponent);

  readonly modalType: ModalType = 'center';
  readonly typeOptions = FORM_TYPE_OPTIONS;
  readonly iconSave = LucideCheck;
  readonly iconChevronUp = LucideChevronUp;
  readonly iconChevronDown = LucideChevronDown;

  readonly isEditing = computed(() => this.event() !== null);

  readonly durationLabel = computed(() => {
    const start = /^(\d{1,2}):(\d{2})$/.exec(this.startTime().trim());
    const end = /^(\d{1,2}):(\d{2})$/.exec(this.endTime().trim());
    if (!start || !end) return '';

    const startMinutes = Number(start[1]) * 60 + Number(start[2]);
    const endMinutes = Number(end[1]) * 60 + Number(end[2]);
    const diff = endMinutes - startMinutes;
    if (diff <= 0) return '';

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  });

  readonly activeFormType = signal<CalendarFormEventType>('EVENTO');
  readonly title = signal('');
  readonly description = signal('');
  readonly eventDate = signal('');
  readonly startTime = signal('');
  readonly endTime = signal('');
  readonly location = signal('');
  readonly errorMessage = signal('');
  readonly dateErrorMessage = signal('');
  readonly timeErrorMessage = signal('');
  readonly endTimeErrorMessage = signal('');

  constructor() {
    effect(() => {
      const current = this.event();
      const defaultDate = this.defaultDate();
      this.errorMessage.set('');
      this.dateErrorMessage.set('');
      this.timeErrorMessage.set('');
      this.endTimeErrorMessage.set('');

      if (current) {
        this.activeFormType.set(EVENT_TYPE_TO_FORM_TYPE[current.type]);
        this.title.set(current.title);
        this.description.set(current.description ?? '');
        this.eventDate.set(formatDate(current.startDate));
        this.startTime.set(formatTime(current.startDate));
        this.endTime.set(
          current.endDate
            ? formatTime(current.endDate)
            : addMinutesToTime(formatTime(current.startDate), DEFAULT_DURATION_MINUTES),
        );
        this.location.set(current.location ?? '');
        return;
      }

      this.activeFormType.set('EVENTO');
      this.title.set('');
      this.description.set('');
      this.eventDate.set(formatDate(defaultDate));
      const defaultStartTime = formatTime(
        new Date(
          defaultDate.getFullYear(),
          defaultDate.getMonth(),
          defaultDate.getDate(),
          DEFAULT_START_HOUR,
          0,
        ),
      );
      this.startTime.set(defaultStartTime);
      this.endTime.set(addMinutesToTime(defaultStartTime, DEFAULT_DURATION_MINUTES));
      this.location.set('');
    });

    effect(() => {
      if (this.isOpen()) {
        this.modal().open();
      } else {
        this.modal().close();
      }
    });
  }

  onDateInput(value: string): void {
    this.dateErrorMessage.set(validateDateLive(value));
    this.eventDate.set(autoFormatDateInput(value));
  }

  onTimeInput(value: string): void {
    this.timeErrorMessage.set(validateTimeLive(value));
    this.startTime.set(autoFormatTimeInput(value));
  }

  onEndTimeInput(value: string): void {
    this.endTimeErrorMessage.set(validateTimeLive(value));
    this.endTime.set(autoFormatTimeInput(value));
  }

  onStartTimeStep(direction: 1 | -1): void {
    this.startTime.set(stepTime(this.startTime(), direction));
    this.timeErrorMessage.set('');
  }

  onEndTimeStep(direction: 1 | -1): void {
    this.endTime.set(stepTime(this.endTime(), direction));
    this.endTimeErrorMessage.set('');
  }

  onTypeChange(formType: string): void {
    this.activeFormType.set(formType as CalendarFormEventType);
  }

  onSave(): void {
    const trimmedTitle = this.title().trim();
    if (!trimmedTitle) {
      this.errorMessage.set('Inserisci un titolo.');
      return;
    }

    const date = parseDate(this.eventDate());
    if (!date.ok) {
      this.dateErrorMessage.set(date.message);
      return;
    }

    const time = parseTime(this.startTime());
    if (!time.ok) {
      this.timeErrorMessage.set(time.message);
      return;
    }

    const endTimeParsed = parseTime(this.endTime());
    if (!endTimeParsed.ok) {
      this.endTimeErrorMessage.set(endTimeParsed.message);
      return;
    }

    this.errorMessage.set('');

    const startDate = new Date(date.year, date.month - 1, date.day, time.hours, time.minutes);
    const endDate = new Date(
      date.year,
      date.month - 1,
      date.day,
      endTimeParsed.hours,
      endTimeParsed.minutes,
    );

    if (endDate.getTime() <= startDate.getTime()) {
      this.endTimeErrorMessage.set("L'ora fine deve essere dopo l'ora inizio.");
      return;
    }

    const type = FORM_TYPE_TO_EVENT_TYPE[this.activeFormType()];
    const trimmedLocation = this.location().trim();
    const trimmedDescription = this.description().trim();

    const existing = this.event();
    if (existing?.id) {
      this.updated.emit({
        id: existing.id,
        partial: {
          title: trimmedTitle,
          description: trimmedDescription || null,
          startDate,
          endDate,
          type,
          location: trimmedLocation || null,
        },
      });
      return;
    }

    this.created.emit({
      title: trimmedTitle,
      description: trimmedDescription || null,
      startDate,
      endDate,
      allDay: false,
      type,
      color: null,
      url: null,
      notes: null,
      location: trimmedLocation || null,
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
