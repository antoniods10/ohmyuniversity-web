import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqPage } from './faq.page';
import { FaqHeroComponent } from '../../components/faq-hero/faq-hero.component';
import { FaqListComponent } from '../../components/faq-list/faq-list.component';
import { By } from '@angular/platform-browser';
import { FAQ_CATEGORIES } from '@constants';

describe('FaqPage', () => {
  let component: FaqPage;
  let fixture: ComponentFixture<FaqPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FaqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should expose categories from FAQ_CATEGORIES constant', () => {
    expect(component.categories).toEqual(FAQ_CATEGORIES);
  });

  it('should render app-faq-hero', () => {
    const hero = fixture.debugElement.query(By.directive(FaqHeroComponent));
    expect(hero).not.toBeNull();
  });

  it('should render app-faq-list', () => {
    const list = fixture.debugElement.query(By.directive(FaqListComponent));
    expect(list).not.toBeNull();
  });

  it('should pass title="Domande frequenti" to faq-hero', () => {
    const hero = fixture.debugElement.query(By.directive(FaqHeroComponent));
    expect(hero.componentInstance.title()).toBe('Domande frequenti');
  });

  it('should pass the correct subtitle to faq-hero', () => {
    const hero = fixture.debugElement.query(By.directive(FaqHeroComponent));
    expect(hero.componentInstance.subtitle()).toContain('OhMyUniversity');
  });

  it('should pass badge="FAQ" to faq-hero', () => {
    const hero = fixture.debugElement.query(By.directive(FaqHeroComponent));
    expect(hero.componentInstance.badge()).toBe('FAQ');
  });

  it('should pass categories to faq-list', () => {
    const list = fixture.debugElement.query(By.directive(FaqListComponent));
    expect(list.componentInstance.categories()).toEqual(FAQ_CATEGORIES);
  });

  it('should render the CTA contact section', () => {
    const cta = fixture.nativeElement.querySelector('.bg-gray-50');
    expect(cta).not.toBeNull();
  });

  it('should render the "Non hai trovato la risposta" text', () => {
    expect(fixture.nativeElement.textContent).toContain('Non hai trovato la risposta');
  });

  it('should render the contact email link', () => {
    const link = fixture.nativeElement.querySelector('a[href="mailto:hello@ohmyuniversity.it"]');
    expect(link).not.toBeNull();
  });

  it('should render the correct email address in the link', () => {
    const link = fixture.nativeElement.querySelector('a[href="mailto:hello@ohmyuniversity.it"]');
    expect(link.textContent.trim()).toBe('hello@ohmyuniversity.it');
  });

  it('should render the GitHub issue mention', () => {
    expect(fixture.nativeElement.textContent).toContain('GitHub');
  });
});
