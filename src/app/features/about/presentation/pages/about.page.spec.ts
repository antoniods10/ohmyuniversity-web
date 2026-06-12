import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutPage } from './about.page';
import { provideRouter } from '@angular/router';
import { AboutHeroComponent } from '../components/about-hero/about-hero.component';
import { AboutOrgComponent } from '../components/about-org/about-org.component';
import { AboutValuesComponent } from '../components/about-values/about-values.component';
import { AboutTeamComponent } from '../components/about-team/about-team.component';
import { AboutCtaComponent } from '../components/about-cta/about-cta.component';
import { By } from '@angular/platform-browser';

describe('AboutPage', () => {
  let component: AboutPage;
  let fixture: ComponentFixture<AboutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-about-hero', () => {
    const el = fixture.debugElement.query(By.directive(AboutHeroComponent));
    expect(el).not.toBeNull();
  });

  it('should render app-about-org', () => {
    const el = fixture.debugElement.query(By.directive(AboutOrgComponent));
    expect(el).not.toBeNull();
  });

  it('should render app-about-values', () => {
    const el = fixture.debugElement.query(By.directive(AboutValuesComponent));
    expect(el).not.toBeNull();
  });

  it('should render app-about-team', () => {
    const el = fixture.debugElement.query(By.directive(AboutTeamComponent));
    expect(el).not.toBeNull();
  });

  it('should render app-about-cta', () => {
    const el = fixture.debugElement.query(By.directive(AboutCtaComponent));
    expect(el).not.toBeNull();
  });

  it('should render all 5 child components', () => {
    const hero = fixture.debugElement.query(By.directive(AboutHeroComponent));
    const org = fixture.debugElement.query(By.directive(AboutOrgComponent));
    const values = fixture.debugElement.query(By.directive(AboutValuesComponent));
    const team = fixture.debugElement.query(By.directive(AboutTeamComponent));
    const cta = fixture.debugElement.query(By.directive(AboutCtaComponent));
    expect([hero, org, values, team, cta].every(el => el !== null)).toBe(true);
  });
});
