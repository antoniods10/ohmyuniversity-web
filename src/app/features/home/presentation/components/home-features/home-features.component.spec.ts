import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeFeaturesComponent } from './home-features.component';
import { CardSimpleComponent } from '@ui/custom-card/card-variants.component';
import { By } from '@angular/platform-browser';
import { HOME_FEATURES } from '@constants';

describe('HomeFeaturesComponent', () => {
  let component: HomeFeaturesComponent;
  let fixture: ComponentFixture<HomeFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeaturesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeFeaturesComponent);
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
    expect(h2.textContent).toContain('Tutto quello che ti serve, subito');
  });

  it('should render the subtitle paragraph', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toContain('Progettato da studenti');
  });

  it('should have a features array populated from HOME_FEATURES constant', () => {
    expect(component.features).toBeDefined();
    expect(component.features.length).toBe(HOME_FEATURES.length);
  });

  it('should render one app-card-simple per feature', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    expect(cards.length).toBe(HOME_FEATURES.length);
  });

  it('should pass the correct title to each card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.title).toBe(HOME_FEATURES[index].title);
    });
  });

  it('should pass the correct body to each card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.body).toBe(HOME_FEATURES[index].description);
    });
  });

  it('should pass the correct icon to each card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.icon).toBe(HOME_FEATURES[index].icon);
    });
  });

  it('should pass shadow="sm" to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.shadow).toBe('sm');
    });
  });

  it('should pass hoverable=true to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.hoverable).toBe(true);
    });
  });

  it('should pass stretchHeight=true to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.stretchHeight).toBe(true);
    });
  });

  it('should pass the correct variant to each card (defaults to primary when not set)', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    cards.forEach((card, index) => {
      const expectedVariant = HOME_FEATURES[index].variant ?? 'primary';
      expect(card.componentInstance.variant).toBe(expectedVariant);
    });
  });

  it('should render a grid container for the cards', () => {
    const grid = fixture.nativeElement.querySelector('.grid');
    expect(grid).not.toBeNull();
  });

  it('should apply bg-white class to the section', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.classList).toContain('bg-white');
  });

  it('should render a text-center header container', () => {
    const textCenter = fixture.nativeElement.querySelector('.text-center');
    expect(textCenter).not.toBeNull();
  });
});
