import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeCtaComponent } from './home-cta.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { By } from '@angular/platform-browser';

describe('HomeCtaComponent', () => {
  let component: HomeCtaComponent;
  let fixture: ComponentFixture<HomeCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCtaComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section element', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section).not.toBeNull();
  });

  it('should render the main heading', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2).not.toBeNull();
    expect(h2.textContent).toContain('Pronto a semplificare la tua vita universitaria?');
  });

  it('should render the subtitle paragraph', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toContain('Accedi gratuitamente');
  });

  it('should render exactly two app-custom-button elements', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons.length).toBe(2);
  });

  it('should render the primary CTA button with correct label', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const primaryBtn = buttons[0];
    expect(primaryBtn.componentInstance.label).toBe('Accedi ora - è gratis');
  });

  it('should render the primary CTA button with secondary variant', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.variant).toBe('secondary');
  });

  it('should render the primary CTA button with link-internal mode', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.mode).toBe('link-internal');
  });

  it('should render the primary CTA button pointing to /login', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.href).toBe('/login');
  });

  it('should render the primary CTA button with lg size', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.size).toBe('lg');
  });

  it('should render the primary CTA button with fullWidth true', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.fullWidth).toBe(true);
  });

  it('should render the secondary CTA button with correct label', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.label).toBe('Scopri chi siamo');
  });

  it('should render the secondary CTA button with primary variant', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.variant).toBe('primary');
  });

  it('should render the secondary CTA button pointing to /chi-siamo', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.href).toBe('/chi-siamo');
  });

  it('should render the secondary CTA button with lg size', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.size).toBe('lg');
  });

  it('should render the secondary CTA button with fullWidth true', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.fullWidth).toBe(true);
  });

  it('should render both CTA buttons inside a flex container', () => {
    const flexDiv = fixture.nativeElement.querySelector('.flex');
    expect(flexDiv).not.toBeNull();
  });

  it('should apply bg-blue-600 class to the section', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.classList).toContain('bg-blue-600');
  });

  it('should apply text-center class to the inner container', () => {
    const div = fixture.nativeElement.querySelector('.text-center');
    expect(div).not.toBeNull();
  });
});
