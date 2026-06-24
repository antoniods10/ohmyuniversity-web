import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ContattiPage } from './contatti.page';

describe('ContattiPage', () => {
  let component: ContattiPage;
  let fixture: ComponentFixture<ContattiPage>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContattiPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ContattiPage);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize activeTab signal to "academic"', () => {
    expect(component.activeTab()).toBe('academic');
  });

  it('should define 2 tabs', () => {
    expect(component.tabs.length).toBe(2);
  });

  it('should have "academic" as first tab id', () => {
    expect(component.tabs[0].id).toBe('academic');
  });

  it('should have "organization" as second tab id', () => {
    expect(component.tabs[1].id).toBe('organization');
  });

  it('should have correct label for academic tab', () => {
    expect(component.tabs[0].label).toBe('Sono un universitario');
  });

  it('should have correct label for organization tab', () => {
    expect(component.tabs[1].label).toContain('organizzazione');
  });

  it('should update activeTab signal when setTab() is called with "organization"', () => {
    component.setTab('organization');
    expect(component.activeTab()).toBe('organization');
  });

  it('should update activeTab signal back to "academic" when setTab() is called', () => {
    component.setTab('organization');
    component.setTab('academic');
    expect(component.activeTab()).toBe('academic');
  });

  it('should render the hero section', () => {
    const sections = nativeEl.querySelectorAll('section');
    expect(sections.length).toBeGreaterThanOrEqual(1);
  });

  it('should render app-custom-badge in the hero', () => {
    expect(nativeEl.querySelector('app-custom-badge')).not.toBeNull();
  });

  it('should pass correct label to app-custom-badge', () => {
    const badge = nativeEl.querySelector('app-custom-badge');
    expect(badge?.getAttribute('label')).toBe('Contattaci');
  });

  it('should pass correct variant to app-custom-badge', () => {
    const badge = nativeEl.querySelector('app-custom-badge');
    expect(badge?.getAttribute('variant')).toBe('primary');
  });

  it('should pass correct shape to app-custom-badge', () => {
    const badge = nativeEl.querySelector('app-custom-badge');
    expect(badge?.getAttribute('shape')).toBe('pill');
  });

  it('should pass correct size to app-custom-badge', () => {
    const badge = nativeEl.querySelector('app-custom-badge');
    expect(badge?.getAttribute('size')).toBe('sm');
  });

  it('should render h1 with appText directive', () => {
    const h1 = nativeEl.querySelector('[apptext], [appText]');
    expect(h1).not.toBeNull();
  });

  it('should render the hero heading text', () => {
    expect(nativeEl.textContent).toContain('Come possiamo aiutarti?');
  });

  it('should render the hero subtitle text', () => {
    expect(nativeEl.textContent).toContain('2 giorni lavorativi');
  });

  it('should render the "Seleziona chi sei" description', () => {
    expect(nativeEl.textContent).toContain('Seleziona chi sei');
  });

  it('should render app-custom-tabs', () => {
    expect(nativeEl.querySelector('app-custom-tabs')).not.toBeNull();
  });

  it('should pass tabStyle="pill" to app-custom-tabs', () => {
    const tabs = nativeEl.querySelector('app-custom-tabs');
    expect(tabs?.getAttribute('tabStyle')).toBe('pill');
  });

  it('should pass variant="primary" to app-custom-tabs', () => {
    const tabs = nativeEl.querySelector('app-custom-tabs');
    expect(tabs?.getAttribute('variant')).toBe('primary');
  });

  it('should render app-contatti-form-academic when activeTab is "academic"', () => {
    component.activeTab.set('academic');
    fixture.detectChanges();
    expect(nativeEl.querySelector('app-contatti-form-academic')).not.toBeNull();
  });

  it('should NOT render app-contatti-form-organization when activeTab is "academic"', () => {
    component.activeTab.set('academic');
    fixture.detectChanges();
    expect(nativeEl.querySelector('app-contatti-form-organization')).toBeNull();
  });

  it('should render app-contatti-form-organization when activeTab is "organization"', () => {
    component.activeTab.set('organization');
    fixture.detectChanges();
    expect(nativeEl.querySelector('app-contatti-form-organization')).not.toBeNull();
  });

  it('should NOT render app-contatti-form-academic when activeTab is "organization"', () => {
    component.activeTab.set('organization');
    fixture.detectChanges();
    expect(nativeEl.querySelector('app-contatti-form-academic')).toBeNull();
  });

  it('should switch from academic to organization form after setTab()', () => {
    component.setTab('organization');
    fixture.detectChanges();
    expect(nativeEl.querySelector('app-contatti-form-organization')).not.toBeNull();
    expect(nativeEl.querySelector('app-contatti-form-academic')).toBeNull();
  });

  it('should switch back to academic form after setTab("academic")', () => {
    component.setTab('organization');
    fixture.detectChanges();
    component.setTab('academic');
    fixture.detectChanges();
    expect(nativeEl.querySelector('app-contatti-form-academic')).not.toBeNull();
    expect(nativeEl.querySelector('app-contatti-form-organization')).toBeNull();
  });

  it('should render exactly 2 sections', () => {
    expect(nativeEl.querySelectorAll('section').length).toBe(2);
  });

  it('should render hero section with bg-white', () => {
    expect(nativeEl.querySelector('section.bg-white')).not.toBeNull();
  });
});
