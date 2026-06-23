import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CustomTextComponent],
  templateUrl: './dashboard-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeaderComponent {
  @Input() title: string = '';
  @Input() description: string = '';
}
