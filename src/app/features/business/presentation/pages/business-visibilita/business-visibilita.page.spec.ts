import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BusinessVisibilitaPage } from './business-visibilita.page';
import {
  BUSINESS_VISIBILITA_STEPS,
  BUSINESS_TARGETING_OPTIONS,
  PLAN_LABELS,
  PLAN_COLORS,
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

  it('should expose planColor from constants', () => {
    expect(component.planColor).toBe(PLAN_COLORS);
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

  it('should render the step number for the first step', () => {
    const firstNumber = fixture.nativeElement.querySelector('.rounded-full.bg-blue-600');
    expect(firstNumber.textContent.trim()).toBe(String(BUSINESS_VISIBILITA_STEPS[0].number));
  });

  it('should render the step title for the first step', () => {
    const titles = fixture.nativeElement.querySelectorAll('p.font-semibold.text-gray-900');
    expect(titles[0].textContent.trim()).toBe(BUSINESS_VISIBILITA_STEPS[0].title);
  });

  it('should render the step description for the first step', () => {
    const descs = fixture.nativeElement.querySelectorAll('p.mt-1.text-sm');
    expect(descs[0].textContent.trim()).toBe(BUSINESS_VISIBILITA_STEPS[0].description);
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

  it('should render 4 analytics metric cards', () => {
    const cards = fixture.nativeElement.querySelectorAll(
      '.rounded-xl.border.bg-gray-50.text-center',
    );
    expect(cards.length).toBe(4);
  });

  it('should render the Visualizzazioni metric card', () => {
    const cards = fixture.nativeElement.querySelectorAll(
      '.rounded-xl.border.bg-gray-50.text-center',
    );
    expect(cards[0].textContent).toContain('Visualizzazioni');
  });

  it('should render the Candidature ricevute metric card', () => {
    const cards = fixture.nativeElement.querySelectorAll(
      '.rounded-xl.border.bg-gray-50.text-center',
    );
    expect(cards[2].textContent).toContain('Candidature ricevute');
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
