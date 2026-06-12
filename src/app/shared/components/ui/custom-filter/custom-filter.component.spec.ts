import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomFilterComponent, FilterChipConfig, FilterSelectConfig } from './custom-filter.component';

const MOCK_SELECTS: FilterSelectConfig[] = [
  {
    key: 'category',
    label: 'Categoria',
    options: [
      { label: 'Informatica', value: 'informatica' },
      { label: 'Economia', value: 'economia' },
    ],
  },
];

const MOCK_CHIPS: FilterChipConfig[] = [
  {
    key: 'type',
    label: 'Tipo',
    multiple: false,
    options: [
      { label: 'Stage', value: 'stage' },
      { label: 'Lavoro', value: 'lavoro' },
    ],
  },
  {
    key: 'level',
    label: 'Livello',
    multiple: true,
    options: [
      { label: 'Junior', value: 'junior' },
      { label: 'Senior', value: 'senior' },
    ],
  },
];

describe('CustomFilterComponent', () => {
  let component: CustomFilterComponent;
  let fixture: ComponentFixture<CustomFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the search input', () => {
    const input = fixture.nativeElement.querySelector('.filter__search-input');
    expect(input).not.toBeNull();
  });

  it('should render the search button', () => {
    const btn = fixture.nativeElement.querySelector('.filter__btn--search');
    expect(btn).not.toBeNull();
  });

  it('should display the searchPlaceholder on the input', () => {
    fixture.componentRef.setInput('searchPlaceholder', 'Cerca università');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('.filter__search-input');
    expect(input.getAttribute('placeholder')).toBe('Cerca università');
  });

  it('should display the searchLabel on the search button', () => {
    fixture.componentRef.setInput('searchLabel', 'Trova');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.filter__btn--search span');
    expect(btn.textContent.trim()).toBe('Trova');
  });

  it('should apply filter--md class by default', () => {
    const host = fixture.nativeElement.querySelector('.filter');
    expect(host.classList).toContain('filter--md');
  });

  it('should apply the correct size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('.filter');
    expect(host.classList).toContain('filter--lg');
  });

  it('should apply the correct variant class', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('.filter');
    expect(host.classList).toContain('filter--secondary');
  });

  it('should apply filter--dark class when darkTheme is true', () => {
    fixture.componentRef.setInput('darkTheme', true);
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('.filter');
    expect(host.classList).toContain('filter--dark');
  });

  it('should not apply filter--dark class when darkTheme is false', () => {
    fixture.componentRef.setInput('darkTheme', false);
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('.filter');
    expect(host.classList).not.toContain('filter--dark');
  });

  it('should not show clear button when search is empty', () => {
    component.searchValue = '';
    fixture.detectChanges();
    const clearBtn = fixture.nativeElement.querySelector('.filter__search-clear');
    expect(clearBtn).toBeNull();
  });

  it('should show clear button when search has a value', () => {
    component.searchValue = 'test';
    fixture.detectChanges();
    const clearBtn = fixture.nativeElement.querySelector('.filter__search-clear');
    expect(clearBtn).not.toBeNull();
  });

  it('should clear the search value when clear button is clicked', () => {
    component.searchValue = 'test';
    fixture.detectChanges();
    const clearBtn = fixture.nativeElement.querySelector('.filter__search-clear');
    clearBtn.click();
    expect(component.searchValue).toBe('');
  });

  it('should not show reset button when no filters are active', () => {
    const resetBtn = fixture.nativeElement.querySelector('.filter__btn--reset');
    expect(resetBtn).toBeNull();
  });

  it('should show reset button when search has a value', () => {
    component.searchValue = 'test';
    fixture.detectChanges();
    const resetBtn = fixture.nativeElement.querySelector('.filter__btn--reset');
    expect(resetBtn).not.toBeNull();
  });

  it('should display the resetLabel on the reset button', () => {
    component.searchValue = 'test';
    fixture.componentRef.setInput('resetLabel', 'Azzera');
    fixture.detectChanges();
    const resetLabel = fixture.nativeElement.querySelector('.filter__btn-reset-label');
    expect(resetLabel.textContent.trim()).toBe('Azzera');
  });

  it('should emit filterChange when search button is clicked', () => {
    const spy = vi.fn();
    component.filterChange.subscribe(spy);
    const btn = fixture.nativeElement.querySelector('.filter__btn--search');
    btn.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit filterChange with the current search value', () => {
    const spy = vi.fn();
    component.filterChange.subscribe(spy);
    component.searchValue = 'angular';
    component.onSearch();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ search: 'angular' }));
  });

  it('should emit filterChange when Enter is pressed in the search input', () => {
    const spy = vi.fn();
    component.filterChange.subscribe(spy);
    component.onSearchKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT emit filterChange when a key other than Enter is pressed', () => {
    const spy = vi.fn();
    component.filterChange.subscribe(spy);
    component.onSearchKeydown(new KeyboardEvent('keydown', { key: 'a' }));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should return false for hasAnyFilter when everything is empty', () => {
    expect(component.hasAnyFilter).toBe(false);
  });

  it('should return true for hasAnyFilter when search has a value', () => {
    component.searchValue = 'test';
    expect(component.hasAnyFilter).toBe(true);
  });

  it('should return 0 for activeFilterCount when no filters are set', () => {
    expect(component.activeFilterCount).toBe(0);
  });

  it('should return searchIconSize 14 for size sm', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    expect(component.searchIconSize).toBe(14);
  });

  it('should return searchIconSize 16 for size md', () => {
    expect(component.searchIconSize).toBe(16);
  });

  it('should return searchIconSize 18 for size lg', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(component.searchIconSize).toBe(18);
  });

  it('should return clearIconSize 14 for size md', () => {
    expect(component.clearIconSize).toBe(14);
  });

  it('should return btnIconSize 15 for size md', () => {
    expect(component.btnIconSize).toBe(15);
  });

  it('should not render select filters when selects is empty', () => {
    const selectsRow = fixture.nativeElement.querySelector('.filter__selects-row');
    expect(selectsRow).toBeNull();
  });

  it('should render select filters when selects are provided', () => {
    fixture.componentRef.setInput('selects', MOCK_SELECTS);
    fixture.detectChanges();
    const selectsRow = fixture.nativeElement.querySelector('.filter__selects-row');
    expect(selectsRow).not.toBeNull();
  });

  it('should render the correct number of select elements', () => {
    fixture.componentRef.setInput('selects', MOCK_SELECTS);
    fixture.detectChanges();
    const selects = fixture.nativeElement.querySelectorAll('.filter__select');
    expect(selects.length).toBe(MOCK_SELECTS.length);
  });

  it('should render the select label', () => {
    fixture.componentRef.setInput('selects', MOCK_SELECTS);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.filter__select-label');
    expect(label.textContent.trim()).toBe('Categoria');
  });

  it('should initialize selectValues keys from selects config on ngOnInit', () => {
    fixture.componentRef.setInput('selects', MOCK_SELECTS);
    component.ngOnInit();
    expect(component.selectValues).toHaveProperty('category');
  });

  it('should not render chip filters when chips is empty', () => {
    const chipsSection = fixture.nativeElement.querySelector('.filter__chips-section');
    expect(chipsSection).toBeNull();
  });

  it('should render chip filters when chips are provided', () => {
    fixture.componentRef.setInput('chips', MOCK_CHIPS);
    fixture.detectChanges();
    const chipsSection = fixture.nativeElement.querySelector('.filter__chips-section');
    expect(chipsSection).not.toBeNull();
  });

  it('should render the correct number of chip groups', () => {
    fixture.componentRef.setInput('chips', MOCK_CHIPS);
    fixture.detectChanges();
    const groups = fixture.nativeElement.querySelectorAll('.filter__chip-group');
    expect(groups.length).toBe(MOCK_CHIPS.length);
  });

  it('should render chip group label', () => {
    fixture.componentRef.setInput('chips', MOCK_CHIPS);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.filter__chip-group-label');
    expect(label.textContent.trim()).toBe('Tipo');
  });

  it('should render chips for a group', () => {
    fixture.componentRef.setInput('chips', MOCK_CHIPS);
    fixture.detectChanges();
    const chips = fixture.nativeElement.querySelectorAll('.filter__chip');
    expect(chips.length).toBe(4);
  });

  it('should toggle a chip as active on click', () => {
    fixture.componentRef.setInput('chips', MOCK_CHIPS);
    component.ngOnInit();
    fixture.detectChanges();
    const chips = fixture.nativeElement.querySelectorAll('.filter__chip');
    chips[0].click();
    fixture.detectChanges();
    expect(chips[0].classList).toContain('filter__chip--active');
  });

  it('should deactivate a chip on second click in single-select mode', () => {
    fixture.componentRef.setInput('chips', MOCK_CHIPS);
    component.ngOnInit();
    fixture.detectChanges();
    component.toggleChip('type', 'stage', false);
    component.toggleChip('type', 'stage', false);
    expect(component.isChipActive('type', 'stage')).toBe(false);
  });

  it('should set aria-pressed to true on active chip', () => {
    fixture.componentRef.setInput('chips', MOCK_CHIPS);
    component.ngOnInit();
    component.toggleChip('type', 'stage', false);
    fixture.detectChanges();
    const chips = fixture.nativeElement.querySelectorAll('.filter__chip');
    expect(chips[0].getAttribute('aria-pressed')).toBe('true');
  });

  it('should set aria-pressed to false on inactive chip', () => {
    fixture.componentRef.setInput('chips', MOCK_CHIPS);
    component.ngOnInit();
    fixture.detectChanges();
    const chips = fixture.nativeElement.querySelectorAll('.filter__chip');
    expect(chips[0].getAttribute('aria-pressed')).toBe('false');
  });

  it('should allow multiple chips active in multi-select mode', () => {
    fixture.componentRef.setInput('chips', MOCK_CHIPS);
    component.ngOnInit();
    component.toggleChip('level', 'junior', true);
    component.toggleChip('level', 'senior', true);
    expect(component.isChipActive('level', 'junior')).toBe(true);
    expect(component.isChipActive('level', 'senior')).toBe(true);
  });

  it('should replace active chip in single-select mode', () => {
    fixture.componentRef.setInput('chips', MOCK_CHIPS);
    component.ngOnInit();
    component.toggleChip('type', 'stage', false);
    component.toggleChip('type', 'lavoro', false);
    expect(component.isChipActive('type', 'stage')).toBe(false);
    expect(component.isChipActive('type', 'lavoro')).toBe(true);
  });

  it('should count active chip groups in activeFilterCount', () => {
    fixture.componentRef.setInput('chips', MOCK_CHIPS);
    component.ngOnInit();
    component.toggleChip('type', 'stage', false);
    expect(component.activeFilterCount).toBe(1);
  });

  it('should show active filters badge when activeFilterCount > 0', () => {
    fixture.componentRef.setInput('chips', MOCK_CHIPS);
    component.ngOnInit();
    component.toggleChip('type', 'stage', false);
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.filter__active-badge');
    expect(badge).not.toBeNull();
  });

  it('should not show active filters badge when activeFilterCount is 0', () => {
    const badge = fixture.nativeElement.querySelector('.filter__active-badge');
    expect(badge).toBeNull();
  });

  it('should not show active filters badge when showActiveCount is false', () => {
    fixture.componentRef.setInput('chips', MOCK_CHIPS);
    fixture.componentRef.setInput('showActiveCount', false);
    component.ngOnInit();
    component.toggleChip('type', 'stage', false);
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.filter__active-badge');
    expect(badge).toBeNull();
  });

  it('should emit both filterReset and filterChange on reset', () => {
    const resetSpy = vi.fn();
    const changeSpy = vi.fn();
    component.filterReset.subscribe(resetSpy);
    component.filterChange.subscribe(changeSpy);
    component.searchValue = 'test';
    component.onReset();
    expect(resetSpy).toHaveBeenCalled();
    expect(changeSpy).toHaveBeenCalled();
  });

  it('should clear search value after reset', () => {
    component.searchValue = 'test';
    component.onReset();
    expect(component.searchValue).toBe('');
  });

  it('should emit filterReset with empty state', () => {
    const spy = vi.fn();
    component.filterReset.subscribe(spy);
    component.searchValue = 'test';
    component.onReset();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ search: '' }));
  });

  it('should apply initialState search value on ngOnInit', () => {
    fixture.componentRef.setInput('initialState', { search: 'precompilato' });
    component.ngOnInit();
    expect(component.searchValue).toBe('precompilato');
  });

  it('should apply initialState select values on ngOnInit', () => {
    fixture.componentRef.setInput('selects', MOCK_SELECTS);
    fixture.componentRef.setInput('initialState', { selects: { category: 'informatica' } });
    component.ngOnInit();
    expect(component.selectValues['category']).toBe('informatica');
  });

  it('should apply initialState chip values on ngOnInit', () => {
    fixture.componentRef.setInput('chips', MOCK_CHIPS);
    fixture.componentRef.setInput('initialState', { chips: { type: ['stage'] } });
    component.ngOnInit();
    expect(component.isChipActive('type', 'stage')).toBe(true);
  });
});
