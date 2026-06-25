import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrientationResultComponent } from './orientation-result.component';
import { OrientationResult } from 'src/app/core/application/state/orientation/orientation-scoring';
import { OrientationStateService } from 'src/app/core/application/state/orientation/orientation.state';

const SAMPLE_UNIVERSITY = {
  id: 'polimi',
  name: 'Politecnico di Milano',
  shortName: 'PoliMi',
  emailDomains: ['polimi.it'],
  city: 'Milano',
  type: 'statale' as const,
  campuses: [],
};

const SAMPLE_RESULT: OrientationResult = {
  topAreas: [
    { areaId: 'ingegneria', label: 'Ingegneria & Informatica', percentage: 60 },
    { areaId: 'scientifica', label: 'Scientifica', percentage: 25 },
    { areaId: 'economica', label: 'Economica & Giuridica', percentage: 15 },
  ],
  dominantArea: { areaId: 'ingegneria', label: 'Ingegneria & Informatica', percentage: 60 },
  suggestedUniversities: [
    {
      university: SAMPLE_UNIVERSITY,
      matchReason: 'Eccellente per ingegneria.',
      tuitionRange: '900-4.000 €/anno',
      relevantCourses: ['Ingegneria Informatica', 'Ingegneria Gestionale'],
    },
  ],
  awarenessTips: [{ titolo: 'Hai le idee abbastanza chiare', testo: 'Testo di esempio.' }],
  estimatedMonthlyBudget: '750-1.050 €/mese (affitto + vitto + trasporti)',
  geoPreferenceLabel: 'Nord - grandi città',
  budgetTips: [
    { titolo: 'Il tuo budget è nella media per questa zona', testo: 'Testo di esempio.' },
  ],
};

describe('OrientationResultComponent', () => {
  let component: OrientationResultComponent;
  let fixture: ComponentFixture<OrientationResultComponent>;
  let stateServiceMock: { result: ReturnType<typeof vi.fn> };

  async function setupComponent(result: OrientationResult | null): Promise<void> {
    TestBed.resetTestingModule();

    stateServiceMock = { result: vi.fn().mockReturnValue(result) };

    await TestBed.configureTestingModule({
      imports: [OrientationResultComponent],
      providers: [{ provide: OrientationStateService, useValue: stateServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(OrientationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  describe('when the result is null (profile incomplete)', () => {
    beforeEach(async () => {
      await setupComponent(null);
    });

    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the incomplete-state heading', () => {
      const h1 = fixture.nativeElement.querySelector('h1');
      expect(h1.textContent).toContain('Quasi fatto');
    });

    it('should not render the dominant area heading', () => {
      expect(fixture.nativeElement.textContent).not.toContain('Ingegneria & Informatica');
    });

    it('emits backToSummary when the button is clicked', () => {
      const spy = vi.fn();
      component.backToSummary.subscribe(spy);
      component.backToSummary.emit();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the result is available (profile complete)', () => {
    beforeEach(async () => {
      await setupComponent(SAMPLE_RESULT);
    });

    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the dominant area as the main heading', () => {
      const h1 = fixture.nativeElement.querySelector('h1');
      expect(h1.textContent).toContain('Ingegneria & Informatica');
    });

    it('should render all 3 top areas with their percentages', () => {
      SAMPLE_RESULT.topAreas.forEach(area => {
        expect(fixture.nativeElement.textContent).toContain(area.label);
        expect(fixture.nativeElement.textContent).toContain(`${area.percentage}%`);
      });
    });

    it('should render the suggested university short name', () => {
      expect(fixture.nativeElement.textContent).toContain('PoliMi');
    });

    it('should render the suggested university city', () => {
      expect(fixture.nativeElement.textContent).toContain('Milano');
    });

    it('should render the relevant courses for the suggested university', () => {
      SAMPLE_RESULT.suggestedUniversities[0].relevantCourses.forEach(course => {
        expect(fixture.nativeElement.textContent).toContain(course);
      });
    });

    it('should render the tuition range', () => {
      expect(fixture.nativeElement.textContent).toContain('900-4.000 €/anno');
    });

    it('should render the estimated monthly budget and geo preference label', () => {
      expect(fixture.nativeElement.textContent).toContain(SAMPLE_RESULT.estimatedMonthlyBudget);
      expect(fixture.nativeElement.textContent).toContain(SAMPLE_RESULT.geoPreferenceLabel);
    });

    it('should render the budget tips', () => {
      SAMPLE_RESULT.budgetTips.forEach(tip => {
        expect(fixture.nativeElement.textContent).toContain(tip.titolo);
      });
    });

    it('should render the awareness tips', () => {
      SAMPLE_RESULT.awarenessTips.forEach(tip => {
        expect(fixture.nativeElement.textContent).toContain(tip.titolo);
      });
    });

    it('emits backToSummary when the button is clicked', () => {
      const spy = vi.fn();
      component.backToSummary.subscribe(spy);
      component.backToSummary.emit();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when there are no suggested universities', () => {
    it('does not render the universities section', async () => {
      await setupComponent({ ...SAMPLE_RESULT, suggestedUniversities: [] });
      expect(fixture.nativeElement.textContent).not.toContain('Università su cui puntare');
    });
  });

  describe('when estimatedMonthlyBudget is null', () => {
    it('does not render the budget section', async () => {
      await setupComponent({ ...SAMPLE_RESULT, estimatedMonthlyBudget: null });
      expect(fixture.nativeElement.textContent).not.toContain('Il tuo budget mensile');
    });
  });

  describe('getUniversityTypeLabel', () => {
    beforeEach(async () => {
      await setupComponent(SAMPLE_RESULT);
    });

    it('translates known types to Italian labels', () => {
      expect(component.getUniversityTypeLabel('statale')).toBe('Statale');
      expect(component.getUniversityTypeLabel('privata')).toBe('Privata');
      expect(component.getUniversityTypeLabel('telematica')).toBe('Telematica');
    });

    it('falls back to the raw type for an unrecognized value', () => {
      expect(component.getUniversityTypeLabel('unknown-type')).toBe('unknown-type');
    });
  });

  describe('getUniversityTypeVariant', () => {
    beforeEach(async () => {
      await setupComponent(SAMPLE_RESULT);
    });

    it('maps known types to the expected badge variant', () => {
      expect(component.getUniversityTypeVariant('statale')).toBe('primary');
      expect(component.getUniversityTypeVariant('privata')).toBe('warning');
      expect(component.getUniversityTypeVariant('telematica')).toBe('success');
    });

    it('falls back to "neutral" for an unrecognized value', () => {
      expect(component.getUniversityTypeVariant('unknown-type')).toBe('neutral');
    });
  });

  describe('getAreaVariant', () => {
    beforeEach(async () => {
      await setupComponent(SAMPLE_RESULT);
    });

    it('returns "primary" for index 0', () => {
      expect(component.getAreaVariant(0)).toBe('primary');
    });

    it('returns "info" for index 1', () => {
      expect(component.getAreaVariant(1)).toBe('info');
    });

    it('returns "neutral" for any other index', () => {
      expect(component.getAreaVariant(2)).toBe('neutral');
      expect(component.getAreaVariant(10)).toBe('neutral');
    });
  });
});
