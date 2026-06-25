import { Component, input, AfterViewInit, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { CFU_CHART_DEFAULT_DATA } from '@shared/constants';
import { CfuDataPoint } from '@shared/types';

@Component({
  selector: 'app-cfu-chart',
  standalone: true,
  templateUrl: './cfu-chart.component.html',
})
export class CfuChartComponent implements AfterViewInit, OnChanges {
  readonly data = input<CfuDataPoint[]>(CFU_CHART_DEFAULT_DATA);

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

    // Y axis Grid & Label
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

      // CFU Bar
      const cfuH = (d.cfu / 3 / maxVal) * chartH;
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.roundRect(cx - barW - gap / 2, pad.top + chartH - cfuH, barW, cfuH, [4, 4, 0, 0]);
      ctx.fill();

      // Study Hours Bar
      const oreH = (d.oreStudio / maxVal) * chartH;
      ctx.fillStyle = '#93c5fd';
      ctx.beginPath();
      ctx.roundRect(cx + gap / 2, pad.top + chartH - oreH, barW, oreH, [4, 4, 0, 0]);
      ctx.fill();

      // X axis label
      ctx.fillStyle = '#6b7280';
      ctx.textAlign = 'center';
      ctx.fillText(d.anno, cx, H - pad.bottom + 16);
    });
  }
}
