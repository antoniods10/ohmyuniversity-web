import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { LucideDynamicIcon, LucideX } from '@lucide/angular';
import { PlacedWidget, WidgetDefinition } from '@shared/types';
import { WIDGET_SIZE_CONFIG, AVAILABLE_WIDGETS, GRID_COLS } from '@shared/constants';

@Component({
  selector: 'app-home-widget-grid',
  standalone: true,
  imports: [CustomTextComponent, LucideDynamicIcon],
  templateUrl: './home-widget-grid.component.html',
})
export class HomeWidgetGridComponent {
  @Input() placedWidgets: PlacedWidget[] = [];
  @Input() isEditMode: boolean = false;
  @Output() editModeToggled = new EventEmitter<void>();
  @Output() widgetRemoved = new EventEmitter<string>();

  readonly GRID_COLS = GRID_COLS;
  readonly lucideX = LucideX;

  getWidgetDefinition(widgetId: string): WidgetDefinition | undefined {
    return AVAILABLE_WIDGETS.find(w => w.id === widgetId);
  }

  getGridColumn(widget: PlacedWidget): string {
    const config = WIDGET_SIZE_CONFIG[widget.size];
    return `${widget.col + 1} / span ${config.cols}`;
  }

  getGridRow(widget: PlacedWidget): string {
    const config = WIDGET_SIZE_CONFIG[widget.size];
    return `${widget.row + 1} / span ${config.rows}`;
  }
}
