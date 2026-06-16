import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import {
  AvatarProfilePanelComponent,
  AccountEntry,
  AccountStatus,
  STATUS_VARIANT,
  RING_COLORS,
  ACRONYM_COLOR,
  ACRONYM_COLOR_DEFAULT,
} from './avatar-profile-panel.component';

const mockAccountActive: AccountEntry = {
  id: '1',
  name: 'Mario Rossi',
  courseLabel: 'Ingegneria Informatica',
  email: 'mario.rossi@uni.it',
  universityLabel: 'Università di Roma',
  courseAcronym: 'LM',
  avatarSrc: '',
  status: 'active',
  isCurrent: true,
};

const mockAccountSecondary: AccountEntry = {
  id: '2',
  name: 'Luigi Bianchi',
  courseLabel: 'Economia',
  email: 'luigi.bianchi@uni.it',
  universityLabel: 'Università di Milano',
  courseAcronym: 'L',
  avatarSrc: '',
  status: 'warning',
  isCurrent: false,
};

const mockAccountGraduated: AccountEntry = {
  id: '3',
  name: 'Anna Verdi',
  courseLabel: 'Medicina',
  email: 'anna.verdi@uni.it',
  universityLabel: 'Università di Napoli',
  courseAcronym: 'LMcu',
  avatarSrc: '',
  status: 'graduated',
  isCurrent: false,
};

