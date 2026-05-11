import { Component } from '@angular/core';
import { HomeCtaComponent } from '../components/home-cta/home-cta.component';
import { HomeFeaturesComponent } from '../components/home-features/home-features.component';
import { HomeHeroComponent } from '../components/home-hero/home-hero.component';
import { HomeHowItWorksComponent } from '../components/home-how-it-works/home-how-it-works.component';
import { HomeReviewsComponent } from '../components/home-reviews/home-reviews.component';
import { HomeStatsComponent } from '../components/home-stats/home-stats.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HomeHeroComponent,
    HomeStatsComponent,
    HomeFeaturesComponent,
    HomeHowItWorksComponent,
    HomeReviewsComponent,
    HomeCtaComponent,
  ],
  templateUrl: './home.page.html',
})
export class HomePage {}
