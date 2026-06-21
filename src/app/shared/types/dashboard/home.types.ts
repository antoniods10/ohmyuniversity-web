export type WidgetSize = 'small' | 'medium' | 'large';

export interface WidgetSizeConfig {
  cols: number;
  rows: number;
  label: string;
  description: string;
}

export interface WidgetDefinition {
  id: string;
  label: string;
  description: string;
  icon: string;
  availableSizes: WidgetSize[];
  defaultSize: WidgetSize;
}

export interface PlacedWidget {
  instanceId: string;
  widgetId: string;
  size: WidgetSize;
  row: number;
  col: number;
}

export interface DashboardLayout {
  widgets: PlacedWidget[];
}
