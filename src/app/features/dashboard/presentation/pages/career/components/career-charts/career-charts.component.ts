/**
 * @file career-charts.component.ts
 * @description Renders the grade history and weighted-average history as
 * two ApexCharts bar charts, styled with OMU brand gradients and colors.
 * Pure presentation: receives already-computed chart points as inputs.
 */

import { Component, input, computed } from '@angular/core';
import { ChartPoint } from '@shared/types/dashboard/career.types';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexStroke,
  ApexGrid,
  ApexTooltip,
  ApexDataLabels,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

export type ChartTheme = 'primary' | 'success';

@Component({
  selector: 'app-career-charts',
  standalone: true,
  imports: [NgApexchartsModule, CustomCardComponent],
  templateUrl: './career-charts.component.html',
})
export class CareerChartsComponent {
  readonly gradeHistory = input.required<ChartPoint[]>();
  readonly averageHistory = input.required<ChartPoint[]>();

  readonly gradeChartOptions = computed(() => this.buildOptions(this.gradeHistory(), 'primary'));
  readonly averageChartOptions = computed(() =>
    this.buildOptions(this.averageHistory(), 'success'),
  );

  private buildOptions(points: ChartPoint[], theme: ChartTheme) {
    const colors =
      theme === 'primary'
        ? { from: '#3B82F6', to: '#1D4ED8', last: '#1E3A8A' }
        : { from: '#34D399', to: '#059669', last: '#065F46' };

    const series: ApexAxisChartSeries = [{ name: 'Valore', data: points.map(p => p.value) }];

    return {
      series,
      chart: {
        type: 'bar',
        height: 160,
        toolbar: { show: false },
        animations: { enabled: true, easing: 'easeinout', speed: 500 },
      } as ApexChart,
      plotOptions: {
        bar: { borderRadius: 6, columnWidth: '55%', distributed: true },
      },
      colors: points.map(p => (p.isLast ? colors.last : colors.from)),
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          gradientToColors: points.map(p => (p.isLast ? colors.last : colors.to)),
          stops: [0, 100],
        },
      } as ApexFill,
      dataLabels: { enabled: false } as ApexDataLabels,
      stroke: { show: false } as ApexStroke,
      grid: { show: false } as ApexGrid,
      xaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      } as ApexXAxis,
      yaxis: {
        show: false,
        min: 0,
        max: 30,
      } as ApexYAxis,
      tooltip: {
        theme: 'light',
        y: { formatter: (val: number) => `${val} / 30` },
      } as ApexTooltip,
      legend: { show: false },
    };
  }
}
