import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TopicVitaComponent } from './topic-vita.component';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { OrientationStateService } from 'src/app/core/application/state/orientation/orientation.state';
import { ToastService } from '@ui/custom-toast/toast.service';
import { VITA_TIMETABLE_TIPS, VITA_STUDY_TIPS } from '@constants';

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function (): void {};
}

describe('TopicVitaComponent', () => {
  let component: TopicVitaComponent;
  let fixture: ComponentFixture<TopicVitaComponent>;
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
      imports: [TopicVitaComponent],
      providers: [
        { provide: OrientationStateService, useValue: stateServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicVitaComponent);
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
    expect(h2.textContent).toContain('Orari e impegno');
  });

  it('should render the 4 week blocks', () => {
    expect(component.weekBlocks).toHaveLength(4);
    component.weekBlocks.forEach(block => {
      expect(fixture.nativeElement.textContent).toContain(block.label);
    });
  });

  it('should render the orari section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Gli orari delle lezioni');
  });

  it('should render one timeline entry per tip from VITA_TIMETABLE_TIPS', () => {
    VITA_TIMETABLE_TIPS.forEach(tip => {
      expect(fixture.nativeElement.textContent).toContain(tip.titolo);
    });
  });

  it('should render the studio individuale section heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Studio individuale');
  });

  it('should render CardStatus cards for studio tips', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatusComponent));
    expect(cards.length).toBeGreaterThanOrEqual(VITA_STUDY_TIPS.length);
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

  describe('signals reflect saved answers', () => {
    it('return null when no answer has been saved', () => {
      expect(component.selectedStudyHours()).toBeNull();
      expect(component.selectedWork()).toBeNull();
    });

    it('reflect the value already saved at creation time', async () => {
      await setupComponent({ [component.questionStudyHours.id]: '2-4' });
      expect(component.selectedStudyHours()).toBe('2-4');
    });
  });

  describe('isSelected', () => {
    it('returns true only when current matches value', () => {
      expect(component.isSelected('2-4', '2-4')).toBe(true);
      expect(component.isSelected('2-4', 'less-2')).toBe(false);
    });
  });

  describe('onSelectStudyHours / onSelectWork', () => {
    it('saves the study hours answer with the correct topicId', () => {
      const option = component.questionStudyHours.options![0];
      component.onSelectStudyHours(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionStudyHours.id,
        'vita',
        option.value,
        option.label,
      );
    });

    it('saves the work answer with the correct topicId', () => {
      const option = component.questionWork.options![0];
      component.onSelectWork(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionWork.id,
        'vita',
        option.value,
        option.label,
      );
    });

    it('does nothing when re-selecting an already-saved value', async () => {
      const option = component.questionStudyHours.options![0];
      await setupComponent({ [component.questionStudyHours.id]: option.value });

      component.onSelectStudyHours(option.value);

      expect(stateServiceMock.saveAnswer).not.toHaveBeenCalled();
    });
  });

  describe('scrollToQuestion', () => {
    it('does not throw when called', () => {
      expect(() => component.scrollToQuestion()).not.toThrow();
    });

    it('calls scrollIntoView on the question element rendered by the template', () => {
      const el = document.getElementById('domanda-vita');
      expect(el).not.toBeNull();

      const scrollSpy = vi.spyOn(el!, 'scrollIntoView').mockImplementation(() => {});

      component.scrollToQuestion();

      expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    });
  });
});
