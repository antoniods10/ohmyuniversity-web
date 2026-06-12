import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeReviewsComponent } from './home-reviews.component';
import { CardReviewComponent } from '@ui/custom-card/card-variants.component';
import { By } from '@angular/platform-browser';
import { HOME_REVIEWS } from '@constants';

describe('HomeReviewsComponent', () => {
  let component: HomeReviewsComponent;
  let fixture: ComponentFixture<HomeReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeReviewsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeReviewsComponent);
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
    expect(h2.textContent).toContain('Cosa dicono gli studenti');
  });

  it('should render the subtitle paragraph', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toContain('120.000 studenti');
  });

  it('should have a reviews array populated from HOME_REVIEWS constant', () => {
    expect(component.reviews).toBeDefined();
    expect(component.reviews.length).toBe(HOME_REVIEWS.length);
  });

  it('should render one app-card-review per review', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    expect(cards.length).toBe(HOME_REVIEWS.length);
  });

  it('should pass the correct rating to each card (defaults to 5)', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    cards.forEach((card, index) => {
      const expectedRating = HOME_REVIEWS[index].rating ?? 5;
      expect(card.componentInstance.rating).toBe(expectedRating);
    });
  });

  it('should pass the correct body text to each card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.body).toBe(HOME_REVIEWS[index].text);
    });
  });

  it('should pass the correct reviewer name to each card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.reviewer.name).toBe(HOME_REVIEWS[index].name);
    });
  });

  it('should pass the correct reviewer university to each card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.reviewer.university).toBe(HOME_REVIEWS[index].university);
    });
  });

  it('should pass verified correctly to each card (defaults to false)', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    cards.forEach((card, index) => {
      const expectedVerified = HOME_REVIEWS[index].verified ?? false;
      expect(card.componentInstance.verified).toBe(expectedVerified);
    });
  });

  it('should pass showRatingNumber=false to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.showRatingNumber).toBe(false);
    });
  });

  it('should pass stretchHeight=true to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.stretchHeight).toBe(true);
    });
  });

  it('should pass hoverable=true to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.hoverable).toBe(true);
    });
  });

  it('should pass shadow="sm" to every card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.shadow).toBe('sm');
    });
  });

  it('should apply bg-white class to the section', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.classList).toContain('bg-white');
  });

  it('should render a grid container for the review cards', () => {
    const grid = fixture.nativeElement.querySelector('.grid');
    expect(grid).not.toBeNull();
  });
});
