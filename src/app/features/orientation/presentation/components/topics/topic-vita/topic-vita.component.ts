import { Component, input, output, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';

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

  readonly tempoSlices = [
    { label: 'Lezioni', percent: 30, color: '#3b82f6' },
    { label: 'Studio individuale', percent: 35, color: '#60a5fa' },
    { label: 'Tempo libero / sport', percent: 20, color: '#bfdbfe' },
    { label: 'Lavori domestici / commissioni', percent: 10, color: '#dbeafe' },
    { label: 'Altro', percent: 5, color: '#e5e7eb' },
  ];

  readonly consigliOrari = [
    {
      titolo: 'Gli orari non sono come al liceo',
      testo:
        'Le lezioni non coprono tutta la mattina. Potresti avere 2 ore di lezione alle 9 e poi niente fino alle 15. Questi "buchi" vanno riempiti con lo studio - non sono tempo libero.',
    },
    {
      titolo: 'Lezioni spezzate su più giorni',
      testo:
        'Un corso da 9 CFU può avere 3 ore di lezione distribuite su 3 giorni diversi. Impara a leggere il piano orario e costruisci una routine settimanale stabile.',
    },
  ];

  readonly consigliStudio = [
    {
      titolo: 'Studia subito dopo la lezione',
      testo:
        'Le ricerche cognitive mostrano che ripassare entro 24h dalla lezione aumenta la ritenzione a lungo termine del 60%. Non aspettare la sessione.',
    },
    {
      titolo: "Non studiare solo prima dell'esame",
      testo:
        'Il "binge studying" funziona per superare l\'esame, ma non per ricordarlo. Se vuoi costruire competenze reali (e reggere una laurea magistrale), studia in modo distribuito.',
    },
  ];

  readonly vitaFuorisede = [
    { voce: 'Affitto camera singola (media nazionale)', importo: '400–600 €/mese' },
    { voce: 'Spesa alimentare', importo: '150–250 €/mese' },
    { voce: 'Utenze (quota parte)', importo: '50–80 €/mese' },
    { voce: 'Trasporti', importo: '30–60 €/mese' },
    { voce: 'Totale stimato', importo: '630–990 €/mese' },
  ];

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
