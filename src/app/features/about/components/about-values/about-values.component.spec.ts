import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutValuesComponent } from './about-values.component';
import { CardSimpleComponent } from '@ui/custom-card/card-variants.component';
import { By } from '@angular/platform-browser';
import { ABOUT_VALUES } from '@constants';

describe('AboutValuesComponent', () => {
  let component: AboutValuesComponent;
  let fixture: ComponentFixture<AboutValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutValuesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutValuesComponent);
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

  it('should render the h2 heading', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2).not.toBeNull();
    expect(h2.textContent).toContain('I nostri valori');
  });

  it('should have a values array populated from ABOUT_VALUES constant', () => {
    expect(component.values).toBeDefined();
    expect(component.values.length).toBe(ABOUT_VALUES.length);
  });

  it('should render one app-card-simple per value', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    expect(cards.length).toBe(ABOUT_VALUES.length);
  });

  it('should pass the correct title to each card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.title).toBe(ABOUT_VALUES[index].title);
    });
  });

  it('should pass the correct body to each card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.body).toBe(ABOUT_VALUES[index].description);
    });
  });

  it('should pass the correct icon to each card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.icon).toBe(ABOUT_VALUES[index].icon);
    });
  });

  it('should pass the correct variant to each card (defaults to primary when not set)', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    cards.forEach((card, index) => {
      const expectedVariant = ABOUT_VALUES[index].variant ?? 'primary';
      expect(card.componentInstance.variant).toBe(expectedVariant);
    });
  });

  it('should pass shadow="none" to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.shadow).toBe('none');
    });
  });

  it('should pass bordered=false to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.bordered).toBe(false);
    });
  });

  it('should pass stretchHeight=true to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.stretchHeight).toBe(true);
    });
  });

  it('should render a grid container for the value cards', () => {
    const grid = fixture.nativeElement.querySelector('.grid');
    expect(grid).not.toBeNull();
  });
});
