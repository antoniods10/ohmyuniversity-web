import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AboutCtaComponent } from './about-cta.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { By } from '@angular/platform-browser';
import { APP_NAME } from '@shared/constants';

describe('AboutCtaComponent', () => {
  let component: AboutCtaComponent;
  let fixture: ComponentFixture<AboutCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCtaComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutCtaComponent);
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

  it('should apply bg-sky-50 class to the section', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.classList).toContain('bg-sky-50');
  });

  it('should render the h2 heading with appText directive', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2).not.toBeNull();
    expect(h2.textContent).toContain('Vuoi contribuire?');
  });

  it('should render the body paragraph', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toContain(APP_NAME);
    expect(p.textContent).toContain('è aperto a contributi');
  });

  it('should render exactly two app-custom-button elements', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons.length).toBe(2);
  });

  it('should render the GitHub button with correct label', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.label).toBe('Contribuisci su GitHub');
  });

  it('should render the GitHub button with primary variant', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.variant).toBe('primary');
  });

  it('should render the GitHub button with link-external mode', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.mode).toBe('link-external');
  });

  it('should render the GitHub button pointing to the correct URL', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.href).toBe('https://github.com/ohmyopensource');
  });

  it('should render the GitHub button with target="_blank"', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.target).toBe('_blank');
  });

  it('should render the GitHub button with md size', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.size).toBe('md');
  });

  it('should render the GitHub button with fullWidth true', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.fullWidth).toBe(true);
  });

  it('should render the login button with correct label', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.label).toBe('Usa il prodotto');
  });

  it('should render the login button with ghost variant', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.variant).toBe('ghost');
  });

  it('should render the login button with link-internal mode', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.mode).toBe('link-internal');
  });

  it('should render the login button pointing to /login', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.href).toBe('/login');
  });

  it('should render the login button with md size', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.size).toBe('md');
  });

  it('should render the login button with fullWidth true', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.fullWidth).toBe(true);
  });

  it('should render both buttons inside a flex container', () => {
    const flex = fixture.nativeElement.querySelector('.flex');
    expect(flex).not.toBeNull();
  });

  it('should render a text-center container', () => {
    const textCenter = fixture.nativeElement.querySelector('.text-center');
    expect(textCenter).not.toBeNull();
  });
});
