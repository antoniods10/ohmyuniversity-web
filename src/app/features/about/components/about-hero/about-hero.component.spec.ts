import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutHeroComponent } from './about-hero.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { By } from '@angular/platform-browser';

describe('AboutHeroComponent', () => {
  let component: AboutHeroComponent;
  let fixture: ComponentFixture<AboutHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutHeroComponent);
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

  it('should apply bg-white class to the section', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.classList).toContain('bg-white');
  });

  it('should render the app-custom-badge component', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge).not.toBeNull();
  });

  it('should pass the correct label to the badge', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge.componentInstance.label).toBe('Un progetto OhMyOpenSource!');
  });

  it('should pass variant="neutral" to the badge', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge.componentInstance.variant).toBe('neutral');
  });

  it('should pass shape="pill" to the badge', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge.componentInstance.shape).toBe('pill');
  });

  it('should pass size="sm" to the badge', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge.componentInstance.size).toBe('sm');
  });

  it('should render the h1 heading with appText directive', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain('Chi siamo');
  });

  it('should render the subtitle paragraph', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toContain('OhMyUniversity! nasce dalla frustrazione');
  });

  it('should render a text-center container', () => {
    const textCenter = fixture.nativeElement.querySelector('.text-center');
    expect(textCenter).not.toBeNull();
  });

  it('should render the paragraph within the max-w-2xl constraint', () => {
    const el = fixture.nativeElement.querySelector('.max-w-2xl');
    expect(el).not.toBeNull();
  });
});
