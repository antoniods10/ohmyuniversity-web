/**
 * @file custom-badge.component.spec.ts
 * @description Unit tests for CustomBadgeComponent covering label display,
 * counter mode, dot mode, icon handling, removable action, and CSS class logic.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CustomBadgeComponent } from './custom-badge.component';

describe('CustomBadgeComponent', () => {
  let component: CustomBadgeComponent;
  let fixture: ComponentFixture<CustomBadgeComponent>;

  function setInput<K extends keyof CustomBadgeComponent>(
    name: K,
    value: CustomBadgeComponent[K],
  ): void {
    fixture.componentRef.setInput(name, value);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the badge host element', () => {
    const badge = fixture.debugElement.query(By.css('[class*="badge"]'));
    expect(badge).not.toBeNull();
  });

  it('should display the label text', () => {
    setInput('label', 'Attivo');
    const label = fixture.debugElement.query(By.css('.badge__label'));
    expect(label.nativeElement.textContent.trim()).toBe('Attivo');
  });

  it('should not render label element when label is empty and no count', () => {
    setInput('label', '');
    setInput('count', 0);
    const label = fixture.debugElement.query(By.css('.badge__label'));
    expect(label.nativeElement.textContent.trim()).toBe('');
  });

  it('should render count element when count > 0', () => {
    setInput('count', 5);
    const count = fixture.debugElement.query(By.css('.badge__count'));
    expect(count).not.toBeNull();
  });

  it('should display the count value', () => {
    setInput('count', 42);
    const count = fixture.debugElement.query(By.css('.badge__count'));
    expect(count.nativeElement.textContent.trim()).toBe('42');
  });

  it('should display maxCount+ when count exceeds maxCount', () => {
    setInput('count', 120);
    setInput('maxCount', 99);
    const count = fixture.debugElement.query(By.css('.badge__count'));
    expect(count.nativeElement.textContent.trim()).toBe('99+');
  });

  it('should display exact count when count equals maxCount', () => {
    setInput('count', 99);
    setInput('maxCount', 99);
    const count = fixture.debugElement.query(By.css('.badge__count'));
    expect(count.nativeElement.textContent.trim()).toBe('99');
  });

  it('should return true for isCountMode when count > 0', () => {
    component.count = 3;
    expect(component.isCountMode).toBeTruthy();
  });

  it('should return false for isCountMode when count is 0', () => {
    component.count = 0;
    expect(component.isCountMode).toBeFalsy();
  });

  it('should render dot element when dot is true', () => {
    setInput('dot', true);
    const dot = fixture.debugElement.query(By.css('.badge__dot'));
    expect(dot).not.toBeNull();
  });

  it('should be in dot-only mode when dot is true, no label, and no count', () => {
    component.dot = true;
    component.label = '';
    component.count = 0;
    expect(component.isDotOnly).toBeTruthy();
  });

  it('should NOT be in dot-only mode when dot is true but label is set', () => {
    component.dot = true;
    component.label = 'Nuovo';
    expect(component.isDotOnly).toBeFalsy();
  });

  it('should apply badge--dot-only class in dot-only mode', () => {
    setInput('dot', true);
    setInput('label', '');
    setInput('count', 0);
    const span = fixture.nativeElement.querySelector('span');
    expect(span.classList).toContain('badge--dot-only');
  });

  it('should apply badge--primary class by default', () => {
    const span = fixture.nativeElement.querySelector('span');
    expect(span.classList).toContain('badge--primary');
  });

  it('should apply the correct variant class', () => {
    setInput('variant', 'success');
    const span = fixture.nativeElement.querySelector('span');
    expect(span.classList).toContain('badge--success');
  });

  it('should apply the correct size class', () => {
    setInput('size', 'lg');
    const span = fixture.nativeElement.querySelector('span');
    expect(span.classList).toContain('badge--lg');
  });

  it('should apply the correct shape class', () => {
    setInput('shape', 'rounded');
    const span = fixture.nativeElement.querySelector('span');
    expect(span.classList).toContain('badge--rounded');
  });

  it('should apply badge--dark class when darkTheme is true', () => {
    setInput('darkTheme', true);
    const span = fixture.nativeElement.querySelector('span');
    expect(span.classList).toContain('badge--dark');
  });

  it('should apply badge--removable class when removable is true', () => {
    setInput('removable', true);
    const span = fixture.nativeElement.querySelector('span');
    expect(span.classList).toContain('badge--removable');
  });

  it('should apply badge--count class when in count mode and dot is false', () => {
    setInput('count', 5);
    setInput('dot', false);
    const span = fixture.nativeElement.querySelector('span');
    expect(span.classList).toContain('badge--count');
  });

  it('should render remove button when removable is true', () => {
    setInput('removable', true);
    const removeBtn = fixture.debugElement.query(By.css('.badge__remove'));
    expect(removeBtn).not.toBeNull();
  });

  it('should not render remove button when removable is false', () => {
    setInput('removable', false);
    const removeBtn = fixture.debugElement.query(By.css('.badge__remove'));
    expect(removeBtn).toBeNull();
  });

  it('should emit removed event when remove button is clicked', () => {
    setInput('removable', true);
    setInput('label', 'Tag');
    const spy = vi.fn();
    component.removed.subscribe(spy);
    const removeBtn = fixture.debugElement.query(By.css('.badge__remove'));
    removeBtn.triggerEventHandler('click', new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should set correct aria-label on remove button', () => {
    setInput('removable', true);
    setInput('label', 'Categoria');
    const removeBtn = fixture.debugElement.query(By.css('.badge__remove'));
    expect(removeBtn.nativeElement.getAttribute('aria-label')).toBe('Rimuovi Categoria');
  });

  it('should stop event propagation when remove button is clicked', () => {
    setInput('removable', true);
    const event = new MouseEvent('click');
    const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');
    component.onRemove(event);
    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it('should return iconSize 10 for size xs', () => {
    component.size = 'xs';
    expect(component.iconSize).toBe(10);
  });

  it('should return iconSize 11 for size sm', () => {
    component.size = 'sm';
    expect(component.iconSize).toBe(11);
  });

  it('should return iconSize 12 for size md', () => {
    component.size = 'md';
    expect(component.iconSize).toBe(12);
  });

  it('should return iconSize 14 for size lg', () => {
    component.size = 'lg';
    expect(component.iconSize).toBe(14);
  });

  it('should return closeSize 9 for size xs', () => {
    component.size = 'xs';
    expect(component.closeSize).toBe(9);
  });

  it('should return closeSize 10 for size sm', () => {
    component.size = 'sm';
    expect(component.closeSize).toBe(10);
  });

  it('should return closeSize 11 for size md', () => {
    component.size = 'md';
    expect(component.closeSize).toBe(11);
  });

  it('should return closeSize 12 for size lg', () => {
    component.size = 'lg';
    expect(component.closeSize).toBe(12);
  });

  it('should set aria-label when ariaLabel is provided', () => {
    setInput('ariaLabel', 'Stato attivo');
    const span = fixture.nativeElement.querySelector('span');
    expect(span.getAttribute('aria-label')).toBe('Stato attivo');
  });

  it('should set role="status" when removable is true', () => {
    setInput('removable', true);
    const span = fixture.nativeElement.querySelector('span');
    expect(span.getAttribute('role')).toBe('status');
  });

  it('should not set role when removable is false', () => {
    setInput('removable', false);
    const span = fixture.nativeElement.querySelector('span');
    expect(span.getAttribute('role')).toBeNull();
  });
});
