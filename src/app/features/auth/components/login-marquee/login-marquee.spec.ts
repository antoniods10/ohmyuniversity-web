import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginMarqueeComponent } from './login-marquee.component';
import { MarqueeImage, LoginStat } from '@types';

const MOCK_IMAGES: MarqueeImage[] = Array.from({ length: 8 }, (_, i) => ({
  url: `https://example.com/img${i}.jpg`,
  alt: `Image ${i}`,
}));

const MOCK_STATS: LoginStat[] = Array.from({ length: 6 }, (_, i) => ({
  value: `${i * 10}`,
  label: `Stat ${i}`,
  bgColor: '#000000',
}));

describe('LoginMarqueeComponent', () => {
  let component: LoginMarqueeComponent;
  let fixture: ComponentFixture<LoginMarqueeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginMarqueeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginMarqueeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('images', MOCK_IMAGES);
    fixture.componentRef.setInput('stats', MOCK_STATS);
    fixture.detectChanges();
  });

  // Creation
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // columns computed
  it('should produce exactly 4 columns', () => {
    expect(component.columns().length).toBe(4);
  });

  it('should duplicate each column for seamless looping', () => {
    const columns = component.columns();
    columns.forEach(col => {
      expect(col.length % 2).toBe(0);
    });
  });

  it('should include both image and stat cells across columns', () => {
    const allCells = component.columns().flat();
    expect(allCells.some(c => c.type === 'image')).toBe(true);
    expect(allCells.some(c => c.type === 'stat')).toBe(true);
  });

  it('should contain all provided images across columns', () => {
    const allCells = component.columns().flat();
    const imageCells = allCells.filter(c => c.type === 'image');
    MOCK_IMAGES.forEach(img => {
      expect(imageCells.some(c => c.data === img || (c.data as MarqueeImage).url === img.url)).toBe(
        true,
      );
    });
  });

  it('should contain all provided stats across columns', () => {
    const allCells = component.columns().flat();
    const statCells = allCells.filter(c => c.type === 'stat');
    MOCK_STATS.forEach(stat => {
      expect(statCells.some(c => (c.data as LoginStat).label === stat.label)).toBe(true);
    });
  });

  it('should ensure each column has at least the minimum number of cells before duplication', () => {
    component.columns().forEach(col => {
      expect(col.length).toBeGreaterThanOrEqual(6 * 2);
    });
  });

  it('should recompute columns when images input changes', () => {
    const newImages: MarqueeImage[] = Array.from({ length: 4 }, (_, i) => ({
      url: `https://example.com/new${i}.jpg`,
      alt: `New ${i}`,
    }));
    fixture.componentRef.setInput('images', newImages);
    fixture.detectChanges();
    const allCells = component.columns().flat();
    expect(
      allCells.some(c => c.type === 'image' && (c.data as MarqueeImage).url.includes('new')),
    ).toBe(true);
  });

  // direction
  it('should return "up" for even column indices', () => {
    expect(component.direction(0)).toBe('up');
    expect(component.direction(2)).toBe('up');
  });

  it('should return "down" for odd column indices', () => {
    expect(component.direction(1)).toBe('down');
    expect(component.direction(3)).toBe('down');
  });

  // durationClass
  it('should return a duration class for each column index', () => {
    [0, 1, 2, 3].forEach(i => {
      expect(component.durationClass(i)).toMatch(/^duration-\d$/);
    });
  });

  it('should return different duration classes for different indices', () => {
    const classes = [0, 1, 2, 3].map(i => component.durationClass(i));
    const unique = new Set(classes);
    expect(unique.size).toBe(4);
  });

  it('should cycle duration classes when index exceeds 3', () => {
    expect(component.durationClass(4)).toBe(component.durationClass(0));
  });

  // Template
  it('should render 4 column containers', () => {
    const cols = fixture.nativeElement.querySelectorAll('.grid > div');
    expect(cols.length).toBe(4);
  });

  it('should apply up animation class to even columns', () => {
    const cols = fixture.nativeElement.querySelectorAll('.grid > div > div');
    expect(cols[0].classList).toContain('animate-marquee-login-up');
    expect(cols[2].classList).toContain('animate-marquee-login-up');
  });

  it('should apply down animation class to odd columns', () => {
    const cols = fixture.nativeElement.querySelectorAll('.grid > div > div');
    expect(cols[1].classList).toContain('animate-marquee-login-down');
    expect(cols[3].classList).toContain('animate-marquee-login-down');
  });

  it('should render img elements for image cells', () => {
    const imgs = fixture.nativeElement.querySelectorAll('img');
    expect(imgs.length).toBeGreaterThan(0);
  });

  it('should render stat value and label text', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain(MOCK_STATS[0].value);
    expect(text).toContain(MOCK_STATS[0].label);
  });
});
