import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomePage } from './home.page';
import { HomeHeroComponent } from '../components/home-hero/home-hero.component';
import { HomeStatsComponent } from '../components/home-stats/home-stats.component';
import { HomeFeaturesComponent } from '../components/home-features/home-features.component';
import { HomeHowItWorksComponent } from '../components/home-how-it-works/home-how-it-works.component';
import { HomeReviewsComponent } from '../components/home-reviews/home-reviews.component';
import { HomeCtaComponent } from '../components/home-cta/home-cta.component';
import { By } from '@angular/platform-browser';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-home-hero', () => {
    const el = fixture.debugElement.query(By.directive(HomeHeroComponent));
    expect(el).toBeTruthy();
  });

  it('should render app-home-stats', () => {
    const el = fixture.debugElement.query(By.directive(HomeStatsComponent));
    expect(el).toBeTruthy();
  });

  it('should render app-home-features', () => {
    const el = fixture.debugElement.query(By.directive(HomeFeaturesComponent));
    expect(el).toBeTruthy();
  });

  it('should render app-home-how-it-works', () => {
    const el = fixture.debugElement.query(By.directive(HomeHowItWorksComponent));
    expect(el).toBeTruthy();
  });

  it('should render app-home-reviews', () => {
    const el = fixture.debugElement.query(By.directive(HomeReviewsComponent));
    expect(el).toBeTruthy();
  });

  it('should render app-home-cta', () => {
    const el = fixture.debugElement.query(By.directive(HomeCtaComponent));
    expect(el).toBeTruthy();
  });

  it('should render all six child components', () => {
    const components = [
      HomeHeroComponent,
      HomeStatsComponent,
      HomeFeaturesComponent,
      HomeHowItWorksComponent,
      HomeReviewsComponent,
      HomeCtaComponent,
    ];
    components.forEach(c => {
      expect(fixture.debugElement.query(By.directive(c))).toBeTruthy();
    });
  });
});
