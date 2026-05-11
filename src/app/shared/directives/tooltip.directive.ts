import { Directive, ElementRef, HostListener, input, OnDestroy, Renderer2 } from '@angular/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Mostra un tooltip testuale al passaggio del mouse (o focus da tastiera)
 * sull'elemento host. Il tooltip viene appeso al body per evitare problemi
 * di overflow/clipping nei container con overflow:hidden.
 *
 * @example
 * <button appTooltip="Elimina esame" tooltipPosition="top">🗑️</button>
 * <span appTooltip="Crediti Formativi Universitari">CFU</span>
 */
@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  readonly appTooltip = input.required<string>();
  readonly tooltipPosition = input<TooltipPosition>('top');

  private tooltipEl: HTMLElement | null = null;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  @HostListener('mouseenter')
  @HostListener('focusin')
  show(): void {
    if (!this.appTooltip()) return;
    this.create();
    this.position();
  }

  @HostListener('mouseleave')
  @HostListener('focusout')
  hide(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private create(): void {
    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.appendChild(this.tooltipEl, this.renderer.createText(this.appTooltip()));

    // Stile base
    const styles: Record<string, string> = {
      position: 'fixed',
      zIndex: '9999',
      padding: '4px 10px',
      borderRadius: '6px',
      fontSize: '12px',
      lineHeight: '1.5',
      color: '#fff',
      background: 'rgba(17,24,39,0.92)',
      backdropFilter: 'blur(4px)',
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      opacity: '0',
      transition: 'opacity 0.15s ease',
    };

    Object.entries(styles).forEach(([k, v]) => this.renderer.setStyle(this.tooltipEl, k, v));

    this.renderer.appendChild(document.body, this.tooltipEl);

    // Forza reflow per avviare la transizione
    requestAnimationFrame(() => {
      if (this.tooltipEl) {
        this.renderer.setStyle(this.tooltipEl, 'opacity', '1');
      }
    });
  }

  private position(): void {
    if (!this.tooltipEl) return;

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tip = this.tooltipEl;
    const tipRect = tip.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (this.tooltipPosition()) {
      case 'top':
        top = hostRect.top - tipRect.height - gap;
        left = hostRect.left + (hostRect.width - tipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + gap;
        left = hostRect.left + (hostRect.width - tipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tipRect.height) / 2;
        left = hostRect.left - tipRect.width - gap;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tipRect.height) / 2;
        left = hostRect.right + gap;
        break;
    }

    // Clamp ai bordi della viewport
    left = Math.max(8, Math.min(left, window.innerWidth - tipRect.width - 8));
    top = Math.max(8, Math.min(top, window.innerHeight - tipRect.height - 8));

    this.renderer.setStyle(tip, 'top', `${top}px`);
    this.renderer.setStyle(tip, 'left', `${left}px`);
  }

  private destroy(): void {
    if (this.tooltipEl) {
      this.renderer.removeChild(document.body, this.tooltipEl);
      this.tooltipEl = null;
    }
  }
}
