import {
  Component,
  input,
  output,
  computed,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnInit,
  viewChild,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideDynamicIcon, LucideX } from '@lucide/angular';

@Component({
  selector: 'app-grade-simulator-popup',
  standalone: true,
  imports: [FormsModule, NgStyle, LucideDynamicIcon],
  templateUrl: './grade-simulator-popup.component.html',
})
export class GradeSimulatorPopupComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  readonly iconX = LucideX;

  readonly anchorRect = input.required<DOMRect>();
  readonly currentValue = input<number | undefined>(undefined);
  readonly gradeChange = output<number | null>();
  readonly close = output<void>();

  readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');

  inputValue = '';
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  private get isMobile(): boolean {
    return isPlatformBrowser(this.platformId) && window.innerWidth < 640;
  }

  readonly popupStyle = computed(() => {
    if (!isPlatformBrowser(this.platformId)) return {};

    if (window.innerWidth < 640) {
      return {
        position: 'fixed',
        bottom: '24px',
        left: '16px',
        right: '16px',
        width: 'auto',
        'z-index': '50',
      };
    }

    const rect = this.anchorRect();
    const popupHeight = 220;
    const popupWidth = 208;
    const spaceBelow = window.innerHeight - rect.bottom;
    const top = spaceBelow >= popupHeight ? rect.bottom + 8 : rect.top - popupHeight - 8;
    const rightEdge = rect.left + popupWidth;
    const left =
      rightEdge > window.innerWidth - 16 ? window.innerWidth - popupWidth - 16 : rect.left;

    return {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      width: `${popupWidth}px`,
      'z-index': '50',
    };
  });

  ngOnInit(): void {
    const current = this.currentValue();
    if (current !== undefined) {
      this.inputValue = current.toString();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inputEl()?.nativeElement.focus();
      if (!this.isMobile) {
        this.inputEl()?.nativeElement.select();
      }
    }, 50);
  }

  ngOnDestroy(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }

  onValueChange(raw: string): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      const clamped = this.clampGrade(raw);
      if (clamped !== null) {
        if (clamped.toString() !== raw) {
          this.inputValue = clamped.toString();
        }
        this.gradeChange.emit(clamped);
      }
    }, 600);
  }

  onBlur(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    const clamped = this.clampGrade(this.inputValue);
    if (clamped !== null) {
      this.inputValue = clamped.toString();
      this.gradeChange.emit(clamped);
    } else if (this.inputValue === '') {
      this.gradeChange.emit(null);
    }
  }

  private clampGrade(raw: string): number | null {
    const parsed = Number.parseInt(String(raw), 10);
    if (Number.isNaN(parsed)) return null;
    return Math.min(30, Math.max(18, parsed));
  }
}
