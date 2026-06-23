import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BusinessVisibilitaPage } from './business-visibilita.page';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardSimpleComponent, CardStatusComponent } from '@ui/custom-card/card-variants.component';
import {
  BUSINESS_VISIBILITA_STEPS,
  BUSINESS_TARGETING_OPTIONS,
  BUSINESS_ANALYTICS_METRICS,
  PLAN_LABELS,
} from '@constants';

describe('BusinessVisibilitaPage', () => {
  let component: BusinessVisibilitaPage;
  let fixture: ComponentFixture<BusinessVisibilitaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessVisibilitaPage],
      providers: [provideRouter([])],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessVisibilitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should expose steps from constants', () => {
    expect(component.steps).toBe(BUSINESS_VISIBILITA_STEPS);
  });

  it('should expose targetingOptions from constants', () => {
    expect(component.targetingOptions).toBe(BUSINESS_TARGETING_OPTIONS);
  });

  it('should expose planLabel from constants', () => {
    expect(component.planLabel).toBe(PLAN_LABELS);
  });

  it('should expose a planVariant map with entries for tutti, professional and enterprise', () => {
    expect(component.planVariant['tutti']).toBe('success');
    expect(component.planVariant['professional']).toBe('info');
    expect(component.planVariant['enterprise']).toBe('secondary');
  });

  it('should render app-business-hero', () => {
    const hero = fixture.nativeElement.querySelector('app-business-hero');
    expect(hero).not.toBeNull();
  });

  it('should render app-business-cta', () => {
    const cta = fixture.nativeElement.querySelector('app-business-cta');
    expect(cta).not.toBeNull();
  });

  it('should render the steps section heading', () => {
    const heading = fixture.nativeElement.querySelector('h2');
    expect(heading.textContent.trim()).toBe("Il percorso di un'opportunità");
  });

  it('should render one step row for each step in constants', () => {
    const stepRows = fixture.nativeElement.querySelectorAll(
      'section:first-of-type .flex.items-start',
    );
    expect(stepRows.length).toBe(BUSINESS_VISIBILITA_STEPS.length);
  });

  it('should render a numbered badge for each step, in order', () => {
    const numberBadges = fixture.debugElement
      .queryAll(By.directive(CustomBadgeComponent))
      .map(de => de.componentInstance as CustomBadgeComponent)
      .filter(instance => instance.shape === 'pill' && instance.size === 'lg');

    expect(numberBadges.length).toBe(BUSINESS_VISIBILITA_STEPS.length);
    numberBadges.forEach((badge, i) => {
      expect(badge.label).toBe(BUSINESS_VISIBILITA_STEPS[i].number.toString());
    });
  });

  it('should render the title and description for the first step via app-card-status', () => {
    const statusCards = fixture.debugElement
      .queryAll(By.directive(CardStatusComponent))
      .map(de => de.componentInstance as CardStatusComponent);

    expect(statusCards[0].title).toBe(BUSINESS_VISIBILITA_STEPS[0].title);
    expect(statusCards[0].description).toBe(BUSINESS_VISIBILITA_STEPS[0].description);
  });

  it('should render the targeting section heading', () => {
    const headings = fixture.nativeElement.querySelectorAll('h2');
    expect(headings[1].textContent.trim()).toBe('Opzioni di targeting disponibili');
  });

  it('should render the targeting table', () => {
    const table = fixture.nativeElement.querySelector('table');
    expect(table).not.toBeNull();
  });

  it('should render table headers', () => {
    const headers = fixture.nativeElement.querySelectorAll('th');
    expect(headers[0].textContent.trim()).toBe('Criterio');
    expect(headers[1].textContent.trim()).toBe('Cosa fa');
    expect(headers[2].textContent.trim()).toBe('Disponibile in');
  });

  it('should render one table row for each targeting option', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(BUSINESS_TARGETING_OPTIONS.length);
  });

  it('should render the label for the first targeting option', () => {
    const firstCell = fixture.nativeElement.querySelector('tbody tr td');
    expect(firstCell.textContent.trim()).toBe(BUSINESS_TARGETING_OPTIONS[0].label);
  });

  it('should render the analytics section heading', () => {
    const headings = fixture.nativeElement.querySelectorAll('h2');
    expect(headings[2].textContent.trim()).toBe('Misuri tutto, in tempo reale');
  });

  it('should render one app-card-simple per analytics metric', () => {
    const metricCards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    expect(metricCards.length).toBe(BUSINESS_ANALYTICS_METRICS.length);
  });

  it('should pass the correct title and body to each analytics metric card', () => {
    const metricCards = fixture.debugElement
      .queryAll(By.directive(CardSimpleComponent))
      .map(de => de.componentInstance as CardSimpleComponent);

    BUSINESS_ANALYTICS_METRICS.forEach((metric, i) => {
      expect(metricCards[i].title).toBe(metric.label);
      expect(metricCards[i].body).toBe(metric.desc);
    });
  });

  it('should pass correct title to app-business-hero', () => {
    const hero = fixture.nativeElement.querySelector('app-business-hero');
    expect(hero.getAttribute('title')).toBe('Come funziona la visibilità');
  });

  it('should pass correct primaryLink to app-business-cta', () => {
    const cta = fixture.nativeElement.querySelector('app-business-cta');
    expect(cta.getAttribute('primarylink')).toBe('/business/registrazione');
  });

  it('should pass correct secondaryLink to app-business-cta', () => {
    const cta = fixture.nativeElement.querySelector('app-business-cta');
    expect(cta.getAttribute('secondarylink')).toBe('/business/prezzi');
  });
});
