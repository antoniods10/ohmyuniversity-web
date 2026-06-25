import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TopicSbocchiComponent } from './topic-sbocchi.component';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { SbocchiChartComponent } from '../../charts/sbocchi-chart/sbocchi-chart.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { OrientationStateService } from 'src/app/core/application/state/orientation/orientation.state';
import { ToastService } from '@ui/custom-toast/toast.service';
import { CAREER_AREAS, CAREER_TIPS } from '@constants';

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function (): void {};
}

describe('TopicSbocchiComponent', () => {
  let component: TopicSbocchiComponent;
  let fixture: ComponentFixture<TopicSbocchiComponent>;
  let stateServiceMock: {
    getAnswer: ReturnType<typeof vi.fn>;
    saveAnswer: ReturnType<typeof vi.fn>;
  };
  let toastServiceMock: { success: ReturnType<typeof vi.fn> };

  async function setupComponent(answers: Record<string, string | null> = {}): Promise<void> {
    TestBed.resetTestingModule();

    stateServiceMock = {
      getAnswer: vi.fn((id: string) => answers[id] ?? null),
      saveAnswer: vi.fn(),
    };
    toastServiceMock = { success: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [TopicSbocchiComponent],
      providers: [
        { provide: OrientationStateService, useValue: stateServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicSbocchiComponent);
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
    expect(h2.textContent).toContain('Sbocchi lavorativi');
  });

  it('should render the sbocchi chart component', () => {
    const chart = fixture.debugElement.query(By.directive(SbocchiChartComponent));
    expect(chart).not.toBeNull();
  });

  it('should render the salary table heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Stipendi medi netti');
  });

  it('should render one table row per area from CAREER_AREAS', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(CAREER_AREAS.length);
  });

  it('should render a badge with occupazione percentage per area', () => {
    const badges = fixture.debugElement.queryAll(By.directive(CustomBadgeComponent));
    expect(badges.length).toBeGreaterThanOrEqual(CAREER_AREAS.length);
  });

  it('should render the info banner via CardStatus', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatusComponent));
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should render one timeline entry per tip from CAREER_TIPS', () => {
    CAREER_TIPS.forEach(tip => {
      expect(fixture.nativeElement.textContent).toContain(tip.titolo);
    });
  });

  it('should render the AlmaLaurea callout', () => {
    expect(fixture.nativeElement.textContent).toContain('AlmaLaurea');
  });

  it('should render the app-orientation-nav', () => {
    const nav = fixture.debugElement.query(By.directive(OrientationNavComponent));
    expect(nav).not.toBeNull();
  });

  describe('occupazioneVariant', () => {
    it('returns "success" for occupazione >= 75', () => {
      expect(component.occupazioneVariant(75)).toBe('success');
      expect(component.occupazioneVariant(90)).toBe('success');
      expect(component.occupazioneVariant(100)).toBe('success');
    });

    it('returns "warning" for occupazione >= 55 and < 75', () => {
      expect(component.occupazioneVariant(55)).toBe('warning');
      expect(component.occupazioneVariant(65)).toBe('warning');
      expect(component.occupazioneVariant(74)).toBe('warning');
    });

    it('returns "error" for occupazione < 55', () => {
      expect(component.occupazioneVariant(54)).toBe('error');
      expect(component.occupazioneVariant(30)).toBe('error');
      expect(component.occupazioneVariant(0)).toBe('error');
    });
  });

  describe('signals reflect saved answers', () => {
    it('return null when no answer has been saved', () => {
      expect(component.selectedCareerPriority()).toBeNull();
      expect(component.selectedWorkContext()).toBeNull();
    });

    it('reflect the value already saved at creation time', async () => {
      await setupComponent({ [component.questionCareerPriority.id]: 'stability' });
      expect(component.selectedCareerPriority()).toBe('stability');
    });
  });

  describe('onSelectCareerPriority / onSelectWorkContext', () => {
    it('saves the career priority answer with the correct topicId', () => {
      const option = component.questionCareerPriority.options![0];
      component.onSelectCareerPriority(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionCareerPriority.id,
        'sbocchi',
        option.value,
        option.label,
      );
    });

    it('saves the work context answer with the correct topicId', () => {
      const option = component.questionWorkContext.options![0];
      component.onSelectWorkContext(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionWorkContext.id,
        'sbocchi',
        option.value,
        option.label,
      );
    });

    it('does nothing when re-selecting an already-saved value', async () => {
      const option = component.questionCareerPriority.options![0];
      await setupComponent({ [component.questionCareerPriority.id]: option.value });

      component.onSelectCareerPriority(option.value);

      expect(stateServiceMock.saveAnswer).not.toHaveBeenCalled();
    });
  });

  describe('scrollToQuestion', () => {
    it('does not throw when called', () => {
      expect(() => component.scrollToQuestion()).not.toThrow();
    });

    it('calls scrollIntoView on the question element rendered by the template', () => {
      const el = document.getElementById('domanda-sbocchi');
      expect(el).not.toBeNull();

      const scrollSpy = vi.spyOn(el!, 'scrollIntoView').mockImplementation(() => {});

      component.scrollToQuestion();

      expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    });
  });
});
