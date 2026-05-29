import { Component } from '@angular/core';
import { ABOUT_TEAM_MEMBERS } from '@constants';

@Component({
  selector: 'app-about-team',
  standalone: true,
  templateUrl: './about-team.component.html',
})
export class AboutTeamComponent {
  readonly teamMembers = ABOUT_TEAM_MEMBERS;
}
