import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FaqBusinessPage } from './faq-business.page';
import { FaqHeroComponent } from '../../components/faq-hero/faq-hero.component';
import { FaqListComponent } from '../../components/faq-list/faq-list.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { FAQ_BUSINESS_CATEGORIES } from '@constants';
import { By } from '@angular/platform-browser';

describe('FaqBusinessPage', () => {
  let component: FaqBusinessPage;
  let fixture: ComponentFixture<FaqBusinessPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqBusinessPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FaqBusinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have categories equal to FAQ_BUSINESS_CATEGORIES', () => {
    expect(component.categories).toBe(FAQ_BUSINESS_CATEGORIES);
  });

  it('should render app-faq-hero', () => {
    const hero = fixture.debugElement.query(By.directive(FaqHeroComponent));
    expect(hero).toBeTruthy();
  });

  it('should render app-faq-list', () => {
    const list = fixture.debugElement.query(By.directive(FaqListComponent));
    expect(list).toBeTruthy();
  });

  it('should render the commercial CTA section', () => {
    const cta = fixture.debugElement.query(By.css('.border-t.border-gray-100'));
    expect(cta).toBeTruthy();
  });

  it('should render two app-custom-button in the CTA section', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    expect(buttons.length).toBe(2);
  });

  it('should render the primary button "Contatta il team commerciale"', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const primary = buttons.find(b => b.componentInstance.label === 'Contatta il team commerciale');
    expect(primary).toBeTruthy();
  });

  it('should set variant "primary" on the primary button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const primary = buttons.find(b => b.componentInstance.label === 'Contatta il team commerciale');
    expect(primary?.componentInstance.variant).toBe('primary');
  });

  it('should set mode "link-external" on the primary button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const primary = buttons.find(b => b.componentInstance.label === 'Contatta il team commerciale');
    expect(primary?.componentInstance.mode).toBe('link-external');
  });

  it('should set correct href on the primary button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const primary = buttons.find(b => b.componentInstance.label === 'Contatta il team commerciale');
    expect(primary?.componentInstance.href).toBe('mailto:business@ohmyuniversity.it');
  });

  it('should set size "sm" on the primary button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const primary = buttons.find(b => b.componentInstance.label === 'Contatta il team commerciale');
    expect(primary?.componentInstance.size).toBe('sm');
  });

  it('should set fullWidth true on the primary button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const primary = buttons.find(b => b.componentInstance.label === 'Contatta il team commerciale');
    expect(primary?.componentInstance.fullWidth).toBe(true);
  });

  it('should render the ghost button "Vedi i piani"', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const ghost = buttons.find(b => b.componentInstance.label === 'Vedi i piani');
    expect(ghost).toBeTruthy();
  });

  it('should set variant "ghost" on the ghost button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const ghost = buttons.find(b => b.componentInstance.label === 'Vedi i piani');
    expect(ghost?.componentInstance.variant).toBe('ghost');
  });

  it('should set mode "link-internal" on the ghost button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const ghost = buttons.find(b => b.componentInstance.label === 'Vedi i piani');
    expect(ghost?.componentInstance.mode).toBe('link-internal');
  });

  it('should set href "/business/prezzi" on the ghost button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const ghost = buttons.find(b => b.componentInstance.label === 'Vedi i piani');
    expect(ghost?.componentInstance.href).toBe('/business/prezzi');
  });

  it('should set size "sm" on the ghost button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const ghost = buttons.find(b => b.componentInstance.label === 'Vedi i piani');
    expect(ghost?.componentInstance.size).toBe('sm');
  });

  it('should set fullWidth true on the ghost button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
    const ghost = buttons.find(b => b.componentInstance.label === 'Vedi i piani');
    expect(ghost?.componentInstance.fullWidth).toBe(true);
  });

  it('should render at least two elements with appText in the CTA section', () => {
    const texts = fixture.debugElement.queryAll(By.directive(CustomTextComponent));
    expect(texts.length).toBeGreaterThanOrEqual(2);
  });
});
