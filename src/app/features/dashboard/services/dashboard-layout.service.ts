import { Injectable, signal } from '@angular/core';
import { DashboardLayout, PlacedWidget } from '@shared/types';

const STORAGE_KEY = 'omu_dashboard_layout';

@Injectable({ providedIn: 'root' })
export class DashboardLayoutService {
  private readonly _layout = signal<DashboardLayout>(this.loadLayout());

  readonly layout = this._layout.asReadonly();

  private loadLayout(): DashboardLayout {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { widgets: [] };
    } catch {
      return { widgets: [] };
    }
  }

  private saveLayout(layout: DashboardLayout): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  }

  addWidget(widget: PlacedWidget): void {
    const updated = { widgets: [...this._layout().widgets, widget] };
    this._layout.set(updated);
    this.saveLayout(updated);
  }

  removeWidget(instanceId: string): void {
    const updated = {
      widgets: this._layout().widgets.filter((w: PlacedWidget) => w.instanceId !== instanceId),
    };
    this._layout.set(updated);
    this.saveLayout(updated);
  }

  updateWidget(instanceId: string, changes: Partial<PlacedWidget>): void {
    const updated = {
      widgets: this._layout().widgets.map((w: PlacedWidget) =>
        w.instanceId === instanceId ? { ...w, ...changes } : w,
      ),
    };
    this._layout.set(updated);
    this.saveLayout(updated);
  }

  clearLayout(): void {
    this._layout.set({ widgets: [] });
    localStorage.removeItem(STORAGE_KEY);
  }
}
