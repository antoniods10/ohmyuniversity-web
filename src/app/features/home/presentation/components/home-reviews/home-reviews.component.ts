import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HOME_REVIEWS } from '@constants';
import { Review } from '@types';
import { CardReviewComponent } from '@ui/custom-card/card-variants.component';

@Component({
  selector: 'app-home-reviews',
  standalone: true,
  imports: [CommonModule, CardReviewComponent],
  templateUrl: './home-reviews.component.html',
})
export class HomeReviewsComponent {
  readonly reviews: Review[] = HOME_REVIEWS;
}
