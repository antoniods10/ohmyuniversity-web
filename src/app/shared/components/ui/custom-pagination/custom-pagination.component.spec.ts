import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { CustomPaginationComponent, PageItem } from './custom-pagination.component';

function setInput<K extends keyof CustomPaginationComponent>(
  fixture: ComponentFixture<CustomPaginationComponent>,
  key: K,
  value: CustomPaginationComponent[K],
) {
  fixture.componentRef.setInput(key, value);
  fixture.detectChanges();
}

describe('CustomPaginationComponent', () => {
  let component: CustomPaginationComponent;
  let fixture: ComponentFixture<CustomPaginationComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomPaginationComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.componentRef.setInput('totalItems', 100);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default showPageSizeSelector to true', () => {
    expect(component.showPageSizeSelector).toBe(true);
  });

  it('should default showInfo to true', () => {
    expect(component.showInfo).toBe(true);
  });

  it('should default showFirstLast to true', () => {
    expect(component.showFirstLast).toBe(true);
  });

  it('should default showJumpToPage to false', () => {
    expect(component.showJumpToPage).toBe(false);
  });

  it('should default disabled to false', () => {
    expect(component.disabled).toBe(false);
  });

  it('should default size to "md"', () => {
    expect(component.size).toBe('md');
  });

  it('should default emphasis to "filled"', () => {
    expect(component.emphasis).toBe('filled');
  });

  it('should default darkTheme to false', () => {
    expect(component.darkTheme).toBe(false);
  });

  it('should default jumpValue to null', () => {
    expect(component.jumpValue).toBeNull();
  });

  it('should compute totalPages correctly', () => {
    component.totalItems = 100;
    component.pageSize = 10;
    expect(component.totalPages).toBe(10);
  });

  it('should round up totalPages for non-integer division', () => {
    component.totalItems = 101;
    component.pageSize = 10;
    expect(component.totalPages).toBe(11);
  });

  it('should return 1 as totalPages when totalItems is 0', () => {
    component.totalItems = 0;
    expect(component.totalPages).toBe(1);
  });

  it('should return 1 as totalPages when totalItems equals pageSize', () => {
    component.totalItems = 10;
    component.pageSize = 10;
    expect(component.totalPages).toBe(1);
  });

  it('should return true for isFirst when on page 1', () => {
    component.currentPage = 1;
    expect(component.isFirst).toBe(true);
  });

  it('should return false for isFirst when not on page 1', () => {
    component.currentPage = 2;
    expect(component.isFirst).toBe(false);
  });

  it('should return true for isLast when on last page', () => {
    component.currentPage = 10;
    component.totalItems = 100;
    component.pageSize = 10;
    expect(component.isLast).toBe(true);
  });

  it('should return false for isLast when not on last page', () => {
    component.currentPage = 5;
    component.totalItems = 100;
    component.pageSize = 10;
    expect(component.isLast).toBe(false);
  });

  it('should return 1 as rangeStart on page 1', () => {
    component.currentPage = 1;
    component.pageSize = 10;
    component.totalItems = 100;
    expect(component.rangeStart).toBe(1);
  });

  it('should return 11 as rangeStart on page 2 with pageSize 10', () => {
    component.currentPage = 2;
    component.pageSize = 10;
    component.totalItems = 100;
    expect(component.rangeStart).toBe(11);
  });

  it('should return 0 as rangeStart when totalItems is 0', () => {
    component.totalItems = 0;
    expect(component.rangeStart).toBe(0);
  });

  it('should return 10 as rangeEnd on page 1 with pageSize 10', () => {
    component.currentPage = 1;
    component.pageSize = 10;
    component.totalItems = 100;
    expect(component.rangeEnd).toBe(10);
  });

  it('should not exceed totalItems in rangeEnd on last partial page', () => {
    component.currentPage = 2;
    component.pageSize = 10;
    component.totalItems = 15;
    expect(component.rangeEnd).toBe(15);
  });

  it('should return correct rangeEnd for full last page', () => {
    component.currentPage = 10;
    component.pageSize = 10;
    component.totalItems = 100;
    expect(component.rangeEnd).toBe(100);
  });

  it('should return 12 for size "xs"', () => {
    component.size = 'xs';
    expect(component.iconSize).toBe(12);
  });

  it('should return 14 for size "sm"', () => {
    component.size = 'sm';
    expect(component.iconSize).toBe(14);
  });

  it('should return 16 for size "md"', () => {
    component.size = 'md';
    expect(component.iconSize).toBe(16);
  });

  it('should return 18 for size "lg"', () => {
    component.size = 'lg';
    expect(component.iconSize).toBe(18);
  });

  it('should always include "pagination" class', () => {
    expect(component.hostClasses['pagination']).toBe(true);
  });

  it('should include size modifier class', () => {
    component.size = 'lg';
    expect(component.hostClasses['pagination--lg']).toBe(true);
  });

  it('should include variant modifier class', () => {
    component.variant = 'secondary';
    expect(component.hostClasses['pagination--secondary']).toBe(true);
  });

  it('should include emphasis modifier class', () => {
    component.emphasis = 'soft';
    expect(component.hostClasses['pagination--soft']).toBe(true);
  });

  it('should include pagination--dark when darkTheme is true', () => {
    component.darkTheme = true;
    expect(component.hostClasses['pagination--dark']).toBe(true);
  });

  it('should NOT include pagination--dark when darkTheme is false', () => {
    component.darkTheme = false;
    expect(component.hostClasses['pagination--dark']).toBe(false);
  });

  it('should include pagination--disabled when disabled is true', () => {
    component.disabled = true;
    expect(component.hostClasses['pagination--disabled']).toBe(true);
  });

  it('should NOT include pagination--disabled when disabled is false', () => {
    component.disabled = false;
    expect(component.hostClasses['pagination--disabled']).toBe(false);
  });

  it('should return all pages without ellipsis when totalPages <= maxVisiblePages', () => {
    component.totalItems = 30;
    component.pageSize = 10;
    component.maxVisiblePages = 5;
    const items = component.pageItems;
    expect(items.every(i => i.type === 'page')).toBe(true);
    expect(items.length).toBe(3);
  });

  it('should always include first page in pageItems', () => {
    component.totalItems = 200;
    component.pageSize = 10;
    component.currentPage = 10;
    const items = component.pageItems;
    expect(items[0]).toEqual({ type: 'page', value: 1 });
  });

  it('should always include last page in pageItems', () => {
    component.totalItems = 200;
    component.pageSize = 10;
    component.currentPage = 5;
    const items = component.pageItems;
    expect(items.at(-1)).toEqual({ type: 'page', value: 20 });
  });

  it('should include ellipsis when pages are compressed', () => {
    component.totalItems = 200;
    component.pageSize = 10;
    component.currentPage = 10;
    component.maxVisiblePages = 5;
    const items = component.pageItems;
    expect(items.some(i => i.type === 'ellipsis')).toBe(true);
  });

  it('should include left ellipsis when current page is far from start', () => {
    component.totalItems = 200;
    component.pageSize = 10;
    component.currentPage = 15;
    component.maxVisiblePages = 5;
    const items = component.pageItems;
    expect(items.some(i => i.type === 'ellipsis' && (i as any).id === 'left')).toBe(true);
  });

  it('should include right ellipsis when current page is far from end', () => {
    component.totalItems = 200;
    component.pageSize = 10;
    component.currentPage = 1;
    component.maxVisiblePages = 5;
    const items = component.pageItems;
    expect(items.some(i => i.type === 'ellipsis' && (i as any).id === 'right')).toBe(true);
  });

  it('should return true for isPageItem on a page item', () => {
    const item: PageItem = { type: 'page', value: 3 };
    expect(component.isPageItem(item)).toBe(true);
  });

  it('should return false for isPageItem on an ellipsis item', () => {
    const item: PageItem = { type: 'ellipsis', id: 'left' };
    expect(component.isPageItem(item)).toBe(false);
  });

  it('should return true for isEllipsis on an ellipsis item', () => {
    const item: PageItem = { type: 'ellipsis', id: 'right' };
    expect(component.isEllipsis(item)).toBe(true);
  });

  it('should return false for isEllipsis on a page item', () => {
    const item: PageItem = { type: 'page', value: 2 };
    expect(component.isEllipsis(item)).toBe(false);
  });

  it('should return "page-N" for page items', () => {
    const item: PageItem = { type: 'page', value: 5 };
    expect(component.trackByItem(0, item)).toBe('page-5');
  });

  it('should return "ellipsis-left" for left ellipsis', () => {
    const item: PageItem = { type: 'ellipsis', id: 'left' };
    expect(component.trackByItem(0, item)).toBe('ellipsis-left');
  });

  it('should return "ellipsis-right" for right ellipsis', () => {
    const item: PageItem = { type: 'ellipsis', id: 'right' };
    expect(component.trackByItem(0, item)).toBe('ellipsis-right');
  });

  it('should emit pageChange when goTo() is called with a valid page', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    component.currentPage = 1;
    component.goTo(3);
    expect(spy).toHaveBeenCalledWith(3);
  });

  it('should NOT emit pageChange when goTo() is called with current page', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    component.currentPage = 3;
    component.goTo(3);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should NOT emit pageChange when disabled', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    component.disabled = true;
    component.goTo(2);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should clamp page to 1 when goTo() receives value less than 1', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    component.currentPage = 3;
    component.goTo(0);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should clamp page to totalPages when goTo() receives value exceeding it', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    component.totalItems = 100;
    component.pageSize = 10;
    component.currentPage = 5;
    component.goTo(999);
    expect(spy).toHaveBeenCalledWith(10);
  });

  it('should emit pageChange with 1 when goFirst() is called', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    component.currentPage = 5;
    component.goFirst();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should emit pageChange with currentPage-1 when goPrev() is called', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    component.currentPage = 5;
    component.goPrev();
    expect(spy).toHaveBeenCalledWith(4);
  });

  it('should emit pageChange with currentPage+1 when goNext() is called', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    component.currentPage = 5;
    component.goNext();
    expect(spy).toHaveBeenCalledWith(6);
  });

  it('should emit pageChange with totalPages when goLast() is called', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    component.totalItems = 100;
    component.pageSize = 10;
    component.currentPage = 5;
    component.goLast();
    expect(spy).toHaveBeenCalledWith(10);
  });

  it('should call goTo with jumpValue when onJump() is called', () => {
    const spy = vi.spyOn(component, 'goTo');
    component.jumpValue = 4;
    component.onJump();
    expect(spy).toHaveBeenCalledWith(4);
  });

  it('should reset jumpValue to null after onJump()', () => {
    component.jumpValue = 4;
    component.currentPage = 1;
    component.onJump();
    expect(component.jumpValue).toBeNull();
  });

  it('should NOT call goTo when jumpValue is null', () => {
    const spy = vi.spyOn(component, 'goTo');
    component.jumpValue = null;
    component.onJump();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call onJump() when Enter key is pressed in jump input', () => {
    const spy = vi.spyOn(component, 'onJump');
    component.onJumpKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT call onJump() when other key is pressed in jump input', () => {
    const spy = vi.spyOn(component, 'onJump');
    component.onJumpKeydown(new KeyboardEvent('keydown', { key: 'Tab' }));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should emit pageSizeChange with the new value', () => {
    const spy = vi.spyOn(component.pageSizeChange, 'emit');
    const event = { target: { value: '25' } } as unknown as Event;
    component.onPageSizeChange(event);
    expect(spy).toHaveBeenCalledWith(25);
  });

  it('should emit pageChange with 1 after page size change', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    const event = { target: { value: '25' } } as unknown as Event;
    component.onPageSizeChange(event);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should NOT emit on page size change when disabled', () => {
    const spy = vi.spyOn(component.pageSizeChange, 'emit');
    component.disabled = true;
    const event = { target: { value: '25' } } as unknown as Event;
    component.onPageSizeChange(event);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should reset jumpValue when totalItems changes', () => {
    component.jumpValue = 5;
    setInput(fixture, 'totalItems', 200);
    expect(component.jumpValue).toBeNull();
  });

  it('should reset jumpValue when pageSize changes', () => {
    component.jumpValue = 5;
    setInput(fixture, 'pageSize', 25);
    expect(component.jumpValue).toBeNull();
  });

  it('should clamp currentPage to totalPages when it exceeds after input change', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    component.currentPage = 10;
    setInput(fixture, 'totalItems', 50);
    expect(spy).toHaveBeenCalledWith(5);
  });

  it('should render a <nav> element', () => {
    expect(nativeEl.querySelector('nav')).not.toBeNull();
  });

  it('should set aria-label on nav', () => {
    const nav = nativeEl.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Navigazione pagine');
  });

  it('should set aria-disabled on nav when disabled', () => {
    setInput(fixture, 'disabled', true);
    const nav = nativeEl.querySelector('nav');
    expect(nav?.getAttribute('aria-disabled')).toBe('true');
  });

  it('should NOT set aria-disabled on nav when not disabled', () => {
    setInput(fixture, 'disabled', false);
    const nav = nativeEl.querySelector('nav');
    expect(nav?.getAttribute('aria-disabled')).toBeNull();
  });

  it('should render range info when showInfo is true and totalItems > 0', () => {
    setInput(fixture, 'showInfo', true);
    setInput(fixture, 'totalItems', 100);
    expect(nativeEl.querySelector('.pagination__info')).not.toBeNull();
  });

  it('should NOT render range info when showInfo is false', () => {
    setInput(fixture, 'showInfo', false);
    expect(nativeEl.querySelector('.pagination__info')).toBeNull();
  });

  it('should render "Nessun risultato" when showInfo is true and totalItems is 0', () => {
    setInput(fixture, 'showInfo', true);
    setInput(fixture, 'totalItems', 0);
    const empty = nativeEl.querySelector('.pagination__info--empty');
    expect(empty?.textContent?.trim()).toBe('Nessun risultato');
  });

  it('should render correct rangeStart in info', () => {
    setInput(fixture, 'totalItems', 100);
    setInput(fixture, 'pageSize', 10);
    setInput(fixture, 'currentPage', 1);
    const range = nativeEl.querySelector('.pagination__info-range');
    expect(range?.textContent).toContain('1');
  });

  it('should render correct rangeEnd in info', () => {
    setInput(fixture, 'totalItems', 100);
    setInput(fixture, 'pageSize', 10);
    setInput(fixture, 'currentPage', 1);
    const range = nativeEl.querySelector('.pagination__info-range');
    expect(range?.textContent).toContain('10');
  });

  it('should render total items in info', () => {
    setInput(fixture, 'totalItems', 100);
    const total = nativeEl.querySelector('.pagination__info-total');
    expect(total?.textContent?.trim()).toBe('100');
  });

  it('should render page size selector when showPageSizeSelector is true', () => {
    setInput(fixture, 'showPageSizeSelector', true);
    expect(nativeEl.querySelector('.pagination__size-select')).not.toBeNull();
  });

  it('should NOT render page size selector when showPageSizeSelector is false', () => {
    setInput(fixture, 'showPageSizeSelector', false);
    expect(nativeEl.querySelector('.pagination__size-select')).toBeNull();
  });

  it('should render one option per pageSizeOption', () => {
    setInput(fixture, 'showPageSizeSelector', true);
    setInput(fixture, 'pageSizeOptions', [10, 25, 50]);
    const options = nativeEl.querySelectorAll('.pagination__size-select option');
    expect(options.length).toBe(3);
  });

  it('should disable the size selector when disabled is true', () => {
    setInput(fixture, 'showPageSizeSelector', true);
    setInput(fixture, 'disabled', true);
    const select = nativeEl.querySelector('.pagination__size-select') as HTMLSelectElement;
    expect(select.disabled).toBe(true);
  });

  it('should render prev and next buttons', () => {
    const prevBtn = nativeEl.querySelector('[aria-label="Pagina precedente"]');
    const nextBtn = nativeEl.querySelector('[aria-label="Pagina successiva"]');
    expect(prevBtn).not.toBeNull();
    expect(nextBtn).not.toBeNull();
  });

  it('should render first and last buttons when showFirstLast is true', () => {
    setInput(fixture, 'showFirstLast', true);
    expect(nativeEl.querySelector('[aria-label="Prima pagina"]')).not.toBeNull();
    expect(nativeEl.querySelector('[aria-label="Ultima pagina"]')).not.toBeNull();
  });

  it('should NOT render first and last buttons when showFirstLast is false', () => {
    setInput(fixture, 'showFirstLast', false);
    expect(nativeEl.querySelector('[aria-label="Prima pagina"]')).toBeNull();
    expect(nativeEl.querySelector('[aria-label="Ultima pagina"]')).toBeNull();
  });

  it('should disable prev button when on first page', () => {
    setInput(fixture, 'currentPage', 1);
    const btn = nativeEl.querySelector('[aria-label="Pagina precedente"]') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it('should disable next button when on last page', () => {
    setInput(fixture, 'currentPage', 10);
    const btn = nativeEl.querySelector('[aria-label="Pagina successiva"]') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it('should NOT disable next button when not on last page', () => {
    setInput(fixture, 'currentPage', 5);
    const btn = nativeEl.querySelector('[aria-label="Pagina successiva"]') as HTMLButtonElement;
    expect(btn.disabled).toBe(false);
  });

  it('should emit pageChange when prev button is clicked', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    setInput(fixture, 'currentPage', 5);
    const btn = nativeEl.querySelector('[aria-label="Pagina precedente"]') as HTMLButtonElement;
    btn.click();
    expect(spy).toHaveBeenCalledWith(4);
  });

  it('should emit pageChange when next button is clicked', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    setInput(fixture, 'currentPage', 5);
    const btn = nativeEl.querySelector('[aria-label="Pagina successiva"]') as HTMLButtonElement;
    btn.click();
    expect(spy).toHaveBeenCalledWith(6);
  });

  it('should emit pageChange with 1 when first button is clicked', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    setInput(fixture, 'showFirstLast', true);
    setInput(fixture, 'currentPage', 5);
    const btn = nativeEl.querySelector('[aria-label="Prima pagina"]') as HTMLButtonElement;
    btn.click();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should emit pageChange with totalPages when last button is clicked', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    setInput(fixture, 'showFirstLast', true);
    setInput(fixture, 'currentPage', 5);
    const btn = nativeEl.querySelector('[aria-label="Ultima pagina"]') as HTMLButtonElement;
    btn.click();
    expect(spy).toHaveBeenCalledWith(10);
  });

  it('should render page buttons in the pages list', () => {
    const pageBtns = nativeEl.querySelectorAll('.pagination__btn--page');
    expect(pageBtns.length).toBeGreaterThan(0);
  });

  it('should mark the active page button with aria-current="page"', () => {
    setInput(fixture, 'currentPage', 1);
    const activeBtn = nativeEl.querySelector('[aria-current="page"]');
    expect(activeBtn).not.toBeNull();
    expect(activeBtn?.textContent?.trim()).toBe('1');
  });

  it('should apply active class to the current page button', () => {
    setInput(fixture, 'currentPage', 1);
    const activeBtn = nativeEl.querySelector('.pagination__btn--active');
    expect(activeBtn).not.toBeNull();
  });

  it('should render mobile page indicator', () => {
    setInput(fixture, 'currentPage', 3);
    const indicator = nativeEl.querySelector('.pagination__mobile-info');
    expect(indicator?.textContent).toContain('3');
    expect(indicator?.textContent).toContain('10');
  });

  it('should render jump-to-page input when showJumpToPage is true', () => {
    setInput(fixture, 'showJumpToPage', true);
    expect(nativeEl.querySelector('.pagination__jump-input')).not.toBeNull();
  });

  it('should NOT render jump-to-page input when showJumpToPage is false', () => {
    setInput(fixture, 'showJumpToPage', false);
    expect(nativeEl.querySelector('.pagination__jump-input')).toBeNull();
  });

  it('should set min="1" on jump input', () => {
    setInput(fixture, 'showJumpToPage', true);
    const input = nativeEl.querySelector('.pagination__jump-input') as HTMLInputElement;
    expect(input.min).toBe('1');
  });

  it('should set max equal to totalPages on jump input', () => {
    setInput(fixture, 'showJumpToPage', true);
    setInput(fixture, 'totalItems', 100);
    setInput(fixture, 'pageSize', 10);
    const input = nativeEl.querySelector('.pagination__jump-input') as HTMLInputElement;
    expect(input.max).toBe('10');
  });
});
