import { Component, input, AfterViewInit, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { SBOCCHI_CHART_DEFAULT_DATA } from '@shared/constants';
import { CareerChartDataPoint } from '@shared/types';

@Component({
  selector: 'app-sbocchi-chart',
  standalone: true,
  templateUrl: './sbocchi-chart.component.html',
})
export class SbocchiChartComponent implements AfterViewInit, OnChanges {
  readonly data = input<CareerChartDataPoint[]>(SBOCCHI_CHART_DEFAULT_DATA);

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

      const label = d.area.length > 24 ? d.area.slice(0, 22) + '…' : d.area;
      ctx.fillText(label, labelW - 8, y + barH / 2 + 4);

      // Track
      ctx.fillStyle = '#f3f4f6';
      ctx.beginPath();
      ctx.roundRect(labelW, y, barMaxW, barH, 4);
      ctx.fill();

      // Value bar
      ctx.fillStyle = d.colore;
      ctx.beginPath();
      ctx.roundRect(labelW, y, barW, barH, 4);
      ctx.fill();

      // Percentage
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 11px system-ui';
      ctx.textAlign = 'left';
      ctx.fillText(`${d.occupazione}%`, labelW + barW + 6, y + barH / 2 + 4);
    });
  }
}
