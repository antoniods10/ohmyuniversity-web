import { Component } from '@angular/core';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';

@Component({
  selector: 'app-partner-cta',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './partner-cta.component.html',
})
export class PartnerCtaComponent {}
