/**
 * @file career-charts.component.ts
 * @description Renders the grade history and weighted-average history as
 * two ApexCharts bar charts, styled with OMU brand gradients and colors.
 * Pure presentation: receives already-computed chart points as inputs.
 */

import { Component, input, computed } from '@angular/core';
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
  ApexMarkers,
} from 'ng-apexcharts';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { ChartPoint } from '@types';

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
        ? { line: '#2563EB', fillFrom: '#3B82F6', fillTo: '#EFF6FF' }
        : { line: '#059669', fillFrom: '#34D399', fillTo: '#ECFDF5' };

    const series: ApexAxisChartSeries = [{ name: 'Valore', data: points.map(p => p.value) }];

    const categories = points.map((_, i) => `${i + 1}°`);

    return {
      series,
      chart: {
        type: 'area',
        height: 200,
        toolbar: { show: false },
        animations: { enabled: true, easing: 'easeinout', speed: 500 },
        sparkline: { enabled: false },
      } as ApexChart,
      colors: [colors.line],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.3,
          gradientToColors: [colors.fillTo],
          opacityFrom: 0.5,
          opacityTo: 0.05,
          stops: [0, 100],
        },
      } as ApexFill,
      stroke: {
        curve: 'smooth',
        width: 3,
      } as ApexStroke,
      markers: {
        size: 4,
        colors: [colors.line],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: { size: 6 },
      } as ApexMarkers,
      dataLabels: { enabled: false } as ApexDataLabels,
      grid: {
        show: true,
        borderColor: '#F1F5F9',
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
        padding: { left: 8, right: 8, bottom: 0 },
      } as ApexGrid,
      xaxis: {
        categories,
        title: { text: 'Esame', style: { fontSize: '11px', color: '#9CA3AF' } },
        labels: { show: true, style: { fontSize: '11px', colors: '#9CA3AF' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      } as ApexXAxis,
      yaxis: {
        show: true,
        min: 0,
        max: 30,
        tickAmount: 3,
        title: { text: 'Voto', style: { fontSize: '11px', color: '#9CA3AF' } },
        labels: { style: { fontSize: '11px', colors: '#9CA3AF' } },
      } as ApexYAxis,
      tooltip: {
        theme: 'light',
        y: { formatter: (val: number) => `${val} / 30` },
      } as ApexTooltip,
      legend: { show: false },
    };
  }
}
