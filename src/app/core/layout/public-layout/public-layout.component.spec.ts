import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PublicLayoutComponent } from './public-layout.component';

describe('PublicLayoutComponent', () => {
  let component: PublicLayoutComponent;
  let fixture: ComponentFixture<PublicLayoutComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicLayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicLayoutComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the navbar', () => {
    expect(nativeEl.querySelector('app-navbar')).not.toBeNull();
  });

  it('should render the router outlet', () => {
    expect(nativeEl.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render the footer', () => {
    expect(nativeEl.querySelector('app-footer')).not.toBeNull();
  });

  it('should wrap content in a min-h-screen flex column', () => {
    const wrapper = nativeEl.querySelector('div.flex.min-h-screen.flex-col');
    expect(wrapper).not.toBeNull();
  });

  it('should render main with flex-1', () => {
    const main = nativeEl.querySelector('main.flex-1');
    expect(main).not.toBeNull();
  });

  it('should render navbar before main', () => {
    const children = Array.from(nativeEl.querySelector('div')!.children);
    const navbarIndex = children.findIndex(el => el.tagName.toLowerCase() === 'app-navbar');
    const mainIndex = children.findIndex(el => el.tagName.toLowerCase() === 'main');
    expect(navbarIndex).toBeLessThan(mainIndex);
  });

  it('should render footer after main', () => {
    const children = Array.from(nativeEl.querySelector('div')!.children);
    const mainIndex = children.findIndex(el => el.tagName.toLowerCase() === 'main');
    const footerIndex = children.findIndex(el => el.tagName.toLowerCase() === 'app-footer');
    expect(footerIndex).toBeGreaterThan(mainIndex);
  });
});
