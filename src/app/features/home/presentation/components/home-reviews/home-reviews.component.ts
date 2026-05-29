import { Component } from '@angular/core';
import { STAR_ARRAY, HOME_REVIEWS } from '@constants';
import { Review } from '@types';

@Component({
  selector: 'app-home-reviews',
  standalone: true,
  templateUrl: './home-reviews.component.html',
})
export class HomeReviewsComponent {
  readonly starArray = STAR_ARRAY;
  readonly reviews: Review[] = HOME_REVIEWS;
}
