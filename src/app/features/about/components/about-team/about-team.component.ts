import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ABOUT_TEAM_MEMBERS } from '@constants';
import { CardTeamComponent } from '@ui/custom-card/card-variants.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

@Component({
  selector: 'app-about-team',
  standalone: true,
  imports: [CommonModule, CardTeamComponent, CustomTextComponent],
  templateUrl: './about-team.component.html',
})
export class AboutTeamComponent {
  readonly teamMembers = ABOUT_TEAM_MEMBERS;
}
