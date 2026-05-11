import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-orientation-nav',
  standalone: true,
  template: `
    <div class="mt-8 space-y-3">
      <div class="flex gap-3">
        <button
          type="button"
          (click)="prev.emit()"
          [disabled]="!hasPrev()"
          class="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30">
          <svg
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Arg. Prec.
        </button>
        <button
          type="button"
          (click)="next.emit()"
          [disabled]="!hasNext()"
          class="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30">
          Arg. Succ.
          <svg
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
      <button
        type="button"
        (click)="backToList.emit()"
        class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100">
        ← Torna ad Orientamento
      </button>
    </div>
  `,
})
export class OrientationNavComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();
}
