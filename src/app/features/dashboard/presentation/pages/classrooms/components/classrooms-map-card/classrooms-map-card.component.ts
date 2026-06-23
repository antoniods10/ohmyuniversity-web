import { Component } from '@angular/core';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { LucideDynamicIcon, LucideMap } from '@lucide/angular';

@Component({
  selector: 'app-classrooms-map-card',
  standalone: true,
  imports: [CustomCardComponent, CustomBadgeComponent, CustomTextComponent, LucideDynamicIcon],
  templateUrl: './classrooms-map-card.component.html',
})
export class ClassroomsMapCardComponent {
  readonly iconMap = LucideMap;
}
