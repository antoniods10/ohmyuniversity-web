import { Component, input } from '@angular/core';

export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      [attr.width]="sizeMap[size()]"
      [attr.height]="sizeMap[size()]"
      [attr.aria-label]="ariaLabel()"
      role="img">
      <rect x="12" y="30" width="40" height="6" rx="2" fill="currentColor" opacity="0.15" />
      <polygon points="32,10 56,26 32,34 8,26" fill="currentColor" />
      <line
        x1="56"
        y1="26"
        x2="56"
        y2="40"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round" />
      <circle cx="56" cy="42" r="3" fill="currentColor" />
      <rect x="20" y="36" width="24" height="18" rx="3" fill="currentColor" opacity="0.9" />
      <line
        x1="25"
        y1="43"
        x2="39"
        y2="43"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        opacity="0.6" />
      <line
        x1="25"
        y1="47"
        x2="35"
        y2="47"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        opacity="0.6" />
    </svg>
  `,
})
export class LogoComponent {
  readonly size = input<LogoSize>('md');
  readonly ariaLabel = input('OhMyUniversity logo');

  readonly sizeMap: Record<LogoSize, number> = {
    sm: 24, // navbar
    md: 32,
    lg: 48, // footer
    xl: 64,
  };
}
