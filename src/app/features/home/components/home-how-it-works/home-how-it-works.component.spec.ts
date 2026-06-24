import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeHowItWorksComponent } from './home-how-it-works.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { By } from '@angular/platform-browser';
import { HOME_STEPS } from '@constants';

describe('HomeHowItWorksComponent', () => {
  let component: HomeHowItWorksComponent;
  let fixture: ComponentFixture<HomeHowItWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHowItWorksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeHowItWorksComponent);
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
    expect(h2.textContent).toContain('Come funziona');
  });

  it('should render the subtitle paragraph', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toContain('Tre passi');
  });

  it('should have a steps array populated from HOME_STEPS constant', () => {
    expect(component.steps).toBeDefined();
    expect(component.steps.length).toBe(HOME_STEPS.length);
  });

  it('should render one app-custom-card per step', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CustomCardComponent));
    expect(cards.length).toBe(HOME_STEPS.length);
  });

  it('should pass variant="default" to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CustomCardComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.variant).toBe('default');
    });
  });

  it('should pass padding="lg" to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CustomCardComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.padding).toBe('lg');
    });
  });

  it('should pass shadow="sm" to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CustomCardComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.shadow).toBe('sm');
    });
  });

  it('should pass bordered=true to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CustomCardComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.bordered).toBe(true);
    });
  });

  it('should pass hoverable=true to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CustomCardComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.hoverable).toBe(true);
    });
  });

  it('should pass stretchHeight=true to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CustomCardComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.stretchHeight).toBe(true);
    });
  });

  it('should render the step number for each step', () => {
    const stepNumbers = fixture.nativeElement.querySelectorAll('.rounded-full');
    expect(stepNumbers.length).toBe(HOME_STEPS.length);
    stepNumbers.forEach((el: HTMLElement, index: number) => {
      expect(el.textContent?.trim()).toBe(String(HOME_STEPS[index].number));
    });
  });

  it('should render the title for each step', () => {
    const titles = fixture.nativeElement.querySelectorAll('h3');
    expect(titles.length).toBe(HOME_STEPS.length);
    titles.forEach((el: HTMLElement, index: number) => {
      expect(el.textContent?.trim()).toBe(HOME_STEPS[index].title);
    });
  });

  it('should render the description for each step', () => {
    HOME_STEPS.forEach((step) => {
      expect(fixture.nativeElement.textContent).toContain(step.description);
    });
  });

  it('should apply bg-gray-50 class to the section', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.classList).toContain('bg-gray-50');
  });

  it('should render a grid container for the cards', () => {
    const grid = fixture.nativeElement.querySelector('.grid');
    expect(grid).not.toBeNull();
  });

  it('should render step number circles with bg-blue-600', () => {
    const circles = fixture.nativeElement.querySelectorAll('.bg-blue-600');
    expect(circles.length).toBeGreaterThanOrEqual(HOME_STEPS.length);
  });
});
