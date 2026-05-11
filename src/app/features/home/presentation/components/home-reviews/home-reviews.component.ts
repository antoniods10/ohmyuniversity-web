import { Component } from '@angular/core';

interface Review {
  name: string;
  university: string;
  initials: string;
  text: string;
  rating: number;
}

@Component({
  selector: 'app-home-reviews',
  standalone: true,
  templateUrl: './home-reviews.component.html',
})
export class HomeReviewsComponent {
  readonly starArray = [1, 2, 3, 4, 5];

  readonly reviews: Review[] = [
    {
      name: 'Giulia Marchetti',
      university: 'Università di Bologna',
      initials: 'GM',
      text: "Finalmente un'app che aggrega tutto in un posto. Non devo più entrare in dieci portali diversi per trovare quello che mi serve.",
      rating: 5,
    },
    {
      name: 'Lorenzo Esposito',
      university: 'Politecnico di Milano',
      initials: 'LE',
      text: 'Il calcolo automatico della media mi ha salvato la vita. Sapevo sempre esattamente cosa mi serviva per raggiungere i miei obiettivi.',
      rating: 5,
    },
    {
      name: 'Sara Conti',
      university: 'Università di Roma La Sapienza',
      initials: 'SC',
      text: 'Le notifiche in tempo reale sono comodissime. Ho smesso di perdere le scadenze delle domande di laurea.',
      rating: 5,
    },
  ];
}
