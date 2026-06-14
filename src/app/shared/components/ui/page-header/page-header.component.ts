import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CustomTextComponent],
  templateUrl: './page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() description: string = '';
}
