import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PartnerPage } from './partner.page';
import { PARTNER_BENEFITS, PARTNER_LINKS, PARTNER_STATS, PARTNER_TESTIMONIALS } from '@constants';

describe('PartnerPage', () => {
  let component: PartnerPage;
  let fixture: ComponentFixture<PartnerPage>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerPage);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose benefits from PARTNER_BENEFITS constant', () => {
    expect(component.benefits).toBe(PARTNER_BENEFITS);
  });

  it('should expose partnerLinks from PARTNER_LINKS constant', () => {
    expect(component.partnerLinks).toBe(PARTNER_LINKS);
  });

  it('should expose testimonials from PARTNER_TESTIMONIALS constant', () => {
    expect(component.testimonials).toBe(PARTNER_TESTIMONIALS);
  });

  it('should expose stats from PARTNER_STATS constant', () => {
    expect(component.stats).toBe(PARTNER_STATS);
  });

  it('should render the hero badge text', () => {
    const badge = nativeEl.querySelector('span.text-blue-700');
    expect(badge?.textContent?.trim()).toContain('Per aziende, collettivi e istituzioni');
  });

  it('should render the hero h1 with 120.000 studenti', () => {
    const h1 = nativeEl.querySelector('h1');
    expect(h1?.textContent).toContain('120.000 studenti');
  });

  it('should render the blue highlighted text in h1', () => {
    const span = nativeEl.querySelector('h1 span.text-blue-600');
    expect(span?.textContent?.trim()).toBe('nel contesto giusto');
  });

  it('should render the hero description paragraph', () => {
    const p = nativeEl.querySelector('p.text-lg');
    expect(p?.textContent).toContain('OhMyUniversity');
    expect(p?.textContent).toContain('audience verificata');
  });

  it('should render the free trial disclaimer text', () => {
    const disclaimer = nativeEl.querySelector('p.text-xs.text-gray-400');
    expect(disclaimer?.textContent).toContain('14 giorni di prova gratuita');
    expect(disclaimer?.textContent).toContain('Nessuna carta di credito');
    expect(disclaimer?.textContent).toContain('Disdici quando vuoi');
  });

  it('should render the primary CTA link "Inizia la prova gratuita"', () => {
    const links = nativeEl.querySelectorAll('a');
    const primary = Array.from(links).find(a =>
      a.textContent?.trim().includes('Inizia la prova gratuita'),
    );
    expect(primary).not.toBeUndefined();
  });

  it('should set routerLink /contatti on the primary CTA', () => {
    const links = nativeEl.querySelectorAll('a');
    const primary = Array.from(links).find(a =>
      a.textContent?.trim().includes('Inizia la prova gratuita'),
    );
    expect(primary?.getAttribute('href')).toContain('/contatti');
  });

  it('should render the secondary CTA link "Vedi i piani"', () => {
    const links = nativeEl.querySelectorAll('a');
    const secondary = Array.from(links).find(a => a.textContent?.trim().includes('Vedi i piani'));
    expect(secondary).not.toBeUndefined();
  });

  it('should set routerLink /business/prezzi on the secondary CTA', () => {
    const links = nativeEl.querySelectorAll('a');
    const secondary = Array.from(links).find(a => a.textContent?.trim().includes('Vedi i piani'));
    expect(secondary?.getAttribute('href')).toBe('/business/prezzi');
  });

  it('should render one stat block per PARTNER_STATS entry', () => {
    const statValues = nativeEl.querySelectorAll('dt.text-3xl');
    expect(statValues.length).toBe(PARTNER_STATS.length);
  });

  it('should render each stat value', () => {
    const statValues = nativeEl.querySelectorAll('dt.text-3xl');
    PARTNER_STATS.forEach((stat, i) => {
      expect(statValues[i].textContent?.trim()).toBe(stat.value);
    });
  });

  it('should render each stat label', () => {
    const statLabels = nativeEl.querySelectorAll('dd.text-sm');
    PARTNER_STATS.forEach((stat, i) => {
      expect(statLabels[i].textContent?.trim()).toBe(stat.label);
    });
  });

  it('should render the stats section with a grid', () => {
    const grid = nativeEl.querySelector('dl.grid');
    expect(grid).not.toBeNull();
  });

  it('should render the "Perché scegliere OhMyUniversity" heading', () => {
    const headings = nativeEl.querySelectorAll('h2');
    const found = Array.from(headings).find(h =>
      h.textContent?.includes('Perché scegliere OhMyUniversity'),
    );
    expect(found).not.toBeUndefined();
  });

  it('should render the subtitle under the "Perché" section', () => {
    const paragraphs = nativeEl.querySelectorAll('p.text-gray-500');
    const found = Array.from(paragraphs).find(p => p.textContent?.includes('Non un altro portale'));
    expect(found).not.toBeUndefined();
  });

  it('should render one benefit card per PARTNER_BENEFITS entry', () => {
    const cards = nativeEl.querySelectorAll('div.rounded-xl.border.border-gray-100');
    // benefit cards + testimonial cards share this class; filter by section
    expect(cards.length).toBeGreaterThanOrEqual(PARTNER_BENEFITS.length);
  });

  it('should render each benefit emoji', () => {
    const emojis = Array.from(nativeEl.querySelectorAll('span.text-3xl'));
    const renderedEmojis = emojis.map(e => e.textContent?.trim());
    PARTNER_BENEFITS.forEach(b => {
      expect(renderedEmojis).toContain(b.emoji);
    });
  });

  it('should render each benefit title', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h3'));
    const titles = headings.map(h => h.textContent?.trim());
    PARTNER_BENEFITS.forEach(b => {
      expect(titles).toContain(b.title);
    });
  });

  it('should render each benefit description', () => {
    const paragraphs = Array.from(nativeEl.querySelectorAll('p.text-sm.text-gray-500'));
    const texts = paragraphs.map(p => p.textContent?.trim());
    PARTNER_BENEFITS.forEach(b => {
      const found = texts.some(t => t?.includes(b.description.substring(0, 30)));
      expect(found).toBe(true);
    });
  });

  it('should render one navigation card per PARTNER_LINKS entry', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h2'));
    const navSectionHeading = headings.find(h =>
      h.textContent?.includes('Tutto quello che ti serve sapere'),
    );

    const navSection = navSectionHeading?.closest('section');
    expect(navSection).toBeTruthy();

    const allLinksInSection = Array.from(navSection!.querySelectorAll('a[href]'));

    const navLinks = allLinksInSection.filter(a => {
      const href = a.getAttribute('href') ?? '';
      const pathPulito = href.split('?')[0].split('#')[0];
      return PARTNER_LINKS.some(l => l.path === pathPulito);
    });

    expect(navLinks.length).toBe(PARTNER_LINKS.length);
  });

  it('should render each partner link label', () => {
    const allText = nativeEl.textContent ?? '';
    PARTNER_LINKS.forEach(link => {
      expect(allText).toContain(link.label);
    });
  });

  it('should render each partner link description', () => {
    const allText = nativeEl.textContent ?? '';
    PARTNER_LINKS.forEach(link => {
      expect(allText).toContain(link.description.substring(0, 20));
    });
  });

  it('should set the correct href on each partner link anchor', () => {
    const allLinks = Array.from(nativeEl.querySelectorAll('a[href]'));
    PARTNER_LINKS.forEach(link => {
      const found = allLinks.find(a => a.getAttribute('href') === link.path);
      expect(found).not.toBeUndefined();
    });
  });

  it('should render the "Tutto quello che ti serve sapere" heading', () => {
    const headings = nativeEl.querySelectorAll('h2');
    const found = Array.from(headings).find(h =>
      h.textContent?.includes('Tutto quello che ti serve sapere'),
    );
    expect(found).not.toBeUndefined();
  });

  it('should render one testimonial card per PARTNER_TESTIMONIALS entry', () => {
    const stars = nativeEl.querySelectorAll('div.flex.gap-1.text-yellow-400');
    expect(stars.length).toBe(PARTNER_TESTIMONIALS.length);
  });

  it('should render 5 stars in each testimonial card', () => {
    const starRows = nativeEl.querySelectorAll('div.flex.gap-1.text-yellow-400');
    starRows.forEach(row => {
      const starSpans = row.querySelectorAll('span');
      expect(starSpans.length).toBe(5);
      starSpans.forEach(s => expect(s.textContent?.trim()).toBe('★'));
    });
  });

  it('should render each testimonial quote', () => {
    const allText = nativeEl.textContent ?? '';
    PARTNER_TESTIMONIALS.forEach(t => {
      expect(allText).toContain(t.quote.substring(0, 30));
    });
  });

  it('should render each testimonial name', () => {
    const allText = nativeEl.textContent ?? '';
    PARTNER_TESTIMONIALS.forEach(t => {
      expect(allText).toContain(t.name);
    });
  });

  it('should render each testimonial role', () => {
    const allText = nativeEl.textContent ?? '';
    PARTNER_TESTIMONIALS.forEach(t => {
      expect(allText).toContain(t.role);
    });
  });

  it('should render each testimonial initials in the avatar', () => {
    const allText = nativeEl.textContent ?? '';
    PARTNER_TESTIMONIALS.forEach(t => {
      expect(allText).toContain(t.initials);
    });
  });

  it('should render the "Chi ha già scelto" heading', () => {
    const headings = nativeEl.querySelectorAll('h2');
    const found = Array.from(headings).find(h => h.textContent?.includes('Chi ha già scelto'));
    expect(found).not.toBeUndefined();
  });

  it('should render the final CTA section with blue background', () => {
    const section = nativeEl.querySelector('section.bg-blue-600');
    expect(section).not.toBeNull();
  });

  it('should render the "Pronto a iniziare?" heading in the final CTA', () => {
    const headings = nativeEl.querySelectorAll('h2');
    const found = Array.from(headings).find(h => h.textContent?.includes('Pronto a iniziare?'));
    expect(found).not.toBeUndefined();
  });

  it('should render the final CTA description mentioning 2 giorni lavorativi', () => {
    const allText = nativeEl.textContent ?? '';
    expect(allText).toContain('2 giorni lavorativi');
  });

  it('should render the "Contattaci ora" link in the final CTA', () => {
    const links = Array.from(nativeEl.querySelectorAll('a'));
    const found = links.find(a => a.textContent?.trim() === 'Contattaci ora');
    expect(found).not.toBeUndefined();
  });

  it('should set routerLink /contatti on the "Contattaci ora" link', () => {
    const links = Array.from(nativeEl.querySelectorAll('a'));
    const found = links.find(a => a.textContent?.trim() === 'Contattaci ora');
    expect(found?.getAttribute('href')).toBe('/contatti');
  });

  it('should render the "Leggi le FAQ Business" link in the final CTA', () => {
    const links = Array.from(nativeEl.querySelectorAll('a'));
    const found = links.find(a => a.textContent?.trim().includes('FAQ Business'));
    expect(found).not.toBeUndefined();
  });

  it('should set routerLink /business/faq on the FAQ link', () => {
    const links = Array.from(nativeEl.querySelectorAll('a'));
    const found = links.find(a => a.textContent?.trim().includes('FAQ Business'));
    expect(found?.getAttribute('href')).toBe('/business/faq');
  });

  it('should render the final CTA description mentioning 14 giorni', () => {
    const section = nativeEl.querySelector('section.bg-blue-600');
    expect(section?.textContent).toContain('14 giorni');
  });

  it('should render 6 sections total', () => {
    const sections = nativeEl.querySelectorAll('section');
    expect(sections.length).toBe(6);
  });

  it('should render the stats section with bg-gray-50', () => {
    const section = nativeEl.querySelector('section.bg-gray-50');
    expect(section).not.toBeNull();
  });
});
