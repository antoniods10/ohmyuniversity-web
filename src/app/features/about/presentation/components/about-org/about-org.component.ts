import { Component } from '@angular/core';
import { ABOUT_ORG_STATS } from '@constants';

@Component({
  selector: 'app-about-org',
  standalone: true,
  templateUrl: './about-org.component.html',
})
export class AboutOrgComponent {
  readonly stats = ABOUT_ORG_STATS;
}
