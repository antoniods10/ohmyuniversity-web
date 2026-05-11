import { Directive, ElementRef, HostListener, input, OnInit, Renderer2 } from '@angular/core';

/**
 * Tronca il contenuto testuale dell'elemento host con ellipsis
 * quando supera il numero massimo di righe specificato.
 * Al passaggio del mouse mostra automaticamente un tooltip
 * con il testo completo (solo se il testo è effettivamente troncato).
 *
 * @example
 * <p appTruncate>Testo molto lungo che verrà troncato...</p>
 * <p [appTruncate]="2">Testo su massimo 2 righe</p>
 */
@Directive({
  selector: '[appTruncate]',
  standalone: true,
})
export class TruncateDirective implements OnInit {
  /** Numero massimo di righe visibili. Default: 1 */
  readonly appTruncate = input<number>(1);

  private tooltipEl: HTMLElement | null = null;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    const host = this.el.nativeElement;
    const lines = this.appTruncate();

    if (lines === 1) {
      // Single line: overflow ellipsis classico
      this.renderer.setStyle(host, 'overflow', 'hidden');
      this.renderer.setStyle(host, 'text-overflow', 'ellipsis');
      this.renderer.setStyle(host, 'white-space', 'nowrap');
    } else {
      // Multi-line: line-clamp CSS
      this.renderer.setStyle(host, 'display', '-webkit-box');
      this.renderer.setStyle(host, '-webkit-box-orient', 'vertical');
      this.renderer.setStyle(host, '-webkit-line-clamp', String(lines));
      this.renderer.setStyle(host, 'overflow', 'hidden');
    }
  }

  @HostListener('mouseenter')
  showTooltipIfTruncated(): void {
    const host = this.el.nativeElement;
    const isTruncated =
      host.scrollWidth > host.clientWidth || host.scrollHeight > host.clientHeight;

    if (!isTruncated) return;

    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.appendChild(this.tooltipEl, this.renderer.createText(host.textContent ?? ''));

    const styles: Record<string, string> = {
      position: 'fixed',
      zIndex: '9999',
      maxWidth: '320px',
      padding: '6px 10px',
      borderRadius: '6px',
      fontSize: '12px',
      lineHeight: '1.6',
      color: '#fff',
      background: 'rgba(17,24,39,0.92)',
      backdropFilter: 'blur(4px)',
      pointerEvents: 'none',
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      opacity: '0',
      transition: 'opacity 0.15s ease',
    };

    Object.entries(styles).forEach(([k, v]) => this.renderer.setStyle(this.tooltipEl, k, v));

    this.renderer.appendChild(document.body, this.tooltipEl);

    // Posiziona sopra l'elemento
    requestAnimationFrame(() => {
      if (!this.tooltipEl) return;
      const hostRect = host.getBoundingClientRect();
      const tipRect = this.tooltipEl.getBoundingClientRect();
      const gap = 8;

      let top = hostRect.top - tipRect.height - gap;
      let left = hostRect.left;

      // Clamp ai bordi
      left = Math.max(8, Math.min(left, window.innerWidth - tipRect.width - 8));
      if (top < 8) top = hostRect.bottom + gap;

      this.renderer.setStyle(this.tooltipEl, 'top', `${top}px`);
      this.renderer.setStyle(this.tooltipEl, 'left', `${left}px`);
      this.renderer.setStyle(this.tooltipEl, 'opacity', '1');
    });
  }

  @HostListener('mouseleave')
  hideTooltip(): void {
    if (this.tooltipEl) {
      this.renderer.removeChild(document.body, this.tooltipEl);
      this.tooltipEl = null;
    }
  }
}
