import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicBudgetComponent } from './topic-budget.component';
import { OrientationStateService } from '@orientation/application/state/orientation.state';
import { ToastService } from '@ui/custom-toast/toast.service';

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function (): void {};
}

describe('TopicBudgetComponent', () => {
  let component: TopicBudgetComponent;
  let fixture: ComponentFixture<TopicBudgetComponent>;
  let stateServiceMock: {
    getAnswer: ReturnType<typeof vi.fn>;
    saveAnswer: ReturnType<typeof vi.fn>;
  };
  let toastServiceMock: { success: ReturnType<typeof vi.fn> };

  /** (Re)configures the TestBed with a fresh component instance and the given initial answer */
  async function setupComponent(initialAnswer: string | null = null): Promise<void> {
    TestBed.resetTestingModule();

    stateServiceMock = {
      getAnswer: vi.fn().mockReturnValue(initialAnswer),
      saveAnswer: vi.fn(),
    };
    toastServiceMock = {
      success: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TopicBudgetComponent],
      providers: [
        { provide: OrientationStateService, useValue: stateServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicBudgetComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('hasPrev', false);
    fixture.componentRef.setInput('hasNext', true);

    fixture.detectChanges();
  }

  beforeEach(async () => {
    await setupComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('static data', () => {
    it('exposes 4 university cost items', () => {
      expect(component.universityCosts).toHaveLength(4);
    });

    it('exposes living costs and tips from constants', () => {
      expect(component.livingCosts.length).toBeGreaterThan(0);
      expect(component.tips.length).toBeGreaterThan(0);
    });

    it('resolves both budget questions from ORIENTATION_TOPICS', () => {
      expect(component.questionBudgetAvailability).toBeDefined();
      expect(component.questionMonthlyBudget).toBeDefined();
      expect(component.questionBudgetAvailability.id).not.toBe(component.questionMonthlyBudget.id);
    });
  });

  describe('cost accordion', () => {
    it('starts with no cost item expanded', () => {
      expect(component.isExpanded('Tasse universitarie')).toBe(false);
    });

    it('expands a cost item when toggled', () => {
      component.toggleCost('Tasse universitarie');
      expect(component.isExpanded('Tasse universitarie')).toBe(true);
    });

    it('collapses an already expanded cost item when toggled again', () => {
      component.toggleCost('Tasse universitarie');
      component.toggleCost('Tasse universitarie');
      expect(component.isExpanded('Tasse universitarie')).toBe(false);
    });

    it('only keeps one cost item expanded at a time', () => {
      component.toggleCost('Tasse universitarie');
      component.toggleCost('Libri e materiale didattico');

      expect(component.isExpanded('Tasse universitarie')).toBe(false);
      expect(component.isExpanded('Libri e materiale didattico')).toBe(true);
    });
  });

  describe('selectedBudgetAvailability / selectedMonthlyBudget', () => {
    it('reflects null when the state service has no saved answer', () => {
      expect(component.selectedBudgetAvailability()).toBeNull();
      expect(component.selectedMonthlyBudget()).toBeNull();
    });

    it('reflects the value already saved in the state service at creation time', async () => {
      await setupComponent('good');

      expect(component.selectedBudgetAvailability()).toBe('good');
    });
  });

  describe('isSelected', () => {
    it('returns true only when current matches value', () => {
      expect(component.isSelected('good', 'good')).toBe(true);
      expect(component.isSelected('good', 'limited')).toBe(false);
      expect(component.isSelected(null, 'good')).toBe(false);
    });
  });

  describe('onSelectBudgetAvailability', () => {
    it('saves the answer with the correct topicId and label', () => {
      const option = component.questionBudgetAvailability.options![0];

      component.onSelectBudgetAvailability(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionBudgetAvailability.id,
        'borse-studio',
        option.value,
        option.label,
      );
    });

    it('shows a success toast when a new answer is saved', () => {
      const option = component.questionBudgetAvailability.options![0];

      component.onSelectBudgetAvailability(option.value);

      expect(toastServiceMock.success).toHaveBeenCalledWith('Risposta salvata', { duration: 3000 });
    });

    it('does nothing when re-selecting the already-saved value', async () => {
      const option = component.questionBudgetAvailability.options![0];
      await setupComponent(option.value);

      component.onSelectBudgetAvailability(option.value);

      expect(stateServiceMock.saveAnswer).not.toHaveBeenCalled();
      expect(toastServiceMock.success).not.toHaveBeenCalled();
    });
  });

  describe('onSelectMonthlyBudget', () => {
    it('saves the answer with the correct topicId and label', () => {
      const option = component.questionMonthlyBudget.options![0];

      component.onSelectMonthlyBudget(option.value);

      expect(stateServiceMock.saveAnswer).toHaveBeenCalledWith(
        component.questionMonthlyBudget.id,
        'borse-studio',
        option.value,
        option.label,
      );
    });

    it('does nothing when re-selecting the already-saved value', async () => {
      const option = component.questionMonthlyBudget.options![0];
      await setupComponent(option.value);

      component.onSelectMonthlyBudget(option.value);

      expect(stateServiceMock.saveAnswer).not.toHaveBeenCalled();
    });
  });
});
