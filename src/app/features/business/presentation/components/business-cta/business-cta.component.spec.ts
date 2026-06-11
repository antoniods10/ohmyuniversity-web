import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessCtaComponent } from './business-cta.component';
import { ComponentRef } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('BusinessCtaComponent', () => {
  let component: BusinessCtaComponent;
  let fixture: ComponentFixture<BusinessCtaComponent>;
  let componentRef: ComponentRef<BusinessCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessCtaComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessCtaComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section element', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section).not.toBeNull();
  });

  it('should apply bg-blue-600 class to the section', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.classList).toContain('bg-blue-600');
  });

  it('should render the h2 heading', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2).not.toBeNull();
  });

  it('should display the default title', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent.trim()).toBe('Pronto a iniziare?');
  });

  it('should display a custom title when provided via input', () => {
    componentRef.setInput('title', 'Titolo personalizzato');
    fixture.detectChanges();
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent.trim()).toBe('Titolo personalizzato');
  });

  it('should render the subtitle paragraph', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p).not.toBeNull();
  });

  it('should display the default subtitle', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent.trim()).toContain('team commerciale');
  });

  it('should display a custom subtitle when provided via input', () => {
    componentRef.setInput('subtitle', 'Sottotitolo personalizzato');
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent.trim()).toBe('Sottotitolo personalizzato');
  });

  it('should render exactly two anchor links', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(2);
  });

  it('should display the default primary label', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links[0].textContent.trim()).toBe('Contattaci');
  });

  it('should display a custom primary label when provided via input', () => {
    componentRef.setInput('primaryLabel', 'Nuovo label primario');
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links[0].textContent.trim()).toBe('Nuovo label primario');
  });

  it('should display the default secondary label', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links[1].textContent.trim()).toBe('Vedi i piani');
  });

  it('should display a custom secondary label when provided via input', () => {
    componentRef.setInput('secondaryLabel', 'Nuovo label secondario');
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links[1].textContent.trim()).toBe('Nuovo label secondario');
  });

  it('should apply white background to the primary link', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links[0].classList).toContain('bg-white');
  });

  it('should apply blue text color to the primary link', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links[0].classList).toContain('text-blue-600');
  });

  it('should apply white text color to the secondary link', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links[1].classList).toContain('text-white');
  });

  it('should render both links inside a flex container', () => {
    const flex = fixture.nativeElement.querySelector('.flex');
    expect(flex).not.toBeNull();
  });

  it('should render a text-center container', () => {
    const textCenter = fixture.nativeElement.querySelector('.text-center');
    expect(textCenter).not.toBeNull();
  });

  it('should render the h2 with white text', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.classList).toContain('text-white');
  });
});
