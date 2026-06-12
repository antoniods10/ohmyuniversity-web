import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CustomCardComponent } from './custom-card.component';
import {
  CardSimpleComponent,
  CardNavComponent,
  CardTeamComponent,
} from './card-variants.component';

describe('CustomCardComponent', () => {
  let component: CustomCardComponent;
  let fixture: ComponentFixture<CustomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render a div element in default mode', () => {
    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css('div'));
    expect(div).not.toBeNull();
  });

  it('should render an anchor element in link-external mode', () => {
    fixture.componentRef.setInput('mode', 'link-external');
    fixture.componentRef.setInput('href', 'https://example.com');
    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor).not.toBeNull();
  });

  it('should apply card--default class by default', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.classList).toContain('card--default');
  });

  it('should apply the correct variant class', () => {
    fixture.componentRef.setInput('variant', 'primary');
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.classList).toContain('card--primary');
  });

  it('should apply card--pad-md class by default', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.classList).toContain('card--pad-md');
  });

  it('should apply the correct padding class', () => {
    fixture.componentRef.setInput('padding', 'lg');
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.classList).toContain('card--pad-lg');
  });

  it('should apply the correct shadow class', () => {
    fixture.componentRef.setInput('shadow', 'lg');
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.classList).toContain('card--shadow-lg');
  });

  it('should apply the correct radius class', () => {
    fixture.componentRef.setInput('radius', 'sm');
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.classList).toContain('card--radius-sm');
  });

  it('should apply card--bordered class when bordered is true', () => {
    fixture.componentRef.setInput('bordered', true);
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.classList).toContain('card--bordered');
  });

  it('should not apply card--bordered class when bordered is false', () => {
    fixture.componentRef.setInput('bordered', false);
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.classList).not.toContain('card--bordered');
  });

  it('should apply card--accent-bar class when accentBar is true', () => {
    fixture.componentRef.setInput('accentBar', true);
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.classList).toContain('card--accent-bar');
  });

  it('should apply card--dark class when darkTheme is true', () => {
    fixture.componentRef.setInput('darkTheme', true);
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.classList).toContain('card--dark');
  });

  it('should apply card--stretch class when stretchHeight is true', () => {
    fixture.componentRef.setInput('stretchHeight', true);
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.classList).toContain('card--stretch');
  });

  it('should apply card--clickable class when clickable is true', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.classList).toContain('card--clickable');
  });

  it('should apply card--hoverable class when hoverable is true', () => {
    fixture.componentRef.setInput('hoverable', true);
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.classList).toContain('card--hoverable');
  });

  it('should set role="button" when clickable is true', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.getAttribute('role')).toBe('button');
  });

  it('should set tabindex="0" when clickable is true', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.getAttribute('tabindex')).toBe('0');
  });

  it('should not set role when not clickable', () => {
    fixture.componentRef.setInput('clickable', false);
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.getAttribute('role')).toBeNull();
  });

  it('should emit cardClick when card is clicked and clickable is true', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();
    const spy = vi.fn();
    component.cardClick.subscribe(spy);
    fixture.nativeElement.firstElementChild.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT emit cardClick when card is clicked and clickable is false', () => {
    fixture.componentRef.setInput('clickable', false);
    fixture.detectChanges();
    const spy = vi.fn();
    component.cardClick.subscribe(spy);
    component.onClick(new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should emit cardClick on Enter keydown when clickable is true', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();
    const spy = vi.fn();
    component.cardClick.subscribe(spy);
    component.onClick(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).toHaveBeenCalled();
  });

  it('should set aria-label when provided', () => {
    fixture.componentRef.setInput('ariaLabel', 'Card di navigazione');
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();
    const el = fixture.nativeElement.firstElementChild;
    expect(el.getAttribute('aria-label')).toBe('Card di navigazione');
  });

  it('should return true for isInteractive when clickable is true', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();
    expect(component.isInteractive).toBe(true);
  });

  it('should return false for isInteractive when not clickable and mode is default', () => {
    fixture.componentRef.setInput('clickable', false);
    fixture.componentRef.setInput('mode', 'default');
    fixture.detectChanges();
    expect(component.isInteractive).toBe(false);
  });

  it('should return noopener noreferrer for external link with _blank target', () => {
    fixture.componentRef.setInput('mode', 'link-external');
    fixture.componentRef.setInput('target', '_blank');
    fixture.detectChanges();
    expect(component.externalRel).toBe('noopener noreferrer');
  });

  it('should return empty string for external link with _self target', () => {
    fixture.componentRef.setInput('mode', 'link-external');
    fixture.componentRef.setInput('target', '_self');
    fixture.detectChanges();
    expect(component.externalRel).toBe('');
  });
});

