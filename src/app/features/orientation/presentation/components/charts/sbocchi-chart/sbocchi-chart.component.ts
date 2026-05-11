import { Component, input, AfterViewInit, ElementRef, ViewChild, OnChanges } from '@angular/core';

export interface SboccoDataPoint {
  area: string;
  occupazione: number;
  colore: string;
}

@Component({
  selector: 'app-sbocchi-chart',
  standalone: true,
  template: `
    <div class="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <p class="mb-3 text-xs font-medium text-gray-500">
        Tasso di occupazione a 1 anno dalla laurea triennale - per area
      </p>
      <canvas #canvas class="w-full"></canvas>
      <p class="mt-2 text-xs text-gray-400">
        * Dati placeholder - fonte elaborazione AlmaLaurea. Aggiornati all'integrazione API.
      </p>
    </div>
  `,
})
export class SbocchiChartComponent implements AfterViewInit, OnChanges {
  readonly data = input<SboccoDataPoint[]>([
    { area: 'Ingegneria & Informatica', occupazione: 85, colore: '#3b82f6' },
    { area: 'Economia & Management', occupazione: 72, colore: '#60a5fa' },
    { area: 'Sanitaria & Medicina', occupazione: 78, colore: '#2563eb' },
    { area: 'Scientifica', occupazione: 65, colore: '#93c5fd' },
    { area: 'Giuridica', occupazione: 52, colore: '#bfdbfe' },
    { area: 'Umanistica & Sociale', occupazione: 48, colore: '#dbeafe' },
  ]);

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.draw();
  }

  ngOnChanges(): void {
    if (this.canvasRef?.nativeElement) this.draw();
  }

  private draw(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const points = this.data();
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth || 400;
    const rowH = 44;
    const H = points.length * rowH + 10;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    // Calcola labelW dinamicamente in base alla larghezza disponibile
    const labelW = Math.min(190, W * 0.45);
    const barMaxW = W - labelW - 60;
    const barH = 22;

    points.forEach((d, i) => {
      const y = i * rowH + 10;
      const barW = (d.occupazione / 100) * barMaxW;

      // Label
      ctx.fillStyle = '#374151';
      ctx.font = '11px system-ui';
      ctx.textAlign = 'right';
      // Tronca label se troppo lungo
      const label = d.area.length > 24 ? d.area.slice(0, 22) + '…' : d.area;
      ctx.fillText(label, labelW - 8, y + barH / 2 + 4);

      // Track (sfondo barra)
      ctx.fillStyle = '#f3f4f6';
      ctx.beginPath();
      ctx.roundRect(labelW, y, barMaxW, barH, 4);
      ctx.fill();

      // Barra valore
      ctx.fillStyle = d.colore;
      ctx.beginPath();
      ctx.roundRect(labelW, y, barW, barH, 4);
      ctx.fill();

      // Percentuale
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 11px system-ui';
      ctx.textAlign = 'left';
      ctx.fillText(`${d.occupazione}%`, labelW + barW + 6, y + barH / 2 + 4);
    });
  }
}
