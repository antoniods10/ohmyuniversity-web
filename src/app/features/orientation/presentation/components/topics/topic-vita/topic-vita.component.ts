import { Component, input, output, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import {
  VITA_CONSIGLI_ORARI,
  VITA_CONSIGLI_STUDIO,
  VITA_FUORISEDE,
  VITA_TEMPO_SLICES,
} from '@constants';

@Component({
  selector: 'app-topic-vita',
  standalone: true,
  imports: [OrientationNavComponent],
  templateUrl: './topic-vita.component.html',
})
export class TopicVitaComponent implements AfterViewInit {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  @ViewChild('tempoChart') tempoChartRef!: ElementRef<HTMLCanvasElement>;

  readonly tempoSlices = VITA_TEMPO_SLICES;
  readonly consigliOrari = VITA_CONSIGLI_ORARI;
  readonly consigliStudio = VITA_CONSIGLI_STUDIO;
  readonly vitaFuorisede = VITA_FUORISEDE;

  ngAfterViewInit(): void {
    this.drawPieChart();
  }

  private drawPieChart(): void {
    const canvas = this.tempoChartRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = Math.min(canvas.offsetWidth, 200);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 10;
    let startAngle = -Math.PI / 2;

    this.tempoSlices.forEach(slice => {
      const angle = (slice.percent / 100) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, startAngle + angle);
      ctx.closePath();
      ctx.fillStyle = slice.color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      startAngle += angle;
    });
  }
}
