import { Directive, ElementRef, output, HostListener } from '@angular/core';

/**
 * Emits an event when a click occurs outside the host element.
 *
 * @example
 * <div appClickOutside (clickOutside)="close()"></div>
 */
@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  readonly clickOutside = output<void>();

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: EventTarget | null): void {
    if (!(target instanceof HTMLElement)) return;

    if (!this.el.nativeElement.contains(target)) {
      this.clickOutside.emit();
    }
  }
}
