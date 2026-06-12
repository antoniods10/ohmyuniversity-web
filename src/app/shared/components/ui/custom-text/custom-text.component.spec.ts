import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomTextComponent } from './custom-text.component';

describe('CustomTextComponent', () => {
  let component: CustomTextComponent;
  let fixture: ComponentFixture<CustomTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should default variant to "body"', () => {
    expect(component.variant).toBe('body');
  });

  it('should default color to "default"', () => {
    expect(component.color).toBe('default');
  });

  it('should default weight to empty string', () => {
    expect(component.weight).toBe('');
  });

  it('should default align to empty string', () => {
    expect(component.align).toBe('');
  });

  it('should default italic to false', () => {
    expect(component.italic).toBe(false);
  });

  it('should default underline to false', () => {
    expect(component.underline).toBe(false);
  });

  it('should default truncate to false', () => {
    expect(component.truncate).toBe(false);
  });

  it('should default noWrap to false', () => {
    expect(component.noWrap).toBe(false);
  });

  it('should default gradient to false', () => {
    expect(component.gradient).toBe(false);
  });

  it('should default darkTheme to false', () => {
    expect(component.darkTheme).toBe(false);
  });

  it('should default lineClamp to 0', () => {
    expect(component.lineClamp).toBe(0);
  });

  it('should default extraClass to empty string', () => {
    expect(component.extraClass).toBe('');
  });

  it('should always include "custom-text" in hostClasses', () => {
    expect(component.hostClasses).toContain('custom-text');
  });

  it('should include variant class in hostClasses', () => {
    expect(component.hostClasses).toContain('custom-text--body');
  });

  it('should include color class in hostClasses', () => {
    expect(component.hostClasses).toContain('custom-text--color-default');
  });

  it('should apply custom-text--h1 for variant "h1"', () => {
    fixture.componentRef.setInput('variant', 'h1');
    expect(component.hostClasses).toContain('custom-text--h1');
  });

  it('should apply custom-text--h2 for variant "h2"', () => {
    fixture.componentRef.setInput('variant', 'h2');
    expect(component.hostClasses).toContain('custom-text--h2');
  });

  it('should apply custom-text--h3 for variant "h3"', () => {
    fixture.componentRef.setInput('variant', 'h3');
    expect(component.hostClasses).toContain('custom-text--h3');
  });

  it('should apply custom-text--h4 for variant "h4"', () => {
    fixture.componentRef.setInput('variant', 'h4');
    expect(component.hostClasses).toContain('custom-text--h4');
  });

  it('should apply custom-text--body-lg for variant "body-lg"', () => {
    fixture.componentRef.setInput('variant', 'body-lg');
    expect(component.hostClasses).toContain('custom-text--body-lg');
  });

  it('should apply custom-text--body-sm for variant "body-sm"', () => {
    fixture.componentRef.setInput('variant', 'body-sm');
    expect(component.hostClasses).toContain('custom-text--body-sm');
  });

  it('should apply custom-text--caption for variant "caption"', () => {
    fixture.componentRef.setInput('variant', 'caption');
    expect(component.hostClasses).toContain('custom-text--caption');
  });

  it('should apply custom-text--label for variant "label"', () => {
    fixture.componentRef.setInput('variant', 'label');
    expect(component.hostClasses).toContain('custom-text--label');
  });

  it('should apply custom-text--overline for variant "overline"', () => {
    fixture.componentRef.setInput('variant', 'overline');
    expect(component.hostClasses).toContain('custom-text--overline');
  });

  it('should apply custom-text--code for variant "code"', () => {
    fixture.componentRef.setInput('variant', 'code');
    expect(component.hostClasses).toContain('custom-text--code');
  });

  it('should apply custom-text--display for variant "display"', () => {
    fixture.componentRef.setInput('variant', 'display');
    expect(component.hostClasses).toContain('custom-text--display');
  });

  it('should apply custom-text--color-muted for color "muted"', () => {
    fixture.componentRef.setInput('color', 'muted');
    expect(component.hostClasses).toContain('custom-text--color-muted');
  });

  it('should apply custom-text--color-subtle for color "subtle"', () => {
    fixture.componentRef.setInput('color', 'subtle');
    expect(component.hostClasses).toContain('custom-text--color-subtle');
  });

  it('should apply custom-text--color-primary for color "primary"', () => {
    fixture.componentRef.setInput('color', 'primary');
    expect(component.hostClasses).toContain('custom-text--color-primary');
  });

  it('should apply custom-text--color-success for color "success"', () => {
    fixture.componentRef.setInput('color', 'success');
    expect(component.hostClasses).toContain('custom-text--color-success');
  });

  it('should apply custom-text--color-error for color "error"', () => {
    fixture.componentRef.setInput('color', 'error');
    expect(component.hostClasses).toContain('custom-text--color-error');
  });

  it('should apply custom-text--color-white for color "white"', () => {
    fixture.componentRef.setInput('color', 'white');
    expect(component.hostClasses).toContain('custom-text--color-white');
  });

  it('should apply custom-text--color-inherit for color "inherit"', () => {
    fixture.componentRef.setInput('color', 'inherit');
    expect(component.hostClasses).toContain('custom-text--color-inherit');
  });

  it('should NOT include weight class when weight is empty', () => {
    expect(component.hostClasses).not.toContain('custom-text--weight-');
  });

  it('should apply custom-text--weight-bold for weight "bold"', () => {
    fixture.componentRef.setInput('weight', 'bold');
    expect(component.hostClasses).toContain('custom-text--weight-bold');
  });

  it('should apply custom-text--weight-semibold for weight "semibold"', () => {
    fixture.componentRef.setInput('weight', 'semibold');
    expect(component.hostClasses).toContain('custom-text--weight-semibold');
  });

  it('should apply custom-text--weight-medium for weight "medium"', () => {
    fixture.componentRef.setInput('weight', 'medium');
    expect(component.hostClasses).toContain('custom-text--weight-medium');
  });

  it('should apply custom-text--weight-normal for weight "normal"', () => {
    fixture.componentRef.setInput('weight', 'normal');
    expect(component.hostClasses).toContain('custom-text--weight-normal');
  });

  it('should apply custom-text--weight-extrabold for weight "extrabold"', () => {
    fixture.componentRef.setInput('weight', 'extrabold');
    expect(component.hostClasses).toContain('custom-text--weight-extrabold');
  });

  it('should NOT include align class when align is empty', () => {
    expect(component.hostClasses).not.toContain('custom-text--align-');
  });

  it('should apply custom-text--align-center for align "center"', () => {
    fixture.componentRef.setInput('align', 'center');
    expect(component.hostClasses).toContain('custom-text--align-center');
  });

  it('should apply custom-text--align-left for align "left"', () => {
    fixture.componentRef.setInput('align', 'left');
    expect(component.hostClasses).toContain('custom-text--align-left');
  });

  it('should apply custom-text--align-right for align "right"', () => {
    fixture.componentRef.setInput('align', 'right');
    expect(component.hostClasses).toContain('custom-text--align-right');
  });

  it('should apply custom-text--align-justify for align "justify"', () => {
    fixture.componentRef.setInput('align', 'justify');
    expect(component.hostClasses).toContain('custom-text--align-justify');
  });

  it('should apply custom-text--italic when italic is true', () => {
    fixture.componentRef.setInput('italic', true);
    expect(component.hostClasses).toContain('custom-text--italic');
  });

  it('should NOT apply custom-text--italic when italic is false', () => {
    expect(component.hostClasses).not.toContain('custom-text--italic');
  });

  it('should apply custom-text--underline when underline is true', () => {
    fixture.componentRef.setInput('underline', true);
    expect(component.hostClasses).toContain('custom-text--underline');
  });

  it('should NOT apply custom-text--underline when underline is false', () => {
    expect(component.hostClasses).not.toContain('custom-text--underline');
  });

  it('should apply custom-text--truncate when truncate is true', () => {
    fixture.componentRef.setInput('truncate', true);
    expect(component.hostClasses).toContain('custom-text--truncate');
  });

  it('should NOT apply custom-text--truncate when truncate is false', () => {
    expect(component.hostClasses).not.toContain('custom-text--truncate');
  });

  it('should apply custom-text--nowrap when noWrap is true', () => {
    fixture.componentRef.setInput('noWrap', true);
    expect(component.hostClasses).toContain('custom-text--nowrap');
  });

  it('should NOT apply custom-text--nowrap when noWrap is false', () => {
    expect(component.hostClasses).not.toContain('custom-text--nowrap');
  });

  it('should apply custom-text--gradient when gradient is true', () => {
    fixture.componentRef.setInput('gradient', true);
    expect(component.hostClasses).toContain('custom-text--gradient');
  });

  it('should NOT apply custom-text--gradient when gradient is false', () => {
    expect(component.hostClasses).not.toContain('custom-text--gradient');
  });

  it('should apply custom-text--dark when darkTheme is true', () => {
    fixture.componentRef.setInput('darkTheme', true);
    expect(component.hostClasses).toContain('custom-text--dark');
  });

  it('should NOT apply custom-text--dark when darkTheme is false', () => {
    expect(component.hostClasses).not.toContain('custom-text--dark');
  });

  it('should NOT include clamp class when lineClamp is 0', () => {
    expect(component.hostClasses).not.toContain('custom-text--clamp-');
  });

  it('should apply custom-text--clamp-1 for lineClamp 1', () => {
    fixture.componentRef.setInput('lineClamp', 1);
    expect(component.hostClasses).toContain('custom-text--clamp-1');
  });

  it('should apply custom-text--clamp-2 for lineClamp 2', () => {
    fixture.componentRef.setInput('lineClamp', 2);
    expect(component.hostClasses).toContain('custom-text--clamp-2');
  });

  it('should apply custom-text--clamp-3 for lineClamp 3', () => {
    fixture.componentRef.setInput('lineClamp', 3);
    expect(component.hostClasses).toContain('custom-text--clamp-3');
  });

  it('should apply custom-text--clamp-6 for lineClamp 6', () => {
    fixture.componentRef.setInput('lineClamp', 6);
    expect(component.hostClasses).toContain('custom-text--clamp-6');
  });

  it('should NOT include extra class when extraClass is empty', () => {
    expect(component.hostClasses.split(' ').filter(c => c === '')).toHaveLength(0);
  });

  it('should append extraClass to hostClasses', () => {
    fixture.componentRef.setInput('extraClass', 'my-custom-class');
    expect(component.hostClasses).toContain('my-custom-class');
  });

  it('should append multiple extraClasses as a string', () => {
    fixture.componentRef.setInput('extraClass', 'class-a class-b');
    expect(component.hostClasses).toContain('class-a class-b');
  });

  it('should combine variant, color, weight and align correctly', () => {
    fixture.componentRef.setInput('variant', 'h2');
    fixture.componentRef.setInput('color', 'primary');
    fixture.componentRef.setInput('weight', 'bold');
    fixture.componentRef.setInput('align', 'center');
    const classes = component.hostClasses;
    expect(classes).toContain('custom-text--h2');
    expect(classes).toContain('custom-text--color-primary');
    expect(classes).toContain('custom-text--weight-bold');
    expect(classes).toContain('custom-text--align-center');
  });

  it('should combine multiple boolean modifiers', () => {
    fixture.componentRef.setInput('italic', true);
    fixture.componentRef.setInput('underline', true);
    fixture.componentRef.setInput('gradient', true);
    const classes = component.hostClasses;
    expect(classes).toContain('custom-text--italic');
    expect(classes).toContain('custom-text--underline');
    expect(classes).toContain('custom-text--gradient');
  });

  it('should produce a space-separated string without empty entries', () => {
    const classes = component.hostClasses.split(' ');
    expect(classes.every(c => c.length > 0)).toBe(true);
  });

  it('should apply hostClasses to the host element', () => {
    const hostEl = fixture.nativeElement as HTMLElement;
    expect(hostEl.className).toContain('custom-text');
  });

  it('should reflect input changes on the host element class', () => {
    fixture.componentRef.setInput('variant', 'h1');
    fixture.detectChanges();
    const hostEl = fixture.nativeElement as HTMLElement;
    expect(hostEl.className).toContain('custom-text--h1');
  });
});
