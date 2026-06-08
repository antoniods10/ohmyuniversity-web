import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ABOUT_VALUES } from '@constants';
import { CardSimpleComponent } from '@ui/custom-card/card-variants.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

@Component({
  selector: 'app-about-values',
  standalone: true,
  imports: [CommonModule, CardSimpleComponent, CustomTextComponent],
  templateUrl: './about-values.component.html',
})
export class AboutValuesComponent {
  readonly values = ABOUT_VALUES;
}
