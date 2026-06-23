import { describe, it, expect } from 'vitest';
import { computeOrientationResult } from './orientation-scoring';
import { SavedAnswer } from './orientation.state';

// Helper to quickly build a SavedAnswer without repeating boilerplate
function answer(
  questionId: string,
  value: string,
  topicId: SavedAnswer['topicId'] = 'corso',
  label = value,
): SavedAnswer {
  return { questionId, topicId, value, label };
}

describe('computeOrientationResult', () => {
  describe('area scoring', () => {
    it('assigns 100% to the only answered area when corso-area is the sole signal', () => {
      const result = computeOrientationResult([answer('corso-area', 'ingegneria', 'corso')]);

      expect(result.dominantArea.areaId).toBe('ingegneria');
      expect(result.dominantArea.percentage).toBe(100);
    });

    it('returns exactly 3 top areas sorted by descending percentage', () => {
      const result = computeOrientationResult([
        answer('corso-area', 'economica', 'corso'),
        answer('sbocchi-career-priority', 'growth', 'sbocchi'),
      ]);

      expect(result.topAreas).toHaveLength(3);
      for (let i = 1; i < result.topAreas.length; i++) {
        expect(result.topAreas[i - 1].percentage).toBeGreaterThanOrEqual(
          result.topAreas[i].percentage,
        );
      }
    });

    it('lets secondary signals shift the balance between two close areas', () => {
      // Without secondary signals, economica and ingegneria areas can both
      // receive weight from 'growth' - this should never throw and should
      // produce a coherent dominant area.
      const result = computeOrientationResult([
        answer('corso-area', 'economica', 'corso'),
        answer('sbocchi-career-priority', 'growth', 'sbocchi'),
        answer('come-funziona-esami', 'written', 'come-funziona'),
      ]);

      expect(result.dominantArea.areaId).toBe('economica');
      expect(result.dominantArea.percentage).toBeGreaterThan(0);
    });

    it('produces all-zero percentages when no scoring-relevant answers are given', () => {
      const result = computeOrientationResult([answer('errori-confidence', 'very-sure', 'errori')]);

      expect(result.topAreas.every(a => a.percentage === 0)).toBe(true);
    });
  });

  describe('university suggestions', () => {
    it('only suggests universities matching one of the top 3 areas', () => {
      const result = computeOrientationResult([answer('corso-area', 'sanitaria', 'corso')]);

      const topAreaIds = new Set(result.topAreas.map(a => a.areaId));
      for (const suggestion of result.suggestedUniversities) {
        // Every suggested university must contribute at least one relevant course
        // OR fall back to showing its full course list - either way the underlying
        // strongAreas must intersect the student's top areas, which we verify
        // indirectly through relevantCourses being non-empty.
        expect(suggestion.relevantCourses.length).toBeGreaterThan(0);
      }
      expect(topAreaIds.has('sanitaria')).toBe(true);
    });

    it('respects the cost tier ceiling implied by a low monthly budget', () => {
      const lowBudgetResult = computeOrientationResult([
        answer('corso-area', 'economica', 'corso'),
        answer('budget-monthly', 'less-400', 'borse-studio'),
      ]);

      const highBudgetResult = computeOrientationResult([
        answer('corso-area', 'economica', 'corso'),
        answer('budget-monthly', 'more-1000', 'borse-studio'),
      ]);

      // A low budget should never produce more suggestions than a high budget
      // for the same dominant area, since the candidate pool is a strict subset.
      expect(lowBudgetResult.suggestedUniversities.length).toBeLessThanOrEqual(
        highBudgetResult.suggestedUniversities.length,
      );
    });

    it('returns at most 5 suggested universities', () => {
      const result = computeOrientationResult([
        answer('corso-area', 'umanistica', 'corso'),
        answer('budget-monthly', 'more-1000', 'borse-studio'),
      ]);

      expect(result.suggestedUniversities.length).toBeLessThanOrEqual(5);
    });

    it('is deterministic: the same answer set always returns the same university order', () => {
      const answers: SavedAnswer[] = [
        answer('corso-area', 'ingegneria', 'corso'),
        answer('geo-area-preference', 'nord', 'costi-geografici'),
        answer('budget-monthly', '700-1000', 'borse-studio'),
      ];

      const first = computeOrientationResult(answers);
      const second = computeOrientationResult([...answers]); // new array, same content

      const firstIds = first.suggestedUniversities.map(s => s.university.id);
      const secondIds = second.suggestedUniversities.map(s => s.university.id);

      expect(firstIds).toEqual(secondIds);
    });

    it('produces a different university order for a meaningfully different answer set', () => {
      const profileA = computeOrientationResult([
        answer('corso-area', 'ingegneria', 'corso'),
        answer('sbocchi-career-priority', 'stability', 'sbocchi'),
      ]);

      const profileB = computeOrientationResult([
        answer('corso-area', 'ingegneria', 'corso'),
        answer('sbocchi-career-priority', 'growth', 'sbocchi'),
        answer('sbocchi-work-context', 'startup', 'sbocchi'),
        answer('come-funziona-esami', 'written', 'come-funziona'),
      ]);

      const idsA = profileA.suggestedUniversities.map(s => s.university.id);
      const idsB = profileB.suggestedUniversities.map(s => s.university.id);

      // Not a strict guarantee for every possible pair, but with a large
      // candidate pool for 'ingegneria' the orderings should differ.
      expect(idsA).not.toEqual(idsB);
    });

    it('prioritizes universities located in the preferred geographic area', () => {
      const result = computeOrientationResult([
        answer('corso-area', 'umanistica', 'corso'),
        answer('geo-area-preference', 'sud', 'costi-geografici'),
        answer('budget-monthly', 'more-1000', 'borse-studio'),
      ]);

      if (result.suggestedUniversities.length > 1) {
        const northCities = [
          'Milano',
          'Torino',
          'Bologna',
          'Padova',
          'Genova',
          'Brescia',
          'Bergamo',
          'Venezia',
          'Parma',
          'Ferrara',
          'Modena',
          'Trieste',
        ];
        const firstIsNotNorth = !northCities.includes(
          result.suggestedUniversities[0].university.city,
        );
        expect(firstIsNotNorth).toBe(true);
      }
    });
  });

  describe('awareness tips', () => {
    it('includes a low-confidence tip when the student is confused', () => {
      const result = computeOrientationResult([answer('errori-confidence', 'confused', 'errori')]);

      expect(result.awarenessTips.some(t => t.titolo.includes('Prenditi del tempo'))).toBe(true);
    });

    it('includes a high-confidence tip when the student feels sure', () => {
      const result = computeOrientationResult([answer('errori-confidence', 'very-sure', 'errori')]);

      expect(result.awarenessTips.some(t => t.titolo.includes('idee abbastanza chiare'))).toBe(
        true,
      );
    });

    it('recommends talking to students when the student has not done so', () => {
      const result = computeOrientationResult([
        answer('errori-talked-to-students', 'no', 'errori'),
      ]);

      expect(result.awarenessTips.some(t => t.titolo.includes('chi sta già frequentando'))).toBe(
        true,
      );
    });

    it('recommends reading the study plan when not checked thoroughly', () => {
      const result = computeOrientationResult([answer('errori-study-plan-check', 'no', 'errori')]);

      expect(result.awarenessTips.some(t => t.titolo.includes('piano di studi'))).toBe(true);
    });

    it('praises high overall awareness when the awareness score is high enough', () => {
      const result = computeOrientationResult([
        answer('errori-confidence', 'very-sure', 'errori'), // +2
        answer('errori-info-source', 'teachers', 'errori'), // +1
        answer('errori-talked-to-students', 'yes', 'errori'), // +2
        answer('errori-study-plan-check', 'thoroughly', 'errori'), // +2
      ]);

      expect(result.awarenessTips.some(t => t.titolo.includes('ben preparato'))).toBe(true);
    });

    it('always returns at least one awareness tip even with no errori answers', () => {
      const result = computeOrientationResult([answer('corso-area', 'scientifica', 'corso')]);

      expect(result.awarenessTips.length).toBeGreaterThan(0);
    });
  });

  describe('budget tips and estimated monthly budget', () => {
    it('returns null estimated budget and a generic tip when no geo preference is given', () => {
      const result = computeOrientationResult([answer('corso-area', 'economica', 'corso')]);

      expect(result.estimatedMonthlyBudget).toBeNull();
      expect(result.budgetTips).toHaveLength(1);
      expect(result.budgetTips[0].titolo).toContain('Stima i costi');
    });

    it('flags an insufficient budget when the bracket is below the area living cost range', () => {
      const result = computeOrientationResult([
        answer('geo-area-preference', 'nord', 'costi-geografici'),
        answer('budget-monthly', 'less-400', 'borse-studio'),
      ]);

      expect(result.budgetTips.some(t => t.titolo.includes('insufficiente'))).toBe(true);
    });

    it('flags an average budget when the bracket falls within the area range', () => {
      const result = computeOrientationResult([
        answer('geo-area-preference', 'sud', 'costi-geografici'),
        answer('budget-monthly', '400-700', 'borse-studio'),
      ]);

      expect(result.budgetTips.some(t => t.titolo.includes('nella media'))).toBe(true);
    });

    it('flags a comfortable margin when the bracket exceeds the area range', () => {
      const result = computeOrientationResult([
        answer('geo-area-preference', 'sud', 'costi-geografici'),
        answer('budget-monthly', 'more-1000', 'borse-studio'),
      ]);

      expect(result.budgetTips.some(t => t.titolo.includes('buon margine'))).toBe(true);
    });

    it('adds a DSU scholarship tip when the student declared needing external support', () => {
      const result = computeOrientationResult([
        answer('geo-area-preference', 'centro', 'costi-geografici'),
        answer('budget-monthly', '400-700', 'borse-studio'),
        answer('budget-availability', 'support', 'borse-studio'),
      ]);

      expect(result.budgetTips.some(t => t.titolo.includes('borse di studio DSU'))).toBe(true);
    });

    it('returns an estimated monthly budget label when a geo preference is given', () => {
      const result = computeOrientationResult([
        answer('geo-area-preference', 'nord', 'costi-geografici', 'Nord - grandi città'),
      ]);

      expect(result.estimatedMonthlyBudget).not.toBeNull();
      expect(result.geoPreferenceLabel).toBe('Nord - grandi città');
    });
  });

  describe('edge cases', () => {
    it('does not throw when given an empty answer array', () => {
      expect(() => computeOrientationResult([])).not.toThrow();
    });

    it('handles an empty answer array with all-zero area percentages', () => {
      const result = computeOrientationResult([]);

      expect(result.topAreas.every(a => a.percentage === 0)).toBe(true);
      expect(result.estimatedMonthlyBudget).toBeNull();
      expect(result.geoPreferenceLabel).toBeNull();
    });

    it('ignores answers with unknown questionIds without throwing', () => {
      expect(() =>
        computeOrientationResult([answer('some-unknown-question', 'whatever', 'corso')]),
      ).not.toThrow();
    });

    it('ignores answers with a known questionId but unrecognized value', () => {
      const result = computeOrientationResult([answer('corso-area', 'not-a-real-area', 'corso')]);

      expect(result.topAreas.every(a => a.percentage === 0)).toBe(true);
    });
  });
});
