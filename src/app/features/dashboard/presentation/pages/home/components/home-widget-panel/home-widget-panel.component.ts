import { Component, Input, Output, EventEmitter, signal, viewChild } from '@angular/core';
import { CustomModalComponent } from '@ui/custom-modal/custom-modal.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import {
  LucideDynamicIcon,
  LucidePlus,
  LucideCalendarCheck,
  LucideChartNoAxesColumn,
  LucideMail,
  LucideClock,
  LucideGraduationCap,
  LucideArrowLeft,
} from '@lucide/angular';
import { WidgetDefinition, WidgetSize, WidgetSizeConfig, PlacedWidget } from '@shared/types';
import { WIDGET_SIZE_CONFIG, GRID_COLS } from '@shared/constants';

type PanelStep = 'list' | 'size';

@Component({
  selector: 'app-home-widget-panel',
  standalone: true,
  imports: [CustomModalComponent, CustomButtonComponent, CustomTextComponent, LucideDynamicIcon],
  templateUrl: './home-widget-panel.component.html',
})
export class HomeWidgetPanelComponent {
  @Input() availableWidgets: WidgetDefinition[] = [];
  @Input() placedWidgets: PlacedWidget[] = [];
  @Output() widgetSelected = new EventEmitter<{
    widget: WidgetDefinition;
    size: WidgetSize;
    replace: boolean;
  }>();

  readonly modal = viewChild<CustomModalComponent>('widgetModal');
  readonly lucidePlus = LucidePlus;
  readonly lucideArrowLeft = LucideArrowLeft;

  readonly step = signal<PanelStep>('list');
  readonly selectedWidget = signal<WidgetDefinition | null>(null);
  readonly selectedSize = signal<WidgetSize>('small');

  readonly GRID_COLS = GRID_COLS;
  readonly GRID_ROWS = 3;

  private readonly widgetIconMap: Record<string, any> = {
    'next-exam': LucideCalendarCheck,
    'grade-average': LucideChartNoAxesColumn,
    messages: LucideMail,
    'schedule-today': LucideClock,
    'cfu-progress': LucideGraduationCap,
  };

  open(): void {
    this.step.set('list');
    this.selectedWidget.set(null);
    this.modal()?.open();
  }

  close(): void {
    this.modal()?.close('programmatic');
  }

  getWidgetIcon(widgetId: string): any {
    return this.widgetIconMap[widgetId] ?? LucidePlus;
  }

  isWidgetPlaced(widgetId: string): boolean {
    return this.placedWidgets.some(w => w.widgetId === widgetId);
  }

  getPlacedSize(widgetId: string): WidgetSize | null {
    return this.placedWidgets.find(w => w.widgetId === widgetId)?.size ?? null;
  }

  isSizeDisabled(size: WidgetSize): boolean {
    const widget = this.selectedWidget();
    if (!widget) return false;
    return this.getPlacedSize(widget.id) === size;
  }

  selectWidget(widget: WidgetDefinition): void {
    this.selectedWidget.set(widget);
    const placedSize = this.getPlacedSize(widget.id);
    const firstAvailable = widget.availableSizes.find(s => s !== placedSize);
    this.selectedSize.set(firstAvailable ?? widget.defaultSize);
    this.step.set('size');
  }

  goBack(): void {
    this.step.set('list');
    this.selectedWidget.set(null);
  }

  selectSize(size: WidgetSize): void {
    if (this.isSizeDisabled(size)) return;
    this.selectedSize.set(size);
  }

  confirm(): void {
    const widget = this.selectedWidget();
    if (!widget) return;
    const isReplacing = this.isWidgetPlaced(widget.id);
    this.widgetSelected.emit({ widget, size: this.selectedSize(), replace: isReplacing });
    this.close();
  }

  getSizeConfig(size: WidgetSize): WidgetSizeConfig {
    return WIDGET_SIZE_CONFIG[size];
  }

  isPreviewCell(size: WidgetSize, row: number, col: number): boolean {
    const config = WIDGET_SIZE_CONFIG[size];
    return row < config.rows && col < config.cols;
  }

  get gridCells(): { row: number; col: number }[] {
    const cells: { row: number; col: number }[] = [];
    for (let r = 0; r < this.GRID_ROWS; r++) {
      for (let c = 0; c < this.GRID_COLS; c++) {
        cells.push({ row: r, col: c });
      }
    }
    return cells;
  }

  get availableSizes(): WidgetSize[] {
    return this.selectedWidget()?.availableSizes ?? [];
  }
}
