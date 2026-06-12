import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeStatsComponent } from './home-stats.component';
import { CardStatComponent } from '@ui/custom-card/card-variants.component';
import { By } from '@angular/platform-browser';
import { HOME_STATS } from '@constants';

describe('HomeStatsComponent', () => {
  let component: HomeStatsComponent;
  let fixture: ComponentFixture<HomeStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeStatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeStatsComponent);
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

  it('should have a stats array populated from HOME_STATS constant', () => {
    expect(component.stats).toBeDefined();
    expect(component.stats.length).toBe(HOME_STATS.length);
  });

  it('should render one app-card-stat per stat', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    expect(cards.length).toBe(HOME_STATS.length);
  });

  it('should pass the correct value to each stat card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.value).toBe(HOME_STATS[index].value);
    });
  });

  it('should pass the correct label to each stat card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.label).toBe(HOME_STATS[index].label);
    });
  });

  it('should pass the correct prefix to each stat card (defaults to empty string)', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    cards.forEach((card, index) => {
      const expectedPrefix = HOME_STATS[index].prefix ?? '';
      expect(card.componentInstance.prefix).toBe(expectedPrefix);
    });
  });

  it('should pass the correct suffix to each stat card (defaults to empty string)', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    cards.forEach((card, index) => {
      const expectedSuffix = HOME_STATS[index].suffix ?? '';
      expect(card.componentInstance.suffix).toBe(expectedSuffix);
    });
  });

  it('should pass shadow="none" to every stat card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.shadow).toBe('none');
    });
  });

  it('should pass bordered=false to every stat card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.bordered).toBe(false);
    });
  });

  it('should pass padding="sm" to every stat card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.padding).toBe('sm');
    });
  });

  it('should pass stretchHeight=true to every stat card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.stretchHeight).toBe(true);
    });
  });

  it('should render a grid container for the stat cards', () => {
    const grid = fixture.nativeElement.querySelector('.grid');
    expect(grid).not.toBeNull();
  });

  it('should apply bg-gray-50 class to the section', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.classList).toContain('bg-gray-50');
  });

  it('should apply border-y class to the section', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.classList).toContain('border-y');
  });
});
