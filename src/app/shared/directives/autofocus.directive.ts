import { AfterViewInit, Directive, ElementRef, input } from '@angular/core';

/**
 * Automatically focuses the host element after view initialization.
 * Can be enabled/disabled via input binding.
 *
 * @example
 * <input appAutofocus />
 * <input [appAutofocus]="isOpen" />
 */
@Directive({
  selector: '[appAutofocus]',
  standalone: true,
})
export class AutofocusDirective implements AfterViewInit {
  readonly appAutofocus = input<boolean>(true);

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (!this.appAutofocus()) return;

    setTimeout(() => this.el.nativeElement.focus(), 0);
  }
}
