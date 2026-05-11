import { AfterViewInit, Directive, ElementRef, input } from '@angular/core';

/**
 * Porta il focus sull'elemento host subito dopo il rendering.
 * Accetta un input booleano opzionale per abilitare/disabilitare
 * il comportamento dinamicamente.
 *
 * @example
 * <input appAutofocus />
 * <input [appAutofocus]="isModalOpen" />
 */
@Directive({
  selector: '[appAutofocus]',
  standalone: true,
})
export class AutofocusDirective implements AfterViewInit {
  /** Se false, il focus non viene applicato. Default: true */
  readonly appAutofocus = input<boolean>(true);

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (this.appAutofocus()) {
      // setTimeout 0 garantisce che il focus avvenga dopo
      // il ciclo di rendering corrente (es. dentro modal/dialog)
      setTimeout(() => {
        this.el.nativeElement.focus();
      }, 0);
    }
  }
}
