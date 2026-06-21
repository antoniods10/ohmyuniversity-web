import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { WidgetDefinition, WidgetSize, PlacedWidget } from '@shared/types';
import { WIDGET_SIZE_CONFIG, GRID_COLS, GRID_ROWS } from '@shared/constants';

@Component({
  selector: 'app-home-placing-grid',
  standalone: true,
  imports: [],
  templateUrl: './home-placing-grid.component.html',
})
export class HomePlacingGridComponent {
  @Input() pendingWidget: WidgetDefinition | null = null;
  @Input() pendingSize: WidgetSize = 'small';
  @Input() placedWidgets: PlacedWidget[] = [];
  @Output() placed = new EventEmitter<{ row: number; col: number }>();
  @Output() cancelled = new EventEmitter<void>();

  readonly GRID_COLS = GRID_COLS;
  readonly GRID_ROWS = GRID_ROWS;
  readonly hoveredCell = signal<{ row: number; col: number } | null>(null);

  get gridCells(): { row: number; col: number }[] {
    const cells: { row: number; col: number }[] = [];
    for (let r = 0; r < this.GRID_ROWS; r++) {
      for (let c = 0; c < this.GRID_COLS; c++) {
        cells.push({ row: r, col: c });
      }
    }
    return cells;
  }

  isCellOccupied(row: number, col: number): boolean {
    return this.placedWidgets.some(w => {
      const config = WIDGET_SIZE_CONFIG[w.size];
      return row >= w.row && row < w.row + config.rows && col >= w.col && col < w.col + config.cols;
    });
  }

  isPreviewCell(row: number, col: number): boolean {
    const hovered = this.hoveredCell();
    if (!hovered || !this.pendingWidget) return false;
    const config = WIDGET_SIZE_CONFIG[this.pendingSize];
    return (
      row >= hovered.row &&
      row < hovered.row + config.rows &&
      col >= hovered.col &&
      col < hovered.col + config.cols
    );
  }

  isPreviewOutOfBounds(): boolean {
    const hovered = this.hoveredCell();
    if (!hovered) return false;
    const config = WIDGET_SIZE_CONFIG[this.pendingSize];
    return hovered.col + config.cols > this.GRID_COLS || hovered.row + config.rows > this.GRID_ROWS;
  }

  isPreviewOnOccupied(): boolean {
    const hovered = this.hoveredCell();
    if (!hovered) return false;
    const config = WIDGET_SIZE_CONFIG[this.pendingSize];
    for (let r = hovered.row; r < hovered.row + config.rows; r++) {
      for (let c = hovered.col; c < hovered.col + config.cols; c++) {
        if (this.isCellOccupied(r, c)) return true;
      }
    }
    return false;
  }

  isPreviewValid(): boolean {
    return !this.isPreviewOutOfBounds() && !this.isPreviewOnOccupied();
  }

  onCellClick(row: number, col: number): void {
    if (!this.isPreviewValid()) return;
    this.placed.emit({ row, col });
  }
}