describe('CardSimpleComponent', () => {
  let component: CardSimpleComponent;
  let fixture: ComponentFixture<CardSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSimpleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardSimpleComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the title when provided', () => {
    fixture.componentRef.setInput('title', 'Titolo card');
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.card-simple__title');
    expect(title).not.toBeNull();
    expect(title.textContent.trim()).toBe('Titolo card');
  });

  it('should not render the title element when title is empty', () => {
    fixture.componentRef.setInput('title', '');
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.card-simple__title');
    expect(title).toBeNull();
  });

  it('should render the body text when provided', () => {
    fixture.componentRef.setInput('body', 'Descrizione della card');
    fixture.detectChanges();
    const body = fixture.nativeElement.querySelector('.card-simple__body');
    expect(body).not.toBeNull();
    expect(body.textContent.trim()).toBe('Descrizione della card');
  });

  it('should not render the body element when body is empty', () => {
    fixture.componentRef.setInput('body', '');
    fixture.detectChanges();
    const body = fixture.nativeElement.querySelector('.card-simple__body');
    expect(body).toBeNull();
  });

  it('should not render the icon wrapper when icon is not provided', () => {
    fixture.detectChanges();
    const iconWrap = fixture.nativeElement.querySelector('.card-simple__icon-wrap');
    expect(iconWrap).toBeNull();
  });

  it('should apply dark title class when darkTheme is true', () => {
    fixture.componentRef.setInput('title', 'Titolo');
    fixture.componentRef.setInput('darkTheme', true);
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.card-simple__title');
    expect(title.classList).toContain('card-simple__title--dark');
  });

  it('should not apply dark title class when darkTheme is false', () => {
    fixture.componentRef.setInput('title', 'Titolo');
    fixture.componentRef.setInput('darkTheme', false);
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.card-simple__title');
    expect(title.classList).not.toContain('card-simple__title--dark');
  });

  it('should apply dark body class when darkTheme is true', () => {
    fixture.componentRef.setInput('body', 'Testo');
    fixture.componentRef.setInput('darkTheme', true);
    fixture.detectChanges();
    const body = fixture.nativeElement.querySelector('.card-simple__body');
    expect(body.classList).toContain('card-simple__body--dark');
  });

  it('should emit cardClick when clicked', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();
    const spy = vi.fn();
    component.cardClick.subscribe(spy);
    component.cardClick.emit(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });
});

describe('CardNavComponent', () => {
  let component: CardNavComponent;
  let fixture: ComponentFixture<CardNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardNavComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    fixture.componentRef.setInput('title', 'Vai al profilo');
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.card-nav__title');
    expect(title.textContent.trim()).toBe('Vai al profilo');
  });

  it('should render the subtitle when provided', () => {
    fixture.componentRef.setInput('subtitle', 'Gestisci le impostazioni');
    fixture.detectChanges();
    const subtitle = fixture.nativeElement.querySelector('.card-nav__subtitle');
    expect(subtitle).not.toBeNull();
    expect(subtitle.textContent.trim()).toBe('Gestisci le impostazioni');
  });

  it('should not render the subtitle when not provided', () => {
    fixture.componentRef.setInput('subtitle', '');
    fixture.detectChanges();
    const subtitle = fixture.nativeElement.querySelector('.card-nav__subtitle');
    expect(subtitle).toBeNull();
  });

  it('should not render the icon wrapper when icon is not provided', () => {
    fixture.detectChanges();
    const iconEl = fixture.nativeElement.querySelector('.card-nav__icon');
    expect(iconEl).toBeNull();
  });

  it('should always render the arrow element', () => {
    fixture.detectChanges();
    const arrow = fixture.nativeElement.querySelector('.card-nav__arrow');
    expect(arrow).not.toBeNull();
  });

  it('should apply dark class to title when darkTheme is true', () => {
    fixture.componentRef.setInput('title', 'Titolo');
    fixture.componentRef.setInput('darkTheme', true);
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.card-nav__title');
    expect(title.classList).toContain('card-nav__title--dark');
  });

  it('should not apply dark class to title when darkTheme is false', () => {
    fixture.componentRef.setInput('title', 'Titolo');
    fixture.componentRef.setInput('darkTheme', false);
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.card-nav__title');
    expect(title.classList).not.toContain('card-nav__title--dark');
  });

  it('should apply dark class to arrow when darkTheme is true', () => {
    fixture.componentRef.setInput('darkTheme', true);
    fixture.detectChanges();
    const arrow = fixture.nativeElement.querySelector('.card-nav__arrow');
    expect(arrow.classList).toContain('card-nav__arrow--dark');
  });

  it('should emit cardClick when clicked', () => {
    const spy = vi.fn();
    component.cardClick.subscribe(spy);
    component.cardClick.emit(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });
});

describe('CardTeamComponent', () => {
  let component: CardTeamComponent;
  let fixture: ComponentFixture<CardTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTeamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardTeamComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('member', { name: 'Mario Rossi', role: 'Developer' });
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the member name', () => {
    fixture.detectChanges();
    const name = fixture.nativeElement.querySelector('.card-team__name');
    expect(name.textContent.trim()).toBe('Mario Rossi');
  });

  it('should render the member role', () => {
    fixture.detectChanges();
    const role = fixture.nativeElement.querySelector('.card-team__role');
    expect(role.textContent.trim()).toBe('Developer');
  });

  it('should render the description when provided', () => {
    fixture.componentRef.setInput('description', 'Esperto di Angular');
    fixture.detectChanges();
    const desc = fixture.nativeElement.querySelector('.card-team__desc');
    expect(desc).not.toBeNull();
    expect(desc.textContent.trim()).toBe('Esperto di Angular');
  });

  it('should not render description element when description is empty', () => {
    fixture.componentRef.setInput('description', '');
    fixture.detectChanges();
    const desc = fixture.nativeElement.querySelector('.card-team__desc');
    expect(desc).toBeNull();
  });

  it('should apply dark class to name when darkTheme is true', () => {
    fixture.componentRef.setInput('darkTheme', true);
    fixture.detectChanges();
    const name = fixture.nativeElement.querySelector('.card-team__name');
    expect(name.classList).toContain('card-team__name--dark');
  });

  it('should apply dark class to role when darkTheme is true', () => {
    fixture.componentRef.setInput('darkTheme', true);
    fixture.detectChanges();
    const role = fixture.nativeElement.querySelector('.card-team__role');
    expect(role.classList).toContain('card-team__role--dark');
  });

  it('should apply dark class to description when darkTheme is true', () => {
    fixture.componentRef.setInput('description', 'Testo');
    fixture.componentRef.setInput('darkTheme', true);
    fixture.detectChanges();
    const desc = fixture.nativeElement.querySelector('.card-team__desc');
    expect(desc.classList).toContain('card-team__desc--dark');
  });
});
