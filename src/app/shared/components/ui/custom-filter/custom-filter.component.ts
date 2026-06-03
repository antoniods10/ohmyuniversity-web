/**
 * @file custom-filter.component.ts
 * @description Standalone Angular component providing a configurable filter
 * system including search input, select filters, chip-based filters and
 * reset/search actions.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LucideDynamicIcon,
  LucideSearch,
  LucideX,
  LucideFunnel,
  LucideRotateCcw,
} from '@lucide/angular';
import { ButtonVariant } from '../custom-button/custom-button.component';

/**
 * Represents a single option for select or chip filters.
 */
export interface FilterSelectOption {
  label: string;
  value: string | number;
}

/**
 * Configuration for a select-based filter.
 */
export interface FilterSelectConfig {
  key: string;
  label: string;
  placeholder?: string;
  options: FilterSelectOption[];
}

/**
 * Configuration for a chip-based filter group.
 */
export interface FilterChipConfig {
  key: string;
  label: string;
  options: FilterSelectOption[];
  multiple?: boolean;
}

/**
 * Full filter state emitted by the component.
 */
export interface FilterState {
  search: string;
  selects: Record<string, string | number | null>;
  chips: Record<string, (string | number)[]>;
}

export type FilterSize = 'sm' | 'md' | 'lg';

/**
 * Standalone Angular component that provides a configurable filtering UI
 * combining search input, select-based filters, and chip-based selection.
 *
 * The component emits a unified filter state object that can be used
 * by parent components to perform filtering logic or API queries.
 */
