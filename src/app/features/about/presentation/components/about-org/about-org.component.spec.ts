import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutOrgComponent } from './about-org.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CardStatComponent } from '@ui/custom-card/card-variants.component';
import { By } from '@angular/platform-browser';
import { ABOUT_ORG_STATS } from '@constants';

describe('AboutOrgComponent', () => {
  let component: AboutOrgComponent;
  let fixture: ComponentFixture<AboutOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutOrgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutOrgComponent);
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

  it('should apply bg-gray-50 class to the section', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.classList).toContain('bg-gray-50');
  });

  it('should render the h2 heading with appText directive', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2).not.toBeNull();
    expect(h2.textContent).toContain('OhMyOpenSource!');
  });

  it('should render the first description paragraph', () => {
    const paragraphs = fixture.nativeElement.querySelectorAll('p');
    const texts = Array.from(paragraphs).map((p: any) => p.textContent);
    expect(texts.some((t: string) => t.includes('organizzazione che raccoglie'))).toBe(true);
  });

  it('should render the second description paragraph', () => {
    const paragraphs = fixture.nativeElement.querySelectorAll('p');
    const texts = Array.from(paragraphs).map((p: any) => p.textContent);
    expect(texts.some((t: string) => t.includes('primo progetto sotto questo ombrello'))).toBe(true);
  });

  it('should have a stats array populated from ABOUT_ORG_STATS constant', () => {
    expect(component.stats).toBeDefined();
    expect(component.stats.length).toBe(ABOUT_ORG_STATS.length);
  });

  it('should render one app-card-stat per stat', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    expect(cards.length).toBe(ABOUT_ORG_STATS.length);
  });

  it('should pass the correct value to each stat card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.value).toBe(ABOUT_ORG_STATS[index].value);
    });
  });

  it('should pass the correct label to each stat card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.label).toBe(ABOUT_ORG_STATS[index].label);
    });
  });

  it('should pass variant="primary" to every stat card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.variant).toBe('primary');
    });
  });

  it('should pass shadow="sm" to every stat card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.shadow).toBe('sm');
    });
  });

  it('should pass stretchHeight=true to every stat card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.stretchHeight).toBe(true);
    });
  });

  it('should render the GitHub button', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button).not.toBeNull();
  });

  it('should render the GitHub button with correct label', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.label).toBe('Vedi su GitHub');
  });

  it('should render the GitHub button with ghost variant', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.variant).toBe('ghost');
  });

  it('should render the GitHub button with link-external mode', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.mode).toBe('link-external');
  });

  it('should render the GitHub button pointing to the correct URL', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.href).toBe('https://github.com/ohmyopensource');
  });

  it('should render the GitHub button with target="_blank"', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.target).toBe('_blank');
  });

  it('should render the GitHub button with sm size', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.size).toBe('sm');
  });

  it('should render a two-column grid layout', () => {
    const grid = fixture.nativeElement.querySelector('.grid');
    expect(grid).not.toBeNull();
  });
});
