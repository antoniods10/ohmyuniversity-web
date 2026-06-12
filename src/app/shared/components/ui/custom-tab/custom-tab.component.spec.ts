import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomTabsComponent, TabItem } from './custom-tab.component';
import { vi } from 'vitest';

const MOCK_TABS: TabItem[] = [
  { id: 'tab1', label: 'Primo' },
  { id: 'tab2', label: 'Secondo' },
  { id: 'tab3', label: 'Terzo', disabled: true },
];

const MOCK_TABS_WITH_BADGE: TabItem[] = [
  { id: 'tab1', label: 'Messaggi', badge: 5 },
  { id: 'tab2', label: 'Notifiche', badge: 0 },
];

describe('CustomTabsComponent', () => {
  let component: CustomTabsComponent;
  let fixture: ComponentFixture<CustomTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomTabsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tabs', MOCK_TABS);
    fixture.componentRef.setInput('activeTab', 'tab1');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the tablist container', () => {
    const container = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(container).not.toBeNull();
  });

  it('should set aria-label on the tablist', () => {
    const container = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(container.getAttribute('aria-label')).toBe('Navigazione tab');
  });

  it('should render one button per tab', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]');
    expect(buttons.length).toBe(MOCK_TABS.length);
  });

  it('should render the label for each tab', () => {
    MOCK_TABS.forEach(tab => {
      expect(fixture.nativeElement.textContent).toContain(tab.label);
    });
  });

  it('should set aria-label on each tab button', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]');
    buttons.forEach((btn: HTMLElement, i: number) => {
      expect(btn.getAttribute('aria-label')).toBe(MOCK_TABS[i].label);
    });
  });

  it('should default tabs to empty array', () => {
    const fresh = TestBed.createComponent(CustomTabsComponent);
    expect(fresh.componentInstance.tabs).toEqual([]);
  });

  it('should default activeTab to empty string', () => {
    const fresh = TestBed.createComponent(CustomTabsComponent);
    expect(fresh.componentInstance.activeTab).toBe('');
  });

  it('should default tabStyle to "line"', () => {
    expect(component.tabStyle).toBe('line');
  });

  it('should default variant to "primary"', () => {
    expect(component.variant).toBe('primary');
  });

  it('should default size to "md"', () => {
    expect(component.size).toBe('md');
  });

  it('should default fullWidth to false', () => {
    expect(component.fullWidth).toBe(false);
  });

  it('should default darkTheme to false', () => {
    expect(component.darkTheme).toBe(false);
  });

  it('should return true for isActive on the active tab', () => {
    expect(component.isActive({ id: 'tab1', label: 'Primo' })).toBe(true);
  });

  it('should return false for isActive on a non-active tab', () => {
    expect(component.isActive({ id: 'tab2', label: 'Secondo' })).toBe(false);
  });

  it('should set aria-selected="true" on the active tab button', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]');
    expect(buttons[0].getAttribute('aria-selected')).toBe('true');
  });

  it('should set aria-selected="false" on non-active tab buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]');
    expect(buttons[1].getAttribute('aria-selected')).toBe('false');
  });

  it('should emit tabChange when a non-active, enabled tab is clicked', () => {
    const spy = vi.fn();
    component.tabChange.subscribe(spy);
    component.selectTab(MOCK_TABS[1]);
    expect(spy).toHaveBeenCalledWith('tab2');
  });

  it('should NOT emit tabChange when the already active tab is clicked', () => {
    const spy = vi.fn();
    component.tabChange.subscribe(spy);
    component.selectTab(MOCK_TABS[0]);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should NOT emit tabChange when a disabled tab is clicked', () => {
    const spy = vi.fn();
    component.tabChange.subscribe(spy);
    component.selectTab(MOCK_TABS[2]);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should emit tabChange when tab button is clicked in the DOM', () => {
    const spy = vi.fn();
    component.tabChange.subscribe(spy);
    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]');
    buttons[1].click();
    expect(spy).toHaveBeenCalledWith('tab2');
  });

  it('should NOT emit tabChange when disabled tab button is clicked in the DOM', () => {
    const spy = vi.fn();
    component.tabChange.subscribe(spy);
    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]');
    buttons[2].click();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should set aria-disabled="true" on disabled tabs', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]');
    expect(buttons[2].getAttribute('aria-disabled')).toBe('true');
  });

  it('should set tabindex="-1" on disabled tabs', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]');
    expect(buttons[2].getAttribute('tabindex')).toBe('-1');
  });

  it('should set tabindex="0" on enabled tabs', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]');
    expect(buttons[0].getAttribute('tabindex')).toBe('0');
  });

  it('should apply tabs__tab--disabled class to disabled tab', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]');
    expect(buttons[2].className).toContain('tabs__tab--disabled');
  });

  it('should apply tabs__tab class to all tab buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]');
    buttons.forEach((btn: HTMLElement) => {
      expect(btn.className).toContain('tabs__tab');
    });
  });

  it('should apply tabs__tab--active class to the active tab', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]');
    expect(buttons[0].className).toContain('tabs__tab--active');
  });

  it('should NOT apply tabs__tab--active class to non-active tabs', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]');
    expect(buttons[1].className).not.toContain('tabs__tab--active');
  });

  it('should apply tabs__tab--full class when fullWidth is true', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]');
    buttons.forEach((btn: HTMLElement) => {
      expect(btn.className).toContain('tabs__tab--full');
    });
  });

  it('should NOT apply tabs__tab--full class when fullWidth is false', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]');
    buttons.forEach((btn: HTMLElement) => {
      expect(btn.className).not.toContain('tabs__tab--full');
    });
  });

  it('should apply tabs class to the wrapper', () => {
    const wrapper = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(wrapper.className).toContain('tabs');
  });

  it('should apply tabs--line class by default', () => {
    const wrapper = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(wrapper.className).toContain('tabs--line');
  });

  it('should apply tabs--primary class by default', () => {
    const wrapper = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(wrapper.className).toContain('tabs--primary');
  });

  it('should apply tabs--md class by default', () => {
    const wrapper = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(wrapper.className).toContain('tabs--md');
  });

  it('should apply tabs--pill class when tabStyle is "pill"', () => {
    fixture.componentRef.setInput('tabStyle', 'pill');
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(wrapper.className).toContain('tabs--pill');
  });

  it('should apply tabs--card class when tabStyle is "card"', () => {
    fixture.componentRef.setInput('tabStyle', 'card');
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(wrapper.className).toContain('tabs--card');
  });

  it('should apply tabs--full class when fullWidth is true', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(wrapper.className).toContain('tabs--full');
  });

  it('should apply tabs--dark class when darkTheme is true', () => {
    fixture.componentRef.setInput('darkTheme', true);
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(wrapper.className).toContain('tabs--dark');
  });

  it('should NOT apply tabs--dark class when darkTheme is false', () => {
    const wrapper = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(wrapper.className).not.toContain('tabs--dark');
  });

  it('should apply tabs--success variant class', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(wrapper.className).toContain('tabs--success');
  });

  it('should apply tabs--sm size class', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(wrapper.className).toContain('tabs--sm');
  });

  it('should apply tabs--lg size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(wrapper.className).toContain('tabs--lg');
  });

  it('should return 14 for iconSize when size is "sm"', () => {
    component.size = 'sm';
    expect(component.iconSize).toBe(14);
  });

  it('should return 16 for iconSize when size is "md"', () => {
    component.size = 'md';
    expect(component.iconSize).toBe(16);
  });

  it('should return 18 for iconSize when size is "lg"', () => {
    component.size = 'lg';
    expect(component.iconSize).toBe(18);
  });

  it('should include tabs__badge in badgeClasses result', () => {
    expect(component.badgeClasses({ id: 'tab2', label: 'Secondo' })).toContain('tabs__badge');
  });

  it('should include tabs__badge--active in badgeClasses for active tab', () => {
    expect(component.badgeClasses({ id: 'tab1', label: 'Primo' })).toContain('tabs__badge--active');
  });

  it('should NOT include tabs__badge--active in badgeClasses for non-active tab', () => {
    expect(component.badgeClasses({ id: 'tab2', label: 'Secondo' })).not.toContain(
      'tabs__badge--active',
    );
  });

  it('should render badge span when tab.badge is defined', () => {
    fixture.componentRef.setInput('tabs', MOCK_TABS_WITH_BADGE);
    fixture.componentRef.setInput('activeTab', 'tab1');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('5');
  });

  it('should render badge with value 0', () => {
    fixture.componentRef.setInput('tabs', MOCK_TABS_WITH_BADGE);
    fixture.componentRef.setInput('activeTab', 'tab1');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('0');
  });

  it('should NOT render badge span when tab.badge is undefined', () => {
    fixture.componentRef.setInput('tabs', [{ id: 'x', label: 'No badge' }]);
    fixture.componentRef.setInput('activeTab', 'x');
    fixture.detectChanges();
    const spans = fixture.nativeElement.querySelectorAll(
      'button[role="tab"] span:not(.tabs__label):not(.tabs__icon):not(.tabs__indicator)',
    );
    expect(spans.length).toBe(0);
  });

  it('should render the active indicator for tabStyle "line"', () => {
    const indicators = fixture.nativeElement.querySelectorAll('.tabs__indicator');
    expect(indicators.length).toBe(MOCK_TABS.length);
  });

  it('should render the active indicator for tabStyle "underline"', () => {
    fixture.componentRef.setInput('tabStyle', 'underline');
    fixture.detectChanges();
    const indicators = fixture.nativeElement.querySelectorAll('.tabs__indicator');
    expect(indicators.length).toBe(MOCK_TABS.length);
  });

  it('should NOT render the active indicator for tabStyle "pill"', () => {
    fixture.componentRef.setInput('tabStyle', 'pill');
    fixture.detectChanges();
    const indicators = fixture.nativeElement.querySelectorAll('.tabs__indicator');
    expect(indicators.length).toBe(0);
  });

  it('should NOT render the active indicator for tabStyle "card"', () => {
    fixture.componentRef.setInput('tabStyle', 'card');
    fixture.detectChanges();
    const indicators = fixture.nativeElement.querySelectorAll('.tabs__indicator');
    expect(indicators.length).toBe(0);
  });

  it('should return the tab id from trackById', () => {
    expect(component.trackById(0, MOCK_TABS[0])).toBe('tab1');
    expect(component.trackById(1, MOCK_TABS[1])).toBe('tab2');
  });
});
