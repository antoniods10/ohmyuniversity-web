import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TopicCostiGeograficiComponent } from './topic-aree-geografiche.component';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { OrientationStateService } from '@orientation/application/state/orientation.state';
import { ToastService } from '@ui/custom-toast/toast.service';
import { GEOGRAPHIC_AREA_COSTS, TOP_CITIES, GEO_TIPS } from '@constants';

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function (): void {};
}

describe('TopicCostiGeograficiComponent', () => {
  let component: TopicCostiGeograficiComponent;
  let fixture: ComponentFixture<TopicCostiGeograficiComponent>;
  let stateServiceMock: { getAnswer: ReturnType<typeof vi.fn>; saveAnswer: ReturnType<typeof vi.fn> };
  let toastServiceMock: { success: ReturnType<typeof vi.fn> };

  async function setupComponent(answers: Record<string, string | null> = {}): Promise<void> {
    TestBed.resetTestingModule();

    stateServiceMock = {
      getAnswer: vi.fn((id: string) => answers[id] ?? null),
      saveAnswer: vi.fn(),
    };
    toastServiceMock = { success: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [TopicCostiGeograficiComponent],
      providers: [
        { provide: OrientationStateService, useValue: stateServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicCostiGeograficiComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('hasPrev', true);
    fixture.componentRef.setInput('hasNext', false);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await setupComponent();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main h2 heading', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('Dove studiare in Italia');
  });

  it('should render one cost card per area from GEOGRAPHIC_AREA_COSTS', () => {
    GEOGRAPHIC_AREA_COSTS.forEach(area => {
      expect(fixture.nativeElement.textContent).toContain(area.affittoCamera);
    });
  });

  it('should render one accordion row per city from TOP_CITIES', () => {
    expect(component.cittaTop).toHaveLength(TOP_CITIES.length);
    TOP_CITIES.forEach(citta => {
      expect(fixture.nativeElement.textContent).toContain(citta.citta);
    });
  });

  it('should render the tips section with entries from GEO_TIPS', () => {
    GEO_TIPS.forEach(tip => {
      expect(fixture.nativeElement.textContent).toContain(tip.titolo);
    });
  });

  it('should render the app-orientation-nav component', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav).not.toBeNull();
  });

  it('should emit prev/next/backToList when orientation-nav emits them', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));

    const prevSpy = vi.fn();
    const nextSpy = vi.fn();
    const backSpy = vi.fn();
    component.prev.subscribe(prevSpy);
    component.next.subscribe(nextSpy);
    component.backToList.subscribe(backSpy);

    nav.componentInstance.prev.emit();
    nav.componentInstance.next.emit();
    nav.componentInstance.backToList.emit();

    expect(prevSpy).toHaveBeenCalledTimes(1);
    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(backSpy).toHaveBeenCalledTimes(1);
  });

  describe('area tabs', () => {
    it('defaults to "Nord" as the active area', () => {
      expect(component.activeArea()).toBe('Nord');
      expect(component.isActiveArea('Nord')).toBe(true);
    });

    it('switches the active area when setActiveArea is called', () => {
      component.setActiveArea('Centro');
      expect(component.activeArea()).toBe('Centro');
      expect(component.isActiveArea('Centro')).toBe(true);
      expect(component.isActiveArea('Nord')).toBe(false);
    });
  });

  describe('city accordion', () => {
    it('starts with no city expanded', () => {
      expect(component.isCittaExpanded('Bologna')).toBe(false);
    });

    it('expands a city when toggled', () => {
      component.toggleCitta('Bologna');
      expect(component.isCittaExpanded('Bologna')).toBe(true);
    });

    it('collapses an already expanded city when toggled again', () => {
      component.toggleCitta('Bologna');
      component.toggleCitta('Bologna');
      expect(component.isCittaExpanded('Bologna')).toBe(false);
    });

    it('only keeps one city expanded at a time', () => {
      component.toggleCitta('Bologna');
      component.toggleCitta('Milano');

      expect(component.isCittaExpanded('Bologna')).toBe(false);
      expect(component.isCittaExpanded('Milano')).toBe(true);
    });
  });

  describe('getCostoVariant', () => {
    it('returns "success" for Sud e Isole', () => {
      expect(component.getCostoVariant('Sud e Isole')).toBe('success');
    });

    it('returns "warning" for Centro', () => {
      expect(component.getCostoVariant('Centro')).toBe('warning');
    });

    it('returns "error" for any other area (e.g. Nord)', () => {
      expect(component.getCostoVariant('Nord')).toBe('error');
    });
  });

  describe('icon and color helpers', () => {
    it('getAreaIcon returns a known icon for a recognized area', () => {
      expect(component.getAreaIcon('Nord')).toBeTruthy();
    });

    it('getCittaIcon returns a known icon for a recognized city', () => {
      expect(component.getCittaIcon('Bologna')).toBeTruthy();
    });

    it('getCittaColors falls back to the Bologna palette for an unrecognized city', () => {
      const fallback = component.getCittaColors('Bologna');
      expect(component.getCittaColors('Città Inesistente')).toEqual(fallback);
    });
  });

  describe('signals reflect saved answers', () => {
    it('return null when no answer has been saved', () => {
      expect(component.selectedAreaPreference()).toBeNull();
      expect(component.selectedCityPriority()).toBeNull();
    });

    it('reflect the value already saved at creation time', async () => {
      await setupComponent({ [component.questionAreaPreference.id]: 'nord' });
      expect(component.selectedAreaPreference()).toBe('nord');
    });
  });

  describe('onSelectAreaPreference / onSelectCityPriority', () => {
    it('saves the area preference answer with the correct topicId', () => {
      const option = component.questionAreaPreference.options![0];
      component.onSelectAreaPreference(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionAreaPreference.id,
        'costi-geografici',
        option.value,
        option.label,
      );
    });

    it('saves the city priority answer with the correct topicId', () => {
      const option = component.questionCityPriority.options![0];
      component.onSelectCityPriority(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionCityPriority.id,
        'costi-geografici',
        option.value,
        option.label,
      );
    });

    it('does nothing when re-selecting an already-saved value', async () => {
      const option = component.questionAreaPreference.options![0];
      await setupComponent({ [component.questionAreaPreference.id]: option.value });

      component.onSelectAreaPreference(option.value);

      expect(stateServiceMock.saveAnswer).not.toHaveBeenCalled();
    });
  });

  describe('scrollToQuestion', () => {
    it('does not throw when called', () => {
      expect(() => component.scrollToQuestion()).not.toThrow();
    });

    it('calls scrollIntoView on the question element rendered by the template', () => {
      const el = document.getElementById('domanda-geo');
      expect(el).not.toBeNull();

      const scrollSpy = vi.spyOn(el!, 'scrollIntoView').mockImplementation(() => {});

      component.scrollToQuestion();

      expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    });
  });
});
