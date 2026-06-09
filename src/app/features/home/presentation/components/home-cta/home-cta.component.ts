import { Component } from '@angular/core';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';

@Component({
  selector: 'app-home-cta',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './home-cta.component.html',
})
export class HomeCtaComponent {}
