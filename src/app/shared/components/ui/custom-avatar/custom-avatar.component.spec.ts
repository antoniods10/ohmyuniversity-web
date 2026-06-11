import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { CustomAvatarComponent, AvatarDotStatus } from './custom-avatar.component';

function setInput<K extends keyof CustomAvatarComponent>(
  fixture: ComponentFixture<CustomAvatarComponent>,
  key: K,
  value: CustomAvatarComponent[K],
) {
  fixture.componentRef.setInput(key, value);
  fixture.detectChanges();
}

describe('CustomAvatarComponent', () => {
  let component: CustomAvatarComponent;
  let fixture: ComponentFixture<CustomAvatarComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomAvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomAvatarComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default src to empty string', () => {
    expect(component.src).toBe('');
  });

  it('should default name to empty string', () => {
    expect(component.name).toBe('');
  });

  it('should default size to "md"', () => {
    expect(component.size).toBe('md');
  });

  it('should default shape to "circle"', () => {
    expect(component.shape).toBe('circle');
  });

  it('should default variant to "primary"', () => {
    expect(component.variant).toBe('primary');
  });

  it('should default darkTheme to false', () => {
    expect(component.darkTheme).toBe(false);
  });

  it('should default showRing to false', () => {
    expect(component.showRing).toBe(false);
  });

  it('should default ringSize to "md"', () => {
    expect(component.ringSize).toBe('md');
  });

  it('should default ringGap to true', () => {
    expect(component.ringGap).toBe(true);
  });

  it('should default dotStatus to "none"', () => {
    expect(component.dotStatus).toBe('none');
  });

  it('should default clickable to false', () => {
    expect(component.clickable).toBe(false);
  });

  it('should default imgError to false', () => {
    expect(component.imgError).toBe(false);
  });

  it('should return false for showImage when src is empty', () => {
    component.src = '';
    expect(component.showImage).toBe(false);
  });

  it('should return true for showImage when src is set and no error', () => {
    component.src = 'https://example.com/avatar.jpg';
    component.imgError = false;
    expect(component.showImage).toBe(true);
  });

  it('should return false for showImage when src is set but imgError is true', () => {
    component.src = 'https://example.com/avatar.jpg';
    component.imgError = true;
    expect(component.showImage).toBe(false);
  });

  it('should return true for showInitials when no image and name is set', () => {
    component.src = '';
    component.imgError = false;
    component.name = 'Mario Rossi';
    expect(component.showInitials).toBe(true);
  });

  it('should return false for showInitials when image is shown', () => {
    component.src = 'https://example.com/avatar.jpg';
    component.imgError = false;
    component.name = 'Mario Rossi';
    expect(component.showInitials).toBe(false);
  });

  it('should return false for showInitials when name is empty and no image', () => {
    component.src = '';
    component.name = '';
    expect(component.showInitials).toBe(false);
  });

  it('should return true for showIcon when no image and no name', () => {
    component.src = '';
    component.name = '';
    expect(component.showIcon).toBe(true);
  });

  it('should return false for showIcon when name is set', () => {
    component.src = '';
    component.name = 'Mario Rossi';
    expect(component.showIcon).toBe(false);
  });

  it('should return false for showIcon when image is shown', () => {
    component.src = 'https://example.com/avatar.jpg';
    component.imgError = false;
    expect(component.showIcon).toBe(false);
  });

  it('should return empty string when name is empty', () => {
    component.name = '';
    expect(component.initials).toBe('');
  });

  it('should return single uppercase initial for single word name', () => {
    component.name = 'mario';
    expect(component.initials).toBe('M');
  });

  it('should return first and last initials for two-word name', () => {
    component.name = 'Mario Rossi';
    expect(component.initials).toBe('MR');
  });

  it('should use first and last word for multi-word names', () => {
    component.name = 'Mario Luigi Rossi';
    expect(component.initials).toBe('MR');
  });

  it('should return uppercase initials', () => {
    component.name = 'mario rossi';
    expect(component.initials).toBe('MR');
  });

  it('should handle extra whitespace in name', () => {
    component.name = '  Mario   Rossi  ';
    expect(component.initials).toBe('MR');
  });

  it('should return 12 for size "xs"', () => {
    component.size = 'xs';
    expect(component.iconSize).toBe(12);
  });

  it('should return 16 for size "sm"', () => {
    component.size = 'sm';
    expect(component.iconSize).toBe(16);
  });

  it('should return 20 for size "md"', () => {
    component.size = 'md';
    expect(component.iconSize).toBe(20);
  });

  it('should return 26 for size "lg"', () => {
    component.size = 'lg';
    expect(component.iconSize).toBe(26);
  });

  it('should return 32 for size "xl"', () => {
    component.size = 'xl';
    expect(component.iconSize).toBe(32);
  });

  it('should return 40 for size "2xl"', () => {
    component.size = '2xl';
    expect(component.iconSize).toBe(40);
  });

  it('should return ariaLabel when explicitly set', () => {
    component.ariaLabel = 'Foto profilo di Mario';
    component.name = 'Mario Rossi';
    expect(component.effectiveAriaLabel).toBe('Foto profilo di Mario');
  });

  it('should fall back to name when ariaLabel is empty', () => {
    component.ariaLabel = '';
    component.name = 'Mario Rossi';
    expect(component.effectiveAriaLabel).toBe('Mario Rossi');
  });

  it('should fall back to "Avatar" when both ariaLabel and name are empty', () => {
    component.ariaLabel = '';
    component.name = '';
    expect(component.effectiveAriaLabel).toBe('Avatar');
  });

  it('should always include "avatar" class', () => {
    expect(component.avatarClasses['avatar']).toBe(true);
  });

  it('should include size class', () => {
    component.size = 'lg';
    expect(component.avatarClasses['avatar--lg']).toBe(true);
  });

  it('should include shape class', () => {
    component.shape = 'rounded';
    expect(component.avatarClasses['avatar--rounded']).toBe(true);
  });

  it('should include variant class', () => {
    component.variant = 'success';
    expect(component.avatarClasses['avatar--success']).toBe(true);
  });

  it('should include avatar--clickable when clickable is true', () => {
    component.clickable = true;
    expect(component.avatarClasses['avatar--clickable']).toBe(true);
  });

  it('should NOT include avatar--clickable when clickable is false', () => {
    component.clickable = false;
    expect(component.avatarClasses['avatar--clickable']).toBe(false);
  });

  it('should include avatar--dark when darkTheme is true', () => {
    component.darkTheme = true;
    expect(component.avatarClasses['avatar--dark']).toBe(true);
  });

  it('should NOT include avatar--dark when darkTheme is false', () => {
    component.darkTheme = false;
    expect(component.avatarClasses['avatar--dark']).toBe(false);
  });

  it('should include avatar--ring when showRing is true', () => {
    component.showRing = true;
    expect(component.avatarClasses['avatar--ring']).toBe(true);
  });

  it('should NOT include avatar--ring when showRing is false', () => {
    component.showRing = false;
    expect(component.avatarClasses['avatar--ring']).toBe(false);
  });

  it('should include ring size class when showRing is true', () => {
    component.showRing = true;
    component.ringSize = 'lg';
    expect(component.avatarClasses['avatar--ring-lg']).toBe(true);
  });

  it('should NOT include ring size class when showRing is false', () => {
    component.showRing = false;
    expect(component.avatarClasses['avatar--ring-md']).toBe(false);
  });

  it('should include avatar--ring-gap when showRing and ringGap are true', () => {
    component.showRing = true;
    component.ringGap = true;
    expect(component.avatarClasses['avatar--ring-gap']).toBe(true);
  });

  it('should NOT include avatar--ring-gap when ringGap is false', () => {
    component.showRing = true;
    component.ringGap = false;
    expect(component.avatarClasses['avatar--ring-gap']).toBe(false);
  });

  it('should always include avatar__dot class', () => {
    component.dotStatus = 'online';
    expect(component.dotClasses['avatar__dot']).toBe(true);
  });

  it('should include status class for each dotStatus value', () => {
    const statuses: AvatarDotStatus[] = ['online', 'offline', 'busy', 'away'];
    statuses.forEach(status => {
      component.dotStatus = status;
      expect(component.dotClasses[`avatar__dot--${status}`]).toBe(true);
    });
  });

  it('should include size class in dotClasses', () => {
    component.dotStatus = 'online';
    component.size = 'lg';
    expect(component.dotClasses['avatar__dot--size-lg']).toBe(true);
  });

  it('should set imgError to true when onImgError() is called', () => {
    component.imgError = false;
    component.onImgError();
    expect(component.imgError).toBe(true);
  });

  it('should switch showImage to false after onImgError()', () => {
    component.src = 'https://example.com/avatar.jpg';
    component.onImgError();
    expect(component.showImage).toBe(false);
  });

  it('should switch showInitials to true after onImgError() when name is set', () => {
    component.src = 'https://example.com/avatar.jpg';
    component.name = 'Mario Rossi';
    component.onImgError();
    expect(component.showInitials).toBe(true);
  });

  it('should NOT emit avatarClick when clickable is false', () => {
    const spy = vi.spyOn(component.avatarClick, 'emit');
    component.clickable = false;
    component.onClick(new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should emit avatarClick when clickable is true and MouseEvent is passed', () => {
    const spy = vi.spyOn(component.avatarClick, 'emit');
    component.clickable = true;
    const event = new MouseEvent('click');
    component.onClick(event);
    expect(spy).toHaveBeenCalledWith(event);
  });

  it('should emit a new MouseEvent when clickable is true and KeyboardEvent is passed', () => {
    const spy = vi.spyOn(component.avatarClick, 'emit');
    component.clickable = true;
    const keyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onClick(keyEvent);
    expect(spy).toHaveBeenCalled();
    const emitted = spy.mock.calls[0][0];
    expect(emitted).toBeInstanceOf(MouseEvent);
  });

  it('should render the ring wrapper div when showRing is true', () => {
    setInput(fixture, 'showRing', true);
    const ring = nativeEl.querySelector('.avatar-ring-wrap');
    expect(ring).not.toBeNull();
  });

  it('should NOT render the ring wrapper div when showRing is false', () => {
    setInput(fixture, 'showRing', false);
    const ring = nativeEl.querySelector('.avatar-ring-wrap');
    expect(ring).toBeNull();
  });

  it('should apply the correct ring size modifier class', () => {
    setInput(fixture, 'showRing', true);
    setInput(fixture, 'ringSize', 'lg');
    const ring = nativeEl.querySelector('.avatar-ring-wrap--lg');
    expect(ring).not.toBeNull();
  });

  it('should apply ring color as border-color style when ringColor is set', () => {
    setInput(fixture, 'showRing', true);
    setInput(fixture, 'ringColor', '#ff0000');
    const ring = nativeEl.querySelector('.avatar-ring-wrap') as HTMLElement;
    expect(ring?.style.borderColor).toBe('rgb(255, 0, 0)');
  });

  it('should apply dark modifier class on ring wrap when darkTheme is true', () => {
    setInput(fixture, 'showRing', true);
    setInput(fixture, 'darkTheme', true);
    const ring = nativeEl.querySelector('.avatar-ring-wrap--dark');
    expect(ring).not.toBeNull();
  });

  it('should render the avatar div with class "avatar"', () => {
    const avatar = nativeEl.querySelector('.avatar');
    expect(avatar).not.toBeNull();
  });

  it('should apply role="button" when clickable is true', () => {
    setInput(fixture, 'clickable', true);
    const avatar = nativeEl.querySelector('[role="button"]');
    expect(avatar).not.toBeNull();
  });

  it('should NOT apply role="button" when clickable is false', () => {
    setInput(fixture, 'clickable', false);
    const avatar = nativeEl.querySelector('[role="button"]');
    expect(avatar).toBeNull();
  });

  it('should apply tabindex="0" when clickable is true', () => {
    setInput(fixture, 'clickable', true);
    const avatar = nativeEl.querySelector('[tabindex="0"]');
    expect(avatar).not.toBeNull();
  });

  it('should apply the effectiveAriaLabel as aria-label on the avatar div', () => {
    setInput(fixture, 'name', 'Mario Rossi');
    const avatar = nativeEl.querySelector('[aria-label="Mario Rossi"]');
    expect(avatar).not.toBeNull();
  });

  it('should render the img element when src is set', () => {
    setInput(fixture, 'src', 'https://example.com/avatar.jpg');
    const img = nativeEl.querySelector('img.avatar__img');
    expect(img).not.toBeNull();
  });

  it('should NOT render the img element when src is empty', () => {
    setInput(fixture, 'src', '');
    const img = nativeEl.querySelector('img.avatar__img');
    expect(img).toBeNull();
  });

  it('should set the correct src attribute on the img element', () => {
    setInput(fixture, 'src', 'https://example.com/avatar.jpg');
    const img = nativeEl.querySelector('img.avatar__img') as HTMLImageElement;
    expect(img.src).toContain('example.com/avatar.jpg');
  });

  it('should use name as alt when alt input is empty', () => {
    setInput(fixture, 'src', 'https://example.com/avatar.jpg');
    setInput(fixture, 'name', 'Mario Rossi');
    setInput(fixture, 'alt', '');
    const img = nativeEl.querySelector('img.avatar__img') as HTMLImageElement;
    expect(img.alt).toBe('Mario Rossi');
  });

  it('should use alt input when provided', () => {
    setInput(fixture, 'src', 'https://example.com/avatar.jpg');
    setInput(fixture, 'alt', 'Foto di Mario');
    const img = nativeEl.querySelector('img.avatar__img') as HTMLImageElement;
    expect(img.alt).toBe('Foto di Mario');
  });

  it('should render initials span when no src and name is set', () => {
    setInput(fixture, 'src', '');
    setInput(fixture, 'name', 'Mario Rossi');
    const span = nativeEl.querySelector('.avatar__initials');
    expect(span).not.toBeNull();
  });

  it('should render correct initials text', () => {
    setInput(fixture, 'src', '');
    setInput(fixture, 'name', 'Mario Rossi');
    const span = nativeEl.querySelector('.avatar__initials');
    expect(span?.textContent?.trim()).toBe('MR');
  });

  it('should NOT render initials when src is set', () => {
    setInput(fixture, 'src', 'https://example.com/avatar.jpg');
    setInput(fixture, 'name', 'Mario Rossi');
    const span = nativeEl.querySelector('.avatar__initials');
    expect(span).toBeNull();
  });

  it('should have aria-hidden="true" on initials span', () => {
    setInput(fixture, 'src', '');
    setInput(fixture, 'name', 'Mario Rossi');
    const span = nativeEl.querySelector('.avatar__initials');
    expect(span?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should render icon span when no src and no name', () => {
    setInput(fixture, 'src', '');
    setInput(fixture, 'name', '');
    const span = nativeEl.querySelector('.avatar__icon');
    expect(span).not.toBeNull();
  });

  it('should NOT render icon span when name is set', () => {
    setInput(fixture, 'src', '');
    setInput(fixture, 'name', 'Mario');
    const span = nativeEl.querySelector('.avatar__icon');
    expect(span).toBeNull();
  });

  it('should have aria-hidden="true" on icon span', () => {
    setInput(fixture, 'src', '');
    setInput(fixture, 'name', '');
    const span = nativeEl.querySelector('.avatar__icon');
    expect(span?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should NOT render status dot when dotStatus is "none"', () => {
    setInput(fixture, 'dotStatus', 'none');
    const dot = nativeEl.querySelector('.avatar__dot');
    expect(dot).toBeNull();
  });

  it('should render status dot when dotStatus is "online"', () => {
    setInput(fixture, 'dotStatus', 'online');
    const dot = nativeEl.querySelector('.avatar__dot');
    expect(dot).not.toBeNull();
  });

  it('should render status dot when dotStatus is "offline"', () => {
    setInput(fixture, 'dotStatus', 'offline');
    const dot = nativeEl.querySelector('.avatar__dot');
    expect(dot).not.toBeNull();
  });

  it('should render status dot when dotStatus is "busy"', () => {
    setInput(fixture, 'dotStatus', 'busy');
    const dot = nativeEl.querySelector('.avatar__dot');
    expect(dot).not.toBeNull();
  });

  it('should render status dot when dotStatus is "away"', () => {
    setInput(fixture, 'dotStatus', 'away');
    const dot = nativeEl.querySelector('.avatar__dot');
    expect(dot).not.toBeNull();
  });

  it('should set aria-label on dot matching the dotStatus value', () => {
    setInput(fixture, 'dotStatus', 'online');
    const dot = nativeEl.querySelector('.avatar__dot');
    expect(dot?.getAttribute('aria-label')).toBe('online');
  });

  it('should emit avatarClick when the avatar div is clicked and clickable is true', () => {
    const spy = vi.spyOn(component.avatarClick, 'emit');
    setInput(fixture, 'clickable', true);
    const avatar = nativeEl.querySelector('.avatar') as HTMLElement;
    avatar.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT emit avatarClick when the avatar div is clicked and clickable is false', () => {
    const spy = vi.spyOn(component.avatarClick, 'emit');
    setInput(fixture, 'clickable', false);
    const avatar = nativeEl.querySelector('.avatar') as HTMLElement;
    avatar.click();
    expect(spy).not.toHaveBeenCalled();
  });
});
