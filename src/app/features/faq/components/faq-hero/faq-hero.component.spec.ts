import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqHeroComponent } from './faq-hero.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';

describe('FaqHeroComponent', () => {
  let component: FaqHeroComponent;
  let fixture: ComponentFixture<FaqHeroComponent>;
  let componentRef: ComponentRef<FaqHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaqHeroComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('title', 'Domande frequenti');
    componentRef.setInput('subtitle', 'Tutto quello che devi sapere');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section element', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section).not.toBeNull();
  });

  it('should apply bg-white to the section', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.classList).toContain('bg-white');
  });

  it('should render a text-center container', () => {
    const textCenter = fixture.nativeElement.querySelector('.text-center');
    expect(textCenter).not.toBeNull();
  });

  it('should render the h1 heading', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).not.toBeNull();
  });

  it('should display the required title input', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent.trim()).toBe('Domande frequenti');
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
    expect(p.textContent.trim()).toBe('Tutto quello che devi sapere');
  });

  it('should update the subtitle when input changes', () => {
    componentRef.setInput('subtitle', 'Nuovo sottotitolo');
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent.trim()).toBe('Nuovo sottotitolo');
  });

  it('should render the subtitle with max-w-xl constraint', () => {
    const el = fixture.nativeElement.querySelector('.max-w-xl');
    expect(el).not.toBeNull();
  });

  it('should NOT render the badge when badge input is empty string (default)', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge).toBeNull();
  });

  it('should render the badge when a non-empty badge input is provided', () => {
    componentRef.setInput('badge', 'Per studenti');
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge).not.toBeNull();
  });

  it('should pass the correct label to the badge', () => {
    componentRef.setInput('badge', 'Per studenti');
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge.componentInstance.label).toBe('Per studenti');
  });

  it('should pass variant="primary" to the badge', () => {
    componentRef.setInput('badge', 'Per studenti');
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge.componentInstance.variant).toBe('primary');
  });

  it('should pass shape="pill" to the badge', () => {
    componentRef.setInput('badge', 'Per studenti');
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge.componentInstance.shape).toBe('pill');
  });

  it('should pass size="sm" to the badge', () => {
    componentRef.setInput('badge', 'Per studenti');
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge.componentInstance.size).toBe('sm');
  });

  it('should hide the badge again when badge input is reset to empty string', () => {
    componentRef.setInput('badge', 'Per studenti');
    fixture.detectChanges();
    componentRef.setInput('badge', '');
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge).toBeNull();
  });
});
