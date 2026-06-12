import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeHeroComponent } from './home-hero.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { By } from '@angular/platform-browser';

describe('HomeHeroComponent', () => {
  let component: HomeHeroComponent;
  let fixture: ComponentFixture<HomeHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHeroComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeHeroComponent);
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

  it('should render the h1 heading', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain('La tua carriera universitaria');
  });

  it('should render the highlighted span inside h1', () => {
    const span = fixture.nativeElement.querySelector('h1 span');
    expect(span).not.toBeNull();
    expect(span.textContent).toContain('tutta in un posto');
  });

  it('should render the subtitle paragraph', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toContain('OhMyUniversity');
  });

  it('should render the app-custom-badge component', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge).not.toBeNull();
  });

  it('should pass the correct label to the badge', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge.componentInstance.label).toBe('Supporta 50+ atenei italiani');
  });

  it('should pass variant="outline" to the badge', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge.componentInstance.variant).toBe('outline');
  });

  it('should pass shape="pill" to the badge', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge.componentInstance.shape).toBe('pill');
  });

  it('should pass size="lg" to the badge', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge.componentInstance.size).toBe('lg');
  });

  it('should render exactly two app-custom-button elements', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons.length).toBe(2);
  });

  it('should render the first CTA button with correct label', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.label).toBe('Accedi con il tuo ateneo');
  });

  it('should render the first CTA button with primary variant', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.variant).toBe('primary');
  });

  it('should render the first CTA button pointing to /login', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.href).toBe('/login');
  });

  it('should render the first CTA button with lg size', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.size).toBe('lg');
  });

  it('should render the first CTA button with fullWidth true', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.fullWidth).toBe(true);
  });

  it('should render the second CTA button with correct label', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.label).toBe('Non sei ancora iscritto?');
  });

  it('should render the second CTA button with ghost variant', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.variant).toBe('ghost');
  });

  it('should render the second CTA button pointing to /orientamento', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.href).toBe('/orientamento');
  });

  it('should render the second CTA button with fullWidth true', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.fullWidth).toBe(true);
  });

  it('should render the App Store link', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    const appStoreLink = Array.from(links).find((a: any) => a.textContent.includes('App Store'));
    expect(appStoreLink).not.toBeUndefined();
  });

  it('should render the Google Play link', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    const googlePlayLink = Array.from(links).find((a: any) =>
      a.textContent.includes('Google Play'),
    );
    expect(googlePlayLink).not.toBeUndefined();
  });

  it('should render the "Disponibile anche su" label', () => {
    const nativeEl = fixture.nativeElement;
    expect(nativeEl.textContent).toContain('Disponibile anche su');
  });

  it('should apply bg-white class to the section', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.classList).toContain('bg-white');
  });

  it('should render the span with text-blue-600 accent color', () => {
    const span = fixture.nativeElement.querySelector('h1 span');
    expect(span.classList).toContain('text-blue-600');
  });
});
