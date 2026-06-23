import { Component, input, output } from '@angular/core';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomInputComponent, SelectOption } from '@ui/custom-input/custom-input.component';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';
import { LucideDynamicIcon, LucideSearch, LucideBuilding2, LucideLayers } from '@lucide/angular';

@Component({
  selector: 'app-classrooms-filters',
  standalone: true,
  imports: [CustomBadgeComponent, CustomInputComponent, CustomTabsComponent, LucideDynamicIcon],
  templateUrl: './classrooms-filters.component.html',
})
export class ClassroomsFiltersComponent {
  readonly campusTabs = input.required<TabItem[]>();
  readonly activeCampusId = input.required<string>();
  readonly buildingOptions = input.required<SelectOption[]>();
  readonly buildingCount = input.required<number>();
  readonly totalClassrooms = input.required<number>();
  readonly availableCount = input.required<number>();

  readonly campusChange = output<string>();
  readonly searchChange = output<string | number>();
  readonly buildingChange = output<string | number>();

  readonly iconSearch = LucideSearch;
  readonly iconBuilding = LucideBuilding2;
  readonly iconLayers = LucideLayers;
}
