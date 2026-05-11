import { Component, input, AfterViewInit, ElementRef, ViewChild, OnChanges } from '@angular/core';

export interface CfuDataPoint {
  anno: string;
  cfu: number;
  oreStudio: number;
}

@Component({
  selector: 'app-cfu-chart',
  standalone: true,
  template: `
    <div class="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <p class="mb-3 text-xs font-medium text-gray-500">
        CFU per anno (scala ÷3) vs Ore di studio stimate / settimana
      </p>
      <canvas #canvas class="w-full"></canvas>
      <div class="mt-3 flex items-center gap-5">
        <div class="flex items-center gap-2">
          <div class="h-3 w-3 rounded-sm bg-blue-500"></div>
          <span class="text-xs text-gray-500">CFU anno (÷3)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-3 w-3 rounded-sm bg-blue-300"></div>
          <span class="text-xs text-gray-500">Ore studio / sett.</span>
        </div>
      </div>
    </div>
  `,
})
export class CfuChartComponent implements AfterViewInit, OnChanges {
  readonly data = input<CfuDataPoint[]>([
    { anno: '1° Anno', cfu: 60, oreStudio: 25 },
    { anno: '2° Anno', cfu: 60, oreStudio: 28 },
    { anno: '3° Anno', cfu: 60, oreStudio: 22 },
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

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth || 400;
    const H = 200;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const pad = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;
    const maxVal = 35;
    const points = this.data();
    const groupW = chartW / points.length;
    const barW = groupW * 0.28;
    const gap = barW * 0.4;

    // Griglia e label asse Y
    ctx.font = '11px system-ui';
    [0, 10, 20, 30].forEach(v => {
      const y = pad.top + chartH - (v / maxVal) * chartH;
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();
      ctx.fillStyle = '#9ca3af';
      ctx.textAlign = 'right';
      ctx.fillText(String(v), pad.left - 6, y + 4);
    });

    points.forEach((d, i) => {
      const cx = pad.left + i * groupW + groupW / 2;

      // Barra CFU (÷3 per scala visiva)
      const cfuH = (d.cfu / 3 / maxVal) * chartH;
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.roundRect(cx - barW - gap / 2, pad.top + chartH - cfuH, barW, cfuH, [4, 4, 0, 0]);
      ctx.fill();

      // Barra ore studio
      const oreH = (d.oreStudio / maxVal) * chartH;
      ctx.fillStyle = '#93c5fd';
      ctx.beginPath();
      ctx.roundRect(cx + gap / 2, pad.top + chartH - oreH, barW, oreH, [4, 4, 0, 0]);
      ctx.fill();

      // Label asse X
      ctx.fillStyle = '#6b7280';
      ctx.textAlign = 'center';
      ctx.fillText(d.anno, cx, H - pad.bottom + 16);
    });
  }
}
