import { Directive, ElementRef, output, HostListener } from '@angular/core';

/**
 * Emette l'evento `clickOutside` quando l'utente clicca
 * al di fuori dell'elemento su cui è applicata la directive.
 *
 * @example
 * <div appClickOutside (clickOutside)="close()">...</div>
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