describe('AvatarProfilePanelComponent', () => {
  let component: AvatarProfilePanelComponent;
  let fixture: ComponentFixture<AvatarProfilePanelComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarProfilePanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarProfilePanelComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    component.accounts = [mockAccountActive, mockAccountSecondary];
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default darkTheme to false', () => {
    expect(component.darkTheme).toBe(false);
  });

  it('should default showSettings to true', () => {
    expect(component.showSettings).toBe(true);
  });

  it('should default showLogout to true', () => {
    expect(component.showLogout).toBe(true);
  });

  it('should default showAddAccount to false', () => {
    expect(component.showAddAccount).toBe(false);
  });

  it('should default position to "right"', () => {
    expect(component.position).toBe('right');
  });

  it('should default animation to "ios"', () => {
    expect(component.animation).toBe('ios');
  });

  it('should default panelWidth to 300', () => {
    expect(component.panelWidth).toBe(300);
  });

  it('should default isOpen to false', () => {
    expect(component.isOpen).toBe(false);
  });

  it('should return the account with isCurrent=true as currentAccount', () => {
    expect(component.currentAccount).toEqual(mockAccountActive);
  });

  it('should fall back to first account if no account has isCurrent=true', () => {
    component.accounts = [{ ...mockAccountActive, isCurrent: false }, mockAccountSecondary];
    expect(component.currentAccount).toEqual({ ...mockAccountActive, isCurrent: false });
  });

  it('should return null as currentAccount when accounts is empty', () => {
    component.accounts = [];
    expect(component.currentAccount).toBeNull();
  });

  it('should return all accounts where isCurrent is not true', () => {
    expect(component.secondaryAccounts).toEqual([mockAccountSecondary]);
  });

  it('should return empty array when all accounts are current', () => {
    component.accounts = [mockAccountActive];
    expect(component.secondaryAccounts).toEqual([]);
  });

  it('should return multiple secondary accounts', () => {
    component.accounts = [mockAccountActive, mockAccountSecondary, mockAccountGraduated];
    expect(component.secondaryAccounts.length).toBe(2);
  });

  it('should return correct variant for each status', () => {
    const statuses: AccountStatus[] = ['active', 'warning', 'suspended', 'withdrawn', 'graduated'];
    statuses.forEach(status => {
      expect(component.variantFor(status)).toBe(STATUS_VARIANT[status]);
    });
  });

  it('should return "success" variant for active status', () => {
    expect(component.variantFor('active')).toBe('success');
  });

  it('should return "error" variant for suspended status', () => {
    expect(component.variantFor('suspended')).toBe('error');
  });

  it('should return "primary" variant for graduated status', () => {
    expect(component.variantFor('graduated')).toBe('primary');
  });

  it('should return correct ring color for each status', () => {
    const statuses: AccountStatus[] = ['active', 'warning', 'suspended', 'withdrawn', 'graduated'];
    statuses.forEach(status => {
      expect(component.ringColorFor(status)).toBe(RING_COLORS[status]);
    });
  });

  it('should return success color variable for active status', () => {
    expect(component.ringColorFor('active')).toContain('success');
  });

  it('should return error color variable for suspended status', () => {
    expect(component.ringColorFor('suspended')).toContain('error');
  });

  it('should return correct class for known acronym "L"', () => {
    expect(component.acronymClass('L')).toBe(ACRONYM_COLOR['L']);
  });

  it('should return correct class for known acronym "LM"', () => {
    expect(component.acronymClass('LM')).toBe(ACRONYM_COLOR['LM']);
  });

  it('should return correct class for known acronym "LMcu"', () => {
    expect(component.acronymClass('LMcu')).toBe(ACRONYM_COLOR['LMcu']);
  });

  it('should return correct class for known acronym "DOC"', () => {
    expect(component.acronymClass('DOC')).toBe(ACRONYM_COLOR['DOC']);
  });

  it('should return correct class for known acronym "MASTER"', () => {
    expect(component.acronymClass('MASTER')).toBe(ACRONYM_COLOR['MASTER']);
  });

  it('should return default class for unknown acronym', () => {
    expect(component.acronymClass('UNKNOWN')).toBe(ACRONYM_COLOR_DEFAULT);
    expect(component.acronymClass('')).toBe(ACRONYM_COLOR_DEFAULT);
    expect(component.acronymClass('XYZ')).toBe(ACRONYM_COLOR_DEFAULT);
  });

  it('should return top-0 left-0 for position "right"', () => {
    component.position = 'right';
    expect(component.positionClasses).toContain('top-0');
    expect(component.positionClasses).toContain('left-0');
  });

  it('should return top-0 right-0 for position "left"', () => {
    component.position = 'left';
    expect(component.positionClasses).toContain('top-0');
    expect(component.positionClasses).toContain('right-0');
  });

  it('should return origin-top-left for position "right"', () => {
    component.position = 'right';
    component.animation = 'ios';
    expect(component.transformOriginClass).toBe('origin-top-left');
  });

  it('should return origin-top-right for position "left"', () => {
    component.position = 'left';
    component.animation = 'ios';
    expect(component.transformOriginClass).toBe('origin-top-right');
  });

  it('should return empty string for animation "fade"', () => {
    component.animation = 'fade';
    expect(component.transformOriginClass).toBe('');
  });

  it('should return opacity-0 scale-75 for ios animation', () => {
    component.animation = 'ios';
    expect(component.animClosedClasses).toContain('opacity-0');
    expect(component.animClosedClasses).toContain('scale-75');
  });

  it('should return opacity-0 -translate-y-3 for gmail animation', () => {
    component.animation = 'gmail';
    expect(component.animClosedClasses).toContain('opacity-0');
    expect(component.animClosedClasses).toContain('-translate-y-3');
  });

  it('should return opacity-0 for fade animation', () => {
    component.animation = 'fade';
    expect(component.animClosedClasses).toContain('opacity-0');
  });

  it('should return opacity-0 scale-90 for scale animation', () => {
    component.animation = 'scale';
    expect(component.animClosedClasses).toContain('opacity-0');
    expect(component.animClosedClasses).toContain('scale-90');
  });

  it('should return pointer-events-none when panel is closed', () => {
    component.isOpen = false;
    expect(component.panelOpenClasses).toContain('pointer-events-none');
  });

  it('should return pointer-events-auto when panel is open', () => {
    component.isOpen = true;
    expect(component.panelOpenClasses).toContain('pointer-events-auto');
  });

  it('should return opacity-100 when panel is open', () => {
    component.isOpen = true;
    expect(component.panelOpenClasses).toContain('opacity-100');
  });

  it('should return scale-100 when panel is open', () => {
    component.isOpen = true;
    expect(component.panelOpenClasses).toContain('scale-100');
  });

  it('should return light bg class when darkTheme is false', () => {
    component.darkTheme = false;
    expect(component.darkBg).toContain('bg-white');
    expect(component.darkBg).toContain('border-gray-200');
  });

  it('should return dark bg class when darkTheme is true', () => {
    component.darkTheme = true;
    expect(component.darkBg).toContain('bg-gray-900');
    expect(component.darkBg).toContain('border-gray-700');
  });

  it('should return text-gray-800 when darkTheme is false', () => {
    component.darkTheme = false;
    expect(component.darkText).toBe('text-gray-800');
  });

  it('should return text-gray-100 when darkTheme is true', () => {
    component.darkTheme = true;
    expect(component.darkText).toBe('text-gray-100');
  });

  it('should return text-gray-500 when darkTheme is false', () => {
    component.darkTheme = false;
    expect(component.darkSubtext).toBe('text-gray-500');
  });

  it('should return text-gray-400 when darkTheme is true', () => {
    component.darkTheme = true;
    expect(component.darkSubtext).toBe('text-gray-400');
  });

  it('should return border-gray-100 when darkTheme is false', () => {
    component.darkTheme = false;
    expect(component.darkDivider).toBe('border-gray-100');
  });

  it('should return border-gray-700 when darkTheme is true', () => {
    component.darkTheme = true;
    expect(component.darkDivider).toBe('border-gray-700');
  });

  it('should return hover:bg-gray-50 when darkTheme is false', () => {
    component.darkTheme = false;
    expect(component.darkHover).toBe('hover:bg-gray-50');
  });

  it('should return hover:bg-gray-800 when darkTheme is true', () => {
    component.darkTheme = true;
    expect(component.darkHover).toBe('hover:bg-gray-800');
  });

  it('should set isOpen to true when toggle() is called while closed', () => {
    component.isOpen = false;
    component.toggle();
    expect(component.isOpen).toBe(true);
  });

  it('should set isOpen to false when toggle() is called while open', () => {
    component.isOpen = true;
    component.toggle();
    expect(component.isOpen).toBe(false);
  });

  it('should emit panelClose when toggle() closes the panel', () => {
    vi.spyOn(component.panelClose, 'emit');
    component.isOpen = true;
    component.toggle();
    expect(component.panelClose.emit).toHaveBeenCalled();
  });

  it('should NOT emit panelClose when toggle() opens the panel', () => {
    vi.spyOn(component.panelClose, 'emit');
    component.isOpen = false;
    component.toggle();
    expect(component.panelClose.emit).not.toHaveBeenCalled();
  });

  it('should set isOpen to false when close() is called', () => {
    component.isOpen = true;
    component.close();
    expect(component.isOpen).toBe(false);
  });

  it('should emit panelClose when close() is called', () => {
    vi.spyOn(component.panelClose, 'emit');
    component.isOpen = true;
    component.close();
    expect(component.panelClose.emit).toHaveBeenCalled();
  });

  it('should emit panelClose even when close() is called while already closed', () => {
    vi.spyOn(component.panelClose, 'emit');
    component.isOpen = false;
    component.close();
    expect(component.panelClose.emit).toHaveBeenCalled();
  });

  it('should emit accountSwitch with the selected account', () => {
    vi.spyOn(component.accountSwitch, 'emit');
    component.onAccountSwitch(mockAccountSecondary);
    expect(component.accountSwitch.emit).toHaveBeenCalledWith(mockAccountSecondary);
  });

  it('should close the panel after onAccountSwitch()', () => {
    component.isOpen = true;
    component.onAccountSwitch(mockAccountSecondary);
    expect(component.isOpen).toBe(false);
  });

  it('should emit panelClose after onAccountSwitch()', () => {
    vi.spyOn(component.panelClose, 'emit');
    component.isOpen = true;
    component.onAccountSwitch(mockAccountSecondary);
    expect(component.panelClose.emit).toHaveBeenCalled();
  });

  it('should emit settingsClick when onSettings() is called', () => {
    vi.spyOn(component.settingsClick, 'emit');
    component.onSettings();
    expect(component.settingsClick.emit).toHaveBeenCalled();
  });

  it('should close the panel after onSettings()', () => {
    component.isOpen = true;
    component.onSettings();
    expect(component.isOpen).toBe(false);
  });

  it('should emit logoutClick when onLogout() is called', () => {
    vi.spyOn(component.logoutClick, 'emit');
    component.onLogout();
    expect(component.logoutClick.emit).toHaveBeenCalled();
  });

  it('should close the panel after onLogout()', () => {
    component.isOpen = true;
    component.onLogout();
    expect(component.isOpen).toBe(false);
  });

  it('should emit addAccount when onAdd() is called', () => {
    vi.spyOn(component.addAccount, 'emit');
    component.onAdd();
    expect(component.addAccount.emit).toHaveBeenCalled();
  });

  it('should close the panel after onAdd()', () => {
    component.isOpen = true;
    component.onAdd();
    expect(component.isOpen).toBe(false);
  });

  it('should close the panel when Escape key is pressed while open', () => {
    component.isOpen = true;
    component.onEscape();
    expect(component.isOpen).toBe(false);
  });

  it('should NOT close panel when Escape is pressed while already closed', () => {
    vi.spyOn(component, 'close');
    component.isOpen = false;
    component.onEscape();
    expect(component.close).not.toHaveBeenCalled();
  });

  it('should close the panel when clicking outside the component', () => {
    component.isOpen = true;
    const outsideEl = document.createElement('div');
    document.body.appendChild(outsideEl);
    const event = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(event, 'target', { value: outsideEl });
    component.onDocumentClick(event);
    expect(component.isOpen).toBe(false);
    outsideEl.remove();
  });

  it('should NOT close the panel when clicking inside the component', () => {
    component.isOpen = true;
    const insideEl = nativeEl.querySelector('div') as HTMLElement;
    const event = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(event, 'target', { value: insideEl });
    component.onDocumentClick(event);
    expect(component.isOpen).toBe(true);
  });

  it('should do nothing when clicking outside but panel is already closed', () => {
    vi.spyOn(component, 'close');
    component.isOpen = false;
    const outsideEl = document.createElement('div');
    const event = new MouseEvent('click');
    Object.defineProperty(event, 'target', { value: outsideEl });
    component.onDocumentClick(event);
    expect(component.close).not.toHaveBeenCalled();
  });

  it('should render the trigger app-custom-avatar when currentAccount exists', () => {
    const avatars = nativeEl.querySelectorAll('app-custom-avatar');
    expect(avatars.length).toBeGreaterThan(0);
  });

  it('should render a panel container with role="dialog"', () => {
    const panel = nativeEl.querySelector('[role="dialog"]');
    expect(panel).not.toBeNull();
  });

  it('should apply the configured panelWidth as inline style', async () => {
    const customFixture = TestBed.createComponent(AvatarProfilePanelComponent);
    const customComponent = customFixture.componentInstance;
    const customNativeEl = customFixture.nativeElement;

    customComponent.panelWidth = 320;

    customFixture.detectChanges();
    await customFixture.whenStable();

    const panel = customNativeEl.querySelector('[role="dialog"]') as HTMLElement;
    expect(panel.style.width).toBe('320px');
  });

  it('should render the current account name in the header', () => {
    fixture.detectChanges();
    expect(nativeEl.textContent).toContain(mockAccountActive.name);
  });

  it('should render the current account email in the header', () => {
    fixture.detectChanges();
    expect(nativeEl.textContent).toContain(mockAccountActive.email);
  });

  it('should render the current account courseLabel in the header', () => {
    fixture.detectChanges();
    expect(nativeEl.textContent).toContain(mockAccountActive.courseLabel);
  });

  it('should render the current account universityLabel badge', () => {
    fixture.detectChanges();
    expect(nativeEl.textContent).toContain(mockAccountActive.universityLabel);
  });

  it('should render the current account courseAcronym badge', () => {
    fixture.detectChanges();
    expect(nativeEl.textContent).toContain(mockAccountActive.courseAcronym);
  });

  it('should render the "Altri account" label when secondaryAccounts exist', () => {
    expect(nativeEl.textContent).toContain('Altri account');
  });

  it('should NOT render "Altri account" label when there are no secondary accounts', async () => {
    const customFixture = TestBed.createComponent(AvatarProfilePanelComponent);
    const customComponent = customFixture.componentInstance;
    const customNativeEl = customFixture.nativeElement;
    customComponent.accounts = [mockAccountActive];

    customFixture.detectChanges();
    await customFixture.whenStable();

    expect(customNativeEl.textContent).not.toContain('Altri account');
  });

  it('should render one switch button per secondary account', async () => {
    const customFixture = TestBed.createComponent(AvatarProfilePanelComponent);
    const customComponent = customFixture.componentInstance;
    const customNativeEl = customFixture.nativeElement;

    customComponent.accounts = [mockAccountActive, mockAccountSecondary, mockAccountGraduated];

    customFixture.detectChanges();
    await customFixture.whenStable();

    const buttons = Array.from(customNativeEl.querySelectorAll('button')).filter(b =>
      (b as HTMLElement).getAttribute('aria-label')?.startsWith('Passa a'),
    );
    expect(buttons.length).toBe(2);
  });

  it('should render correct aria-label on each switch button', () => {
    const btn = nativeEl.querySelector('[aria-label="Passa a ' + mockAccountSecondary.name + '"]');
    expect(btn).not.toBeNull();
  });

  it('should call onAccountSwitch() when a secondary account button is clicked', () => {
    vi.spyOn(component, 'onAccountSwitch');
    const btn = nativeEl.querySelector(
      '[aria-label="Passa a ' + mockAccountSecondary.name + '"]',
    ) as HTMLButtonElement;
    btn.click();
    expect(component.onAccountSwitch).toHaveBeenCalledWith(mockAccountSecondary);
  });

  it('should render the settings button when showSettings is true', () => {
    component.showSettings = true;
    fixture.detectChanges();
    expect(nativeEl.textContent).toContain('Impostazioni profilo');
  });

  it('should NOT render the settings button when showSettings is false', async () => {
    const customFixture = TestBed.createComponent(AvatarProfilePanelComponent);
    const customComponent = customFixture.componentInstance;
    const customNativeEl = customFixture.nativeElement;

    customComponent.showSettings = false;

    customFixture.detectChanges();
    await customFixture.whenStable();

    expect(customNativeEl.textContent).not.toContain('Impostazioni profilo');
  });

  it('should render the logout button when showLogout is true', () => {
    component.showLogout = true;
    fixture.detectChanges();
    expect(nativeEl.textContent).toContain('Esci');
  });

  it('should NOT render the logout button when showLogout is false', async () => {
    const customFixture = TestBed.createComponent(AvatarProfilePanelComponent);
    const customComponent = customFixture.componentInstance;
    const customNativeEl = customFixture.nativeElement;

    customComponent.showLogout = false;

    customFixture.detectChanges();
    await customFixture.whenStable();

    expect(customNativeEl.textContent).not.toContain('Esci');
  });

  it('should render the add account button when showAddAccount is true', async () => {
    const customFixture = TestBed.createComponent(AvatarProfilePanelComponent);
    const customComponent = customFixture.componentInstance;
    const customNativeEl = customFixture.nativeElement;

    customComponent.showAddAccount = true;

    customFixture.detectChanges();
    await customFixture.whenStable();

    expect(customNativeEl.textContent).toContain('Aggiungi account');
  });

  it('should NOT render the add account button when showAddAccount is false', () => {
    component.showAddAccount = false;
    fixture.detectChanges();
    expect(nativeEl.textContent).not.toContain('Aggiungi account');
  });

  it('should call onSettings() when settings button is clicked', () => {
    vi.spyOn(component, 'onSettings');
    component.showSettings = true;
    fixture.detectChanges();
    const btn = Array.from(nativeEl.querySelectorAll('button')).find(b =>
      b.textContent?.includes('Impostazioni profilo'),
    );

    if (!btn) {
      throw new Error('Settings button not found');
    }

    btn.click();
    expect(component.onSettings).toHaveBeenCalled();
  });

  it('should call onLogout() when logout button is clicked', () => {
    vi.spyOn(component, 'onLogout');
    component.showLogout = true;
    fixture.detectChanges();
    const btn = Array.from(nativeEl.querySelectorAll('button')).find(b =>
      b.textContent?.includes('Esci'),
    );

    if (!btn) {
      throw new Error('Logout button not found');
    }

    btn.click();
    expect(component.onLogout).toHaveBeenCalled();
  });

  it('should call onAdd() when add account button is clicked', async () => {
    const customFixture = TestBed.createComponent(AvatarProfilePanelComponent);
    const customComponent = customFixture.componentInstance;
    const customNativeEl = customFixture.nativeElement;

    vi.spyOn(customComponent, 'onAdd');
    customComponent.showAddAccount = true;

    customFixture.detectChanges();
    await customFixture.whenStable();

    const btn = Array.from(
      customNativeEl.querySelectorAll('button') as NodeListOf<HTMLButtonElement>,
    ).find((b): b is HTMLButtonElement => b.textContent?.includes('Aggiungi account') ?? false);

    if (!btn) {
      throw new Error('Add account button not found');
    }

    btn.click();
    expect(customComponent.onAdd).toHaveBeenCalled();
  });

  it('should render secondary account name in switch button', () => {
    expect(nativeEl.textContent).toContain(mockAccountSecondary.name);
  });

  it('should render secondary account email in switch button', () => {
    expect(nativeEl.textContent).toContain(mockAccountSecondary.email);
  });

  it('should render secondary account courseLabel in switch button', () => {
    expect(nativeEl.textContent).toContain(mockAccountSecondary.courseLabel);
  });

  it('should render secondary account courseAcronym in switch button', () => {
    expect(nativeEl.textContent).toContain(mockAccountSecondary.courseAcronym);
  });

  it('should return an inline style string containing the color variable', () => {
    const style = component.ringColorStyle('active');
    expect(style).toContain('outline-color:');
    expect(style).toContain('success');
  });

  it('should return correct inline style for each status', () => {
    const statuses: AccountStatus[] = ['active', 'warning', 'suspended', 'withdrawn', 'graduated'];
    statuses.forEach(status => {
      const style = component.ringColorStyle(status);
      expect(style).toContain('outline-color:');
    });
  });
});
