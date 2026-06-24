import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutTeamComponent } from './about-team.component';
import { CardTeamComponent } from '@ui/custom-card/card-variants.component';
import { By } from '@angular/platform-browser';
import { ABOUT_TEAM_MEMBERS } from '@constants';

describe('AboutTeamComponent', () => {
  let component: AboutTeamComponent;
  let fixture: ComponentFixture<AboutTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutTeamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section element', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section).not.toBeNull();
  });

  it('should apply bg-gray-50 class to the section', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.classList).toContain('bg-gray-50');
  });

  it('should render the h2 heading', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2).not.toBeNull();
    expect(h2.textContent).toContain('Il team');
  });

  it('should render the subtitle paragraph', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toContain('Quattro persone');
  });

  it('should have a teamMembers array populated from ABOUT_TEAM_MEMBERS constant', () => {
    expect(component.teamMembers).toBeDefined();
    expect(component.teamMembers.length).toBe(ABOUT_TEAM_MEMBERS.length);
  });

  it('should render one app-card-team per member', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardTeamComponent));
    expect(cards.length).toBe(ABOUT_TEAM_MEMBERS.length);
  });

  it('should pass the correct name to each team card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardTeamComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.member.name).toBe(ABOUT_TEAM_MEMBERS[index].name);
    });
  });

  it('should pass the correct role to each team card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardTeamComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.member.role).toBe(ABOUT_TEAM_MEMBERS[index].role);
    });
  });

  it('should pass the correct description (bio) to each team card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardTeamComponent));
    cards.forEach((card, index) => {
      expect(card.componentInstance.description).toBe(ABOUT_TEAM_MEMBERS[index].bio);
    });
  });

  it('should pass shadow="sm" to every team card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardTeamComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.shadow).toBe('sm');
    });
  });

  it('should pass hoverable=true to every team card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardTeamComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.hoverable).toBe(true);
    });
  });

  it('should pass stretchHeight=true to every team card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardTeamComponent));
    cards.forEach((card) => {
      expect(card.componentInstance.stretchHeight).toBe(true);
    });
  });

  it('should render a grid container for the team cards', () => {
    const grid = fixture.nativeElement.querySelector('.grid');
    expect(grid).not.toBeNull();
  });

  it('should render a text-center header container', () => {
    const textCenter = fixture.nativeElement.querySelector('.text-center');
    expect(textCenter).not.toBeNull();
  });
});
