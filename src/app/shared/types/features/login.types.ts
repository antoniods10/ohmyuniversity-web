export interface MarqueeImage {
  url: string;
  alt: string;
}

export interface LoginStat {
  value: string;
  label: string;
  bgColor: string;
}

export type LoginMode = 'university' | 'partner';

export interface MarqueeColumn {
  images: MarqueeImage[];
  direction: 'up' | 'down';
  speed: number;
}
