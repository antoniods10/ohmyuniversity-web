import { Component, input, computed } from '@angular/core';
import { cryptoRandInt } from '@shared/utils/crypto-rand';
import { MarqueeImage, LoginStat } from '@types';

type MarqueeCell = { type: 'image'; data: MarqueeImage } | { type: 'stat'; data: LoginStat };

@Component({
  selector: 'app-login-marquee',
  standalone: true,
  templateUrl: './login-marquee.component.html',
})
export class LoginMarqueeComponent {
  readonly images = input.required<MarqueeImage[]>();

  readonly stats = input.required<LoginStat[]>();

  readonly columns = computed<MarqueeCell[][]>(() => {
    const columnCount = 4;

    const shuffledImgs = this.shuffle(this.images());
    const shuffledStats = this.shuffle(this.stats());

    const imgColumns: MarqueeImage[][] = Array.from({ length: columnCount }, () => []);
    shuffledImgs.forEach((img, i) => {
      imgColumns[i % columnCount].push(img);
    });

    const columns: MarqueeCell[][] = imgColumns.map(colImgs =>
      colImgs.map(img => ({ type: 'image' as const, data: img })),
    );

    shuffledStats.forEach((stat, i) => {
      const targetColumn = columns[i % columnCount];
      const insertAt = Math.min(targetColumn.length, 2 + i);
      targetColumn.splice(insertAt, 0, { type: 'stat' as const, data: stat });
    });

    return columns.map(col => [...col, ...col]);
  });

  direction(index: number): 'up' | 'down' {
    return index % 2 === 0 ? 'up' : 'down';
  }

  durationClass(index: number): string {
    const speeds = ['duration-1', 'duration-2', 'duration-3', 'duration-4'];
    return speeds[index % speeds.length];
  }

  private shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = cryptoRandInt(i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}
