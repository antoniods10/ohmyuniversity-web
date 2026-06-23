import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BusinessHeroComponent } from './business-hero.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { ComponentRef } from '@angular/core';

describe('BusinessHeroComponent', () => {
  let component: BusinessHeroComponent;
  let fixture: ComponentFixture<BusinessHeroComponent>;
  let componentRef: ComponentRef<BusinessHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessHeroComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('title', 'Titolo di test');
    componentRef.setInput('subtitle', 'Sottotitolo di test');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section element', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section).not.toBeNull();
  });

  it('should apply bg-white class to the section', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.classList).toContain('bg-white');
  });

  it('should render the badge span element', () => {
    const span = fixture.nativeElement.querySelector('span');
    expect(span).not.toBeNull();
  });

  it('should display the default badge text', () => {
    const span = fixture.nativeElement.querySelector('span');
    expect(span.textContent.trim()).toBe('Per le organizzazioni');
  });

  it('should display a custom badge when provided via input', () => {
    componentRef.setInput('badge', 'Badge personalizzato');
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.textContent.trim()).toBe('Badge personalizzato');
  });

  it('should render the h1 element', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).not.toBeNull();
  });

  it('should display the required title input', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent.trim()).toBe('Titolo di test');
  });

  it('should update the title when input changes', () => {
    componentRef.setInput('title', 'Nuovo titolo');
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent.trim()).toBe('Nuovo titolo');
  });

  it('should render the subtitle paragraph', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p).not.toBeNull();
  });

  it('should display the required subtitle input', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent.trim()).toBe('Sottotitolo di test');
  });

  it('should update the subtitle when input changes', () => {
    componentRef.setInput('subtitle', 'Nuovo sottotitolo');
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent.trim()).toBe('Nuovo sottotitolo');
  });

  it('should render a text-center container', () => {
    const textCenter = fixture.nativeElement.querySelector('.text-center');
    expect(textCenter).not.toBeNull();
  });

  it('should pass shape="pill" to the badge', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent))
      .componentInstance as CustomBadgeComponent;
    expect(badge.shape).toBe('pill');
  });

  it('should pass variant="info" and size="sm" to the badge', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent))
      .componentInstance as CustomBadgeComponent;
    expect(badge.variant).toBe('info');
    expect(badge.size).toBe('sm');
  });

  it('should render the subtitle with max-w-2xl constraint', () => {
    const p = fixture.nativeElement.querySelector('.max-w-2xl');
    expect(p).not.toBeNull();
  });
});
