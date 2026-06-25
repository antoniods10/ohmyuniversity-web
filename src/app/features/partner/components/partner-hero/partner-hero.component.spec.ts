import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { PartnerHeroComponent } from './partner-hero.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';

describe('PartnerHeroComponent', () => {
  let component: PartnerHeroComponent;
  let fixture: ComponentFixture<PartnerHeroComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerHeroComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerHeroComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section with bg-white', () => {
    const section = nativeEl.querySelector('section');
    expect(section).not.toBeNull();
    expect(section!.classList).toContain('bg-white');
  });

  it('should render the app-custom-badge component', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge).not.toBeNull();
  });

  it('should pass correct label to the badge', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge.componentInstance.label).toBe('Per aziende, collettivi e istituzioni');
  });

  it('should pass variant="info" to the badge', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge.componentInstance.variant).toBe('info');
  });

  it('should render the h1 containing "120.000 studenti"', () => {
    const h1 = nativeEl.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1!.textContent).toContain('120.000 studenti');
  });

  it('should render the blue highlighted span "nel contesto giusto"', () => {
    const span = nativeEl.querySelector('h1 span.text-blue-600');
    expect(span).not.toBeNull();
    expect(span!.textContent?.trim()).toBe('nel contesto giusto');
  });

  it('should render the description paragraph mentioning "audience verificata"', () => {
    const p = nativeEl.querySelector('p.text-lg');
    expect(p).not.toBeNull();
    expect(p!.textContent).toContain('audience verificata');
  });

  it('should render exactly two app-custom-button elements', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons.length).toBe(2);
  });

  it('should render the primary CTA button with label "Inizia la prova gratuita"', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.label).toBe('Inizia la prova gratuita');
  });

  it('should set href "/contatti?tab=organization" on the primary CTA', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[0].componentInstance.href).toBe('/contatti?tab=organization');
  });

  it('should render the secondary CTA button with label "Vedi i piani"', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.label).toBe('Vedi i piani');
  });

  it('should set href "/business/prezzi" on the secondary CTA', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons[1].componentInstance.href).toBe('/business/prezzi');
  });

  it('should render the disclaimer with "14 giorni di prova gratuita"', () => {
    const p = nativeEl.querySelector('p.text-xs.text-gray-400');
    expect(p).not.toBeNull();
    expect(p!.textContent).toContain('14 giorni di prova gratuita');
    expect(p!.textContent).toContain('Nessuna carta di credito');
    expect(p!.textContent).toContain('Disdici quando vuoi');
  });
});
