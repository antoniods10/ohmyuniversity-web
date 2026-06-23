import { Component, input } from '@angular/core';
import { CardReviewComponent } from '@ui/custom-card/card-variants.component';

export interface PartnerTestimonial {
  name: string;
  role: string;
  quote: string;
  initials: string;
}

@Component({
  selector: 'app-partner-testimonials',
  standalone: true,
  imports: [CardReviewComponent],
  templateUrl: './partner-testimonials.component.html',
})
export class PartnerTestimonialsComponent {
  readonly testimonials = input.required<PartnerTestimonial[]>();
}
