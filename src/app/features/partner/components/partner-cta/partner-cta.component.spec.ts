import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { PartnerCtaComponent } from './partner-cta.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';

describe('PartnerCtaComponent', () => {
  let component: PartnerCtaComponent;
  let fixture: ComponentFixture<PartnerCtaComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerCtaComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerCtaComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section with bg-blue-600', () => {
    const section = nativeEl.querySelector('section.bg-blue-600');
    expect(section).not.toBeNull();
  });

  it('should render the "Pronto a iniziare?" heading', () => {
    const h2 = nativeEl.querySelector('h2');
    expect(h2).not.toBeNull();
    expect(h2!.textContent).toContain('Pronto a iniziare?');
  });

  it('should render the description mentioning "2 giorni lavorativi"', () => {
    const allText = nativeEl.textContent ?? '';
    expect(allText).toContain('2 giorni lavorativi');
  });

  it('should render the description mentioning "14 giorni"', () => {
    const allText = nativeEl.textContent ?? '';
    expect(allText).toContain('14 giorni');
  });

  it('should render exactly two app-custom-button elements', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons.length).toBe(2);
  });

  it('should render the "Contattaci ora" button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.label).toBe('Contattaci ora');
  });

  it('should set href="/contatti" on the "Contattaci ora" button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.href).toBe('/contatti');
  });

  it('should render the "Leggi le FAQ Business" button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.label).toBe('Leggi le FAQ Business');
  });

  it('should set href="/business/faq" on the FAQ button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.href).toBe('/business/faq');
  });

  it('should set mode="link-internal" on both buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    buttons.forEach(b => expect(b.componentInstance.mode).toBe('link-internal'));
  });
});
