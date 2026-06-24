import { Component } from '@angular/core';
import { AboutHeroComponent } from '../components/about-hero/about-hero.component';
import { AboutOrgComponent } from '../components/about-org/about-org.component';
import { AboutCtaComponent } from '../components/about-cta/about-cta.component';
import { AboutTeamComponent } from '../components/about-team/about-team.component';
import { AboutValuesComponent } from '../components/about-values/about-values.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    AboutHeroComponent,
    AboutOrgComponent,
    AboutValuesComponent,
    AboutTeamComponent,
    AboutCtaComponent,
  ],
  templateUrl: './about.page.html',
})
export class AboutPage {}