@Component({
  selector: 'app-custom-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideDynamicIcon],
  templateUrl: './custom-filter.component.html',
  styleUrls: ['./custom-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomFilterComponent implements OnInit {
  readonly iconSearch = LucideSearch;
  readonly iconClear = LucideX;
  readonly iconFilter = LucideFunnel;
  readonly iconReset = LucideRotateCcw;

  /** Search input placeholder text. */
  @Input() searchPlaceholder: string = 'Cerca...';

  /** Select filter configurations. */
  @Input() selects: FilterSelectConfig[] = [];

  /** Chip filter configurations. */
  @Input() chips: FilterChipConfig[] = [];

  /** Displays active filter counter. */
  @Input() showActiveCount: boolean = true;

  /** Search button label. */
  @Input() searchLabel: string = 'Cerca';

  /** Reset button label. */
  @Input() resetLabel: string = 'Reset';

  /** Visual variant. */
  @Input() variant: ButtonVariant = 'primary';

  /** Component size. */
  @Input() size: FilterSize = 'md';

  /** Enables dark theme styling. */
  @Input() darkTheme: boolean = false;

  /**
   * Initial filter state.
   */
  @Input() initialState: Partial<FilterState> | null = null;

  /**
   * Emitted when search is executed.
   * @param state Current filter state.
   */
  @Output() filterChange = new EventEmitter<FilterState>();

  /**
   * Emitted when filters are reset.
   * @param state Reset filter state.
   */
  @Output() filterReset = new EventEmitter<FilterState>();

  searchValue: string = '';
  selectValues: Record<string, string | number | null> = {};
  chipValues: Record<string, (string | number)[]> = {};

  /**
   * Angular lifecycle hook.
   *
   * Initializes internal filter state maps based on provided configuration
   * and applies an optional initial state if present.
   */
  ngOnInit(): void {
    this.selects.forEach(s => {
      this.selectValues[s.key] = null;
    });
    this.chips.forEach(c => {
      this.chipValues[c.key] = [];
    });

    if (this.initialState) {
      if (this.initialState.search) this.searchValue = this.initialState.search;
      if (this.initialState.selects)
        this.selectValues = { ...this.selectValues, ...this.initialState.selects };
      if (this.initialState.chips)
        this.chipValues = { ...this.chipValues, ...this.initialState.chips };
    }
  }

  /**
   * Returns the number of active filters excluding the search input.
   *
   * A filter is considered active when:
   * - A select has a non-null/non-empty value
   * - A chip group contains at least one selected value
   *
   * @returns Number of active filters
   */
  get activeFilterCount(): number {
    let count = 0;
    Object.values(this.selectValues).forEach(v => {
      if (v !== null && v !== '') count++;
    });
    Object.values(this.chipValues).forEach(arr => {
      if (arr.length > 0) count++;
    });
    return count;
  }

  /**
   * Indicates whether any filter or search value is currently active.
   *
   * @returns True if search is non-empty or at least one filter is active
   */
  get hasAnyFilter(): boolean {
    return this.searchValue.trim().length > 0 || this.activeFilterCount > 0;
  }

  /**
   * Computes CSS host classes based on component inputs.
   *
   * Used for dynamic styling (size, variant, theme).
   *
   * @returns Record of CSS class flags
   */
  get hostClasses(): Record<string, boolean> {
    return {
      filter: true,
      [`filter--${this.size}`]: true,
      [`filter--${this.variant}`]: true,
      'filter--dark': this.darkTheme,
    };
  }

  /**
   * Returns the icon size for the search icon based on component size.
   *
   * @returns Icon size in pixels
   */
  get searchIconSize(): number {
    return { sm: 14, md: 16, lg: 18 }[this.size];
  }

  /**
   * Returns the icon size for the clear icon based on component size.
   *
   * @returns Icon size in pixels
   */
  get clearIconSize(): number {
    return { sm: 12, md: 14, lg: 16 }[this.size];
  }

  /**
   * Returns the icon size for button icons based on component size.
   *
   * @returns Icon size in pixels
   */
  get btnIconSize(): number {
    return { sm: 13, md: 15, lg: 17 }[this.size];
  }

  /**
   * Emits the current filter state as a search action.
   */
  onSearch(): void {
    this.filterChange.emit(this.buildState());
  }

  /**
   * Handles keyboard events on the search input.
   *
   * Triggers search when Enter key is pressed.
   *
   * @param event Keyboard event from input field
   */
  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.onSearch();
  }

  /**
   * Clears the search input value.
   */
  onClearSearch(): void {
    this.searchValue = '';
  }

  /**
   * Handler for select filter changes.
   *
   * Currently used only for state tracking; emission is deferred
   * until explicit search action.
   */
  onSelectChange(): void {
    // Intentionally empty
  }

  /**
   * Toggles the selection state of a chip value.
   *
   * Supports both single-select and multi-select modes.
   *
   * @param groupKey Identifier of the chip group
   * @param value Value to toggle
   * @param multiple Whether multiple selection is enabled
   */
  toggleChip(groupKey: string, value: string | number, multiple: boolean): void {
    const current = this.chipValues[groupKey] ?? [];

    if (multiple) {
      const idx = current.indexOf(value);
      if (idx >= 0) {
        this.chipValues[groupKey] = current.filter(v => v !== value);
      } else {
        this.chipValues[groupKey] = [...current, value];
      }
    } else {
      this.chipValues[groupKey] = current.includes(value) ? [] : [value];
    }
  }

  /**
   * Checks whether a chip value is currently active.
   *
   * @param groupKey Identifier of the chip group
   * @param value Value to check
   * @returns True if the chip is active, otherwise false
   */
  isChipActive(groupKey: string, value: string | number): boolean {
    return (this.chipValues[groupKey] ?? []).includes(value);
  }

  /**
   * Resets all filters to their initial empty state and emits updates.
   *
   * Emits both filterReset and filterChange events.
   */
  onReset(): void {
    this.searchValue = '';
    this.selects.forEach(s => {
      this.selectValues[s.key] = null;
    });
    this.chips.forEach(c => {
      this.chipValues[c.key] = [];
    });
    const empty = this.buildState();
    this.filterReset.emit(empty);
    this.filterChange.emit(empty);
  }

  /**
   * Builds a snapshot of the current filter state.
   *
   * @returns Current FilterState object
   */
  private buildState(): FilterState {
    return {
      search: this.searchValue.trim(),
      selects: { ...this.selectValues },
      chips: { ...this.chipValues },
    };
  }

  /**
   * TrackBy function for rendering filter groups efficiently.
   *
   * @param _ Index of the item (unused)
   * @param item Item containing a unique key
   * @returns Unique identifier string
   */
  trackByKey(_: number, item: { key: string }): string {
    return item.key;
  }

  /**
   * TrackBy function for rendering option lists efficiently.
   *
   * @param _ Index of the item (unused)
   * @param item Option item
   * @returns Stringified value used as identity
   */
  trackByValue(_: number, item: FilterSelectOption): string {
    return String(item.value);
  }
}
