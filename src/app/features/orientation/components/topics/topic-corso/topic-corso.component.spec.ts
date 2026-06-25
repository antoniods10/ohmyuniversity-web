import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TopicCorsoComponent } from './topic-corso.component';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { OrientationStateService } from 'src/app/core/application/state/orientation/orientation.state';
import { ToastService } from '@ui/custom-toast/toast.service';
import { STUDY_AREA_TIPS } from '@constants';

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function (): void {};
}

describe('TopicCorsoComponent', () => {
  let component: TopicCorsoComponent;
  let fixture: ComponentFixture<TopicCorsoComponent>;
  let stateServiceMock: {
    getAnswer: ReturnType<typeof vi.fn>;
    saveAnswer: ReturnType<typeof vi.fn>;
  };
  let toastServiceMock: { success: ReturnType<typeof vi.fn> };

  async function setupComponent(initialAnswer: string | null = null): Promise<void> {
    TestBed.resetTestingModule();

    stateServiceMock = {
      getAnswer: vi.fn().mockReturnValue(initialAnswer),
      saveAnswer: vi.fn(),
    };
    toastServiceMock = { success: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [TopicCorsoComponent],
      providers: [
        { provide: OrientationStateService, useValue: stateServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicCorsoComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('hasPrev', true);
    fixture.componentRef.setInput('hasNext', true);
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
    expect(h2.textContent).toContain('Scegli il corso adatto a te');
  });

  it('should render one accordion row per area in areeEstese', () => {
    expect(component.areeEstese).toHaveLength(6);
    const rows = fixture.nativeElement.querySelectorAll('button.group');
    expect(rows.length).toBe(component.areeEstese.length);
  });

  it('should render each area label', () => {
    component.areeEstese.forEach(area => {
      expect(fixture.nativeElement.textContent).toContain(area.label);
    });
  });

  it('should render the "Come orientarsi nella scelta" section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Come orientarsi nella scelta');
  });

  it('should render one CardStatus per consiglio from STUDY_AREA_TIPS', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatusComponent));
    expect(cards.length).toBeGreaterThanOrEqual(STUDY_AREA_TIPS.length);
  });

  it('should render the inline question text', () => {
    expect(fixture.nativeElement.textContent).toContain(component.question.text);
  });

  it('should render the app-orientation-nav component', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav).not.toBeNull();
  });

  it('should pass hasPrev/hasNext to orientation-nav', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav.componentInstance.hasPrev()).toBe(true);
    expect(nav.componentInstance.hasNext()).toBe(true);
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

  describe('accordion behavior', () => {
    it('starts with no area expanded', () => {
      expect(component.isExpanded('umanistica')).toBe(false);
    });

    it('expands an area when toggled', () => {
      component.toggleArea('umanistica');
      expect(component.isExpanded('umanistica')).toBe(true);
    });

    it('collapses an already expanded area when toggled again', () => {
      component.toggleArea('umanistica');
      component.toggleArea('umanistica');
      expect(component.isExpanded('umanistica')).toBe(false);
    });

    it('only keeps one area expanded at a time', () => {
      component.toggleArea('umanistica');
      component.toggleArea('scientifica');

      expect(component.isExpanded('umanistica')).toBe(false);
      expect(component.isExpanded('scientifica')).toBe(true);
    });
  });

  describe('selectedValue / isSelected', () => {
    it('reflects null when the state service has no saved answer', () => {
      expect(component.selectedValue()).toBeNull();
    });

    it('reflects the value already saved in the state service at creation time', async () => {
      await setupComponent('ingegneria');
      expect(component.selectedValue()).toBe('ingegneria');
      expect(component.isSelected('ingegneria')).toBe(true);
    });
  });

  describe('getAreaIcon', () => {
    it('returns an icon for a known area value', () => {
      expect(component.getAreaIcon('umanistica')).toBeTruthy();
    });

    it('returns null for an unknown area value', () => {
      expect(component.getAreaIcon('not-a-real-area')).toBeNull();
    });
  });

  describe('onSelect', () => {
    it('saves the answer with the correct topicId and label', () => {
      const option = component.question.options![0];

      component.onSelect(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.question.id,
        'corso',
        option.value,
        option.label,
      );
    });

    it('shows a success toast including the selected area label', () => {
      const option = component.question.options![0];

      component.onSelect(option.value);

      expect(toastServiceMock.success).toHaveBeenCalledWith(`Area selezionata: ${option.label}`, {
        duration: 3000,
      });
    });
  });

  describe('scrollToQuestion', () => {
    it('does not throw when called', () => {
      expect(() => component.scrollToQuestion()).not.toThrow();
    });

    it('calls scrollIntoView on the question element rendered by the template', () => {
      const el = document.getElementById('domanda-corso');
      expect(el).not.toBeNull();

      const scrollSpy = vi.spyOn(el!, 'scrollIntoView').mockImplementation(() => {});

      component.scrollToQuestion();

      expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    });
  });
});
