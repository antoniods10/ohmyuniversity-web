import { Component } from '@angular/core';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

@Component({
  selector: 'app-about-cta',
  standalone: true,
  imports: [CustomButtonComponent, CustomTextComponent],
  templateUrl: './about-cta.component.html',
})
export class AboutCtaComponent {}
