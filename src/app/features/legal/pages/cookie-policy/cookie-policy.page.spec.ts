import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CookiePolicyPage } from './cookie-policy.page';
import { provideRouter } from '@angular/router';
import { LEGAL_CONTACT_EMAIL, LEGAL_UPDATE } from '@constants';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';

describe('CookiePolicyPage', () => {
  let component: CookiePolicyPage;
  let fixture: ComponentFixture<CookiePolicyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiePolicyPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CookiePolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should expose lastUpdated from LEGAL_UPDATE constant', () => {
    expect(component.lastUpdated).toBe(LEGAL_UPDATE.cookiePolicy);
  });

  it('should expose contactEmail from LEGAL_CONTACT_EMAIL constant', () => {
    expect(component.contactEmail).toBe(LEGAL_CONTACT_EMAIL);
  });

  it('should render the h1 heading with "Cookie Policy"', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain('Cookie Policy');
  });

  it('should render the "Documento legale" label', () => {
    expect(fixture.nativeElement.textContent).toContain('Documento legale');
  });

  it('should render the lastUpdated value in the DOM', () => {
    expect(fixture.nativeElement.textContent).toContain(LEGAL_UPDATE.cookiePolicy);
  });

  it('should render the contact email as a mailto link', () => {
    const link = fixture.nativeElement.querySelector(`a[href="mailto:${LEGAL_CONTACT_EMAIL}"]`);
    expect(link).not.toBeNull();
  });

  it('should render the contact email text in the mailto link', () => {
    const link = fixture.nativeElement.querySelector(`a[href="mailto:${LEGAL_CONTACT_EMAIL}"]`);
    expect(link.textContent.trim()).toBe(LEGAL_CONTACT_EMAIL);
  });

  it('should render an app-custom-link with mode="internal" for each related document', () => {
    const linkInstances = fixture.debugElement
      .queryAll(By.directive(CustomLinkComponent))
      .map(de => de.componentInstance as CustomLinkComponent)
      .filter(instance => instance.mode === 'internal');

    expect(linkInstances.length).toBe(component.relatedDocs.length);

    component.relatedDocs.forEach(doc => {
      const match = linkInstances.find(
        instance => instance.href === doc.url && instance.label === doc.label,
      );
      expect(match).not.toBeUndefined();
    });
  });

  it('should render an app-custom-link with mode="external" for each browser link', () => {
    const linkInstances = fixture.debugElement
      .queryAll(By.directive(CustomLinkComponent))
      .map(de => de.componentInstance as CustomLinkComponent)
      .filter(instance => instance.mode === 'external');

    expect(linkInstances.length).toBe(component.browserLinks.length);

    component.browserLinks.forEach(browser => {
      const match = linkInstances.find(
        instance => instance.href === browser.url && instance.label === browser.label,
      );
      expect(match).not.toBeUndefined();
    });
  });
});
