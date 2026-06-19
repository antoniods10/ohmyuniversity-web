export type WidgetSize = 'small' | 'medium' | 'large';

export interface WidgetDefinition {
  id: string;
  label: string;
  description: string;
  icon: string; // nome icona Lucide
  availableSizes: WidgetSize[];
  defaultSize: WidgetSize;
}

export interface PlacedWidget {
  instanceId: string;
  widgetId: string;
  size: WidgetSize;
  row: number; // riga nella griglia (0-indexed)
  col: number; // colonna nella griglia (0-indexed)
}

export interface DashboardLayout {
  widgets: PlacedWidget[];
}
