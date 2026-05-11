import { Component } from '@angular/core';

interface Step {
  number: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home-how-it-works',
  standalone: true,
  templateUrl: './home-how-it-works.component.html',
})
export class HomeHowItWorksComponent {
  readonly steps: Step[] = [
    {
      number: 1,
      title: 'Scegli il tuo ateneo',
      description: 'Cerca la tua università tra i 50+ atenei supportati.',
    },
    {
      number: 2,
      title: 'Accedi con le tue credenziali',
      description: 'Login sicuro SSO - usiamo le credenziali del tuo ateneo, senza nuove password.',
    },
    {
      number: 3,
      title: 'Hai tutto sotto controllo',
      description: 'La tua dashboard è pronta con esami, piano di studi e statistiche aggiornate.',
    },
  ];
}
