import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqListComponent } from './faq-list.component';
import { ComponentRef } from '@angular/core';
import { FaqCategory } from '@types';

const MOCK_CATEGORIES: FaqCategory[] = [
  {
    title: 'Categoria A',
    items: [
      { question: 'Domanda A1', answer: 'Risposta A1' },
      { question: 'Domanda A2', answer: 'Risposta A2' },
    ],
  },
  {
    title: 'Categoria B',
    items: [{ question: 'Domanda B1', answer: 'Risposta B1' }],
  },
];

describe('FaqListComponent', () => {
  let component: FaqListComponent;
  let fixture: ComponentFixture<FaqListComponent>;
  let componentRef: ComponentRef<FaqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaqListComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('categories', MOCK_CATEGORIES);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the outer container div', () => {
    const div = fixture.nativeElement.querySelector('.mx-auto');
    expect(div).not.toBeNull();
  });

  it('should render one section per category', () => {
    const sections = fixture.nativeElement.querySelectorAll('.mt-10');
    expect(sections.length).toBe(MOCK_CATEGORIES.length);
  });

  it('should render each category title', () => {
    MOCK_CATEGORIES.forEach(cat => {
      expect(fixture.nativeElement.textContent).toContain(cat.title);
    });
  });

  it('should render all question buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    const totalItems = MOCK_CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0);
    expect(buttons.length).toBe(totalItems);
  });

  it('should render each question text inside a button', () => {
    MOCK_CATEGORIES.forEach(cat => {
      cat.items.forEach(item => {
        expect(fixture.nativeElement.textContent).toContain(item.question);
      });
    });
  });

  it('should initialize openItems as an empty Map', () => {
    expect(component.openItems().size).toBe(0);
  });

  it('should not show any answer panel on initial render', () => {
    const answerPanels = fixture.nativeElement.querySelectorAll('.border-t.border-gray-100');
    expect(answerPanels.length).toBe(0);
  });

  it('should set aria-expanded="false" on all buttons initially', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    buttons.forEach((btn: HTMLElement) => {
      expect(btn.getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('should open an item when toggle is called', () => {
    component.toggle(0, 0);
    fixture.detectChanges();
    expect(component.isOpen(0, 0)).toBe(true);
  });

  it('should show the answer panel after toggling open', () => {
    component.toggle(0, 0);
    fixture.detectChanges();
    const answerPanels = fixture.nativeElement.querySelectorAll('.border-t.border-gray-100');
    expect(answerPanels.length).toBe(1);
  });

  it('should display the correct answer text after opening', () => {
    component.toggle(0, 0);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Risposta A1');
  });

  it('should set aria-expanded="true" on the toggled button', () => {
    component.toggle(0, 0);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
  });

  it('should close the item when toggle is called again on the same item', () => {
    component.toggle(0, 0);
    component.toggle(0, 0);
    fixture.detectChanges();
    expect(component.isOpen(0, 0)).toBe(false);
  });

  it('should hide the answer panel after closing', () => {
    component.toggle(0, 0);
    component.toggle(0, 0);
    fixture.detectChanges();
    const answerPanels = fixture.nativeElement.querySelectorAll('.border-t.border-gray-100');
    expect(answerPanels.length).toBe(0);
  });

  it('should close the previous item when a different item in the same category is opened', () => {
    component.toggle(0, 0);
    component.toggle(0, 1);
    expect(component.isOpen(0, 0)).toBe(false);
    expect(component.isOpen(0, 1)).toBe(true);
  });

  it('should allow items in different categories to be open simultaneously', () => {
    component.toggle(0, 0);
    component.toggle(1, 0);
    expect(component.isOpen(0, 0)).toBe(true);
    expect(component.isOpen(1, 0)).toBe(true);
  });

  it('should return false for isOpen on a never-toggled item', () => {
    expect(component.isOpen(0, 0)).toBe(false);
  });

  it('should return true for isOpen on an opened item', () => {
    component.toggle(0, 1);
    expect(component.isOpen(0, 1)).toBe(true);
  });

  it('should return false for isOpen on an item in a category that has another item open', () => {
    component.toggle(0, 0);
    expect(component.isOpen(0, 1)).toBe(false);
  });

  it('should open an item when the question button is clicked', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    buttons[0].click();
    fixture.detectChanges();
    expect(component.isOpen(0, 0)).toBe(true);
  });

  it('should close an item when the question button is clicked twice', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    buttons[0].click();
    fixture.detectChanges();
    buttons[0].click();
    fixture.detectChanges();
    expect(component.isOpen(0, 0)).toBe(false);
  });

  it('should show the answer when question button is clicked', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    buttons[0].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Risposta A1');
  });

  it('should update the rendered categories when the categories input changes', () => {
    const newCategories: FaqCategory[] = [
      {
        title: 'Nuova categoria',
        items: [{ question: 'Nuova domanda', answer: 'Nuova risposta' }],
      },
    ];
    componentRef.setInput('categories', newCategories);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Nuova categoria');
    expect(fixture.nativeElement.textContent).toContain('Nuova domanda');
  });

  it('should render the correct number of sections after input update', () => {
    const singleCategory: FaqCategory[] = [
      { title: 'Solo', items: [{ question: 'Q', answer: 'A' }] },
    ];
    componentRef.setInput('categories', singleCategory);
    fixture.detectChanges();
    const sections = fixture.nativeElement.querySelectorAll('.mt-10');
    expect(sections.length).toBe(1);
  });

  it('should apply rotate-180 class to chevron when item is open', () => {
    component.toggle(0, 0);
    fixture.detectChanges();
    const chevronSpan = fixture.nativeElement.querySelector('.rotate-180');
    expect(chevronSpan).not.toBeNull();
  });

  it('should not have rotate-180 class on any chevron when all items are closed', () => {
    const rotated = fixture.nativeElement.querySelector('.rotate-180');
    expect(rotated).toBeNull();
  });
});
