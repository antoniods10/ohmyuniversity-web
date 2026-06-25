import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TopicComeFunzionaComponent } from './topic-come-funziona.component';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CfuChartComponent } from '../../charts/cfu-chart/cfu-chart.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { OrientationStateService } from 'src/app/core/application/state/orientation/orientation.state';
import { ToastService } from '@ui/custom-toast/toast.service';
import { UNIVERSITY_VS_SCHOOL_DIFFERENCES, EXAM_SESSIONS } from '@constants';

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function (): void {};
}

describe('TopicComeFunzionaComponent', () => {
  let component: TopicComeFunzionaComponent;
  let fixture: ComponentFixture<TopicComeFunzionaComponent>;
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
      imports: [TopicComeFunzionaComponent],
      providers: [
        { provide: OrientationStateService, useValue: stateServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicComeFunzionaComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('hasPrev', false);
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
    expect(h2.textContent).toContain("Come funziona l'università");
  });

  it('should render the differences table', () => {
    const table = fixture.nativeElement.querySelector('table');
    expect(table).not.toBeNull();
  });

  it('should render one row per difference from UNIVERSITY_VS_SCHOOL_DIFFERENCES', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(UNIVERSITY_VS_SCHOOL_DIFFERENCES.length);
  });

  it('should render the CFU section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Cosa sono i CFU?');
  });

  it('should render the app-cfu-chart component', () => {
    const chart = fixture.debugElement.query(By.directive(CfuChartComponent));
    expect(chart).not.toBeNull();
  });

  it('should render the exam types section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Tipi di esame');
  });

  it('should render the exam sessions section heading', () => {
    expect(fixture.nativeElement.textContent).toContain("Le sessioni d'esame");
  });

  it('should render one badge per session from EXAM_SESSIONS', () => {
    EXAM_SESSIONS.forEach(session => {
      expect(fixture.nativeElement.textContent).toContain(session.label);
    });
  });

  it('should render the autonomy callout via CardStatus', () => {
    const statusCards = fixture.debugElement.queryAll(By.directive(CardStatusComponent));
    expect(statusCards.length).toBeGreaterThan(0);
  });

  it('should render the autonomy warning text', () => {
    expect(fixture.nativeElement.textContent).toContain('Autonomia totale');
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

  describe('getExamIcon', () => {
    it('returns a known icon for a recognized exam type', () => {
      expect(component.getExamIcon('Scritto')).toBeTruthy();
    });

    it('falls back to the default icon for an unrecognized exam type', () => {
      expect(component.getExamIcon('Tipo Inesistente')).toBeTruthy();
    });
  });

  describe('getSessionSubtitle', () => {
    it('combines periodo and note with a separator', () => {
      expect(component.getSessionSubtitle('Gennaio', 'Esami invernali')).toBe(
        'Gennaio · Esami invernali',
      );
    });
  });

  describe('signals reflect saved answers', () => {
    it('return null when no answer has been saved', () => {
      expect(component.selectedStudyStyle()).toBeNull();
      expect(component.selectedExamType()).toBeNull();
      expect(component.selectedAutonomy()).toBeNull();
    });

    it('reflect the value already saved at creation time', async () => {
      await setupComponent({ [component.questionStudyStyle.id]: 'continuous' });
      expect(component.selectedStudyStyle()).toBe('continuous');
    });
  });

  describe('onSelectStudyStyle / onSelectExamType / onSelectAutonomy', () => {
    it('saves the study style answer with the correct topicId', () => {
      const option = component.questionStudyStyle.options![0];
      component.onSelectStudyStyle(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionStudyStyle.id,
        'come-funziona',
        option.value,
        option.label,
      );
    });

    it('saves the exam type answer with the correct topicId', () => {
      const option = component.questionExamType.options![0];
      component.onSelectExamType(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionExamType.id,
        'come-funziona',
        option.value,
        option.label,
      );
    });

    it('saves the autonomy answer with the correct topicId', () => {
      const option = component.questionAutonomy.options![0];
      component.onSelectAutonomy(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionAutonomy.id,
        'come-funziona',
        option.value,
        option.label,
      );
    });

    it('does nothing when re-selecting an already-saved value', async () => {
      const option = component.questionStudyStyle.options![0];
      await setupComponent({ [component.questionStudyStyle.id]: option.value });

      component.onSelectStudyStyle(option.value);

      expect(stateServiceMock.saveAnswer).not.toHaveBeenCalled();
    });
  });

  describe('scrollToQuestion', () => {
    it('does not throw when called', () => {
      expect(() => component.scrollToQuestion()).not.toThrow();
    });

    it('calls scrollIntoView on the question element rendered by the template', () => {
      const el = document.getElementById('domanda-come-funziona');
      expect(el).not.toBeNull();

      const scrollSpy = vi.spyOn(el!, 'scrollIntoView').mockImplementation(() => {});

      component.scrollToQuestion();

      expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    });
  });
});
