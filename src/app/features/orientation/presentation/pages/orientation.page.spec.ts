import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { OrientationPage } from './orientation.page';
import { CardNavComponent } from '@ui/custom-card/card-variants.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { TopicCorsoComponent } from '../components/topics/topic-corso/topic-corso.component';
import { TopicComeFunzionaComponent } from '../components/topics/topic-come-funziona/topic-come-funziona.component';
import { TopicVitaComponent } from '../components/topics/topic-vita/topic-vita.component';
import { TopicSbocchiComponent } from '../components/topics/topic-sbocchi/topic-sbocchi.component';
import { TopicErroriComponent } from '../components/topics/topic-errori/topic-errori.component';
import { TopicQuizComponent } from '../components/topics/topic-quiz/topic-quiz.component';
import { ORIENTATION_TOPICS } from '@constants';

describe('OrientationPage', () => {
  let component: OrientationPage;
  let fixture: ComponentFixture<OrientationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrientationPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(OrientationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize activeTopic as null', () => {
    expect(component.activeTopic()).toBeNull();
  });

  it('should have topics equal to ORIENTATION_TOPICS', () => {
    expect(component.topics).toBe(ORIENTATION_TOPICS);
  });

  it('should render the list view when activeTopic is null', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge).toBeTruthy();
  });

  it('should render app-custom-badge with correct props in list view', () => {
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge.componentInstance.label).toBe('Per chi non è ancora iscritto');
    expect(badge.componentInstance.variant).toBe('primary');
    expect(badge.componentInstance.shape).toBe('pill');
    expect(badge.componentInstance.size).toBe('sm');
  });

  it('should render one app-card-nav per topic in list view', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardNavComponent));
    expect(cards.length).toBe(ORIENTATION_TOPICS.length);
  });

  it('should pass correct title and subtitle to each app-card-nav', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardNavComponent));
    ORIENTATION_TOPICS.forEach((topic, i) => {
      expect(cards[i].componentInstance.title).toBe(topic.title);
      expect(cards[i].componentInstance.subtitle).toBe(topic.subtitle);
    });
  });

  it('should pass clickable true to each app-card-nav', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardNavComponent));
    cards.forEach(card => {
      expect(card.componentInstance.clickable).toBe(true);
    });
  });

  it('should not render progress bar when activeTopic is null', () => {
    const bar = fixture.debugElement.query(By.css('.sticky'));
    expect(bar).toBeNull();
  });

  it('should not render any topic component when activeTopic is null', () => {
    const topicComponents = [
      TopicCorsoComponent,
      TopicComeFunzionaComponent,
      TopicVitaComponent,
      TopicSbocchiComponent,
      TopicErroriComponent,
      TopicQuizComponent,
    ];
    topicComponents.forEach(c => {
      expect(fixture.debugElement.query(By.directive(c))).toBeNull();
    });
  });

  it('should call open() and set activeTopic when a card emits cardClick', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardNavComponent));
    cards[0].triggerEventHandler('cardClick', ORIENTATION_TOPICS[0].id);
    fixture.detectChanges();
    expect(component.activeTopic()).toBe(ORIENTATION_TOPICS[0].id);
  });

  it('should hide the list view after open() is called', () => {
    component.open(ORIENTATION_TOPICS[0].id);
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge).toBeNull();
  });

  it('should show the progress bar after open() is called', () => {
    component.open(ORIENTATION_TOPICS[0].id);
    fixture.detectChanges();
    const bar = fixture.debugElement.query(By.css('.sticky'));
    expect(bar).toBeTruthy();
  });

  it('should render app-topic-corso when activeTopic is "corso"', () => {
    component.open('corso');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(TopicCorsoComponent))).toBeTruthy();
  });

  it('should render app-topic-quiz when activeTopic is "quiz"', () => {
    component.open('quiz');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(TopicQuizComponent))).toBeTruthy();
  });

  it('should render app-topic-come-funziona when activeTopic is "come-funziona"', () => {
    component.open('come-funziona');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(TopicComeFunzionaComponent))).toBeTruthy();
  });

  it('should render app-topic-vita when activeTopic is "vita"', () => {
    component.open('vita');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(TopicVitaComponent))).toBeTruthy();
  });

  it('should render app-topic-sbocchi when activeTopic is "sbocchi"', () => {
    component.open('sbocchi');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(TopicSbocchiComponent))).toBeTruthy();
  });

  it('should render app-topic-errori when activeTopic is "errori"', () => {
    component.open('errori');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(TopicErroriComponent))).toBeTruthy();
  });

  it('should pass hasPrev false when first topic is active', () => {
    component.open(ORIENTATION_TOPICS[0].id);
    fixture.detectChanges();
    expect(component.hasPrev()).toBe(false);
  });

  it('should pass hasNext true when first topic is active', () => {
    component.open(ORIENTATION_TOPICS[0].id);
    fixture.detectChanges();
    expect(component.hasNext()).toBe(true);
  });

  it('should pass hasPrev true when second topic is active', () => {
    component.open(ORIENTATION_TOPICS[1].id);
    fixture.detectChanges();
    expect(component.hasPrev()).toBe(true);
  });

  it('should pass hasNext false when last topic is active', () => {
    component.open(ORIENTATION_TOPICS[ORIENTATION_TOPICS.length - 1].id);
    fixture.detectChanges();
    expect(component.hasNext()).toBe(false);
  });

  it('should advance to next topic when next() is called', () => {
    component.open(ORIENTATION_TOPICS[0].id);
    component.next();
    fixture.detectChanges();
    expect(component.activeTopic()).toBe(ORIENTATION_TOPICS[1].id);
  });

  it('should not advance past the last topic when next() is called on last', () => {
    const last = ORIENTATION_TOPICS[ORIENTATION_TOPICS.length - 1].id;
    component.open(last);
    component.next();
    fixture.detectChanges();
    expect(component.activeTopic()).toBe(last);
  });

  it('should go to previous topic when prev() is called', () => {
    component.open(ORIENTATION_TOPICS[1].id);
    component.prev();
    fixture.detectChanges();
    expect(component.activeTopic()).toBe(ORIENTATION_TOPICS[0].id);
  });

  it('should not go before the first topic when prev() is called on first', () => {
    const first = ORIENTATION_TOPICS[0].id;
    component.open(first);
    component.prev();
    fixture.detectChanges();
    expect(component.activeTopic()).toBe(first);
  });

  it('should reset activeTopic to null when close() is called', () => {
    component.open(ORIENTATION_TOPICS[0].id);
    component.close();
    fixture.detectChanges();
    expect(component.activeTopic()).toBeNull();
  });

  it('should show list view again after close() is called', () => {
    component.open(ORIENTATION_TOPICS[0].id);
    component.close();
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.directive(CustomBadgeComponent));
    expect(badge).toBeTruthy();
  });

  it('should compute activeIndex correctly', () => {
    component.open(ORIENTATION_TOPICS[2].id);
    fixture.detectChanges();
    expect(component.activeIndex()).toBe(2);
  });

  it('should return -1 for activeIndex when activeTopic is null', () => {
    expect(component.activeIndex()).toBe(-1);
  });
});
