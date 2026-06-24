import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrientationNavComponent } from './orientation-nav.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';

describe('OrientationNavComponent', () => {
  let component: OrientationNavComponent;
  let fixture: ComponentFixture<OrientationNavComponent>;
  let componentRef: ComponentRef<OrientationNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrientationNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrientationNavComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('hasPrev', true);
    componentRef.setInput('hasNext', true);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render exactly three app-custom-button elements', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons.length).toBe(3);
  });

  it('should render the "Arg. Prec." button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.label).toBe('Arg. Prec.');
  });

  it('should render the "Arg. Succ." button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.label).toBe('Arg. Succ.');
  });

  it('should render the back button with correct label', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[2].componentInstance.label).toBe('← Torna ad Orientamento');
  });

  it('should render all buttons with ghost or flat variant', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.variant).toBe('ghost');
    expect(buttons[1].componentInstance.variant).toBe('ghost');
    expect(buttons[2].componentInstance.variant).toBe('flat');
  });

  it('should render all buttons with sm size', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    buttons.forEach(btn => expect(btn.componentInstance.size).toBe('sm'));
  });

  it('should render all buttons with fullWidth=true', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    buttons.forEach(btn => expect(btn.componentInstance.fullWidth).toBe(true));
  });

  it('should enable prev button when hasPrev is true', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.disabled).toBe(false);
  });

  it('should disable prev button when hasPrev is false', () => {
    componentRef.setInput('hasPrev', false);
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.disabled).toBe(true);
  });

  it('should enable next button when hasNext is true', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.disabled).toBe(false);
  });

  it('should disable next button when hasNext is false', () => {
    componentRef.setInput('hasNext', false);
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.disabled).toBe(true);
  });

  it('should emit prev when prev button is clicked', () => {
    const spy = vi.fn();
    component.prev.subscribe(spy);
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    buttons[0].componentInstance.clicked.emit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should emit next when next button is clicked', () => {
    const spy = vi.fn();
    component.next.subscribe(spy);
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    buttons[1].componentInstance.clicked.emit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should emit backToList when back button is clicked', () => {
    const spy = vi.fn();
    component.backToList.subscribe(spy);
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    buttons[2].componentInstance.clicked.emit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should render prev button with iconPosition="left"', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.iconPosition).toBe('left');
  });

  it('should render next button with iconPosition="right"', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.iconPosition).toBe('right');
  });
});
