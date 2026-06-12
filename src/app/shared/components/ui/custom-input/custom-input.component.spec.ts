import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomInputComponent } from './custom-input.component';

describe('CustomInputComponent', () => {
  let component: CustomInputComponent;
  let fixture: ComponentFixture<CustomInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomInputComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render a text input by default', () => {
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input.ci-input');
    expect(input).not.toBeNull();
  });

  it('should render a textarea when type is textarea', () => {
    fixture.componentRef.setInput('type', 'textarea');
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('textarea.ci-input');
    expect(textarea).not.toBeNull();
  });

  it('should render a select when type is select', () => {
    fixture.componentRef.setInput('type', 'select');
    fixture.detectChanges();
    const select = fixture.nativeElement.querySelector('select.ci-input');
    expect(select).not.toBeNull();
  });

  it('should not render input when type is textarea', () => {
    fixture.componentRef.setInput('type', 'textarea');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input.ci-input');
    expect(input).toBeNull();
  });

  it('should not render input when type is select', () => {
    fixture.componentRef.setInput('type', 'select');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input.ci-input');
    expect(input).toBeNull();
  });

  it('should render the label when label is provided', () => {
    fixture.componentRef.setInput('label', 'Nome');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label.ci-label');
    expect(label).not.toBeNull();
    expect(label.textContent.trim()).toBe('Nome');
  });

  it('should not render the label when label is empty', () => {
    fixture.componentRef.setInput('label', '');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label.ci-label');
    expect(label).toBeNull();
  });

  it('should apply ci-label--required class when required is true', () => {
    fixture.componentRef.setInput('label', 'Email');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label.ci-label');
    expect(label.classList).toContain('ci-label--required');
  });

  it('should not apply ci-label--required class when required is false', () => {
    fixture.componentRef.setInput('label', 'Email');
    fixture.componentRef.setInput('required', false);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label.ci-label');
    expect(label.classList).not.toContain('ci-label--required');
  });

  it('should set the placeholder on the input', () => {
    fixture.componentRef.setInput('placeholder', 'Inserisci il tuo nome');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input.ci-input');
    expect(input.getAttribute('placeholder')).toBe('Inserisci il tuo nome');
  });

  it('should disable the input when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input.ci-input');
    expect(input.disabled).toBe(true);
  });

  it('should set readonly attribute when readonly is true', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input.ci-input');
    expect(input.readOnly).toBe(true);
  });

  it('should render the prefix when provided', () => {
    fixture.componentRef.setInput('prefix', '€');
    fixture.detectChanges();
    const prefix = fixture.nativeElement.querySelector('.ci-prefix');
    expect(prefix.textContent.trim()).toBe('€');
  });

  it('should not render the prefix when not provided', () => {
    fixture.detectChanges();
    const prefix = fixture.nativeElement.querySelector('.ci-prefix');
    expect(prefix).toBeNull();
  });

  it('should render the suffix when provided', () => {
    fixture.componentRef.setInput('suffix', 'kg');
    fixture.detectChanges();
    const suffix = fixture.nativeElement.querySelector('.ci-suffix');
    expect(suffix.textContent.trim()).toBe('kg');
  });

  it('should not render the suffix when not provided', () => {
    fixture.detectChanges();
    const suffix = fixture.nativeElement.querySelector('.ci-suffix');
    expect(suffix).toBeNull();
  });

  it('should render the hint message', () => {
    fixture.componentRef.setInput('hint', 'Testo di aiuto');
    fixture.detectChanges();
    const hint = fixture.nativeElement.querySelector('.ci-hint');
    expect(hint.textContent.trim()).toBe('Testo di aiuto');
  });

  it('should render the error message', () => {
    fixture.componentRef.setInput('errorMessage', 'Campo obbligatorio');
    fixture.detectChanges();
    const hint = fixture.nativeElement.querySelector('.ci-hint--error');
    expect(hint.textContent.trim()).toBe('Campo obbligatorio');
  });

  it('should set role="alert" on error message', () => {
    fixture.componentRef.setInput('errorMessage', 'Errore');
    fixture.detectChanges();
    const hint = fixture.nativeElement.querySelector('.ci-hint--error');
    expect(hint.getAttribute('role')).toBe('alert');
  });

  it('should render the success message', () => {
    fixture.componentRef.setInput('successMessage', 'Email valida');
    fixture.detectChanges();
    const hint = fixture.nativeElement.querySelector('.ci-hint--success');
    expect(hint.textContent.trim()).toBe('Email valida');
  });

  it('should prioritize errorMessage over successMessage', () => {
    fixture.componentRef.setInput('errorMessage', 'Errore');
    fixture.componentRef.setInput('successMessage', 'Valido');
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.ci-hint--error');
    const success = fixture.nativeElement.querySelector('.ci-hint--success');
    expect(error).not.toBeNull();
    expect(success).toBeNull();
  });

  it('should not render any hint when all messages are empty', () => {
    fixture.detectChanges();
    const hint = fixture.nativeElement.querySelector('.ci-hint');
    expect(hint).toBeNull();
  });

  it('should set aria-invalid="true" on input when errorMessage is set', () => {
    fixture.componentRef.setInput('errorMessage', 'Errore');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input.ci-input');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('should apply ci-wrapper--full class when fullWidth is true', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.ci-wrapper');
    expect(wrapper.classList).toContain('ci-wrapper--full');
  });

  it('should not apply ci-wrapper--full class when fullWidth is false', () => {
    fixture.componentRef.setInput('fullWidth', false);
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.ci-wrapper');
    expect(wrapper.classList).not.toContain('ci-wrapper--full');
  });

  it('should apply ci-wrapper--dark class when darkTheme is true', () => {
    fixture.componentRef.setInput('darkTheme', true);
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.ci-wrapper');
    expect(wrapper.classList).toContain('ci-wrapper--dark');
  });

  it('should apply ci-field--disabled class when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const field = fixture.nativeElement.querySelector('.ci-field');
    expect(field.classList).toContain('ci-field--disabled');
  });

  it('should apply ci-field--readonly class when readonly is true', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    const field = fixture.nativeElement.querySelector('.ci-field');
    expect(field.classList).toContain('ci-field--readonly');
  });

  it('should apply the correct size class on the field', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const field = fixture.nativeElement.querySelector('.ci-field');
    expect(field.classList).toContain('ci-field--lg');
  });

  it('should apply the correct variant class on the field', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    const field = fixture.nativeElement.querySelector('.ci-field');
    expect(field.classList).toContain('ci-field--success');
  });

  it('should apply ci-field--icon-left class when iconLeft is set', () => {
    fixture.componentRef.setInput('iconLeft', {});
    fixture.detectChanges();
    const field = fixture.nativeElement.querySelector('.ci-field');
    expect(field.classList).toContain('ci-field--icon-left');
  });

  it('should apply ci-field--has-prefix class when prefix is set', () => {
    fixture.componentRef.setInput('prefix', '€');
    fixture.detectChanges();
    const field = fixture.nativeElement.querySelector('.ci-field');
    expect(field.classList).toContain('ci-field--has-prefix');
  });

  it('should return status error when errorMessage is set', () => {
    fixture.componentRef.setInput('errorMessage', 'Errore');
    fixture.detectChanges();
    expect(component.status).toBe('error');
  });

  it('should return status success when successMessage is set', () => {
    fixture.componentRef.setInput('successMessage', 'Ok');
    fixture.detectChanges();
    expect(component.status).toBe('success');
  });

  it('should return status default when no messages are set', () => {
    fixture.detectChanges();
    expect(component.status).toBe('default');
  });

  it('should return iconSize 14 for size sm', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    expect(component.iconSize).toBe(14);
  });

  it('should return iconSize 16 for size md', () => {
    fixture.detectChanges();
    expect(component.iconSize).toBe(16);
  });

  it('should return iconSize 18 for size lg', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(component.iconSize).toBe(18);
  });

  it('should return effectiveType password when type is password and showPassword is false', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();
    expect(component.effectiveType).toBe('password');
  });

  it('should return effectiveType text when type is password and showPassword is true', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();
    component.showPassword.set(true);
    expect(component.effectiveType).toBe('text');
  });

  it('should show password toggle button when type is password', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();
    const toggleBtn = fixture.nativeElement.querySelector('.ci-icon--btn');
    expect(toggleBtn).not.toBeNull();
  });

  it('should toggle password visibility when toggle button is clicked', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();
    expect(component.showPassword()).toBe(false);
    const toggleBtn = fixture.nativeElement.querySelector('.ci-icon--btn');
    toggleBtn.click();
    expect(component.showPassword()).toBe(true);
  });

  it('should set aria-label to Nascondi password when password is visible', () => {
    fixture.componentRef.setInput('type', 'password');
    component.showPassword.set(true);
    fixture.detectChanges();
    const toggleBtn = fixture.nativeElement.querySelector('.ci-icon--btn');
    expect(toggleBtn.getAttribute('aria-label')).toBe('Nascondi password');
  });

  it('should set aria-label to Mostra password when password is hidden', () => {
    fixture.componentRef.setInput('type', 'password');
    component.showPassword.set(false);
    fixture.detectChanges();
    const toggleBtn = fixture.nativeElement.querySelector('.ci-icon--btn');
    expect(toggleBtn.getAttribute('aria-label')).toBe('Mostra password');
  });

  it('should not show clear button when clearable is false', () => {
    fixture.componentRef.setInput('clearable', false);
    component.value = 'test';
    fixture.detectChanges();
    const clearBtn = fixture.nativeElement.querySelector('[aria-label="Svuota campo"]');
    expect(clearBtn).toBeNull();
  });

  it('should not show clear button when value is empty', () => {
    fixture.componentRef.setInput('clearable', true);
    component.value = '';
    fixture.detectChanges();
    const clearBtn = fixture.nativeElement.querySelector('[aria-label="Svuota campo"]');
    expect(clearBtn).toBeNull();
  });

  it('should return false for showClearBtn when disabled is true', () => {
    fixture.componentRef.setInput('clearable', true);
    fixture.componentRef.setInput('disabled', true);
    component.value = 'test';
    fixture.detectChanges();
    expect(component.showClearBtn).toBe(false);
  });

  it('should return false for showClearBtn when readonly is true', () => {
    fixture.componentRef.setInput('clearable', true);
    fixture.componentRef.setInput('readonly', true);
    component.value = 'test';
    fixture.detectChanges();
    expect(component.showClearBtn).toBe(false);
  });

  it('should emit inputChange when input value changes', () => {
    fixture.detectChanges();
    const spy = vi.fn();
    component.inputChange.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input.ci-input');
    input.value = 'nuovo valore';
    input.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalledWith('nuovo valore');
  });

  it('should emit inputFocus when input is focused', () => {
    fixture.detectChanges();
    const spy = vi.fn();
    component.inputFocus.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input.ci-input');
    input.dispatchEvent(new FocusEvent('focus'));
    expect(spy).toHaveBeenCalled();
  });

  it('should emit inputBlur when input loses focus', () => {
    fixture.detectChanges();
    const spy = vi.fn();
    component.inputBlur.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input.ci-input');
    input.dispatchEvent(new FocusEvent('blur'));
    expect(spy).toHaveBeenCalled();
  });

  it('should emit inputEnter when Enter key is pressed', () => {
    fixture.detectChanges();
    const spy = vi.fn();
    component.inputEnter.subscribe(spy);
    component.onKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT emit inputEnter when a non-Enter key is pressed', () => {
    fixture.detectChanges();
    const spy = vi.fn();
    component.inputEnter.subscribe(spy);
    component.onKeydown(new KeyboardEvent('keydown', { key: 'a' }));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should emit cleared when onClear is called', () => {
    fixture.detectChanges();
    const spy = vi.fn();
    component.cleared.subscribe(spy);
    component.onClear();
    expect(spy).toHaveBeenCalled();
  });

  it('should reset value to empty string when onClear is called', () => {
    fixture.detectChanges();
    component.value = 'testo';
    component.onClear();
    expect(component.value).toBe('');
  });

  it('should update value via writeValue', () => {
    fixture.detectChanges();
    component.writeValue('valore da form');
    expect(component.value).toBe('valore da form');
  });

  it('should set value to empty string when writeValue is called with null', () => {
    fixture.detectChanges();
    component.writeValue(null);
    expect(component.value).toBe('');
  });

  it('should disable the component via setDisabledState', () => {
    fixture.detectChanges();
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);
  });

  it('should render select options when type is select', () => {
    fixture.componentRef.setInput('type', 'select');
    fixture.componentRef.setInput('options', [
      { label: 'Opzione A', value: 'a' },
      { label: 'Opzione B', value: 'b' },
    ]);
    fixture.detectChanges();
    const options = fixture.nativeElement.querySelectorAll('select option:not([disabled])');
    expect(options.length).toBe(2);
  });

  it('should render the selectPlaceholder as first option', () => {
    fixture.componentRef.setInput('type', 'select');
    fixture.componentRef.setInput('selectPlaceholder', 'Scegli...');
    fixture.detectChanges();
    const firstOption = fixture.nativeElement.querySelector('select option');
    expect(firstOption.textContent.trim()).toBe('Scegli...');
  });

  it('should set rows attribute on textarea', () => {
    fixture.componentRef.setInput('type', 'textarea');
    fixture.componentRef.setInput('rows', 6);
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea.rows).toBe(6);
  });

  it('should show status icon when status is error and no other right icon is set', () => {
    fixture.componentRef.setInput('errorMessage', 'Errore');
    fixture.detectChanges();
    const statusIcon = fixture.nativeElement.querySelector('.ci-icon--status');
    expect(statusIcon).not.toBeNull();
  });

  it('should show status icon when status is success and no other right icon is set', () => {
    fixture.componentRef.setInput('successMessage', 'Ok');
    fixture.detectChanges();
    const statusIcon = fixture.nativeElement.querySelector('.ci-icon--status');
    expect(statusIcon).not.toBeNull();
  });

  it('should not show status icon when status is default', () => {
    fixture.detectChanges();
    const statusIcon = fixture.nativeElement.querySelector('.ci-icon--status');
    expect(statusIcon).toBeNull();
  });
});
